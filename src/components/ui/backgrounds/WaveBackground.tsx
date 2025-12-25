interface WaveBackgroundProps {
    color?: string;
    opacity?: number;
    position?: 'top' | 'bottom';
}

const WaveBackground = ({
    color = '#8B5CF6',
    opacity = 0.3,
    position = 'bottom'
}: WaveBackgroundProps) => {
    const positionStyles = position === 'top'
        ? { top: 0, transform: 'rotate(180deg)' }
        : { bottom: 0 };

    return (
        <div
            className="absolute left-0 w-full overflow-hidden pointer-events-none"
            style={{
                ...positionStyles,
                height: '150px',
            }}
        >
            <svg
                className="absolute w-[200%] animate-[wave_8s_linear_infinite]"
                style={{ height: '100%' }}
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    fill={color}
                    fillOpacity={opacity}
                    d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </svg>
            <svg
                className="absolute w-[200%] animate-[wave_12s_linear_infinite]"
                style={{ height: '100%', left: '-50%' }}
                viewBox="0 0 1440 320"
                preserveAspectRatio="none"
            >
                <path
                    fill={color}
                    fillOpacity={opacity * 0.5}
                    d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,176C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                />
            </svg>
        </div>
    );
};

export default WaveBackground;
