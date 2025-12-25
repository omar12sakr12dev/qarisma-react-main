import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => (
    <div className="relative max-w-md mx-auto mb-8">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50" />
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search categories..."
            className="w-full pl-12 pr-4 py-3 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 outline-none transition-all text-foreground placeholder:text-foreground/50"
            aria-label="Search categories"
        />
    </div>
);

export default SearchBar;
