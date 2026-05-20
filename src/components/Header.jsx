import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ChevronDown, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import LanguageSwitcher from './LanguageSwitcher';

const NAV_ITEMS = [
  { key: 'home', href: '#' },
  {
    key: 'company',
    href: '/company',
    external: true,
    children: [
      { key: 'vision',     href: '/company#vision',     labelKey: 'nav.companyItems.vision' },
      { key: 'values',     href: '/company#values',     labelKey: 'nav.companyItems.values' },
      { key: 'history',    href: '/company#history',    labelKey: 'nav.companyItems.history' },
      { key: 'people',     href: '/company#people',     labelKey: 'nav.companyItems.people' },
      { key: 'careers',    href: '/company#careers',    labelKey: 'nav.companyItems.careers' },
      { key: 'financials', href: '/company#financials', labelKey: 'nav.companyItems.financials' },
      { key: 'network',    href: '/company#network',    labelKey: 'nav.companyItems.network' },
    ],
  },
  {
    key: 'services',
    href: '#services',
    children: [
      { key: 'accounting',  href: '#services', labelKey: 'services.items.accounting.title' },
      { key: 'tax',         href: '#services', labelKey: 'services.items.tax.title' },
      { key: 'consulting',  href: '#services', labelKey: 'services.items.consulting.title' },
      { key: 'audit',       href: '#services', labelKey: 'services.items.audit.title' },
      { key: 'monitoring',  href: '#services', labelKey: 'nav.servicesItems.financial' },
      { key: 'seminars',    href: '#services', labelKey: 'nav.servicesItems.seminars' },
      { key: 'payroll',     href: '#services', labelKey: 'nav.servicesItems.payroll' },
      { key: 'special',     href: '#services', labelKey: 'nav.servicesItems.special' },
    ],
  },
  { key: 'articles', href: '/blog', external: true },
  { key: 'contact', href: '/contact', external: true },
];

