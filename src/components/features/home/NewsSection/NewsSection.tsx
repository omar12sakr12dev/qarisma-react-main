import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import NewsCard from './NewsCard';

const NewsSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const newsItems = [
        {
            image: "/images/freepik__the-style-is-candid-image-photography-with-natural__76270.png",
            title: "World News",
            description: "It has one principle and one motto that can be read individually, meaning each word on its own, or as a whole."
        },
        {
            image: "/images/freepik__the-style-is-candid-image-photography-with-natural__76270.png",
            title: "Breaking News",
            description: "It has one principle and one motto that can be read individually, meaning each word on its own, or as a whole.",
            featured: true
        },
        {
            image: "/images/freepik__the-style-is-candid-image-photography-with-natural__76270.png",
            title: "Local News",
            description: "It has one principle and one motto that can be read individually, meaning each word on its own, or as a whole."
        },
        {
            image: "/images/freepik__the-style-is-candid-image-photography-with-natural__76270.png",
            title: "Tech News",
            description: "It has one principle and one motto that can be read individually, meaning each word on its own, or as a whole."
        }
    ];

    const totalSlides = Math.ceil(newsItems.length / 3);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused, totalSlides]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    const getVisibleItems = () => {
        const start = currentSlide * 3;
        return newsItems.slice(start, start + 3);
    };

    return (
        <section
            className="py-20 bg-secondary/40"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-4xl md:text-6xl font-bold">
                        <span className="gradient-text-purple">Latest News</span>
                    </h2>
                    <Link
                        to="/news"
                        className="flex items-center gap-2 text-primary font-montserrat font-bold text-lg underline hover:opacity-80 transition-opacity"
                    >
                        See all
                        <FaArrowRight className="w-6 h-6" />
                    </Link>
                </div>

                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-colors"
                        aria-label="Previous slide"
                    >
                        <FaArrowLeft className="w-5 h-5 text-white" />
                    </button>

                    {/* Slides */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
                        {getVisibleItems().map((item, index) => (
                            <NewsCard
                                key={index}
                                image={item.image}
                                title={item.title}
                                description={item.description}
                                featured={item.featured}
                            />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-colors"
                        aria-label="Next slide"
                    >
                        <FaArrowRight className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Dots Indicators */}
                <div className="flex justify-center gap-4 mt-12">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-10 h-10 rounded-full shadow-md transition-all duration-300 ${currentSlide === index
                                    ? 'bg-primary scale-110'
                                    : 'bg-pink opacity-50 hover:opacity-80'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsSection;
