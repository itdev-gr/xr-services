export const LEGAL_PAGES = ['privacy', 'cookies', 'terms'];

export function isValidLegalPage(page) {
  return LEGAL_PAGES.includes(page);
}
