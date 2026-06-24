import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect, useState } from 'react';
import './i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AnalyticsRouteTracker from './components/AnalyticsRouteTracker';
import { initAnalytics } from './utils/analytics';

const Blog = lazy(() => import('./pages/Blog'));
const Company = lazy(() => import('./pages/Company'));
const Contact = lazy(() => import('./pages/Contact'));
const Service = lazy(() => import('./pages/Service'));
const Legal = lazy(() => import('./pages/Legal'));
const Sector = lazy(() => import('./pages/Sector'));
const CookieBanner = lazy(() => import('./components/CookieBanner'));
const NotificationPrompt = lazy(() => import('./components/NotificationPrompt'));

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-gray-100 border-t-[#c8102e] rounded-full animate-spin" />
        <span className="text-black text-sm font-medium">Φόρτωση...</span>
      </div>
    </div>
  );
}

function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => setReady(true);
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(show, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(show, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <CookieBanner />
      <NotificationPrompt />
    </Suspense>
  );
}

export default function App() {
  useEffect(() => {
    const loadAnalytics = () => { initAnalytics(); };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(loadAnalytics, { timeout: 3000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(loadAnalytics, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider prioritizeSeoTags>
      <BrowserRouter>
        <AnalyticsRouteTracker />
        <Suspense fallback={<LoadingFallback />}>
          <div className="min-h-screen flex flex-col overflow-x-clip">
            <Header />
            <main className="flex-1 min-w-0 overflow-x-clip w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/company" element={<Company />} />
                <Route path="/company/:section" element={<Company />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/services/:slug" element={<Service />} />
                <Route path="/privacy" element={<Legal page="privacy" />} />
                <Route path="/cookies" element={<Legal page="cookies" />} />
                <Route path="/terms" element={<Legal page="terms" />} />
                <Route path="/sectors/:slug" element={<Sector />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <DeferredWidgets />
          </div>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
