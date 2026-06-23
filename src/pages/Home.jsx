import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import QuoteBanner from '../components/QuoteBanner';
import ServicesSection from '../components/ServicesSection';
import ServicesGrid from '../components/ServicesGrid';
import Newsletter from '../components/Newsletter';
import ContactSection from '../components/ContactSection';

export default function Home() {
  const { t } = useTranslation();

  return (
    <>
      <Seo
        title={t('seo.title')}
        description={t('seo.description')}
        path="/"
      />

      <Hero />
      <AboutSection />
      <QuoteBanner />
      <ServicesGrid />
      <Newsletter />
      <ContactSection />
    </>
  );
}
