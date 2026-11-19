/** Fills "{key}" placeholders from templates.json, e.g. fill("Page {n}", { n: 2 }) */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** The lines of a templates.json text; "\n" in the text starts a new line. */
export function lines(text: string) {
  return text.split('\n');
}

/** Current page check for nav links: "/" only matches itself, other links also match their sub pages. */
export function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

/** Items of a list in the order of an id list (ids without an item are skipped). */
export function pickByIds<T extends { id: string }>(items: T[], ids: string[]) {
  return ids.flatMap((id) => items.filter((item) => item.id === id));
}

/** Two-digit numbers for counters: 1 → "01". */
export function pad(n: number) {
  return String(n).padStart(2, '0');
}
