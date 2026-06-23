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

export function isValidSectorSlug(slug) {
  return SECTOR_SLUGS.includes(slug);
}
