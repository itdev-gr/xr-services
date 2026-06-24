import { SERVICE_SLUGS } from './services';
import { SECTOR_SLUGS } from './sectors';

export const STATIC_PATHS = new Set([
  '/',
  '/company',
  '/contact',
  '/blog',
  '/privacy',
  '/cookies',
  '/terms',
]);

export const COMPANY_SECTIONS = new Set([
  'vision',
  'values',
  'history',
  'people',
]);

export function isValidPath(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/';

  if (STATIC_PATHS.has(path)) return true;

  if (path.startsWith('/services/')) {
    const slug = path.slice('/services/'.length);
    return SERVICE_SLUGS.includes(slug);
  }

  if (path.startsWith('/sectors/')) {
    const slug = path.slice('/sectors/'.length);
    return SECTOR_SLUGS.includes(slug);
  }

  if (path.startsWith('/company/')) {
    const section = path.slice('/company/'.length);
    return COMPANY_SECTIONS.has(section);
  }

  return false;
}
