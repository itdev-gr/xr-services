const STATIC_PATHS = new Set([
  '/',
  '/company',
  '/contact',
  '/blog',
  '/privacy',
  '/cookies',
  '/terms',
]);

const SERVICE_SLUGS = new Set(['accounting', 'tax', 'consulting', 'payroll', 'audit']);

const SECTOR_SLUGS = new Set([
  'commerce',
  'rentcar',
  'taxi',
  'serviceProviders',
  'construction',
  'medical',
  'repairs',
  'freelancers',
]);

const COMPANY_SECTIONS = new Set([
  'vision',
  'values',
  'history',
  'people',
]);

function isValidPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (STATIC_PATHS.has(path)) return true;

  if (path.startsWith('/services/')) {
    return SERVICE_SLUGS.has(path.slice('/services/'.length));
  }

  if (path.startsWith('/sectors/')) {
    return SECTOR_SLUGS.has(path.slice('/sectors/'.length));
  }

  if (path.startsWith('/company/')) {
    return COMPANY_SECTIONS.has(path.slice('/company/'.length));
  }

  return false;
}

export const config = {
  matcher: [
    '/((?!api/|assets/|favicon\\.png|favicon\\.svg|sitemap\\.xml|robots\\.txt|llms\\.txt|404\\.html|.*\\..*).*)',
  ],
};

export default async function middleware(request) {
  const { pathname } = new URL(request.url);

  if (isValidPath(pathname)) {
    return;
  }

  const response = await fetch(new URL('/404.html', request.url));

  return new Response(response.body, {
    status: 404,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}
