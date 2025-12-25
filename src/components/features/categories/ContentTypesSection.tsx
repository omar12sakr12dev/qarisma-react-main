import { Link } from 'react-router-dom';
import { FaNewspaper, FaChartBar, FaVideo } from 'react-icons/fa';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';

const contentTypes = [
    { id: 'articles', name: 'Articles', icon: FaNewspaper, color: 'from-pink-500 to-rose-600', count: 150 },
    { id: 'reports', name: 'Reports', icon: FaChartBar, color: 'from-blue-500 to-indigo-600', count: 45 },
    { id: 'live', name: 'Live', icon: FaVideo, color: 'from-purple-500 to-violet-600', count: 12 },
];

const ContentTypesSection = () => {
    const { ref, isVisible } = useScrollAnimation();

    return (
        <section className="py-16 px-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />

            <div className="container mx-auto max-w-4xl relative z-10">
                <div ref={ref} className={`scroll-fade-up ${isVisible ? 'visible' : ''}`}>
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            <span className="shimmer-text">Explore more</span>
                        </h2>
                        <p className="text-foreground/70">
                            Top headlines and in-depth stories across the world
                        </p>
                    </div>

                    <div className="flex justify-center gap-8">
                        {contentTypes.map((type, index) => {
                            const Icon = type.icon;
                            return (
                                <Link
                                    key={type.id}
                                    to={`/categories/${type.id}`}
                                    className="glass-card rounded-[24px] p-8 text-center hover-lift group min-w-[140px] relative overflow-hidden"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <div className={`absolute -inset-1 bg-gradient-to-r ${type.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                                    <div className={`w-20 h-20 mx-auto rounded-[20px] bg-gradient-to-r ${type.color} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                                        <Icon className="text-3xl text-white" />
                                    </div>
                                    <span className="font-bold text-lg block mb-1">{type.name}</span>
                                    <span className="text-foreground/50 text-sm">{type.count} items</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContentTypesSection;
