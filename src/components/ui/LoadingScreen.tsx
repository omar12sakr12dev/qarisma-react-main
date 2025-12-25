import { useState, useEffect } from 'react';

interface LoadingScreenProps {
    onComplete?: () => void;
    duration?: number;
}

const LoadingScreen = ({ onComplete, duration = 2500 }: LoadingScreenProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onComplete]);

    if (!isVisible) return null;

    return (
        <div className="loading-screen">
            {/* Logo */}
            <div className="loading-logo">
                <img
                    src="/images/b69901b903c79f368b7fa752a86e153054ec6c4f.png"
                    alt="Qarisma Logo"
                    className="w-24 h-24 rounded-full"
                />
            </div>

            {/* Brand Name */}
            <h1 className="text-4xl font-bold text-white mt-6 shimmer-text">
                Qarisma
            </h1>

            {/* Loading Bar */}
            <div className="loading-bar">
                <div className="loading-bar-fill" />
            </div>

            {/* Loading Text */}
            <p className="text-white/60 mt-4 text-sm">Loading...</p>
        </div>
    );
};

export default LoadingScreen;
