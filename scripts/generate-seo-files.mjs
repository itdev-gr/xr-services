import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const SITE_URL = 'https://xr-services.gr';

const SERVICE_SLUGS = ['accounting', 'tax', 'consulting', 'payroll', 'audit'];
const SECTOR_SLUGS = [
  'commerce',
  'rentcar',
  'taxi',
  'serviceProviders',
  'construction',
  'medical',
  'repairs',
  'freelancers',
];

const ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/company', changefreq: 'monthly', priority: '0.8' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.6' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/cookies', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  ...SERVICE_SLUGS.map((slug) => ({
    path: `/services/${slug}`,
    changefreq: 'monthly',
    priority: '0.9',
  })),
  ...SECTOR_SLUGS.map((slug) => ({
    path: `/sectors/${slug}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

const lastmod = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(
  ({ path, changefreq, priority }) => `  <url>
    <loc>${SITE_URL}${path === '/' ? '' : path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join('\n')}
</urlset>
`;

const robots = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(join(publicDir, 'robots.txt'), robots, 'utf8');

console.log(`Generated sitemap.xml (${ROUTES.length} URLs) and robots.txt`);
