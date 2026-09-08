import { cn } from '@/lib/utils';

export type BadgeVariant =
  'default' | 'cyan' | 'purple' | 'red' | 'green' | 'orange';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: 'border-white/20 text-text-secondary',
  cyan: 'border-rainbow-cyan/40 text-rainbow-cyan bg-rainbow-cyan/5',
  purple: 'border-rainbow-purple/40 text-rainbow-purple bg-rainbow-purple/5',
  red: 'border-rainbow-red/40 text-rainbow-red bg-rainbow-red/5',
  green: 'border-rainbow-green/40 text-rainbow-green bg-rainbow-green/5',
  orange: 'border-rainbow-orange/40 text-rainbow-orange bg-rainbow-orange/5',
};

export function Badge({
  variant = 'default',
  className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-xs uppercase tracking-widest',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
