import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import QuoteBanner from '../components/QuoteBanner';
import ServicesSection from '../components/ServicesSection';
import ServicesGrid from '../components/ServicesGrid';
import BlogPreview from '../components/BlogPreview';
import Newsletter from '../components/Newsletter';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
        <meta property="og:title" content={t('seo.title')} />
        <meta property="og:description" content={t('seo.description')} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="XR Services" />
        <link rel="canonical" href="https://xr-services.gr" />
      </Helmet>

      <Hero />
      <AboutSection />
      <QuoteBanner />
      <ServicesGrid />
      <BlogPreview />
      <Newsletter />
      <ContactSection />
    </>
  );
}
