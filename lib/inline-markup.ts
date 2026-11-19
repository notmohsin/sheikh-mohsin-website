/**
 * Plain-text version of the inline markup used in profile copy (see
 * components/ui/inline-text.tsx), for places that print raw text such as the
 * terminal.
 */
export function stripInlineMarkup(text: string) {
  return text
    .replace(/\{([^}|]+)\|([^}]+)\}/g, "$2")
    .replace(/\{([^}]+)\}/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1");
}
