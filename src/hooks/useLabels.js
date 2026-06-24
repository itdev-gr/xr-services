import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { uppercaseLabel } from '../utils/greekText';

export function useLabels() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || i18n.language;
  const tu = useCallback(
    (key, options) => uppercaseLabel(t(key, options), lang),
    [t, lang],
  );
  return { t, tu, i18n };
}
