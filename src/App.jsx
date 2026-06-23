import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Suspense } from 'react';
import './i18n';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Service from './pages/Service';
import Legal from './pages/Legal';
import Sector from './pages/Sector';
import NotificationPrompt from './components/NotificationPrompt';
import CookieBanner from './components/CookieBanner';
import AnalyticsRouteTracker from './components/AnalyticsRouteTracker';

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

export default function App() {
  return (
    <HelmetProvider>
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
              </Routes>
            </main>
            <Footer />
            <CookieBanner />
            <NotificationPrompt />
          </div>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
}
