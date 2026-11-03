import type { CompanyData, SocialLink } from "@/types/templates.types";

/** Fills "{key}" placeholders from templates.json, e.g. fill("Page {n}", { n: 2 }) */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

/** tel: link for a phone number as it is written in templates.json. */
export function telHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

/** The address on one line, as the map links need it. */
export function oneLineAddress(company: CompanyData) {
  return company.address.join(" ");
}

/** Map links for the company address ("{query}" in the URL templates). */
export function mapUrl(template: string, company: CompanyData) {
  return fill(template, { query: encodeURIComponent(oneLineAddress(company)) });
}

/** Social links by id, in the order a section lists them. */
export function socialLinks(ids: string[], company: CompanyData): SocialLink[] {
  return ids.flatMap((id) => company.socialLinks.filter((social) => social.id === id));
}

/** Two-digit numbers for counters: 1 → "01". */
export function pad(n: number) {
  return String(n).padStart(2, "0");
}
