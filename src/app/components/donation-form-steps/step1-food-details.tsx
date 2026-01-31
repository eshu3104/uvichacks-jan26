import React from 'react';
import { Leaf, Milk, Sandwich, Package as PackageIcon, UtensilsCrossed, Coffee, MoreHorizontal } from 'lucide-react';
import { Input, Textarea } from '@/app/components/input';
import { Button } from '@/app/components/button';

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
  onNext: () => void;
}

export function Step1FoodDetails({ formData, setFormData, onNext }: Step1Props) {
  const categories = [
    { id: 'produce', label: 'Produce', icon: Leaf, emoji: '🥬' },
    { id: 'dairy', label: 'Dairy', icon: Milk, emoji: '🥛' },
    { id: 'bakery', label: 'Bakery', icon: Sandwich, emoji: '🍞' },
    { id: 'canned', label: 'Canned Goods', icon: PackageIcon, emoji: '🥫' },
    { id: 'prepared', label: 'Prepared Meals', icon: UtensilsCrossed, emoji: '🍱' },
    { id: 'beverages', label: 'Beverages', icon: Coffee, emoji: '🧃' },
    { id: 'other', label: 'Other', icon: MoreHorizontal, emoji: '📦' },
  ];

  const handleCategorySelect = (categoryId: string) => {
    setFormData({ ...formData, category: categoryId });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl mb-2">What are you donating?</h2>
        <p className="text-muted-foreground">Help us understand what food you'd like to share</p>
      </div>

      <div className="space-y-8">
        {/* Category Selector */}
        <div>
          <label className="block mb-4">Food Category</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`p-4 rounded-[14px] border-2 transition-all hover:shadow-md ${
                  formData.category === category.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="text-3xl mb-2">{category.emoji}</div>
                <div className="text-sm font-medium">{category.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label className="block mb-2">Quantity</label>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Amount"
              value={formData.quantity}
              onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
              required
            />
            <select
              className="px-4 py-3 rounded-[14px] border border-input bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
            >
              <option value="lbs">lbs</option>
              <option value="items">items</option>
              <option value="cases">cases</option>
              <option value="kg">kg</option>
              <option value="gallons">gallons</option>
            </select>
          </div>
        </div>

        {/* Expiry Date */}
        <div>
          <Input
            label="Best By Date"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
            required
          />
          <p className="text-sm text-muted-foreground mt-2">
            Best by date helps shelters prioritize pickups
          </p>
        </div>

        {/* Description */}
        <Textarea
          label="Description (Optional)"
          placeholder="Any additional details about the food items..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
        />

        {/* Next Button */}
        <div className="flex justify-end pt-4">
          <Button
            variant="primary"
            size="lg"
            onClick={onNext}
            disabled={!formData.category || !formData.quantity || !formData.expiryDate}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
