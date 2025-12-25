import { useMemo } from 'react';

interface ParticleBackgroundProps {
    count?: number;
}

const ParticleBackground = ({ count = 30 }: ParticleBackgroundProps) => {
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 5,
            duration: Math.random() * 3 + 2,
        }));
    }, [count]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}s`,
                        animationDuration: `${particle.duration}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default ParticleBackground;
