import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/app/components/button';

interface AddItemModalProps {
  onClose: () => void;
}

export function AddItemModal({ onClose }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'produce',
    quantity: '',
    expiryDate: '',
    source: 'manual',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Add item:', formData);
    onClose();
  };

  const categories = [
    { value: 'produce', label: 'Produce', emoji: '🥬' },
    { value: 'dairy', label: 'Dairy', emoji: '🥛' },
    { value: 'protein', label: 'Protein', emoji: '🥩' },
    { value: 'grains', label: 'Grains', emoji: '🍞' },
    { value: 'canned', label: 'Canned Goods', emoji: '🥫' },
    { value: 'other', label: 'Other', emoji: '📦' },
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-8 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-card rounded-[16px] shadow-2xl border border-border">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-2xl">Add Item to Inventory</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Item Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Item Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Fresh Tomatoes"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: category.value })}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-all ${
                      formData.category === category.value
                        ? 'bg-secondary/10 border-secondary text-secondary'
                        : 'bg-card border-border hover:bg-muted'
                    }`}
                  >
                    <span className="text-xl">{category.emoji}</span>
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Expiry Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Quantity *
                </label>
                <input
                  type="text"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g., 10 lbs, 20 cans"
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Expiry Date *
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                />
              </div>
            </div>

            {/* Source */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Source
              </label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                <option value="manual">Manual Entry</option>
                <option value="purchased">Purchased</option>
                <option value="donation">Donation</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Notes (optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add any additional notes about this item..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Add to Inventory
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
