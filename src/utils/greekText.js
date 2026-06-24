/** Greek all-caps labels omit accent marks (τόνοι). */
export function uppercaseLabel(text, language = 'el') {
  if (!text) return '';
  const normalized =
    language.startsWith('el')
      ? text.normalize('NFD').replace(/\p{M}/gu, '')
      : text;
  return normalized.toUpperCase();
}
