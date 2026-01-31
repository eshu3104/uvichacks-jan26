import React, { useState } from 'react';
import { Button } from '@/app/components/button';
import { Card } from '@/app/components/card';
import { Check } from 'lucide-react';

interface Step4Props {
  formData: any;
  onBack: () => void;
  onSubmit: () => void;
}

export function Step4Confirm({ formData, onBack, onSubmit }: Step4Props) {
  const [certified, setCertified] = useState(false);

  const getCategoryLabel = (id: string) => {
    const labels: { [key: string]: string } = {
      produce: 'Produce 🥬',
      dairy: 'Dairy 🥛',
      bakery: 'Bakery 🍞',
      canned: 'Canned Goods 🥫',
      prepared: 'Prepared Meals 🍱',
      beverages: 'Beverages 🧃',
      other: 'Other 📦',
    };
    return labels[id] || id;
  };

  const getTimeWindowLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      morning: 'Morning (8am - 12pm)',
      afternoon: 'Afternoon (12pm - 5pm)',
      evening: 'Evening (5pm - 8pm)',
      flexible: 'Flexible',
    };
    return labels[value] || value;
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">Review your donation</h2>
        <p className="text-muted-foreground">Make sure everything looks correct before submitting</p>
      </div>

      <div className="space-y-6">
        {/* Summary Card */}
        <Card>
          <div className="space-y-6">
            {/* Food Details */}
            <div>
              <h3 className="text-lg mb-3 pb-2 border-b border-border">Food Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{getCategoryLabel(formData.category)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quantity:</span>
                  <span className="font-medium">{formData.quantity} {formData.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Best By:</span>
                  <span className="font-medium">{formData.expiryDate}</span>
                </div>
                {formData.description && (
                  <div className="pt-2">
                    <span className="text-muted-foreground">Description:</span>
                    <p className="mt-1">{formData.description}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Photos */}
            <div>
              <h3 className="text-lg mb-3 pb-2 border-b border-border">Photos</h3>
              <div className="grid grid-cols-4 gap-2">
                {formData.photos?.map((photo: string, index: number) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-20 object-cover rounded-lg border border-border"
                  />
                ))}
              </div>
            </div>

            {/* Pickup Info */}
            <div>
              <h3 className="text-lg mb-3 pb-2 border-b border-border">Pickup Information</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Address:</span>
                  <p className="font-medium">{formData.address}</p>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date:</span>
                  <span className="font-medium">{formData.pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Time:</span>
                  <span className="font-medium">{getTimeWindowLabel(formData.timeWindow)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Contact:</span>
                  <span className="font-medium">{formData.phone}</span>
                </div>
                {formData.instructions && (
                  <div className="pt-2">
                    <span className="text-muted-foreground">Instructions:</span>
                    <p className="mt-1">{formData.instructions}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Certification Checkbox */}
        <div className="bg-muted/30 rounded-[14px] p-6 border border-border">
          <label className="flex items-start gap-3 cursor-pointer">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                checked={certified}
                onChange={(e) => setCertified(e.target.checked)}
                className="w-5 h-5 rounded border-2 border-input appearance-none checked:bg-primary checked:border-primary cursor-pointer transition-all"
              />
              {certified && (
                <Check className="w-3 h-3 text-primary-foreground absolute top-1 left-1 pointer-events-none" />
              )}
            </div>
            <div className="text-sm leading-relaxed">
              <p className="font-medium mb-1">
                I certify that this food is safe for consumption
              </p>
              <p className="text-muted-foreground">
                I assume all responsibility for the accuracy of this information. I understand FoodBridge is an intermediary platform and does not inspect donated goods.
              </p>
            </div>
          </label>
        </div>

        {/* Legal Disclaimer */}
        <p className="text-xs text-muted-foreground leading-relaxed">
          By submitting this donation, you acknowledge that FoodBridge facilitates connections between donors and recipients but does not handle, transport, or guarantee the safety of donated food. All parties are responsible for compliance with local food safety regulations and laws.
        </p>

        {/* Navigation */}
        <div className="flex justify-between pt-4">
          <button
            onClick={onBack}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back
          </button>
          <Button
            variant="primary"
            size="lg"
            onClick={onSubmit}
            disabled={!certified}
            className="px-12"
          >
            Submit Donation
          </Button>
        </div>
      </div>
    </div>
  );
}
