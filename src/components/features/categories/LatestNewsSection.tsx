import { useState, useEffect, useCallback } from 'react';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { latestNews } from './data';

const LatestNewsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const { ref, isVisible } = useScrollAnimation();

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % latestNews.length);
    }, []);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + latestNews.length) % latestNews.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 4000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    const featuredNews = latestNews[currentSlide];
    const sideNews = latestNews.filter((_, i) => i !== currentSlide).slice(0, 2);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div ref={ref} className={`scroll-fade-up ${isVisible ? 'visible' : ''}`}>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            <span className="text-foreground">Vision Of </span>
                            <span className="gradient-text">Latest news</span>
                        </h2>
                        <p className="text-foreground/70">
                            Top headlines and in-depth reporting across the world
                        </p>
                    </div>

                    <div
                        className="grid lg:grid-cols-3 gap-6"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {/* Featured News */}
                        <div className="lg:col-span-2 glass-card rounded-[24px] overflow-hidden hover-lift group glow-border">
                            <div className="relative h-[350px] overflow-hidden">
                                <img
                                    src={featuredNews.image}
                                    alt={featuredNews.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                    <div
                                        className="h-full bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300"
                                        style={{
                                            width: isPaused ? `${(currentSlide / latestNews.length) * 100 + 25}%` : '100%',
                                            animation: isPaused ? 'none' : 'progress 4s linear infinite'
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-pink-500 text-sm font-medium mb-2 block">Featured Story</span>
                                <h3 className="text-2xl font-bold mb-3">{featuredNews.title}</h3>
                                <p className="text-foreground/70">{featuredNews.description}</p>
                            </div>
                        </div>

                        {/* Side News */}
                        <div className="space-y-4">
                            {sideNews.map((news, idx) => (
                                <div
                                    key={news.id}
                                    className="glass-card rounded-[20px] overflow-hidden flex hover-lift group cursor-pointer relative"
                                    style={{ animationDelay: `${idx * 100}ms` }}
                                >
                                    <div className="w-28 h-28 flex-shrink-0 overflow-hidden">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    </div>
                                    <div className="p-4 flex flex-col justify-center">
                                        <span className="text-xs text-pink-500 font-medium mb-1">Breaking News</span>
                                        <h4 className="text-sm font-bold mb-1">{news.title}</h4>
                                        <p className="text-xs text-foreground/60 line-clamp-2">{news.description}</p>
                                    </div>
                                    <div className="absolute inset-0 bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        <button
                            onClick={prevSlide}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Previous slide"
                        >
                            <FaArrowLeft className="text-sm" />
                        </button>
                        <div className="flex gap-2">
                            {latestNews.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentSlide(idx)}
                                    className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide
                                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-8'
                                            : 'bg-white/30 hover:bg-white/50 w-2.5'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={nextSlide}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
                            aria-label="Next slide"
                        >
                            <FaArrowRight className="text-sm" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LatestNewsSection;
