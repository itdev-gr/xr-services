import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Phone, Mail, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import LanguageSwitcher, { MobileLanguageSwitcher } from './LanguageSwitcher';

const SERVICE_ITEMS = [
  { key: 'accounting', href: '/services/accounting', labelKey: 'services.items.accounting.title' },
  { key: 'tax',        href: '/services/tax', labelKey: 'services.items.tax.title' },
  { key: 'consulting', href: '/services/consulting', labelKey: 'services.items.consulting.title' },
  { key: 'audit',      href: '/services/audit', labelKey: 'services.items.audit.title' },
  { key: 'payroll',    href: '/services/payroll', labelKey: 'services.items.payroll.title' },
];

const SECTOR_ITEMS = [
  { key: 'commerce',         href: '/sectors/commerce',         labelKey: 'nav.sectorItems.commerce' },
  { key: 'rentcar',          href: '/sectors/rentcar',          labelKey: 'nav.sectorItems.rentcar' },
  { key: 'taxi',             href: '/sectors/taxi',             labelKey: 'nav.sectorItems.taxi' },
  { key: 'serviceProviders', href: '/sectors/serviceProviders', labelKey: 'nav.sectorItems.serviceProviders' },
  { key: 'construction',     href: '/sectors/construction',     labelKey: 'nav.sectorItems.construction' },
  { key: 'medical',          href: '/sectors/medical',          labelKey: 'nav.sectorItems.medical' },
  { key: 'repairs',          href: '/sectors/repairs',          labelKey: 'nav.sectorItems.repairs' },
  { key: 'freelancers',      href: '/sectors/freelancers',      labelKey: 'nav.sectorItems.freelancers' },
];

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
      ...SERVICE_ITEMS,
      { key: 'sectors-label', isGroupLabel: true, labelKey: 'nav.servicesItems.sectors' },
      ...SECTOR_ITEMS,
    ],
  },
  { key: 'articles', href: '/blog', external: true },
  { key: 'contact', href: '/contact', external: true },
];

