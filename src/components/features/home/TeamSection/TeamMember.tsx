import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

interface TeamMemberProps {
    image: string;
    name: string;
    role: string;
    variant?: "primary" | "white";
}

const TeamMember = ({ image, name, role, variant = "white" }: TeamMemberProps) => {
    return (
        <Link to="/contact" className="block group">
            <div
                className={`rounded-[33px] overflow-hidden shadow-lg hover-lift relative ${variant === "primary" ? "bg-secondary" : "bg-card"
                    }`}
                style={{ filter: 'drop-shadow(12px -2px 4px rgba(0, 0, 0, 0.25))' }}
            >
                {/* Blue overlay on hover */}
                <div className="absolute inset-0 bg-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 rounded-[33px] pointer-events-none" />

                <div className="overflow-hidden">
                    <img
                        src={image}
                        alt={name}
                        className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                    />
                </div>
                <div className={`px-4 py-3 relative z-20 ${variant === "primary" ? "bg-secondary/80" : "bg-card"}`}>
                    <p className={`font-bold text-lg ${variant === "primary" ? "text-primary-foreground" : "text-foreground"}`}>
                        {role}
                    </p>
                    <p className={`text-sm ${variant === "primary" ? "text-primary-foreground/90" : "text-muted-foreground"}`}>
                        {name}
                    </p>
                </div>
                <div className="px-4 pb-4 flex justify-end relative z-20">
                    <span
                        className="flex items-center gap-1 text-primary font-montserrat font-bold text-sm underline hover:opacity-80 transition-opacity"
                    >
                        Learn more
                        <FaArrowRight className="w-4 h-4" />
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default TeamMember;
