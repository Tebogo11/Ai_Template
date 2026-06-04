// ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router';

type Props = {
  /** CSS selector of your scroll container if you don't use window scrolling */
  selector?: string; // e.g. ".app-scroll" or "#main"
  smooth?: boolean;
};

export function ScrollToTop({ selector, smooth = false }: Props) {
  const { pathname, hash } = useLocation();
  const navType = useNavigationType(); // "PUSH" | "POP" | "REPLACE"

  useEffect(() => {
    // Let the browser restore scroll on back/forward
    if (navType === 'POP') return;

    // If navigating to an in-page anchor, don't fight it
    if (hash) return;

    // Ensure the new route content has painted
    requestAnimationFrame(() => {
      const target =
        (selector ? (document.querySelector(selector) as HTMLElement | null) : null) ||
        document.scrollingElement ||
        document.documentElement;

      // Some browsers are finicky; use 'auto' for reliability
      target.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });

      // Fallbacks for older engines
      (document.documentElement || document.body).scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [pathname, hash, navType, selector, smooth]);

  // Tell the browser not to auto-restore window scroll between navigations
  useEffect(() => {
    if ('scrollRestoration' in history) {
      const prev = (history as any).scrollRestoration;
      (history as any).scrollRestoration = 'manual';
      return () => ((history as any).scrollRestoration = prev);
    }
  }, []);

  return null;
}
