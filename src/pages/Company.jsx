import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, Eye, Heart, Clock, Users, Briefcase, BarChart2, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SECTIONS = [
  {
    id: 'vision',
    icon: Eye,
    color: 'bg-blue-50 text-blue-600',
    content: 'Όραμά μας είναι να είμαστε ο πιο αξιόπιστος λογιστικός και φοροτεχνικός σύμβουλος για κάθε επιχείρηση στην Ελλάδα. Επιδιώκουμε να προσφέρουμε υψηλής ποιότητας υπηρεσίες που συμβάλλουν ουσιαστικά στην ανάπτυξη και επιτυχία των πελατών μας.',
  },
  {
    id: 'values',
    icon: Heart,
    color: 'bg-red-50 text-[#c8102e]',
    content: 'Οι αξίες μας αποτελούν τον πυρήνα κάθε μας απόφασης: Ακεραιότητα, Επαγγελματισμός, Αξιοπιστία, Εμπιστευτικότητα και Συνεχής Βελτίωση. Αυτές οι αρχές καθοδηγούν κάθε μας αλληλεπίδραση με πελάτες, συνεργάτες και συναδέλφους.',
  },
  {
    id: 'history',
    icon: Clock,
    color: 'bg-amber-50 text-amber-600',
    content: 'Η XR Services ιδρύθηκε το 2000 με στόχο την παροχή ολοκληρωμένων λογιστικών και φοροτεχνικών υπηρεσιών. Με πάνω από 25 χρόνια παρουσίας στον κλάδο, έχουμε αναπτυχθεί σε έναν αξιόπιστο συνεργάτη για εκατοντάδες επιχειρήσεις και επαγγελματίες.',
  },
  {
    id: 'people',
    icon: Users,
    color: 'bg-green-50 text-green-600',
    content: 'Η ομάδα μας αποτελείται από έμπειρους λογιστές, φοροτεχνικούς και συμβούλους επιχειρήσεων. Όλοι οι συνεργάτες μας διαθέτουν υψηλές επαγγελματικές πιστοποιήσεις και παρακολουθούν συνεχώς τις εξελίξεις στη φορολογική και λογιστική νομοθεσία.',
  },
  {
    id: 'careers',
    icon: Briefcase,
    color: 'bg-purple-50 text-purple-600',
    content: 'Αναζητούμε ταλαντούχα άτομα που μοιράζονται τις αξίες μας και θέλουν να αναπτυχθούν σε ένα δυναμικό περιβάλλον. Εάν ενδιαφέρεστε για μια καριέρα στη XR Services, αποστείλτε το βιογραφικό σας στο info@xr-services.gr.',
  },
  {
    id: 'financials',
    icon: BarChart2,
    color: 'bg-navy-50 text-[#0f1c3f]',
    content: 'Η XR Services διατηρεί πλήρη διαφάνεια στη λειτουργία της. Τα οικονομικά μας στοιχεία αντικατοπτρίζουν σταθερή ανάπτυξη και υγιή οικονομική κατάσταση, στοιχεία που αποδεικνύουν την εμπιστοσύνη των πελατών μας.',
  },
  {
    id: 'network',
    icon: Globe,
    color: 'bg-teal-50 text-teal-600',
    content: 'Η XR Services είναι μέλος του Allinial Global, ενός από τα μεγαλύτερα διεθνή δίκτυα ανεξάρτητων λογιστικών εταιρειών. Μέσω αυτής της συμμετοχής, μπορούμε να εξυπηρετήσουμε πελάτες με διεθνείς δραστηριότητες παρέχοντας πρόσβαση σε εξειδικευμένες γνώσεις από όλο τον κόσμο.',
  },
];

export default function Company() {
  const { t } = useTranslation();
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const ctx = gsap.context(() => {
      gsap.from(ref.current.querySelectorAll('.section-card'), {
        y: 40,
        opacity: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current.querySelector('.sections-grid'),
          start: 'top 80%',
        },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Helmet>
        <title>Εταιρεία | XR Services</title>
        <meta name="description" content="Μάθετε περισσότερα για την XR Services — το όραμα, τις αξίες, την ιστορία και την ομάδα μας." />
      </Helmet>

      <div ref={ref}>
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#0a1228] via-[#0f1c3f] to-[#1a2f5e] py-16 md:py-20">
          <div className="container-xl">
            <div className="flex items-center gap-2 text-white/50 text-sm mb-4">
              <Link to="/" className="hover:text-white transition-colors">Αρχική</Link>
              <span>/</span>
              <span className="text-white">{t('nav.company')}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              {t('nav.company')}
            </h1>
            <p className="text-white/60 text-lg max-w-xl">
              Γνωρίστε την XR Services — ποιοι είμαστε, τι πιστεύουμε και πού πηγαίνουμε.
            </p>
          </div>
        </div>

        {/* Quick nav anchors */}
        <div className="bg-white border-b border-gray-100 sticky top-0 z-30 overflow-x-auto">
          <div className="container-xl">
            <div className="flex items-center gap-1 py-3 min-w-max">
              {SECTIONS.map(({ id }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-4 py-1.5 text-sm font-medium text-gray-600 hover:text-[#c8102e] hover:bg-red-50 rounded-lg transition-colors whitespace-nowrap"
                >
                  {t(`nav.companyItems.${id}`)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="py-16 bg-gray-50/50">
          <div className="container-xl sections-grid space-y-8">
            {SECTIONS.map(({ id, icon: Icon, color, content }) => (
              <div
                key={id}
                id={id}
                className="section-card bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col md:flex-row">
                  {/* Left accent */}
                  <div className="md:w-64 bg-gradient-to-br from-[#0f1c3f] to-[#1a2f5e] p-8 flex flex-col justify-center">
                    <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                      <Icon size={26} />
                    </div>
                    <h2 className="text-xl font-black text-white leading-tight">
                      {t(`nav.companyItems.${id}`)}
                    </h2>
                  </div>
                  {/* Content */}
                  <div className="flex-1 p-8 flex items-center">
                    <p className="text-gray-600 text-base leading-relaxed">{content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="container-xl mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[#0f1c3f] font-semibold hover:text-[#c8102e] transition-colors"
            >
              <ArrowLeft size={16} />
              Επιστροφή στην Αρχική
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
