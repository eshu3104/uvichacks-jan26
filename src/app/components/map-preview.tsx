import React from 'react';
import { MapPin } from 'lucide-react';

export function MapPreview() {
  const shelters = [
    { id: 1, name: 'Hope Kitchen', top: '30%', left: '35%' },
    { id: 2, name: 'Community Center', top: '50%', left: '60%' },
    { id: 3, name: 'Downtown Shelter', top: '65%', left: '40%' },
    { id: 4, name: 'North Side Mission', top: '25%', left: '70%' },
    { id: 5, name: 'Westside Food Bank', top: '70%', left: '25%' },
  ];

  return (
    <div className="bg-card rounded-[14px] overflow-hidden shadow-sm border border-border/50">
      {/* Map container */}
      <div className="relative h-[300px] bg-gradient-to-br from-secondary/5 via-background to-primary/5">
        {/* Grid overlay for map feel */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(129, 178, 154, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129, 178, 154, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>

        {/* Shelter pins */}
        {shelters.map((shelter) => (
          <div
            key={shelter.id}
            className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer group"
            style={{ top: shelter.top, left: shelter.left }}
          >
            <div className="relative">
              <MapPin className="w-8 h-8 text-primary fill-primary drop-shadow-md transition-transform group-hover:scale-110" />
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <p className="text-xs font-medium">{shelter.name}</p>
              </div>
            </div>
          </div>
        ))}

        {/* Your location (center) */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-secondary rounded-full border-4 border-white shadow-lg"></div>
          <div className="absolute inset-0 w-4 h-4 bg-secondary rounded-full animate-ping opacity-50"></div>
        </div>
      </div>

      {/* Caption */}
      <div className="p-4 bg-card">
        <p className="text-sm text-muted-foreground mb-2">
          Shelters actively seeking donations in your area
        </p>
        <a href="#map" className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors">
          View full map →
        </a>
      </div>
    </div>
  );
}