function MobileMenu({ open, onClose, items, onNavigate, mobileExpanded, setMobileExpanded }) {
  const { t } = useTranslation();
  const overlayRef = useRef(null);
  const panelRef = useRef(null);
  const itemsRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      const tl = gsap.timeline();
      tl.fromTo(overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      )
      .fromTo(panelRef.current,
        { x: '100%' },
        { x: '0%', duration: 0.35, ease: 'power3.out' },
        '-=0.15'
      )
      .fromTo(itemsRef.current?.children ? Array.from(itemsRef.current.children) : [],
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' },
        '-=0.1'
      );
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panelRef.current, { x: '100%', duration: 0.3, ease: 'power3.in' })
      .to(overlayRef.current, { opacity: 0, duration: 0.2 }, '-=0.1');
  };

  const handleNav = (href, external) => {
    handleClose();
    setTimeout(() => onNavigate(href, external), 300);
  };

  if (!open) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className="absolute right-0 top-0 bottom-0 w-full sm:w-96 bg-white flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <img src="/XRS-MAIN-9.svg" alt="XR Services" className="h-10 w-auto object-contain" />
          <button
            onClick={handleClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X size={20} className="text-gray-700" />
          </button>
        </div>

        {/* Nav items */}
        <div ref={itemsRef} className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-1">
          {items.map(({ key, href, children, external }) => (
            <div key={key}>
              {children ? (
                <>
                  <button
                    onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                    className="w-full flex items-center justify-between py-4 text-gray-900 font-semibold text-lg border-b border-gray-100 hover:text-[#c8102e] transition-colors"
                  >
                    {t(`nav.${key}`)}
                    <ChevronDown
                      size={16}
                      className={`transition-transform duration-300 ${mobileExpanded === key ? 'rotate-180 text-[#c8102e]' : 'text-gray-400'}`}
                    />
                  </button>
                  {mobileExpanded === key && (
                    <div className="py-2 pl-4 flex flex-col gap-0.5">
                      {children.map((child) => {
                        const label = child.labelKey ? t(child.labelKey) :
                          t(`${key === 'services' ? 'services.items' : 'specialSolutions.items'}.${child.key}.title`);
                        return (
                          <a
                            key={child.key}
                            href={child.href}
                            onClick={(e) => { e.preventDefault(); handleNav(child.href, true); }}
                            className="flex items-center gap-3 py-2.5 text-gray-600 hover:text-[#c8102e] text-sm font-medium transition-colors group"
                          >
                            <ArrowRight size={13} className="text-gray-300 group-hover:text-[#c8102e] flex-shrink-0" />
                            {label}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNav(href, external); }}
                  className="flex items-center justify-between py-4 text-gray-900 font-semibold text-lg border-b border-gray-100 hover:text-[#c8102e] transition-colors group"
                >
                  {t(`nav.${key}`)}
                  <ArrowRight size={16} className="text-gray-300 group-hover:text-[#c8102e] transition-colors" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Footer contact info */}
        <div className="px-6 py-6 border-t border-gray-100 space-y-3">
          <a href="tel:2103421331" className="flex items-center gap-3 text-gray-600 hover:text-[#c8102e] text-sm transition-colors">
            <Phone size={15} className="text-[#c8102e]" />
            210 342 1331
          </a>
          <a href="mailto:info@xr-services.gr" className="flex items-center gap-3 text-gray-600 hover:text-[#c8102e] text-sm transition-colors">
            <Mail size={15} className="text-[#c8102e]" />
            info@xr-services.gr
          </a>
          <a
            href="/contact"
            onClick={(e) => { e.preventDefault(); handleNav('/contact', true); }}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-[#c8102e] text-white font-bold py-3.5 rounded-xl hover:bg-[#a00d24] transition-colors"
          >
            Επικοινωνήστε μαζί μας
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </div>
  );
}

function DropdownMenu({ items, parentKey, onNavigate }) {
  const { t } = useTranslation();

  const getLabel = (item) => {
    if (item.labelKey) return t(item.labelKey);
    const prefix = parentKey === 'services' ? 'services.items' : 'specialSolutions.items';
    return t(`${prefix}.${item.key}.title`);
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[260px] xl:min-w-[300px] 2xl:min-w-[340px] animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="py-2">
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={(e) => { e.preventDefault(); onNavigate(item.href, true); }}
            className="flex items-center px-5 py-2.5 xl:py-3 text-sm xl:text-base 2xl:text-lg text-gray-700 hover:text-[#c8102e] hover:bg-red-50 transition-colors duration-150"
          >
            {getLabel(item)}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const dropdownTimerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href, isExternal) => {
    setMobileOpen(false);
    setOpenDropdown(null);

    // Handle paths with hash anchors (e.g. /company#vision)
    if (isExternal && href.includes('#')) {
      const [path, hash] = href.split('#');
      navigate(path);
      setTimeout(() => {
        document.querySelector(`#${hash}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return;
    }
    if (isExternal) {
      navigate(href);
      return;
    }
    if (href === '#') {
      if (location.pathname !== '/') { navigate('/'); return; }
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleMouseEnter = (key) => {
    clearTimeout(dropdownTimerRef.current);
    setOpenDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-[#0f1c3f] text-white text-[17px] py-3 hidden md:block">
        <div className="container-xl flex justify-center items-center gap-10">
          <a href="tel:2103421331" className="flex items-center gap-2 font-semibold hover:text-red-300 transition-colors">
            <Phone size={16} />
            <span>210 342 1331</span>
          </a>
          <a href="tel:2103421862" className="flex items-center gap-2 font-semibold hover:text-red-300 transition-colors">
            <Phone size={16} />
            <span>210 342 1862</span>
          </a>
          <a href="mailto:info@xr-services.gr" className="flex items-center gap-2 font-semibold hover:text-red-300 transition-colors">
            <Mail size={16} />
            <span>info@xr-services.gr</span>
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-sm border-b border-gray-100'
            : 'bg-white'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center h-24 md:h-28 relative">
          {/* Logo — far left */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavClick('#'); }}
            className="flex items-center flex-shrink-0 z-10"
          >
            <img
              src="/XRS-MAIN-9.svg"
              alt="XR Services"
              className="h-16 md:h-20 w-auto object-contain"
              style={{ imageRendering: '-webkit-optimize-contrast', transform: 'translateZ(0)' }}
            />
          </a>

          {/* Desktop nav — absolute center */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {NAV_ITEMS.map(({ key, href, children, external }) => (
              <div
                key={key}
                className="relative"
                onMouseEnter={() => children && handleMouseEnter(key)}
                onMouseLeave={() => children && handleMouseLeave()}
              >
                <a
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href, external); }}
                  className="flex items-center gap-1 px-4 py-2 text-base xl:text-lg 2xl:text-xl font-semibold text-gray-900 hover:text-[#c8102e] transition-colors duration-200 relative group"
                >
                  {t(`nav.${key}`)}
                  {children && (
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${openDropdown === key ? 'rotate-180 text-[#c8102e]' : ''}`}
                    />
                  )}
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#c8102e] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
                {children && openDropdown === key && (
                  <DropdownMenu
                    items={children}
                    parentKey={key}
                    onNavigate={handleNavClick}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Right side — far right */}
          <div className="flex items-center gap-3 flex-shrink-0 ml-auto z-10">
            <LanguageSwitcher />
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('/contact', true); }}
              className="hidden md:inline-flex items-center gap-2 bg-[#c8102e] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#a00d24] transition-colors duration-200"
            >
              {t('hero.cta')}
            </a>
            <button
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

      </header>

      {/* Full-screen mobile overlay */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        items={NAV_ITEMS}
        onNavigate={handleNavClick}
        mobileExpanded={mobileExpanded}
        setMobileExpanded={setMobileExpanded}
      />
    </>
  );
}
