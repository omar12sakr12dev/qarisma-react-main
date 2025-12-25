import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const WelcomeCTASection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 px-4">
            <div className="container mx-auto max-w-4xl">
                <div
                    ref={ref}
                    className={`scroll-scale ${isVisible ? 'visible' : ''} glass-card rounded-[32px] p-10 md:p-14 text-center relative overflow-hidden glow-border`}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/10 to-blue-500/20 animate-pulse" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            <span className="text-foreground">welcome to </span>
                            <span className="shimmer-text">Quarisma</span>
                        </h2>
                        <p className="text-foreground/80 mb-4 max-w-2xl mx-auto text-lg">
                            Don't worry, just enter your email address below, and we'll send you a link to reset your password.
                        </p>
                        <p className="text-foreground/60 mb-8 max-w-2xl mx-auto">
                            Join thousands of readers and be part of something meaningful.
                        </p>
                        <Link to="/register">
                            <button className="btn-premium ripple bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 hover:from-pink-600 hover:via-purple-700 hover:to-blue-600 text-white rounded-full px-12 py-5 font-bold text-lg shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105">
                                Sign Free
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WelcomeCTASection;
