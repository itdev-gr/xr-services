import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import Hero from '../components/Hero';
import { lazy, Suspense } from 'react';

const AboutSection = lazy(() => import('../components/AboutSection'));

const QuoteBanner = lazy(() => import('../components/QuoteBanner'));
const ServicesGrid = lazy(() => import('../components/ServicesGrid'));
const Newsletter = lazy(() => import('../components/Newsletter'));
const ContactSection = lazy(() => import('../components/ContactSection'));

function SectionFallback() {
  return <div className="min-h-[12rem] bg-white" aria-hidden="true" />;
}

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
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
        <QuoteBanner />
        <ServicesGrid />
        <Newsletter />
        <ContactSection />
      </Suspense>
    </>
  );
}
