"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

// Client component: the Header data comes in as props (not from `site`) so site.json stays out of the browser bundle.
export default function Navbar({ data, contact, socials }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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

  return (
    <header className={`sticky top-0 z-50 border-b bg-white transition-[box-shadow,border-color] duration-300 ${scrolled ? "border-transparent shadow-[0_12px_40px_rgba(37,10,16,0.10)]" : "border-line"}`}>
      <div className="container-site flex h-[76px] items-center justify-between gap-6 lg:h-[92px]">
        <Link href="/" aria-label={brand.name} className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src={brand.logo.src}
            alt={brand.logo.alt}
            width={brand.logo.width}
            height={brand.logo.height}
            loading="eager"
            fetchPriority="high"
            quality={90}
            sizes="(min-width: 1280px) 210px, 180px"
            className="h-auto w-[160px] sm:w-[180px] xl:w-[210px]"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7 2xl:gap-9">
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative flex flex-col items-center whitespace-nowrap py-2 text-[12px] font-semibold uppercase tracking-[0.1em] xl:text-[13px] xl:tracking-[0.12em] transition-colors ${active ? "text-wine" : "text-ink hover:text-wine"}`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`diamond absolute -bottom-1.5 size-[6px]! text-gold transition-[opacity,scale] duration-300 ${active ? "opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100"}`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Link href={appointmentButton.href} className="btn hidden min-h-[50px]! whitespace-nowrap bg-wine px-6! text-white hover:bg-gold sm:inline-flex lg:hidden xl:inline-flex">
            {appointmentButton.label}
            <ArrowRight className="size-4" />
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-12 place-items-center rounded-[3px] border border-line text-wine transition-colors hover:border-wine hover:bg-wine hover:text-white lg:hidden"
          >
            {open ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile / tablet menu: full-screen wine panel with large serif links */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full h-[calc(100dvh-76px)] overflow-y-auto md:h-[calc(100dvh-120px)] overscroll-contain bg-wine-deep text-white transition-[opacity,visibility] duration-300 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile navigation" className="container-site flex min-h-full flex-col pb-10 pt-6">
          <ul className="flex flex-col">
            {navigation.map((item, i) => {
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href} className="border-b border-white/10">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-baseline gap-5 py-4 font-display text-[34px] font-semibold leading-none transition-colors hover:text-gold-light sm:text-[42px] ${active ? "italic text-gold-light" : "text-white"}`}
                  >
                    <span className="label text-white/40">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href={appointmentButton.href} onClick={() => setOpen(false)} className="btn mt-8 w-full bg-gold text-white hover:bg-gold-bright sm:w-auto sm:self-start">
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
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white transition-colors hover:border-gold hover:bg-gold"
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
