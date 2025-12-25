import { categories } from './data';

interface FilterTabsProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const FilterTabs = ({ activeCategory, onCategoryChange }: FilterTabsProps) => {
    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat, index) => (
                <button
                    key={cat.id}
                    onClick={() => onCategoryChange(cat.id)}
                    className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group stagger-${(index % 6) + 1} ${activeCategory === cat.id
                            ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
                            : 'bg-white/10 hover:bg-white/20 text-foreground border border-white/20 hover:border-pink-500/50'
                        }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                    aria-pressed={activeCategory === cat.id}
                >
                    <span className="relative z-10">{cat.name}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${activeCategory === cat.id ? 'bg-white/20' : 'bg-white/10'
                        }`}>
                        {cat.count}
                    </span>
                    <span className="absolute inset-0 bg-white/20 scale-0 group-active:scale-100 rounded-full transition-transform duration-300" />
                </button>
            ))}
        </div>
    );
};

export default FilterTabs;
