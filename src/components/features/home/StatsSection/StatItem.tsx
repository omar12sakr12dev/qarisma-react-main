import { Link } from "react-router-dom";
import { useCountUp } from "../../../../hooks/useCountUp";

interface StatItemProps {
    targetNumber: number;
    label: string;
    size: "small" | "large";
    variant: "pink" | "primary";
}

const StatItem = ({ targetNumber, label, size, variant }: StatItemProps) => {
    const { ref, count } = useCountUp({ end: targetNumber, duration: 2500 });

    const sizeClasses = size === "large"
        ? "w-64 h-64 md:w-80 md:h-80"
        : "w-48 h-48 md:w-56 md:h-56";

    const bgColor = variant === "primary"
        ? "bg-primary"
        : "bg-pink/50";

    const textColor = variant === "primary"
        ? "text-primary-foreground"
        : "text-primary";

    const glowClass = variant === "primary"
        ? "stat-circle-primary"
        : "stat-circle-pink";

    return (
        <Link to="/about">
            <div
                ref={ref}
                className={`${sizeClasses} ${bgColor} ${glowClass} rounded-full flex flex-col items-center justify-center shadow-lg`}
            >
                <span className={`text-3xl md:text-5xl font-bold ${textColor}`}>
                    {count}
                </span>
                <span className={`text-xl md:text-3xl font-bold ${textColor}`}>
                    {label}
                </span>
            </div>
        </Link>
    );
};

export default StatItem;
