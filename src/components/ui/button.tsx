import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: 'sm' | 'default' | 'lg';
    variant?: 'default' | 'outline' | 'ghost';
    children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', size = 'default', variant = 'default', children, ...props }, ref) => {
        const sizeClasses = {
            sm: 'px-3 py-1.5 text-sm',
            default: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
        };

        const variantClasses = {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
            ghost: 'hover:bg-accent hover:text-accent-foreground',
        };

        return (
            <button
                ref={ref}
                className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
                {...props}
            >
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
