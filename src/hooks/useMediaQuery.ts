import { useState, useEffect } from 'react';

/**
 * Custom hook that listens to a CSS media query and returns whether it matches.
 * Useful for responsive rendering in React components.
 * 
 * @param query - CSS media query string, e.g., '(max-width: 768px)'
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * const isMobile = useMediaQuery('(max-width: 640px)');
 * const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)');
 * const isDesktop = useMediaQuery('(min-width: 1025px)');
 * const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
 */
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQuery = window.matchMedia(query);

        // Set initial value
        setMatches(mediaQuery.matches);

        // Handler for changes
        const handler = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        // Modern browsers
        mediaQuery.addEventListener('change', handler);

        return () => {
            mediaQuery.removeEventListener('change', handler);
        };
    }, [query]);

    return matches;
}

// Predefined breakpoint hooks for convenience
export function useIsMobile(): boolean {
    return useMediaQuery('(max-width: 639px)');
}

export function useIsTablet(): boolean {
    return useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
}

export function useIsDesktop(): boolean {
    return useMediaQuery('(min-width: 1024px)');
}

export function useIsLargeDesktop(): boolean {
    return useMediaQuery('(min-width: 1280px)');
}

export function usePrefersReducedMotion(): boolean {
    return useMediaQuery('(prefers-reduced-motion: reduce)');
}

export function usePrefersDarkMode(): boolean {
    return useMediaQuery('(prefers-color-scheme: dark)');
}

export function useIsTouchDevice(): boolean {
    return useMediaQuery('(hover: none) and (pointer: coarse)');
}

export default useMediaQuery;
