import React from 'react';
import { Input, Textarea } from '@/app/components/input';
import { Button } from '@/app/components/button';
import { MapPin } from 'lucide-react';

interface Step3Props {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export function Step3PickupInfo({ formData, setFormData, onNext, onBack }: Step3Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">When and where can we pick this up?</h2>
        <p className="text-muted-foreground">Help us coordinate the pickup smoothly</p>
      </div>

      <div className="space-y-6">
        {/* Address */}
        <div>
          <Input
            label="Pickup Address"
            type="text"
            placeholder="123 Main Street, City, State ZIP"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
          />
          {/* Simple map preview placeholder */}
          {formData.address && (
            <div className="mt-3 h-32 bg-muted/30 rounded-[14px] flex items-center justify-center border border-border">
              <div className="text-center text-muted-foreground">
                <MapPin className="w-6 h-6 mx-auto mb-1" />
                <p className="text-sm">Map preview</p>
              </div>
            </div>
          )}
        </div>

        {/* Pickup Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Pickup Date"
            type="date"
            value={formData.pickupDate}
            onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
            required
          />
          <div>
            <label className="block mb-2">Time Window</label>
            <select
              className="w-full px-4 py-3 rounded-[14px] border border-input bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              value={formData.timeWindow}
              onChange={(e) => setFormData({ ...formData, timeWindow: e.target.value })}
            >
              <option value="">Select time</option>
              <option value="morning">Morning (8am - 12pm)</option>
              <option value="afternoon">Afternoon (12pm - 5pm)</option>
              <option value="evening">Evening (5pm - 8pm)</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        {/* Contact Phone */}
        <Input
          label="Contact Phone"
          type="tel"
          placeholder="(555) 123-4567"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        {/* Special Instructions */}
        <Textarea
          label="Special Instructions (Optional)"
          placeholder="Gate codes, loading dock info, parking instructions, etc."
          value={formData.instructions}
          onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
          rows={3}
        />

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
            onClick={onNext}
            disabled={!formData.address || !formData.pickupDate || !formData.timeWindow || !formData.phone}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
