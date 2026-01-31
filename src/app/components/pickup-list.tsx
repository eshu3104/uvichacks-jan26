import React from 'react';
import { MapPin, Clock, Store, User } from 'lucide-react';

interface Pickup {
  id: string;
  donorName: string;
  donorType: 'restaurant' | 'grocery' | 'individual';
  itemSummary: string;
  address: string;
  pickupWindow: string;
  selected: boolean;
}

interface PickupListProps {
  pickups: Pickup[];
  onTogglePickup: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
}

export function PickupList({ pickups, onTogglePickup, onSelectAll, onClearAll }: PickupListProps) {
  const selectedCount = pickups.filter(p => p.selected).length;

  const getDonorIcon = (type: string) => {
    switch (type) {
      case 'restaurant':
      case 'grocery':
        return <Store className="w-4 h-4" />;
      case 'individual':
        return <User className="w-4 h-4" />;
    }
  };

  const getDonorBadge = (type: string) => {
    const styles = {
      restaurant: 'bg-primary/10 text-primary',
      grocery: 'bg-secondary/10 text-secondary',
      individual: 'bg-muted text-muted-foreground',
    };

    const labels = {
      restaurant: 'Restaurant',
      grocery: 'Grocery',
      individual: 'Individual',
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${styles[type as keyof typeof styles]}`}>
        {getDonorIcon(type)}
        {labels[type as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-[14px] border border-border shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-medium mb-3">Pending Pickups</h2>
        
        {/* Selection Controls */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex gap-2">
            <button
              onClick={onSelectAll}
              className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              Select All
            </button>
            <span className="text-muted-foreground">|</span>
            <button
              onClick={onClearAll}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
          </div>
          
          <p className="text-sm text-muted-foreground">
            {selectedCount} of {pickups.length} selected
          </p>
        </div>
      </div>

      {/* Pickup List */}
      <div className="divide-y divide-border max-h-[600px] overflow-y-auto">
        {pickups.map((pickup, index) => (
          <label
            key={pickup.id}
            className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${
              pickup.selected ? 'bg-secondary/5' : 'hover:bg-muted/30'
            }`}
          >
            {/* Checkbox */}
            <input
              type="checkbox"
              checked={pickup.selected}
              onChange={() => onTogglePickup(pickup.id)}
              className="mt-1 w-5 h-5 rounded border-border text-secondary focus:ring-secondary cursor-pointer"
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Donor Name and Badge */}
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-medium">{pickup.donorName}</h3>
                {getDonorBadge(pickup.donorType)}
              </div>

              {/* Item Summary */}
              <p className="text-sm text-foreground/80 mb-2">{pickup.itemSummary}</p>

              {/* Address */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{pickup.address}</span>
              </div>

              {/* Pickup Window */}
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{pickup.pickupWindow}</span>
              </div>

              {/* Route Number (if selected) */}
              {pickup.selected && (
                <div className="mt-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {pickups.filter(p => p.selected).indexOf(pickup) + 1}
                  </span>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
