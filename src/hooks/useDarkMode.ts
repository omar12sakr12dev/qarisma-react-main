import { useState, useEffect } from 'react';

export const useDarkMode = () => {
    const [isDark, setIsDark] = useState(() => {
        // Check localStorage first
        const saved = localStorage.getItem('darkMode');
        if (saved !== null) {
            return JSON.parse(saved);
        }
        // Check system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(isDark));
    }, [isDark]);

    const toggle = () => setIsDark((prev: boolean) => !prev);

    return { isDark, toggle, setIsDark };
};

export default useDarkMode;
