import { Link } from 'react-router-dom';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import { footballMatches } from './data';

const FootballSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-20 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 transition-colors duration-500" />
            <div
                className="absolute inset-0 opacity-10 dark:opacity-5 mix-blend-multiply dark:mix-blend-normal"
                style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                    color: 'rgba(16, 185, 129, 0.3)'
                }}
            />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div ref={ref} className={`scroll-fade-up ${isVisible ? 'visible' : ''}`}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4">
                            <span className="text-foreground">World of </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Football</span>
                        </h2>
                        <p className="text-foreground/70 max-w-2xl mx-auto">
                            Live scores, match highlights, and exclusive analysis from the world's biggest leagues
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Featured Match Card */}
                        <div className="lg:col-span-2 glass-card rounded-[32px] overflow-hidden relative group hover-lift border border-green-500/20">
                            <div className="absolute inset-0">
                                <img
                                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80"
                                    alt="Stadium"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                            </div>
                            <div className="relative p-8 h-full flex flex-col justify-end min-h-[300px]">
                                <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full w-fit mb-3 animate-pulse">
                                    LIVE NOW
                                </div>
                                <h3 className="text-3xl font-bold text-white mb-2">Champions League Final</h3>
                                <p className="text-gray-300 mb-6">Experience the thrill of the biggest match of the season with exclusive coverage.</p>
                                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 w-fit">
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-white">2</span>
                                        <span className="text-xs text-gray-300">RMA</span>
                                    </div>
                                    <div className="text-xl font-bold text-green-400">VS</div>
                                    <div className="text-center">
                                        <span className="block text-2xl font-bold text-white">1</span>
                                        <span className="text-xs text-gray-300">MCY</span>
                                    </div>
                                    <div className="h-8 w-[1px] bg-white/20 mx-2" />
                                    <div className="text-sm text-green-400 font-bold animate-pulse">78'</div>
                                </div>
                            </div>
                        </div>

                        {/* Upcoming Matches */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-lg">Upcoming Matches</h3>
                                <Link to="/categories/football" className="text-sm text-green-500 hover:text-green-400">View All</Link>
                            </div>
                            {footballMatches.map((match) => (
                                <div key={match.id} className="glass-card rounded-[20px] p-5 hover-lift border-l-4 border-l-green-500 cursor-pointer group">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-xs font-bold text-foreground/50">{match.league}</span>
                                        <span className="text-xs font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded-full">{match.date}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div className="font-bold text-lg group-hover:text-green-500 transition-colors">{match.team1}</div>
                                        <div className="text-sm font-bold text-foreground/40 bg-foreground/5 px-2 py-1 rounded">{match.time}</div>
                                        <div className="font-bold text-lg group-hover:text-green-500 transition-colors">{match.team2}</div>
                                    </div>
                                </div>
                            ))}
                            <div className="glass-card rounded-[20px] p-6 bg-gradient-to-br from-green-600 to-emerald-700 text-white text-center hover-lift cursor-pointer">
                                <h4 className="font-bold text-xl mb-2">Fantasy League</h4>
                                <p className="text-sm text-green-100 mb-4">Join now and win prizes!</p>
                                <button className="bg-white text-green-700 px-6 py-2 rounded-full font-bold text-sm hover:bg-green-50">
                                    Play Now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FootballSection;
