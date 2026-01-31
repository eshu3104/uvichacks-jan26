import React from 'react';
import { MapPin, Home } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
}

interface Pickup {
  id: string;
  donorName: string;
  address: string;
  coordinates: Location;
}

interface RouteMapProps {
  selectedPickups: Pickup[];
  shelterLocation: {
    name: string;
    address: string;
    coordinates: Location;
  };
}

export function RouteMap({ selectedPickups, shelterLocation }: RouteMapProps) {
  return (
    <div className="bg-card rounded-[14px] border border-border shadow-sm overflow-hidden">
      {/* Map Container */}
      <div className="relative h-[500px] bg-gradient-to-br from-muted/30 via-background to-muted/20">
        {/* Map Placeholder with Visual Route */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full p-8">
            {/* Grid Pattern Background */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                backgroundSize: '40px 40px',
              }}
            />

            {/* Route Visualization */}
            {selectedPickups.length > 0 && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {/* Draw route lines */}
                {selectedPickups.map((pickup, index) => {
                  const nextStop = index < selectedPickups.length - 1 
                    ? selectedPickups[index + 1] 
                    : shelterLocation;
                  
                  // Convert coordinates to percentage positions for SVG
                  const x1 = 20 + (index * 15);
                  const y1 = 30 + (Math.sin(index) * 20);
                  const x2 = index < selectedPickups.length - 1 
                    ? 20 + ((index + 1) * 15)
                    : 80;
                  const y2 = index < selectedPickups.length - 1
                    ? 30 + (Math.sin(index + 1) * 20)
                    : 70;

                  return (
                    <line
                      key={`line-${pickup.id}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#81B29A"
                      strokeWidth="3"
                      strokeDasharray="8,4"
                      opacity="0.6"
                    />
                  );
                })}
              </svg>
            )}

            {/* Pickup Pins */}
            {selectedPickups.map((pickup, index) => {
              const xPos = 20 + (index * 15);
              const yPos = 30 + (Math.sin(index) * 20);

              return (
                <div
                  key={pickup.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${xPos}%`, top: `${yPos}%` }}
                >
                  {/* Pin */}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary shadow-lg flex items-center justify-center border-2 border-card">
                      <span className="text-primary-foreground font-bold text-sm">
                        {index + 1}
                      </span>
                    </div>
                    {/* Label */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                      <div className="bg-card px-3 py-1.5 rounded-lg shadow-sm border border-border text-xs font-medium">
                        {pickup.donorName}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Shelter Pin (Destination) */}
            {selectedPickups.length > 0 && (
              <div
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: '80%', top: '70%' }}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-secondary shadow-lg flex items-center justify-center border-2 border-card">
                    <Home className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <div className="bg-secondary/10 px-3 py-1.5 rounded-lg shadow-sm border border-secondary text-xs font-medium text-secondary">
                      {shelterLocation.name}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {selectedPickups.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-2">No pickups selected</p>
                  <p className="text-sm text-muted-foreground">
                    Select pickups from the list to see the route
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-border">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                1
              </div>
              <span className="text-muted-foreground">Pickup stop</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                <Home className="w-4 h-4 text-secondary-foreground" />
              </div>
              <span className="text-muted-foreground">Your shelter</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-0.5 bg-secondary" style={{ strokeDasharray: '4,2' }} />
              <span className="text-muted-foreground ml-2">Route</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
