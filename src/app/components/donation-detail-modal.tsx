import React, { useState } from 'react';
import { X, MapPin, Clock, Phone, ChevronLeft, ChevronRight, Store, User } from 'lucide-react';
import { Button } from '@/app/components/button';

interface DonationDetailModalProps {
  donation: {
    id: string;
    photo: string;
    photos?: string[];
    category: string;
    categoryEmoji: string;
    quantity: string;
    donorType: 'restaurant' | 'grocery' | 'individual';
    donorName: string;
    distance: number;
    expiryDate: string;
    expiryUrgent: boolean;
    description: string;
    address: string;
    pickupWindow: string;
    contactPhone: string;
  };
  onClose: () => void;
  onAccept: () => void;
}

export function DonationDetailModal({ donation, onClose, onAccept }: DonationDetailModalProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const photos = donation.photos || [donation.photo];

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const getDonorIcon = () => {
    switch (donation.donorType) {
      case 'restaurant':
      case 'grocery':
        return <Store className="w-5 h-5" />;
      case 'individual':
        return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="max-w-3xl w-full bg-card rounded-[16px] shadow-2xl border border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl">Donation Details</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Photo Carousel */}
            <div className="relative mb-6 rounded-[14px] overflow-hidden">
              <img
                src={photos[currentPhotoIndex]}
                alt={`${donation.category} ${currentPhotoIndex + 1}`}
                className="w-full h-64 md:h-80 object-cover"
              />
              
              {photos.length > 1 && (
                <>
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Photo Indicators */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {photos.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPhotoIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentPhotoIndex ? 'bg-primary w-6' : 'bg-card/50'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              {/* Urgent Badge */}
              {donation.expiryUrgent && (
                <div className="absolute top-3 right-3 bg-destructive text-destructive-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                  Expires {donation.expiryDate}
                </div>
              )}
            </div>

            {/* Main Info */}
            <div className="mb-6">
              <h3 className="text-2xl mb-2">
                {donation.categoryEmoji} {donation.category}
              </h3>
              <p className="text-xl text-muted-foreground mb-4">{donation.quantity}</p>
              <p className="text-foreground/80 leading-relaxed">{donation.description}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Donor Info */}
              <div className="bg-muted/30 rounded-[14px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getDonorIcon()}
                  <h4 className="font-medium">Donor</h4>
                </div>
                <p className="text-foreground">{donation.donorName}</p>
                <p className="text-sm text-muted-foreground capitalize">{donation.donorType}</p>
              </div>

              {/* Distance */}
              <div className="bg-muted/30 rounded-[14px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h4 className="font-medium">Distance</h4>
                </div>
                <p className="text-foreground">{donation.distance.toFixed(1)} miles away</p>
              </div>

              {/* Pickup Location */}
              <div className="bg-muted/30 rounded-[14px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5" />
                  <h4 className="font-medium">Pickup Address</h4>
                </div>
                <p className="text-foreground">{donation.address}</p>
              </div>

              {/* Pickup Window */}
              <div className="bg-muted/30 rounded-[14px] p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <h4 className="font-medium">Pickup Window</h4>
                </div>
                <p className="text-foreground">{donation.pickupWindow}</p>
              </div>

              {/* Contact */}
              <div className="bg-muted/30 rounded-[14px] p-4 md:col-span-2">
                <div className="flex items-center gap-2 mb-2">
                  <Phone className="w-5 h-5" />
                  <h4 className="font-medium">Contact</h4>
                </div>
                <p className="text-foreground">{donation.contactPhone}</p>
              </div>
            </div>

            {/* Map Preview Placeholder */}
            <div className="mb-6 h-48 bg-muted/30 rounded-[14px] flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm">Map preview</p>
                <p className="text-xs">{donation.address}</p>
              </div>
            </div>

            {/* Expiry Warning */}
            {donation.expiryUrgent && (
              <div className="mb-6 bg-destructive/10 border border-destructive/20 rounded-[14px] p-4">
                <p className="text-sm text-foreground/80">
                  ⚠️ This donation expires soon. Please pick up as soon as possible to avoid waste.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                size="lg"
                className="flex-1"
                onClick={onAccept}
              >
                Accept Donation
              </Button>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors py-3"
              >
                Pass
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
