import { useScrollAnimation } from "../../../hooks/useScrollAnimation";

const ExploreSection = () => {
    const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation();
    const { ref: textRef, isVisible: textVisible } = useScrollAnimation();

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <div
                            ref={imageRef}
                            className={`rounded-[43px] overflow-hidden shadow-xl tilt-card float scroll-fade-left ${imageVisible ? 'visible' : ''}`}
                        >
                            <img
                                src="/images/f2512098c998027cacfb67b525683296e3b3835a.png"
                                alt="Team collaboration"
                                className="w-full h-[400px] md:h-[456px] object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    </div>

                    <div
                        ref={textRef}
                        className={`w-full lg:w-1/2 scroll-fade-right ${textVisible ? 'visible' : ''}`}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-glitch">
                            <span className="gradient-text">Explore more</span>
                        </h2>
                        <p className="text-lg md:text-xl text-foreground leading-relaxed">
                            It has one principle and one motto that can be read individually,
                            meaning each word on its own, or as a whole, in a single sentence,
                            whether from right to left or left to right:
                            <span className="font-semibold gradient-text-gold heartbeat inline-block"> (Elegance, Personality, Strength)</span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExploreSection;
