import { SITE_URL, SITE_NAME } from '../config/site';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

export const organizationSchema = {
  '@type': ['Organization', 'AccountingService', 'LocalBusiness'],
  '@id': ORG_ID,
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/XRS-MAIN-9.svg`,
  image: `${SITE_URL}/XRS-MAIN-9.svg`,
  telephone: ['+302103421331', '+302103421862'],
  email: 'info@xr-services.gr',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Κειριαδών 25 - 27',
    addressLocality: 'Κάτω Πετράλωνα',
    addressRegion: 'Αττική',
    addressCountry: 'GR',
  },
  areaServed: {
    '@type': 'Country',
    name: 'Greece',
  },
  sameAs: [
    'https://www.facebook.com/XRServices/',
    'https://www.instagram.com/xr_services/',
    'https://www.linkedin.com/company/xr-services/',
  ],
  priceRange: '€€',
  knowsAbout: [
    'Λογιστικές υπηρεσίες',
    'Φοροτεχνικές υπηρεσίες',
    'Φορολογική συμμόρφωση',
    'Μισθοδοσία',
    'Επιχειρηματική συμβουλευτική',
  ],
};

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: 'el-GR',
    publisher: { '@id': ORG_ID },
  };
}

export function breadcrumbSchema(items) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageSchema({ name, description, url }) {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'el-GR',
  };
}

export function serviceSchema({ name, description, url, image }) {
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    image: image ? `${SITE_URL}${image}` : `${SITE_URL}/XRS-MAIN-9.svg`,
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'Country',
      name: 'Greece',
    },
    serviceType: name,
  };
}

export function buildSchemaGraph(...nodes) {
  return {
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  };
}

export function homePageSchema({ title, description }) {
  return buildSchemaGraph(
    organizationSchema,
    websiteSchema(),
    webPageSchema({ name: title, description, url: SITE_URL }),
  );
}

export function innerPageSchema({ title, description, path, breadcrumbs, extra = [] }) {
  const url = `${SITE_URL}${path}`;
  return buildSchemaGraph(
    organizationSchema,
    websiteSchema(),
    breadcrumbSchema(breadcrumbs),
    webPageSchema({ name: title, description, url }),
    ...extra,
  );
}
