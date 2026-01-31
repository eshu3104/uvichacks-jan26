import React from 'react';

interface StatPillProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  className?: string;
}

export function StatPill({ children, variant = 'primary', className = '' }: StatPillProps) {
  const variants = {
    primary: 'bg-primary/15 text-primary border-primary/20',
    secondary: 'bg-secondary/15 text-secondary border-secondary/20',
    accent: 'bg-accent/15 text-accent-foreground border-accent/20',
  };

  return (
    <div 
      className={`inline-flex items-center px-4 py-2 rounded-full border font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
