import React from 'react';
import { MapPin, AlertCircle } from 'lucide-react';
import { Button } from '@/app/components/button';

interface DonationCardProps {
  donation: {
    id: string;
    photo: string;
    category: string;
    categoryEmoji: string;
    quantity: string;
    donorType: 'restaurant' | 'grocery' | 'individual';
    donorName: string;
    distance: number;
    expiryDate: string;
    expiryUrgent: boolean;
  };
  onViewDetails: () => void;
  onAccept: () => void;
}

export function AvailableDonationCard({ donation, onViewDetails, onAccept }: DonationCardProps) {
  const getDonorTypeBadge = () => {
    const styles = {
      restaurant: 'bg-primary/10 text-primary border-primary/20',
      grocery: 'bg-secondary/10 text-secondary border-secondary/20',
      individual: 'bg-muted text-muted-foreground border-border',
    };

    const labels = {
      restaurant: 'Restaurant',
      grocery: 'Grocery',
      individual: 'Individual',
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${styles[donation.donorType]}`}>
        {labels[donation.donorType]}
      </span>
    );
  };

  return (
    <div className="bg-card rounded-[14px] overflow-hidden shadow-sm hover:shadow-md transition-all border border-border">
      {/* Photo */}
      <div className="relative">
        <img 
          src={donation.photo} 
          alt={donation.category}
          className="w-full h-48 object-cover cursor-pointer"
          onClick={onViewDetails}
        />
        {donation.expiryUrgent && (
          <div className="absolute top-2 right-2 bg-destructive text-destructive-foreground px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Urgent
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category & Quantity */}
        <h3 className="text-lg font-medium mb-1">
          {donation.categoryEmoji} {donation.category} — {donation.quantity}
        </h3>

        {/* Donor Badge */}
        <div className="mb-3">
          {getDonorTypeBadge()}
        </div>

        {/* Distance */}
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
          <MapPin className="w-4 h-4" />
          <span>{donation.distance.toFixed(1)} mi away</span>
        </div>

        {/* Expiry */}
        <div className="mb-4">
          <p className={`text-sm font-medium ${donation.expiryUrgent ? 'text-destructive' : 'text-muted-foreground'}`}>
            Best by: {donation.expiryDate}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={onViewDetails}
          >
            View Details
          </Button>
          <Button 
            variant="primary" 
            size="sm" 
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onAccept();
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
