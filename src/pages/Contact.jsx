import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.c-animate'), {
        y: 25,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.1,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Απαιτείται';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Μη έγκυρο email';
    if (!form.message.trim()) errs.message = 'Απαιτείται';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const Field = ({ id, label, required, children }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-[#0f1c3f] mb-1.5">
        {label} {required && <span className="text-[#c8102e]">*</span>}
      </label>
      {children}
      {errors[id] && (
        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
          <AlertCircle size={11} />{errors[id]}
        </p>
      )}
    </div>
  );

  const inputClass = (id) =>
    `w-full border ${errors[id] ? 'border-red-400' : 'border-gray-300'} rounded-lg px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#c8102e] transition-colors bg-white`;

  return (
    <>
      <Helmet>
        <title>Επικοινωνία | XR Services</title>
        <meta name="description" content="Επικοινωνήστε με την XR Services. Τηλέφωνο: 210 342 1331, Email: info@xr-services.gr" />
      </Helmet>

      <div ref={ref}>
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-14 md:py-18">
          <div className="container-xl">
            <div className="c-animate flex items-center gap-2 text-white/50 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">Αρχική</Link>
              <span>/</span>
              <span className="text-white">{t('contact.title')}</span>
            </div>
            <h1 className="c-animate text-4xl md:text-5xl font-black text-white tracking-tight">
              {t('contact.title')}
            </h1>
          </div>
        </div>

        {/* Main content */}
        <div className="py-16 bg-white">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

              {/* Left — Στοιχεία Επικοινωνίας */}
              <div className="lg:col-span-2">
                <div className="c-animate">
                  <h2 className="text-lg font-black text-[#0f1c3f] uppercase tracking-wider mb-1">
                    Στοιχεία Επικοινωνίας
                  </h2>
                  <div className="w-10 h-1 bg-[#c8102e] rounded mb-8" />
                </div>

                <div className="space-y-8">
                  {/* Address */}
                  <div className="c-animate flex items-start gap-5">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-[#c8102e]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {t('contact.address')}
                      </div>
                      <div className="text-[#0f1c3f] font-bold text-lg leading-snug">
                        Κειριαδών 25 - 27<br />
                        Κάτω Πετράλωνα, Αθήνα
                      </div>
                    </div>
                  </div>

                  {/* Phones */}
                  <div className="c-animate flex items-start gap-5">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-[#c8102e]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {t('contact.phone')}
                      </div>
                      <a href="tel:2103421331" className="block text-[#0f1c3f] font-bold text-lg hover:text-[#c8102e] transition-colors">
                        +30 210 342 1331
                      </a>
                      <a href="tel:2103421862" className="block text-[#0f1c3f] font-bold text-lg hover:text-[#c8102e] transition-colors">
                        +30 210 342 1862
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="c-animate flex items-start gap-5">
                    <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-[#c8102e]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                        {t('contact.email')}
                      </div>
                      <a href="mailto:info@xr-services.gr" className="text-[#0f1c3f] font-bold text-lg hover:text-[#c8102e] transition-colors">
                        info@xr-services.gr
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right — Φόρμα */}
              <div className="lg:col-span-3">
                <div className="c-animate">
                  <h2 className="text-2xl font-black text-[#0f1c3f] mb-1">Στείλτε Μήνυμα</h2>
                  <div className="w-10 h-1 bg-[#c8102e] rounded mb-8" />
                </div>

                {status === 'success' ? (
                  <div className="c-animate flex flex-col items-center gap-4 py-16 text-center bg-green-50 rounded-2xl border border-green-100">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle size={32} className="text-green-600" />
                    </div>
                    <p className="font-bold text-[#0f1c3f] text-lg">{t('contact.form.success')}</p>
                    <button onClick={() => setStatus('idle')} className="text-[#c8102e] text-sm font-semibold hover:underline">
                      Αποστολή νέου μηνύματος
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="c-animate space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id="name" label={t('contact.form.name')} required>
                        <input
                          id="name"
                          type="text"
                          value={form.name}
                          onChange={(e) => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                          className={inputClass('name')}
                          placeholder="Το ονοματεπώνυμό σας"
                        />
                      </Field>
                      <Field id="email" label={t('contact.form.email')} required>
                        <input
                          id="email"
                          type="email"
                          value={form.email}
                          onChange={(e) => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                          className={inputClass('email')}
                          placeholder="email@example.com"
                        />
                      </Field>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field id="phone" label={t('contact.form.phone')}>
                        <input
                          id="phone"
                          type="tel"
                          value={form.phone}
                          onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                          className={inputClass('phone')}
                          placeholder="210 000 0000"
                        />
                      </Field>
                      <Field id="subject" label="Θέμα">
                        <input
                          id="subject"
                          type="text"
                          value={form.subject}
                          onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))}
                          className={inputClass('subject')}
                          placeholder="Θέμα μηνύματος"
                        />
                      </Field>
                    </div>

                    <Field id="message" label={t('contact.form.message')} required>
                      <textarea
                        id="message"
                        value={form.message}
                        onChange={(e) => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
                        rows={6}
                        className={inputClass('message') + ' resize-none'}
                        placeholder="Γράψτε το μήνυμά σας..."
                      />
                    </Field>

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="flex items-center justify-center gap-2 bg-[#c8102e] text-white font-bold py-4 px-10 rounded-xl hover:bg-[#a00d24] disabled:opacity-60 transition-all duration-200 uppercase text-sm tracking-wider"
                    >
                      {status === 'loading' ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          {t('contact.form.submit')}
                          <Send size={15} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
