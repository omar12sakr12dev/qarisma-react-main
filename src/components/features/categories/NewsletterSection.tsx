import { useState } from 'react';

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setEmail('');
            setTimeout(() => setSubscribed(false), 3000);
        }
    };

    return (
        <section className="py-10 px-4 border-t border-white/10">
            <div className="container mx-auto max-w-4xl">
                <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-foreground/70 font-medium">
                        📧 stay informed. learn more
                    </p>
                    <div className="flex gap-3">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-sm focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 min-w-[250px] transition-all"
                            required
                            aria-label="Email address"
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm font-bold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg shadow-pink-500/20"
                        >
                            {subscribed ? '✓ Subscribed!' : 'Subscribe'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;
