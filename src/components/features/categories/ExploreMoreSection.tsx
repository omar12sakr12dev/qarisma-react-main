import { useState } from 'react';
import { useScrollAnimation } from '../../../hooks/useScrollAnimation';
import SearchBar from './SearchBar';
import FilterTabs from './FilterTabs';
import ContentCardsGrid from './ContentCardsGrid';

const ExploreMoreSection = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { ref, isVisible } = useScrollAnimation();

    const handleCategoryChange = (category: string) => {
        setIsLoading(true);
        setActiveCategory(category);
        setTimeout(() => setIsLoading(false), 300);
    };

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto max-w-6xl">
                <div ref={ref} className={`scroll-fade-up ${isVisible ? 'visible' : ''}`}>
                    <div className="mb-8">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2">
                            <span className="shimmer-text">Explore more</span>
                        </h2>
                        <p className="text-foreground/70">
                            Top headlines and in-depth stories across the world
                        </p>
                    </div>

                    <SearchBar value={searchQuery} onChange={setSearchQuery} />
                    <FilterTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />
                    <ContentCardsGrid activeCategory={activeCategory} searchQuery={searchQuery} isLoading={isLoading} />

                    <div className="flex justify-center gap-2 mt-8">
                        {[1, 2, 3, 4, 5].map((dot) => (
                            <button
                                key={dot}
                                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 hover:scale-125 ${dot === 1 ? 'bg-gradient-to-r from-pink-500 to-purple-600 w-8' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                aria-label={`Page ${dot}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ExploreMoreSection;
