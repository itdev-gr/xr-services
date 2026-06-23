export const SERVICE_SLUGS = ['accounting', 'tax', 'consulting', 'payroll', 'audit'];

export const SERVICE_IMAGES = {
  accounting: '/services/accounting.png',
  tax: '/services/tax.png',
  consulting: '/services/consulting.png',
  audit: '/services/audit.png',
  payroll: '/services/payroll.png',
};

export function isValidServiceSlug(slug) {
  return SERVICE_SLUGS.includes(slug);
}

export function getServiceImage(slug) {
  return SERVICE_IMAGES[slug] ?? null;
}
