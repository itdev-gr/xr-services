import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense, lazy, useEffect, useState } from 'react';
import './i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import AnalyticsRouteTracker from './components/AnalyticsRouteTracker';
import CookieBanner from './components/CookieBanner';
import { initAnalytics } from './utils/analytics';

const Blog = lazy(() => import('./pages/Blog'));
const Company = lazy(() => import('./pages/Company'));
const Contact = lazy(() => import('./pages/Contact'));
const Service = lazy(() => import('./pages/Service'));
const Legal = lazy(() => import('./pages/Legal'));
const Sector = lazy(() => import('./pages/Sector'));
const NotificationPrompt = lazy(() => import('./components/NotificationPrompt'));

function RouteFallback() {
  return (
    <div className="flex items-center justify-center py-24" aria-hidden="true">
      <div className="w-10 h-10 border-4 border-gray-100 border-t-[#c8102e] rounded-full animate-spin" />
    </div>
  );
}

function LazyRoute({ children }) {
  return <Suspense fallback={<RouteFallback />}>{children}</Suspense>;
}

function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const show = () => setReady(true);
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const timeout = isMobile ? 1200 : 2500;

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(show, { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(show, timeout);
    return () => window.clearTimeout(timer);
  }, []);

  if (!ready) return null;

  return (
    <Suspense fallback={null}>
      <NotificationPrompt />
    </Suspense>
  );
}

export default function App() {
  useEffect(() => {
    const loadAnalytics = () => { initAnalytics(); };
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(loadAnalytics, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const timer = window.setTimeout(loadAnalytics, 3000);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <HelmetProvider prioritizeSeoTags>
      <BrowserRouter>
        <AnalyticsRouteTracker />
        <div className="min-h-screen flex flex-col overflow-x-clip">
          <Header />
          <main className="flex-1 min-w-0 overflow-x-clip w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/blog" element={<LazyRoute><Blog /></LazyRoute>} />
              <Route path="/company" element={<LazyRoute><Company /></LazyRoute>} />
              <Route path="/company/:section" element={<LazyRoute><Company /></LazyRoute>} />
              <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
              <Route path="/services/:slug" element={<LazyRoute><Service /></LazyRoute>} />
              <Route path="/privacy" element={<LazyRoute><Legal page="privacy" /></LazyRoute>} />
              <Route path="/cookies" element={<LazyRoute><Legal page="cookies" /></LazyRoute>} />
              <Route path="/terms" element={<LazyRoute><Legal page="terms" /></LazyRoute>} />
              <Route path="/sectors/:slug" element={<LazyRoute><Sector /></LazyRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <CookieBanner />
          <DeferredWidgets />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
