import { useState, useEffect } from 'react';

const HeroSection = () => {
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative py-24 overflow-hidden">
            <div
                className="absolute inset-0 bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 dark:from-purple-900/40 dark:via-pink-500/30 dark:to-blue-500/20 transition-colors duration-500"
                style={{ transform: `translateY(${scrollY * 0.3}px)` }}
            />
            <div
                className="absolute inset-0 opacity-20 dark:opacity-20 opacity-5 mix-blend-overlay"
                style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1557683316-973673baf926?w=1920)',
                    backgroundSize: 'cover',
                    transform: `translateY(${scrollY * 0.5}px)`
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-reveal">
                        <span className="text-foreground">Vision Of </span>
                        <span className="gradient-text">Luxury, Personality</span>
                        <br />
                        <span className="gradient-text">& Power</span>
                        <span className="text-foreground"> Create Us</span>
                    </h1>
                    <div className="w-40 h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mx-auto rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
