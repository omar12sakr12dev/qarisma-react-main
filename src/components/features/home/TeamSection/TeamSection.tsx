import { useState, useEffect } from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import TeamMember from './TeamMember';

const TeamSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const teamMembers = [
        { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop", name: "Mohamed Boujbel", role: "Manager", variant: "primary" as const },
        { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop", name: "Ahmed Hassan", role: "Editor", variant: "white" as const },
        { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop", name: "Sara Ahmed", role: "Writer", variant: "white" as const },
        { image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=300&fit=crop", name: "Omar Ali", role: "Developer", variant: "white" as const },
        { image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop", name: "Layla Mohamed", role: "Designer", variant: "white" as const },
        { image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=300&fit=crop", name: "Khaled Ibrahim", role: "Reporter", variant: "white" as const }
    ];

    const totalSlides = Math.ceil(teamMembers.length / 3);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        }, 4000);
        return () => clearInterval(interval);
    }, [isPaused, totalSlides]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

    const getVisibleMembers = () => {
        const start = currentSlide * 3;
        return teamMembers.slice(start, start + 3);
    };

    return (
        <section
            className="py-20 bg-secondary/40"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="container mx-auto px-4">
                <h2 className="text-4xl md:text-6xl font-bold text-primary text-center mb-16">
                    Meet our Team
                </h2>

                <div className="relative">
                    {/* Left Arrow */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-colors"
                        aria-label="Previous team members"
                    >
                        <FaArrowLeft className="w-5 h-5 text-white" />
                    </button>

                    {/* Team Members */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-500">
                        {getVisibleMembers().map((member, index) => (
                            <TeamMember key={index} {...member} />
                        ))}
                    </div>

                    {/* Right Arrow */}
                    <button
                        onClick={nextSlide}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-12 h-12 rounded-full bg-secondary flex items-center justify-center shadow-lg hover:bg-secondary/80 transition-colors"
                        aria-label="Next team members"
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
                            aria-label={`Go to team slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
