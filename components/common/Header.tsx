'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { HeaderData, HeaderProps } from '@/types/templates.types';
import { Icon } from '@/components/ui/Icon';
import { ui } from '@/components/ui/ui';
import { isActive } from '@/components/ui/text';

/** Thin bar above the navbar; it scrolls away while the navbar below it sticks. */
const TopBar = ({ data }: { data: HeaderData }) => (
  <div className="hidden bg-navy-deep text-[0.8125rem] tracking-[0.02em] text-white/75 md:block">
    <div className={`${ui.container} flex h-11 items-center justify-between gap-6`}>
      <ul className="flex items-center gap-6 lg:gap-8">
        <li>
          <a href={data.phoneUrl} className="flex items-center gap-2 transition-colors hover:text-gold-light">
            <Icon name={data.phoneIcon} className="size-4 text-gold" />
            {data.phone}
          </a>
        </li>
        <li>
          <a href={data.emailUrl} className="flex items-center gap-2 transition-colors hover:text-gold-light">
            <Icon name={data.emailIcon} className="size-4 text-gold" />
            {data.email}
          </a>
        </li>
      </ul>
      <div className="flex items-center gap-5">
        <p className="hidden items-center gap-3 text-gold-light lg:flex">
          <span aria-hidden="true" className="h-px w-6 bg-gold" />
          {data.topbarNote}
        </p>
        <ul className="flex items-center gap-1">
          {data.socialLinks.map((social) => (
            <li key={social.id}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid size-8 place-items-center transition-colors hover:text-gold-light"
              >
                <Icon name={social.icon} className="size-[0.9375rem]" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export const Header = ({ data }: HeaderProps) => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open (every menu link closes it on click).
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1024 && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  if (!data) return null;
  const nav = data.navLinks;

  return (
    <>
      <TopBar data={data} />
      <header
        ref={headerRef}
        className={`sticky top-0 z-50 border-b bg-white transition-[box-shadow,border-color] duration-500 ${
          scrolled ? 'border-transparent shadow-[0_0.625rem_2.5rem_color-mix(in_srgb,var(--color-navy-deep)_8%,transparent)]' : 'border-line'
        }`}
      >
        <div className={`${ui.container} flex h-[4.75rem] items-center justify-between gap-6 lg:h-[5.5rem]`}>
          <Link href={data.logoUrl} aria-label={data.logoLabel} className="shrink-0" onClick={() => setOpen(false)}>
            <Image
              src={data.logo}
              alt={data.logoAlt}
              width={data.logoWidth}
              height={data.logoHeight}
              loading="eager"
              fetchPriority="high"
              quality={90}
              sizes="(min-width: 1024px) 190px, 160px"
              className="h-auto w-[9.375rem] sm:w-[10rem] lg:w-[11.875rem]"
            />
          </Link>

          <nav aria-label={data.menuLabel} className="hidden lg:block">
            <ul className="flex items-center gap-6 lg:gap-9">
              {nav.map((item) => {
                const active = isActive(pathname, item.url);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.url}
                      aria-current={active ? 'page' : undefined}
                      className={`group relative block whitespace-nowrap py-2 text-[0.8125rem] font-bold uppercase tracking-[0.12em] transition-colors duration-300 lg:text-[0.875rem] ${
                        active ? 'text-navy' : 'text-ink hover:text-navy'
                      }`}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-center bg-gold transition-transform duration-500 ease-smooth ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            <Link href={data.buttonUrl} className={`${ui.btnPrimarySmall} hidden whitespace-nowrap sm:inline-flex lg:w-[16.25rem]`}>
              {data.buttonText}
            </Link>
            <button
              type="button"
              aria-label={data.openMenuLabel}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen(true)}
              className="grid size-12 place-items-center border border-line text-navy transition-colors hover:border-navy lg:hidden"
            >
              <Icon name={data.openMenuIcon} className="size-6" strokeWidth={1.8} />
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <span data-scroll-progress aria-hidden="true" className={`absolute inset-x-0 bottom-0 h-[0.125rem] origin-left scale-x-0 bg-gold transition-opacity duration-500 ${scrolled && !open ? 'opacity-100' : 'opacity-0'}`} />

        {/* Mobile menu has its own close button, so closing never depends on where the header sits. */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={data.menuDialogLabel}
          className={`fixed inset-0 z-10 flex h-svh flex-col overflow-y-auto overscroll-contain bg-navy-deep text-white transition-[opacity,visibility] duration-500 lg:hidden ${
            open ? 'visible opacity-100' : 'invisible opacity-0'
          }`}
        >
          <div className={`${ui.container} flex h-[4.75rem] shrink-0 items-center justify-between gap-6 border-b border-white/10`}>
            <Link href={data.logoUrl} aria-label={data.logoLabel} onClick={() => setOpen(false)}>
              <Image src={data.menuLogo} alt={data.logoAlt} width={data.logoWidth} height={data.logoHeight} quality={90} sizes="160px" className="h-auto w-[9.375rem] sm:w-[10rem]" />
            </Link>
            <button
              type="button"
              aria-label={data.closeMenuLabel}
              onClick={() => setOpen(false)}
              className="grid size-12 place-items-center border border-white/25 text-white transition-colors hover:border-gold hover:bg-gold"
            >
              <Icon name={data.closeMenuIcon} className="size-6" strokeWidth={1.8} />
            </button>
          </div>

          <nav aria-label={data.mobileMenuLabel} className={`${ui.container} flex flex-1 flex-col pb-6 pt-4`}>
            <ul className="flex flex-col">
              {nav.map((item, i) => {
                const active = isActive(pathname, item.url);
                return (
                  <li
                    key={item.id}
                    className={`border-b border-white/10 transition-[opacity,transform] duration-700 ease-smooth ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                    style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
                  >
                    <Link
                      href={item.url}
                      onClick={() => setOpen(false)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-between py-[clamp(0.625rem,2svh,1rem)] text-[0.8125rem] font-bold uppercase tracking-[0.14em] transition-colors hover:text-gold-light sm:text-[0.875rem] ${active ? 'text-gold-light' : 'text-white'}`}
                    >
                      {item.label}
                      <span aria-hidden="true" className={`h-px w-6 bg-gold transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} />
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link href={data.buttonUrl} onClick={() => setOpen(false)} className={`${ui.btnGold} mt-6 w-full sm:w-auto sm:self-start`}>
              {data.buttonText}
              <Icon name={data.buttonIcon} className="size-4" strokeWidth={2} />
            </Link>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-x-6 gap-y-4 pt-6 text-[0.875rem] text-white/70">
              <div className="space-y-1">
                <a href={data.phoneUrl} className="block transition-colors hover:text-gold-light">
                  {data.phone}
                </a>
                <a href={data.emailUrl} className="block transition-colors hover:text-gold-light">
                  {data.email}
                </a>
              </div>
              <ul className="flex flex-wrap gap-2">
                {data.socialLinks.map((social) => (
                  <li key={social.id}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid size-10 place-items-center border border-white/15 text-white transition-colors hover:border-gold hover:bg-gold"
                    >
                      <Icon name={social.icon} className="size-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
