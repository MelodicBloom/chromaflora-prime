import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  children: React.ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-rainbow-cyan text-bg-primary font-semibold hover:shadow-glow-cyan hover:-translate-y-0.5',
  outline:
    'border border-white/20 text-text-primary hover:border-white/40 hover:bg-white/5',
  ghost: 'text-text-secondary hover:text-text-primary hover:bg-white/5',
  danger:
    'border border-rainbow-red/40 text-rainbow-red hover:bg-rainbow-red/10',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-sm rounded-full',
  md: 'px-8 py-3 text-base rounded-full',
  lg: 'px-10 py-4 text-lg rounded-full',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'transition-all duration-300',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rainbow-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary',
          'disabled:pointer-events-none disabled:opacity-40',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
