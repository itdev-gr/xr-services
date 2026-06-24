import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import net from 'node:net';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PRERENDER_PATHS } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const distDir = join(rootDir, 'dist');

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address();
      server.close(() => resolve(port));
    });
    server.on('error', reject);
  });
}

async function waitForServer(baseUrl, timeoutMs = 30000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // retry until preview server is ready
    }
    await sleep(250);
  }
  throw new Error(`Preview server not ready at ${baseUrl}`);
}

function startPreviewServer(port) {
  return new Promise((resolve, reject) => {
    const proc = spawn('npx', ['vite', 'preview', '--port', String(port), '--strictPort', '--host', '127.0.0.1'], {
      cwd: rootDir,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
    });

    let stderr = '';
    let settled = false;

    proc.stderr.on('data', (chunk) => { stderr += String(chunk); });
    proc.on('error', (error) => {
      if (!settled) {
        settled = true;
        reject(error);
      }
    });
    proc.on('exit', (code) => {
      if (!settled && code !== 0) {
        settled = true;
        reject(new Error(`Preview server exited with code ${code}: ${stderr}`));
      }
    });

    settled = true;
    resolve(proc);
  });
}

function outputPath(route) {
  if (route === '/') return join(distDir, 'index.html');
  return join(distDir, route.slice(1), 'index.html');
}

async function waitForRouteReady(page, route) {
  await page.waitForFunction(
    () => !document.body?.innerText?.includes('Φόρτωση...'),
    undefined,
    { timeout: 45000 },
  );

  await page.waitForSelector('h1', { visible: true, timeout: 15000 });
  await page.waitForSelector('link[rel="canonical"]', { timeout: 15000 });
  await page.waitForSelector('script[type="application/ld+json"]', { timeout: 15000 });

  await page.waitForFunction(
    (expectedPath) => {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) return false;
      const pathname = new URL(canonical.href).pathname.replace(/\/$/, '') || '/';
      const normalized = expectedPath.replace(/\/$/, '') || '/';
      return pathname === normalized;
    },
    { timeout: 30000 },
    route,
  );

  if (route === '/') {
    await page.evaluate(async () => {
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise((r) => setTimeout(r, 800));
    });
    await sleep(1200);
  }
}

async function prerenderRoute(page, baseUrl, route) {
  const url = `${baseUrl}${route === '/' ? '/' : route}`;
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  await waitForRouteReady(page, route);

  const html = await page.content();
  const target = outputPath(route);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html, 'utf8');
  console.log(`  ✓ ${route} → ${target.replace(`${distDir}/`, '')}`);
}

async function launchBrowser() {
  const isLocal = !process.env.VERCEL && !process.env.CI;

  if (isLocal) {
    const executablePath =
      process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : process.platform === 'win32'
          ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
          : 'google-chrome';

    return puppeteer.launch({
      headless: true,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
  }

  const chromiumPack =
    'https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar';

  return puppeteer.launch({
    args: [...chromium.args, '--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(chromiumPack),
    headless: chromium.headless,
  });
}

async function main() {
  console.log(`Prerendering ${PRERENDER_PATHS.length} routes…`);

  const port = await getFreePort();
  const baseUrl = `http://127.0.0.1:${port}`;
  const server = await startPreviewServer(port);
  await waitForServer(baseUrl);

  const browser = await launchBrowser();

  const routes = [
    ...PRERENDER_PATHS.filter((path) => path !== '/'),
    '/',
  ];

  try {
    for (const route of routes) {
      const page = await browser.newPage();
      try {
        await prerenderRoute(page, baseUrl, route);
      } finally {
        await page.close();
      }
    }
    console.log('Prerender complete.');
  } finally {
    await browser.close();
    server.kill('SIGTERM');
  }
}

main().catch((error) => {
  console.error('Prerender failed:', error);
  process.exit(1);
});
