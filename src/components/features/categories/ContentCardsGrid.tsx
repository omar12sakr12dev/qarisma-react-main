import Tilt from 'react-parallax-tilt';
import { contentCards } from './data';

interface ContentCardsProps {
    activeCategory: string;
    searchQuery: string;
    isLoading: boolean;
}

const SkeletonCard = ({ tall = false }: { tall?: boolean }) => (
    <div
        className={`bg-white/10 rounded-[20px] animate-pulse ${tall ? 'row-span-2' : ''}`}
        style={{ minHeight: tall ? '300px' : '140px' }}
    />
);

const ContentCardsGrid = ({ activeCategory, searchQuery, isLoading }: ContentCardsProps) => {
    const filteredCards = contentCards
        .filter(card => activeCategory === 'all' || card.category === activeCategory)
        .filter(card => card.title.toLowerCase().includes(searchQuery.toLowerCase()));

    if (isLoading) {
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
                {[...Array(8)].map((_, i) => (
                    <SkeletonCard key={i} tall={i === 0 || i === 3} />
                ))}
            </div>
        );
    }

    if (filteredCards.length === 0) {
        return (
            <div className="text-center py-12 glass-card rounded-[24px]">
                <p className="text-foreground/70 text-lg">No items found</p>
                <p className="text-foreground/50 text-sm mt-2">Try a different category or search term</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px]">
            {filteredCards.map((card, index) => {
                const isTall = index === 0 || index === 3 || index === 7;
                return (
                    <Tilt
                        key={card.id}
                        tiltMaxAngleX={5}
                        tiltMaxAngleY={5}
                        scale={1.02}
                        transitionSpeed={2000}
                        className={`relative rounded-[20px] overflow-hidden cursor-pointer group scroll-fade-up ${isTall ? 'row-span-2' : ''}`}
                        style={{
                            animationDelay: `${index * 80}ms`,
                            opacity: 0,
                            animation: `fadeSlideUp 0.6s ease forwards ${index * 80}ms`
                        }}
                    >
                        <img
                            src={card.image}
                            alt={card.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/40 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <h3 className="text-white font-bold text-sm">{card.title}</h3>
                            <span className="text-white/70 text-xs capitalize">{card.category}</span>
                        </div>
                        <div className="absolute inset-0 rounded-[20px] border-2 border-transparent group-hover:border-white/30 transition-colors duration-300" />
                    </Tilt>
                );
            })}
        </div>
    );
};

export default ContentCardsGrid;
