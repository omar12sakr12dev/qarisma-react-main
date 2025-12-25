import { Link } from "react-router-dom";

interface NewsCardProps {
    image: string;
    title: string;
    description: string;
    featured?: boolean;
}

const NewsCard = ({ image, title, description, featured = false }: NewsCardProps) => {
    return (
        <Link to="/news" className="block group">
            <div
                className={`rounded-[33px] overflow-hidden shadow-lg hover-lift relative ${featured ? 'bg-secondary' : 'bg-card'
                    }`}
                style={{ filter: 'drop-shadow(12px -2px 4px rgba(0, 0, 0, 0.25))' }}
            >
                {/* Blue overlay on hover */}
                <div className="absolute inset-0 bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-[33px] pointer-events-none" />

                <div className="relative overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-56 md:h-64 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 bg-secondary/80 px-4 py-2 z-20">
                        <h3 className="text-white font-bold text-xl md:text-2xl">{title}</h3>
                    </div>
                </div>
                <div className="p-6 relative z-20">
                    <p className="text-foreground text-sm md:text-base leading-relaxed line-clamp-4">
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default NewsCard;
