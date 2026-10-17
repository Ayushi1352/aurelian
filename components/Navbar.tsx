"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
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
  /** Contact strip above the navbar; folds away once the page is scrolled. */
  topBar?: ReactNode;
};

/*
 * Fixed header that floats transparently over every page's dark banner (white logo and links) and
 * turns solid white once the page scrolls. Client component: the Header data comes in as props
 * (not from `site`) so site.json stays out of the browser bundle.
 */
export default function Navbar({ data, contact, socials, topBar }: NavbarProps) {
  const pathname = usePathname();
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
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (!data) return null;
  const { brand, navigation, appointmentButton } = data;
  // Light = white logo and links over a photo; the open mobile menu is dark too.
  const light = !scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-500 ${
        open ? "bg-wine-deep" : scrolled ? "bg-white shadow-[0_10px_40px_rgba(37,10,16,0.08)]" : "bg-transparent"
      }`}
    >
      {topBar && (
        <div className={`hidden transition-[grid-template-rows,opacity] duration-500 md:grid ${scrolled ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"}`}>
          <div className="overflow-hidden">{topBar}</div>
        </div>
      )}

      <div className={`border-b transition-colors duration-500 ${light ? "border-white/15" : "border-transparent"}`}>
        <div className={`container-site flex items-center justify-between gap-6 transition-[height] duration-500 ${scrolled ? "h-[76px] lg:h-[80px]" : "h-[76px] lg:h-[92px]"}`}>
          <Link href="/" aria-label={brand.name} className="relative shrink-0" onClick={() => setOpen(false)}>
            <Image
              src={brand.logo.src}
              alt={brand.logo.alt}
              width={brand.logo.width}
              height={brand.logo.height}
              loading="eager"
              quality={90}
              sizes="(min-width: 1280px) 200px, 170px"
              className={`h-auto w-[150px] transition-opacity duration-500 sm:w-[170px] xl:w-[200px] ${light ? "opacity-0" : "opacity-100"}`}
            />
            <Image
              src={brand.logoLight.src}
              alt=""
              width={brand.logoLight.width}
              height={brand.logoLight.height}
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 1280px) 200px, 170px"
              className={`absolute inset-0 h-auto w-[150px] transition-opacity duration-500 sm:w-[170px] xl:w-[200px] ${light ? "opacity-100" : "opacity-0"}`}
            />
          </Link>

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-6 xl:gap-9">
              {navigation.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative block whitespace-nowrap py-2 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 xl:text-[12px] ${
                        light ? (active ? "text-gold-light" : "text-white/85 hover:text-white") : active ? "text-wine" : "text-ink hover:text-wine"
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-0.5 h-px origin-center bg-gold transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link
              href={appointmentButton.href}
              className={`btn hidden min-h-[46px]! whitespace-nowrap px-6! sm:inline-flex lg:hidden xl:inline-flex ${light ? "btn-light" : "btn-primary"}`}
            >
              {appointmentButton.label}
            </Link>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
              className={`grid size-12 place-items-center border transition-colors lg:hidden ${
                light ? "border-white/30 text-white hover:border-white" : "border-line text-wine hover:border-wine"
              }`}
            >
              {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Fills as the page scrolls (only while the header is solid). */}
      <span aria-hidden="true" className={`scroll-progress absolute inset-x-0 bottom-0 h-[2px] bg-gold transition-opacity duration-500 ${scrolled && !open ? "opacity-100" : "opacity-0"}`} />

      {/* Mobile / tablet menu: full-screen dark panel; links rise in one after another. */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 overflow-y-auto overscroll-contain bg-wine-deep text-white transition-[opacity,visibility] duration-500 lg:hidden ${
          scrolled ? "top-[77px]" : "top-(--header-h)"
        } ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav aria-label="Mobile navigation" className="container-site flex min-h-full flex-col pb-10 pt-8">
          <ul className="flex flex-col">
            {navigation.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li
                  key={item.href}
                  className={`border-b border-white/10 transition-[opacity,translate] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}
                  style={{ transitionDelay: open ? `${120 + i * 70}ms` : "0ms" }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline gap-5 py-4 font-display text-[30px] font-semibold leading-none transition-colors hover:text-gold-light sm:text-[38px] ${active ? "italic text-gold-light" : "text-white"}`}
                  >
                    <span className="label text-white/35">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={appointmentButton.href} onClick={() => setOpen(false)} className="btn btn-gold mt-8 w-full sm:w-auto sm:self-start">
            {appointmentButton.label}
            <ArrowRight className="size-4" />
          </Link>
          <div className="mt-auto space-y-2 pt-10 text-[15px] text-white/70">
            <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="block transition-colors hover:text-gold-light">
              {contact.phone}
            </a>
            <a href={`mailto:${contact.email}`} className="block transition-colors hover:text-gold-light">
              {contact.email}
            </a>
            <ul className="flex flex-wrap gap-2 pt-4">
              {socials.map((s) => (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid size-11 place-items-center border border-white/15 text-white transition-colors hover:border-gold hover:bg-gold"
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
