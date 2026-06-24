import { useTranslation } from 'react-i18next';
import Seo from '../components/Seo';
import { homePageSchema } from '../utils/schema';
import Hero from '../components/Hero';
import { lazy, Suspense } from 'react';

const AboutSection = lazy(() => import('../components/AboutSection'));
const QuoteBanner = lazy(() => import('../components/QuoteBanner'));
const ServicesGrid = lazy(() => import('../components/ServicesGrid'));
const Newsletter = lazy(() => import('../components/Newsletter'));
const ContactSection = lazy(() => import('../components/ContactSection'));

function SectionFallback({ minHeight = '12rem' }) {
  return <div className="bg-white" style={{ minHeight }} aria-hidden="true" />;
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
      <Suspense fallback={<SectionFallback minHeight="28rem" />}>
        <AboutSection />
        <QuoteBanner />
      </Suspense>
      <Suspense fallback={<SectionFallback minHeight="24rem" />}>
        <ServicesGrid />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <div className="content-auto">
          <Newsletter />
          <ContactSection />
        </div>
      </Suspense>
    </>
  );
}
