import { useState, useEffect, useCallback } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setIsVisible(true);
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsHovering(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setIsHovering(false);
    }, []);

    useEffect(() => {
        // Check if device supports hover (not touch)
        const hasHover = window.matchMedia('(hover: hover)').matches;
        if (!hasHover) return;

        document.addEventListener('mousemove', handleMouseMove);

        // Add hover detection to interactive elements
        const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => setIsVisible(false));
        document.addEventListener('mouseenter', () => setIsVisible(true));

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

    // Don't render on touch devices
    if (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches) {
        return null;
    }

    return (
        <>
            {/* Cursor Dot */}
            <div
                className="cursor-dot"
                style={{
                    left: position.x - 4,
                    top: position.y - 4,
                    opacity: isVisible ? 1 : 0,
                    transform: isHovering ? 'scale(2)' : 'scale(1)',
                }}
            />

            {/* Cursor Ring */}
            <div
                className={`cursor-ring ${isHovering ? 'hover' : ''}`}
                style={{
                    left: position.x - 20,
                    top: position.y - 20,
                    opacity: isVisible ? 1 : 0,
                }}
            />
        </>
    );
};

export default CustomCursor;
