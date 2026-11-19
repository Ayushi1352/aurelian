'use client';

import { Fragment, useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Opens every page from the very top, so the navbar and the full banner show.
 * Next.js scrolls the new page's content to the top of the window on navigation,
 * which leaves it hidden under the sticky navbar and cuts the banner. This runs
 * after that and moves the window back to the real top instead.
 *
 * A link to the page that is already open (e.g. another practice area while on
 * /practice-areas/practice-details) would do nothing, so the page is opened again:
 * back to the top and rendered fresh, so its opening animations play once more.
 */
export const ScrollToTop = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    // Also stop the browser from restoring an old position on reload / back.
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

    // Runs before the link's own handler (window, capture phase), so Next.js
    // skips its navigation; the link's onClick (closing menus) still runs.
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.('a[href]');
      if (!(link instanceof HTMLAnchorElement) || link.target === '_blank' || link.hasAttribute('download')) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || url.hash) return;
      e.preventDefault();
      setReplay((n) => n + 1);
    };
    window.addEventListener('click', onClick, true);
    return () => window.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, replay]);

  return <Fragment key={replay}>{children}</Fragment>;
};
