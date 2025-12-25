import { Button } from "../../ui/button";

const MarriageSection = () => {
    return (
        <section className="py-20 bg-light-rose relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent mix-blend-hard-light opacity-15 blur-lg" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="w-full lg:w-1/2">
                        <img
                            src="/images/c287cde4983cda7c6ab9d454165e6264aed765df.png"
                            alt="Wedding couple"
                            className="w-full h-[400px] md:h-[493px] object-cover rounded-lg shadow-xl"
                            loading="lazy"
                        />
                    </div>

                    <div className="w-full lg:w-1/2">
                        <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6 leading-tight">
                            Explore More About Our Marriage Platform
                        </h2>
                        <blockquote className="text-lg md:text-xl text-foreground leading-relaxed mb-8 italic">
                            "I love you without knowing how, or when, or from where. I love you simply,
                            without problems or pride: I love you in this way because I do not know any
                            other way of loving but this, in which there is no I or you, so intimate that
                            your hand upon my chest is my hand, so intimate then when I fall asleep your
                            eyes close."
                        </blockquote>
                        <a href="#" target="_blank" rel="noopener noreferrer">
                            <Button className="bg-pink/50 hover:bg-pink/70 text-primary rounded-2xl px-10 py-6 text-2xl font-bold">
                                Explore
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MarriageSection;
