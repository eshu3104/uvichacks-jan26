import React from 'react';
import { Home, Package, Archive, ChefHat, Map } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: string;
  onNavigate: (view: 'dashboard' | 'donations' | 'inventory' | 'recipes' | 'routes') => void;
}

export function MobileBottomNav({ activeView, onNavigate }: MobileBottomNavProps) {
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'donations', label: 'Donations', icon: Package },
    { id: 'inventory', label: 'Inventory', icon: Archive },
    { id: 'recipes', label: 'Recipes', icon: ChefHat },
    { id: 'routes', label: 'Routes', icon: Map },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 lg:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id as any)}
              className={`flex flex-col items-center justify-center min-w-[44px] min-h-[44px] px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'text-primary bg-primary/10'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
