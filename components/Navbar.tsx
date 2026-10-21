"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { AurelianContactDetails, AurelianHeaderData, AurelianSocial, SectionProps } from "@/data";
import { ArrowRight, CloseIcon, MenuIcon, SocialIcon } from "@/components/Icons";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

type NavbarProps = SectionProps<AurelianHeaderData> & {
  /** Shared Footer `contact` block, shown in the mobile menu. */
  contact: AurelianContactDetails;
  socials: AurelianSocial[];
};

// Header data comes in as props (not from `site`) so site.json stays out of the browser bundle.
export default function Navbar({ data, contact, socials }: NavbarProps) {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open (every menu link closes it on click).
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (!data) return null;
  const { brand, navigation, appointmentButton, ariaLabels } = data;

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-50 border-b bg-white transition-[box-shadow,border-color] duration-500 ${
        scrolled ? "border-transparent shadow-[0_10px_40px_color-mix(in_srgb,var(--color-navy-deep)_8%,transparent)]" : "border-line"
      }`}
    >
      <div className="container-site flex h-[76px] items-center justify-between gap-6 lg:h-[88px]">
        <Link href="/" aria-label={brand.name} className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="(min-width: 1024px) 190px, 160px"
            className="h-auto w-[150px] sm:w-[160px] lg:w-[190px]"
          />
        </Link>

        <nav aria-label={ariaLabels.mainNav} className="hidden lg:block">
          <ul className="flex items-center gap-6 lg:gap-9">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative block whitespace-nowrap py-2 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors duration-300 lg:text-[14px] ${
                      active ? "text-navy" : "text-ink hover:text-navy"
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-center bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link href={appointmentButton.href} className="btn btn-primary hidden min-h-[48px]! whitespace-nowrap px-6! sm:inline-flex lg:w-(--cta-width)">
            {appointmentButton.label}
          </Link>
          <button
            type="button"
            aria-label={ariaLabels.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
            className="grid size-12 place-items-center border border-line text-navy transition-colors hover:border-navy lg:hidden"
          >
            <MenuIcon className="size-6" />
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <span aria-hidden="true" className={`scroll-progress absolute inset-x-0 bottom-0 h-[2px] bg-gold transition-opacity duration-500 ${scrolled && !open ? "opacity-100" : "opacity-0"}`} />

      {/* Mobile menu has its own close button, so closing never depends on where the header sits. */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabels.menu}
        className={`fixed inset-0 z-10 flex h-svh flex-col overflow-y-auto overscroll-contain bg-navy-deep text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="container-site flex h-[76px] shrink-0 items-center justify-between gap-6 border-b border-white/10">
          <Link href="/" aria-label={brand.name} onClick={() => setOpen(false)}>
            <Image src={brand.logoLight.src} alt={brand.logoLight.alt} width={brand.logoLight.width} height={brand.logoLight.height} quality={90} sizes="160px" className="h-auto w-[150px] sm:w-[160px]" />
          </Link>
          <button
            type="button"
            aria-label={ariaLabels.closeMenu}
            onClick={() => setOpen(false)}
            className="grid size-12 place-items-center border border-white/25 text-white transition-colors hover:border-gold hover:bg-gold"
          >
            <CloseIcon className="size-6" />
          </button>
        </div>

        <nav aria-label={ariaLabels.mobileNav} className="container-site flex flex-1 flex-col pb-6 pt-4">
          <ul className="flex flex-col">
            {navigation.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li
                  key={item.href}
                  className={`border-b border-white/10 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
                  style={{ transitionDelay: open ? `${100 + i * 60}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between py-[clamp(10px,2svh,16px)] text-[13px] font-bold uppercase tracking-[0.14em] transition-colors hover:text-gold-light sm:text-[14px] ${active ? "text-gold-light" : "text-white"}`}
                  >
                    {item.label}
                    <span aria-hidden="true" className={`h-px w-6 bg-gold transition-opacity ${active ? "opacity-100" : "opacity-0"}`} />
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={appointmentButton.href} onClick={() => setOpen(false)} className="btn btn-gold mt-6 w-full sm:w-auto sm:self-start">
            {appointmentButton.label}
            <ArrowRight className="size-4" />
          </Link>
          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-6 text-[14px] text-white/70">
            <div className="space-y-1">
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="block transition-colors hover:text-gold-light">
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="block transition-colors hover:text-gold-light">
                {contact.email}
              </a>
            </div>
            <ul className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-10 place-items-center border border-white/15 text-white transition-colors hover:border-gold hover:bg-gold"
                  >
                    <SocialIcon name={s.name} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}
