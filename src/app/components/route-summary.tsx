import React from 'react';
import { MapPin, Clock, Navigation, ExternalLink, Printer } from 'lucide-react';
import { Button } from '@/app/components/button';

interface RouteSummaryProps {
  stats: {
    stops: number;
    distance: string;
    time: number;
  };
  onOptimize: () => void;
  onOpenInGoogleMaps: () => void;
  onPrint: () => void;
}

export function RouteSummary({ stats, onOptimize, onOpenInGoogleMaps, onPrint }: RouteSummaryProps) {
  return (
    <div className="bg-card rounded-[14px] border border-border shadow-sm p-6">
      <h3 className="text-lg font-medium mb-4">Route Summary</h3>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Total Stops</span>
          </div>
          <p className="text-2xl font-medium" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            {stats.stops}
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Navigation className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Estimated Distance</span>
          </div>
          <p className="text-2xl font-medium" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            {stats.distance} mi
          </p>
        </div>

        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">Estimated Time</span>
          </div>
          <p className="text-2xl font-medium" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
            {stats.time} min
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="primary"
          size="lg"
          onClick={onOptimize}
          className="flex-1"
          disabled={stats.stops === 0}
        >
          <Navigation className="w-5 h-5 mr-2" />
          Optimize Route
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onOpenInGoogleMaps}
          disabled={stats.stops === 0}
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Open in Google Maps
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={onPrint}
          disabled={stats.stops === 0}
        >
          <Printer className="w-5 h-5 mr-2" />
          Print
        </Button>
      </div>

      {/* Helper Text */}
      {stats.stops === 0 && (
        <p className="text-sm text-muted-foreground mt-4 text-center">
          Select pickups from the list to calculate your route
        </p>
      )}

      {stats.stops > 0 && (
        <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
          <p className="text-sm text-foreground/80">
            💡 <strong>Tip:</strong> Click "Optimize Route" to automatically reorder stops for the most efficient path. 
            You can also manually reorder by changing your selections.
          </p>
        </div>
      )}
    </div>
  );
}
