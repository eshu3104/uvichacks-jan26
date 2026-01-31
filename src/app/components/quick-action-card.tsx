import React from 'react';
import { LucideIcon } from 'lucide-react';

interface QuickActionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBg?: string;
  iconColor?: string;
  onClick?: () => void;
}

export function QuickActionCard({ 
  icon: Icon, 
  title, 
  description, 
  iconBg = 'bg-primary/10',
  iconColor = 'text-primary',
  onClick 
}: QuickActionCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-card rounded-[14px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left w-full border border-border/50"
    >
      <div className={`w-14 h-14 rounded-xl ${iconBg} flex items-center justify-center mb-4`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className="text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </button>
  );
}
