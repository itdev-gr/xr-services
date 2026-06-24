import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { homePageSchema } from '../utils/schema';
import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import { lazy, Suspense } from 'react';

const AboutSection = lazy(() => import('../components/AboutSection'));

const QuoteBanner = lazy(() => import('../components/QuoteBanner'));
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
        jsonLd={homePageSchema({
          title: t('seo.title'),
          description: t('seo.description'),
        })}
      />

      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <AboutSection />
        <QuoteBanner />
      </Suspense>
      <ServicesGrid />
      <Suspense fallback={<SectionFallback />}>
        <Newsletter />
        <ContactSection />
      </Suspense>
    </>
  );
}
