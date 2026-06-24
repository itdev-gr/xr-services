import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useLabels } from '../hooks/useLabels';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { t } = useTranslation();
  const { tu } = useLabels();
  const ref = useRef(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.cs-animate'), {
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%' },
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
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  const inputClass = (id) =>
    `w-full border ${errors[id] ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'} rounded-xl px-4 py-3.5 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#c8102e] focus:bg-white transition-all`;

  return (
    <section id="contact" ref={ref} className="py-12 md:py-20 bg-gray-50 overflow-hidden">
      <div className="container-xl">

        {/* Section label */}
        <div className="cs-animate text-center mb-12">
          <div className="inline-flex items-center gap-2 text-[#c8102e] text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-8 h-px bg-[#c8102e]" />
            {tu('contact.title')}
            <span className="w-8 h-px bg-[#c8102e]" />
          </div>
          <p className="text-black w-full text-center font-semibold leading-snug text-balance px-2 sm:px-0 text-base sm:text-lg md:text-xl lg:text-[1.35rem] lg:whitespace-nowrap">
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Form — centered */}
        <div className="max-w-2xl mx-auto">
          <div className="cs-animate bg-white rounded-2xl border border-gray-100 p-7 md:p-10 shadow-sm">

            {status === 'success' ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <p className="font-bold text-[#0f1c3f] text-lg">{t('contact.form.success')}</p>
                <button onClick={() => setStatus('idle')} className="text-[#c8102e] text-sm font-semibold hover:underline">
                  Αποστολή νέου μηνύματος
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      {tu('contact.form.name')} <span className="text-[#c8102e]">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: '' })); }}
                      className={inputClass('name')}
                      placeholder="Ονοματεπώνυμο"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                      {tu('contact.form.email')} <span className="text-[#c8102e]">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: '' })); }}
                      className={inputClass('email')}
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.email}</p>}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    {tu('contact.form.phone')}
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm(p => ({ ...p, phone: e.target.value }))}
                    className={inputClass('phone')}
                    placeholder="210 000 0000"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-black uppercase tracking-wider mb-1.5">
                    {tu('contact.form.message')} <span className="text-[#c8102e]">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => { setForm(p => ({ ...p, message: e.target.value })); setErrors(p => ({ ...p, message: '' })); }}
                    rows={5}
                    className={inputClass('message') + ' resize-none'}
                    placeholder="Πώς μπορούμε να σας βοηθήσουμε;"
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={10} />{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 bg-[#c8102e] text-white font-bold py-4 rounded-xl hover:bg-[#a00d24] disabled:opacity-60 transition-all duration-200 uppercase tracking-wider text-sm"
                >
                  {status === 'loading' ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {tu('contact.form.submit')}
                      <Send size={15} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

