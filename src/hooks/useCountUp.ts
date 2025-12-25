import { useEffect, useState, useRef } from 'react';

interface UseCountUpOptions {
    start?: number;
    end: number;
    duration?: number;
    delay?: number;
    separator?: string;
}

export const useCountUp = (options: UseCountUpOptions) => {
    const { start = 0, end, duration = 2000, delay = 0, separator = ',' } = options;
    const [count, setCount] = useState(start);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [hasStarted]);

    useEffect(() => {
        if (!hasStarted) return;

        const timeout = setTimeout(() => {
            const startTime = Date.now();
            const endTime = startTime + duration;

            const animate = () => {
                const now = Date.now();
                const progress = Math.min((now - startTime) / duration, 1);

                // Easing function for smooth animation
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                const currentValue = Math.floor(start + (end - start) * easeOutQuart);

                setCount(currentValue);

                if (now < endTime) {
                    requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timeout);
    }, [hasStarted, start, end, duration, delay]);

    const formatNumber = (num: number): string => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    };

    return { ref, count: formatNumber(count), rawCount: count };
};

export default useCountUp;
