import { Button } from "../../ui/button";

const HeroSection = () => {
    return (
        <section className="relative min-h-screen overflow-hidden">
            {/* Background Image with Parallax */}
            <div
                className="absolute inset-0 parallax-bg"
                style={{
                    backgroundImage: `url('/images/freepik__the-style-is-textured-with-a-handdrawn-look-visibl__44675.png')`,
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/30 to-white/50" />

            <div className="relative z-10 container mx-auto px-4 pt-32 pb-20">
                <div className="max-w-4xl mx-auto">
                    <div className="glass-card rounded-3xl p-8 md:p-16 text-center border-2 border-pink/30 glow-border">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-reveal">
                            <span className="shimmer-text">Welcome to Qarisma</span>
                        </h1>
                        <p className="text-lg md:text-xl text-foreground/90 mb-4 leading-relaxed max-w-2xl mx-auto text-reveal text-reveal-delay-2">
                            Your trusted source for news, stories, and insights.
                            Stay informed with the latest updates from around the world.
                        </p>
                        <p className="text-lg md:text-xl text-foreground/90 mb-8 leading-relaxed max-w-2xl mx-auto text-reveal text-reveal-delay-3">
                            Join our community of readers and be part of something meaningful.
                        </p>
                        <Button
                            size="lg"
                            className="btn-premium ripple bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-12 py-6 text-xl font-medium text-reveal text-reveal-delay-4"
                        >
                            Learn more
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
