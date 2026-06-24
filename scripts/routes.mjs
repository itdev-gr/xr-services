export const SERVICE_SLUGS = ['accounting', 'tax', 'consulting', 'payroll', 'audit'];

export const SECTOR_SLUGS = [
  'commerce',
  'rentcar',
  'taxi',
  'serviceProviders',
  'construction',
  'medical',
  'repairs',
  'freelancers',
];

export const SITEMAP_ROUTES = [
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

/** All public routes prerendered at build time for crawlers */
export const PRERENDER_PATHS = SITEMAP_ROUTES.map(({ path }) => path);
