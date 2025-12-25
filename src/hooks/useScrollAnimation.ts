import { useEffect, useRef, useState } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
    const { threshold = 0.1, rootMargin = '0px' } = options;
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Once visible, stop observing
                    observer.unobserve(element);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [threshold, rootMargin]);

    return { ref: elementRef, isVisible };
};

// Hook for multiple elements with stagger effect
export const useScrollAnimationGroup = (itemCount: number, options: UseScrollAnimationOptions = {}) => {
    const { threshold = 0.1, rootMargin = '0px' } = options;
    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(itemCount).fill(false));

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Stagger the visibility of items
                    visibleItems.forEach((_, index) => {
                        setTimeout(() => {
                            setVisibleItems(prev => {
                                const newState = [...prev];
                                newState[index] = true;
                                return newState;
                            });
                        }, index * 100);
                    });
                    observer.unobserve(container);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(container);

        return () => {
            if (container) {
                observer.unobserve(container);
            }
        };
    }, [threshold, rootMargin, visibleItems.length]);

    return { containerRef, visibleItems };
};

export default useScrollAnimation;
