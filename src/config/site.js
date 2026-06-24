import { SERVICE_SLUGS } from './services';
import { SECTOR_SLUGS } from './sectors';

export const SITE_URL = 'https://xr-services.gr';
export const SITE_NAME = 'XR Services';
export const BUSINESS_NAME = 'XR Services Χρονόπουλος & Συνεργάτες';
export const DEFAULT_OG_IMAGE = '/XRS-MAIN-9.svg';
export const BUSINESS_IMAGE = '/herosection.webp';
export const BUSINESS_PHONE = '+302103421331';
export const BUSINESS_PHONE_SECONDARY = '+302103421862';
export const BUSINESS_EMAIL = 'info@xr-services.gr';
export const GBP_MAP_URL = 'https://maps.google.com/?cid=6159868195840081792';
export const GEO_COORDINATES = {
  latitude: 37.9729921,
  longitude: 23.7105594,
};
export const SOCIAL_PROFILES = [
  'https://www.facebook.com/XRServices/',
  'https://www.instagram.com/xr_services/',
  'https://gr.linkedin.com/company/xr-services',
];

/** Static routes included in sitemap.xml */
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

export function absoluteUrl(path = '') {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}
