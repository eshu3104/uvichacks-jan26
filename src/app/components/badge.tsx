import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'muted';
  className?: string;
}

export function Badge({ children, variant = 'primary', className = '' }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent-foreground border-accent/20',
    muted: 'bg-muted text-muted-foreground border-border',
  };
  
  return (
    <span 
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
