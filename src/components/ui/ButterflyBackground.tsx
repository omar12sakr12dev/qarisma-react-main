import React, { useMemo, useState, useEffect } from 'react';

// Correct path for butterfly image
const butterflyImage = '/images/butterfly.png';

// --- Configuration ---
const MIN_SIZE = 50;
const MAX_SIZE = 100;
const MIN_DURATION = 12;
const MAX_DURATION = 25;

// Determine butterfly count based on device capability
const getOptimalButterflyCount = (): number => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return 5;
    }

    if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return 10;
    }

    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
        if (navigator.hardwareConcurrency <= 4) {
            return 12;
        }
        if (navigator.hardwareConcurrency >= 8) {
            return 40;
        }
    }

    return 25;
};

const ButterflyBackground: React.FC = () => {
    const [butterflyCount, setButterflyCount] = useState(15);

    useEffect(() => {
        setButterflyCount(getOptimalButterflyCount());

        const handleResize = () => {
            setButterflyCount(getOptimalButterflyCount());
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const butterflies = useMemo(() => {
        const items = [];
        for (let i = 0; i < butterflyCount; i++) {
            const startX = Math.random() * 90 + 5;
            const startY = Math.random() * 90 + 5;
            const size = Math.floor(Math.random() * (MAX_SIZE - MIN_SIZE + 1)) + MIN_SIZE;
            const duration = Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION;
            const delay = Math.random() * 5;
            const flapDuration = Math.random() * (0.3 - 0.15) + 0.15;

            items.push(
                <div
                    key={i}
                    className="butterfly-container"
                    style={{
                        left: `${startX}vw`,
                        top: `${startY}vh`,
                        width: `${size}px`,
                        zIndex: Math.floor(Math.random() * 10) + 1,
                        animationDuration: `${duration}s`,
                        animationDelay: `-${delay}s`,
                        opacity: 0.8 + Math.random() * 0.2,
                    }}
                >
                    <img
                        src={butterflyImage}
                        className="butterfly-image"
                        alt=""
                        loading="lazy"
                        style={{
                            animationDuration: `${flapDuration}s`
                        }}
                    />
                </div>
            );
        }
        return items;
    }, [butterflyCount]);

    return (
        <div
            className="butterfly-wrapper"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: 1,
                pointerEvents: 'none',
                overflow: 'hidden',
            }}
        >
            {butterflies}
        </div>
    );
};

export default ButterflyBackground;
