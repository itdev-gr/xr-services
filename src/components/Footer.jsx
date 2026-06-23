import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Phone, ChevronRight } from 'lucide-react';
import FundingBanners from './FundingBanners';

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const COMPANY_LINKS = [
  { key: 'home', href: '/', labelKey: 'nav.home' },
  { key: 'company', href: '/company', labelKey: 'nav.company' },
  { key: 'articles', href: '/blog', labelKey: 'nav.articles' },
  { key: 'contact', href: '/contact', labelKey: 'nav.contact' },
];

const SERVICE_KEYS = ['accounting', 'tax', 'consulting', 'payroll', 'audit'];

const SOCIALS = [
  { icon: FacebookIcon, href: 'https://www.facebook.com/XRServices/', label: 'Facebook' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/xr_services/', label: 'Instagram' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/company/xr-services/?originalSubdomain=gr', label: 'LinkedIn' },
];

function FooterLink({ href, children, onClick }) {
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="text-white hover:text-white/90 text-[15px] transition-colors text-center xl:text-left w-full xl:w-auto">
        {children}
      </button>
    );
  }

  if (href.startsWith('/')) {
    return (
      <Link to={href} className="text-white hover:text-white/90 text-[15px] transition-colors">
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className="text-white hover:text-white/90 text-[15px] transition-colors">
      {children}
    </a>
  );
}

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#0d2137] text-white">
      <div className="container-xl py-14 lg:py-16">
        <div className="flex justify-center mb-10 lg:mb-12">
          <Link to="/" className="inline-block">
            <img
              src="/XRS-MAIN-9.svg"
              alt="XR Services"
              className="h-24 sm:h-28 md:h-32 lg:h-36 w-auto max-w-[min(90vw,420px)] brightness-0 invert mx-auto"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-12 xl:gap-10">

          {/* Column 1 — Brand & CTA */}
          <div className="sm:col-span-2 xl:col-span-1 text-center xl:text-left">
            <h3 className="text-lg font-bold text-white mb-3">
              {t('footer.ctaTitle')}
            </h3>
            <p className="text-white text-[15px] leading-relaxed mb-6 max-w-sm mx-auto xl:mx-0">
              {t('footer.ctaDescription')}
            </p>

            <Link
              to="/contact"
              className="group inline-flex items-stretch mb-8 overflow-hidden rounded-md shadow-sm mx-auto xl:mx-0"
            >
              <span className="flex items-center px-5 py-3 bg-white text-[#0d2137] text-sm font-bold">
                {t('footer.ctaButton')}
              </span>
              <span className="flex items-center justify-center px-3.5 bg-[#c8102e] text-white group-hover:bg-[#a00d24] transition-colors">
                <ChevronRight size={18} strokeWidth={2.5} />
              </span>
            </Link>

            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white mb-2">
              {t('footer.phoneLine')}
            </p>
            <a
              href="tel:2103421331"
              className="inline-flex items-center justify-center xl:justify-start gap-2.5 text-2xl font-bold text-white hover:text-white/90 transition-colors mb-6"
            >
              <Phone size={20} className="text-[#c8102e]" fill="#c8102e" />
              210 342 1331
            </a>

            <div className="flex items-center justify-center xl:justify-start gap-2.5">
              {SOCIALS.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/25 flex items-center justify-center text-white hover:bg-white hover:text-[#0d2137] transition-colors duration-200"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Company */}
          <div className="text-center xl:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              {t('footer.company')}
            </h4>
            <ul className="space-y-3">
              {COMPANY_LINKS.map(({ key, href, labelKey }) => (
                <li key={key}>
                  <FooterLink href={href}>{t(labelKey)}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Services */}
          <div className="text-center xl:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              {t('footer.servicesTitle')}
            </h4>
            <ul className="space-y-3">
              {SERVICE_KEYS.map((key) => (
                <li key={key}>
                  <FooterLink href={`/services/${key}`}>
                    {t(`services.items.${key}.title`)}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 — Certifications & Legal */}
          <div className="text-center xl:text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              {t('footer.certifications')}
            </h4>
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-4 mb-8 mx-auto xl:mx-0 max-w-fit">
              <div className="bg-white rounded-lg px-3 py-2.5 flex items-center justify-center">
                <img
                  src="/epsilonnet-gold-partner.png"
                  alt="EpsilonNet Gold Partner"
                  className="h-14 w-auto object-contain"
                />
              </div>
              <div className="bg-white rounded-lg px-3 py-2.5 flex items-center justify-center">
                <img
                  src="/aia-logo.png"
                  alt="The Association of International Accountants"
                  className="h-14 w-auto object-contain"
                />
              </div>
            </div>

            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              {t('footer.legal')}
            </h4>
            <ul className="space-y-3">
              <li><FooterLink href="/privacy">{t('footer.privacy')}</FooterLink></li>
              <li><FooterLink href="/cookies">{t('footer.cookies')}</FooterLink></li>
              <li><FooterLink href="/terms">{t('footer.terms')}</FooterLink></li>
            </ul>
          </div>
        </div>
      </div>

      <FundingBanners />

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-5 flex flex-col xl:flex-row items-center justify-between gap-3">
          <p className="text-white text-sm text-center xl:text-left">
            {t('footer.rights')}
          </p>
          <p className="text-white text-sm text-center xl:text-right">
            {t('footer.developedBy')}{' '}
            <a
              href="https://itdev.gr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:text-white/90 transition-colors"
            >
              IT DEV
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
