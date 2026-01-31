import React, { useState } from 'react';
import { Clock, Check, Truck, Circle, ChevronDown, ChevronUp, MapPin, Phone, Calendar } from 'lucide-react';
import { Button } from '@/app/components/button';

interface DonationCardProps {
  donation: {
    id: string;
    thumbnail: string;
    category: string;
    categoryEmoji: string;
    quantity: string;
    dateSubmitted: string;
    status: 'pending' | 'accepted' | 'picked-up' | 'no-response';
    shelterName?: string;
    shelterLogo?: string;
    pickupTime?: string;
    description?: string;
    address?: string;
    contactPhone?: string;
  };
}

export function DonationCard({ donation }: DonationCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusBadge = () => {
    switch (donation.status) {
      case 'pending':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/15 text-accent-foreground border border-accent/20">
            <Clock className="w-4 h-4" />
            <span className="text-sm font-medium">Pending</span>
          </div>
        );
      case 'accepted':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20">
            <Check className="w-4 h-4" />
            <span className="text-sm font-medium">Accepted by {donation.shelterName}</span>
          </div>
        );
      case 'picked-up':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/15 text-secondary border border-secondary/20">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">Picked Up</span>
          </div>
        );
      case 'no-response':
        return (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-muted text-muted-foreground border border-border">
            <Circle className="w-4 h-4" />
            <span className="text-sm font-medium">No Response (48h)</span>
          </div>
        );
    }
  };

  const handleRelist = () => {
    console.log('Relist donation:', donation.id);
  };

  return (
    <div className="bg-card rounded-[14px] border border-border/50 shadow-sm hover:shadow-md transition-all">
      {/* Main Card Content */}
      <div className="p-4 md:p-6">
        <div className="flex gap-4">
          {/* Thumbnail */}
          <div className="flex-shrink-0">
            <img
              src={donation.thumbnail}
              alt={donation.category}
              className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-border"
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="text-lg font-medium mb-1">
                  {donation.categoryEmoji} {donation.category} — {donation.quantity}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Submitted {donation.dateSubmitted}
                </p>
              </div>
              
              {/* Expand/Collapse Button - Desktop */}
              <button
                onClick={() => setExpanded(!expanded)}
                className="hidden md:flex p-2 hover:bg-muted rounded-full transition-colors"
              >
                {expanded ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </button>
            </div>

            {/* Status Badge */}
            <div className="mb-3">
              {getStatusBadge()}
            </div>

            {/* Shelter Info (if accepted or picked up) */}
            {(donation.status === 'accepted' || donation.status === 'picked-up') && donation.shelterName && (
              <div className="flex items-center gap-3 mt-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium flex-shrink-0">
                  {donation.shelterLogo}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium">{donation.shelterName}</p>
                  {donation.pickupTime && (
                    <p className="text-sm text-muted-foreground">
                      Pickup: {donation.pickupTime}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Relist Option (for no-response) */}
            {donation.status === 'no-response' && (
              <div className="mt-3">
                <Button variant="outline" size="sm" onClick={handleRelist}>
                  Relist Donation
                </Button>
              </div>
            )}

            {/* Mobile Expand Button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="md:hidden mt-3 text-sm text-primary hover:text-primary/80 font-medium transition-colors flex items-center gap-1"
            >
              {expanded ? 'Hide details' : 'View details'}
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-border px-4 md:px-6 py-4 bg-muted/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Description */}
            {donation.description && (
              <div>
                <h4 className="text-sm font-medium mb-2">Description</h4>
                <p className="text-sm text-muted-foreground">{donation.description}</p>
              </div>
            )}

            {/* Pickup Location */}
            {donation.address && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  Pickup Location
                </h4>
                <p className="text-sm text-muted-foreground">{donation.address}</p>
              </div>
            )}

            {/* Contact */}
            {donation.contactPhone && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Contact
                </h4>
                <p className="text-sm text-muted-foreground">{donation.contactPhone}</p>
              </div>
            )}

            {/* Pickup Time (for accepted/picked-up) */}
            {donation.pickupTime && (
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {donation.status === 'picked-up' ? 'Picked Up' : 'Scheduled Pickup'}
                </h4>
                <p className="text-sm text-muted-foreground">{donation.pickupTime}</p>
              </div>
            )}
          </div>

          {/* Action Buttons in Expanded View */}
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm">
              View Full Details
            </Button>
            {donation.status === 'pending' && (
              <Button variant="outline" size="sm">
                Edit Donation
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
