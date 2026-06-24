import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE, absoluteUrl } from '../config/site';

export default function Seo({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd = null,
}) {
  const location = useLocation();
  const resolvedPath = path ?? location.pathname;
  const canonical = absoluteUrl(resolvedPath);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${SITE_URL}${ogImage}`;
  const schemaPayload = jsonLd ? JSON.stringify(jsonLd) : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow" />
      )}
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="el_GR" />
      <meta property="og:image" content={ogImageUrl} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      {schemaPayload && (
        <script type="application/ld+json">{schemaPayload}</script>
      )}
    </Helmet>
  );
}
