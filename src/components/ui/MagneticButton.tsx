import { useRef } from 'react';
import type { ReactNode, MouseEvent } from 'react';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

const MagneticButton = ({
    children,
    className = '',
    strength = 0.3,
    onClick
}: MagneticButtonProps) => {
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
        const button = buttonRef.current;
        if (!button) return;

        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;

        button.style.setProperty('--magnetic-x', `${deltaX}px`);
        button.style.setProperty('--magnetic-y', `${deltaY}px`);
    };

    const handleMouseLeave = () => {
        const button = buttonRef.current;
        if (!button) return;

        button.style.setProperty('--magnetic-x', '0px');
        button.style.setProperty('--magnetic-y', '0px');
    };

    return (
        <button
            ref={buttonRef}
            className={`magnetic-btn ${className}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default MagneticButton;