function MobileMenu({ open, onClose, items, onNavigate, mobileExpanded, setMobileExpanded }) {
  const { t } = useTranslation();
  const panelRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(panelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClose = () => {
    gsap.to(panelRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  const handleNav = (href, external) => {
    handleClose();
    setTimeout(() => onNavigate(href, external), 220);
  };

  if (!open) return null;

  return (
    <div
      ref={panelRef}
      className="lg:hidden fixed inset-0 z-[100] bg-white flex flex-col"
    >
      {/* Top bar — same layout as header so X aligns with hamburger */}
      <div className="flex items-center justify-between gap-3 h-20 px-4 sm:px-6 shrink-0">
        <img
          src="/XRS-MAIN-9.svg"
          alt="XR Services"
          className="h-11 w-auto max-w-[calc(100%-3.75rem)] object-contain object-left"
        />
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close menu"
          className="flex items-center justify-center w-14 h-14 shrink-0 text-[#0f1c3f] hover:text-[#c8102e] transition-colors"
        >
          <X size={32} strokeWidth={2.75} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 overflow-y-auto px-6">
        {items.map(({ key, href, children, external }) => (
          <div key={key}>
            {children ? (
              <>
                <button
                  type="button"
                  onClick={() => setMobileExpanded(mobileExpanded === key ? null : key)}
                  className="w-full flex items-center justify-between py-5 text-gray-900 font-bold text-lg border-b border-gray-200 hover:text-[#c8102e] transition-colors"
                >
                  {t(`nav.${key}`)}
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${mobileExpanded === key ? 'rotate-180 text-[#c8102e]' : 'text-gray-900'}`}
                  />
                </button>
                {mobileExpanded === key && (
                  <div className="py-2 pl-2 flex flex-col border-b border-gray-200">
                    {children.map((child) => {
                      if (child.isGroupLabel) {
                        return (
                          <p
                            key={child.key}
                            className="pt-4 pb-1 text-xs font-bold uppercase tracking-wider text-[#c8102e]"
                          >
                            {t(child.labelKey)}
                          </p>
                        );
                      }
                      const label = child.labelKey ? t(child.labelKey) :
                        t(`services.items.${child.key}.title`);
                      return (
                        <a
                          key={child.key}
                          href={child.href}
                          onClick={(e) => { e.preventDefault(); handleNav(child.href, true); }}
                          className="py-3 text-black hover:text-[#c8102e] text-base font-medium transition-colors"
                        >
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
                className="flex items-center py-5 text-gray-900 font-bold text-lg border-b border-gray-200 hover:text-[#c8102e] transition-colors"
              >
                {t(`nav.${key}`)}
              </a>
            )}
          </div>
        ))}
      </nav>

      <MobileLanguageSwitcher />
    </div>
  );
}

function MegaMenuLink({ href, label, onNavigate, className = '' }) {
  return (
    <a
      href={href}
      onClick={(e) => { e.preventDefault(); onNavigate(href, true); }}
      className={`group flex items-start rounded-lg px-3 py-2.5 text-sm xl:text-[15px] text-black hover:text-[#c8102e] hover:bg-red-50/80 transition-colors duration-150 leading-snug h-full ${className}`}
    >
      {label}
    </a>
  );
}

function SectorMenuGrid({ items, onNavigate, t }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <div className="flex flex-col gap-1.5">
      {rows.map(([left, right]) => (
        <div
          key={left.key}
          className="grid grid-cols-2 gap-x-3 items-stretch"
        >
          <MegaMenuLink
            href={left.href}
            label={t(left.labelKey)}
            onNavigate={onNavigate}
          />
          {right && (
            <MegaMenuLink
              href={right.href}
              label={t(right.labelKey)}
              onNavigate={onNavigate}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ServicesMegaMenu({ onNavigate }) {
  const { t } = useTranslation();

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="w-[min(860px,calc(100vw-2rem))] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.55fr)]">
          {/* Main services */}
          <div className="bg-gradient-to-br from-gray-50 to-white p-6 border-r border-gray-100">
            <p className="text-xs font-bold uppercase tracking-wider text-[#c8102e] mb-4">
              {t('nav.servicesMega.servicesTitle')}
            </p>
            <div className="space-y-0.5">
              {SERVICE_ITEMS.map((item) => (
                <MegaMenuLink
                  key={item.key}
                  href={item.href}
                  label={t(item.labelKey)}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </div>

          {/* Specialization sectors */}
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#c8102e] mb-4">
              {t('nav.servicesMega.sectorsTitle')}
            </p>
            <SectorMenuGrid items={SECTOR_ITEMS} onNavigate={onNavigate} t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DropdownMenu({ items, parentKey, onNavigate }) {
  const { t } = useTranslation();

  if (parentKey === 'services') {
    return <ServicesMegaMenu onNavigate={onNavigate} />;
  }

  const getLabel = (item) => {
    if (item.labelKey) return t(item.labelKey);
    return t(`services.items.${item.key}.title`);
  };

  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 min-w-[260px] animate-in fade-in slide-in-from-top-2 duration-150">
      <div className="py-2">
        {items.map((item) => (
          <a
            key={item.key}
            href={item.href}
            onClick={(e) => { e.preventDefault(); onNavigate(item.href, true); }}
            className="flex items-center px-5 py-2.5 xl:py-3 text-sm xl:text-base text-black hover:text-[#c8102e] hover:bg-red-50 transition-colors duration-150 leading-snug"
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
          <a href="tel:+302103421331" className="flex items-center gap-2 font-semibold hover:text-red-300 transition-colors">
            <Phone size={16} />
            <span>+30 210 342 1331</span>
          </a>
          <a href="tel:+302103421862" className="flex items-center gap-2 font-semibold hover:text-red-300 transition-colors">
            <Phone size={16} />
            <span>+30 210 342 1862</span>
          </a>
          <a href="mailto:info@xr-services.gr" className="flex items-center gap-2 font-semibold hover:text-red-300 transition-colors">
            <Mail size={16} />
            <span>info@xr-services.gr</span>
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-sm border-b border-gray-100'
            : 'bg-white'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3 h-20 md:h-28 lg:h-32 relative">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); handleNavClick('#'); }}
            className="flex items-center min-w-0 flex-1 lg:flex-none lg:max-w-none max-w-[calc(100%-3.75rem)]"
          >
            <img
              src="/XRS-MAIN-9.svg"
              alt="XR Services"
              className="h-11 sm:h-16 md:h-20 lg:h-24 w-auto max-w-full object-contain object-left"
              style={{ imageRendering: '-webkit-optimize-contrast', transform: 'translateZ(0)' }}
            />
          </a>

          {/* Desktop nav — absolute center */}
          <nav className="hidden lg:flex items-center gap-1 absolute left-1/2 -translate-x-1/2 pointer-events-none lg:pointer-events-auto">
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

          {/* Right side */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <a
              href="tel:+302103421331"
              className="hidden md:inline-flex items-center gap-2 bg-[#c8102e] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#a00d24] transition-colors duration-200 uppercase tracking-wide"
            >
              {t('hero.cta')}
            </a>
            <button
              type="button"
              className="lg:hidden flex items-center justify-center w-14 h-14 shrink-0 text-[#0f1c3f] hover:text-[#c8102e] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X size={32} strokeWidth={2.75} color="currentColor" />
              ) : (
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" />
                </svg>
              )}
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
