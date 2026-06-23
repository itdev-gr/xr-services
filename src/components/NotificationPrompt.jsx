import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Bell, X } from 'lucide-react';

const STORAGE_KEY = 'xr-notification-prompt';
const DISMISS_DAYS = 7;
const SHOW_DELAY_MS = 4000;

function getStoredState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function shouldShowPrompt() {
  if (typeof window === 'undefined' || !('Notification' in window)) return false;

  const permission = Notification.permission;
  if (permission === 'granted' || permission === 'denied') return false;

  const stored = getStoredState();
  if (!stored) return true;

  if (stored.answered === 'yes' || stored.answered === 'denied') return false;

  if (stored.dismissedAt) {
    const daysSince = (Date.now() - stored.dismissedAt) / (1000 * 60 * 60 * 24);
    return daysSince >= DISMISS_DAYS;
  }

  return true;
}

function persistState(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* ignore quota errors */
  }
}

export default function NotificationPrompt() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!shouldShowPrompt()) return;

    const timer = window.setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => setMounted(true));
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  const hide = () => {
    setMounted(false);
    window.setTimeout(() => setVisible(false), 300);
  };

  const handleDismiss = () => {
    persistState({ dismissedAt: Date.now() });
    hide();
  };

  const handleAccept = async () => {
    try {
      const permission = await Notification.requestPermission();
      persistState({
        answered: permission === 'granted' ? 'yes' : 'denied',
        dismissedAt: Date.now(),
      });
    } catch {
      persistState({ dismissedAt: Date.now() });
    }
    hide();
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t('notificationPrompt.ariaLabel')}
      className={`fixed z-[60] inset-x-0 bottom-0 md:inset-x-auto md:bottom-auto md:top-24 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl px-4 pb-[max(1rem,env(safe-area-inset-bottom))] md:px-0 md:pb-0 transition-all duration-300 ease-out ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6 md:-translate-y-3'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100/80 overflow-hidden md:mx-4">
        <div className="flex items-start gap-4 p-5 md:p-6">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-[#0f1c3f]/5 flex items-center justify-center">
            <Bell size={24} className="text-[#0f1c3f]" aria-hidden="true" />
          </div>

          <p className="flex-1 min-w-0 text-base md:text-lg text-black leading-relaxed pt-1">
            {t('notificationPrompt.message')}
          </p>

          <button
            type="button"
            onClick={handleDismiss}
            className="shrink-0 -mt-1 -mr-1 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            aria-label={t('notificationPrompt.close')}
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-center justify-end gap-5 px-5 pb-5 md:px-6 md:pb-6 pt-0">
          <button
            type="button"
            onClick={handleDismiss}
            className="text-base font-medium text-black hover:text-[#c8102e] transition-colors"
          >
            {t('notificationPrompt.notYet')}
          </button>
          <button
            type="button"
            onClick={handleAccept}
            className="px-6 py-2.5 text-base font-bold text-white bg-[#0f1c3f] hover:bg-[#1a2f5e] rounded-lg transition-colors uppercase tracking-wide"
          >
            {t('notificationPrompt.yes')}
          </button>
        </div>
      </div>
    </div>
  );
}
