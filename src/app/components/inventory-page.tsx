import React, { useState } from 'react';
import { DashboardNavbar } from '@/app/components/dashboard-navbar';
import { InventoryTable } from '@/app/components/inventory-table';
import { AddItemModal } from '@/app/components/add-item-modal';
import { Search, Plus, AlertTriangle, Package, Tag, Clock } from 'lucide-react';
import { Button } from '@/app/components/button';

interface InventoryItem {
  id: string;
  name: string;
  category: 'produce' | 'dairy' | 'protein' | 'grains' | 'canned' | 'other';
  categoryEmoji: string;
  quantity: string;
  expiryDate: string;
  expiryStatus: 'good' | 'soon' | 'urgent';
  source: 'donation' | 'purchased' | 'manual';
  donorName?: string;
  addedDate: string;
}

export function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const inventoryItems: InventoryItem[] = [
    {
      id: '1',
      name: 'Fresh Lettuce',
      category: 'produce',
      categoryEmoji: '🥬',
      quantity: '15 lbs',
      expiryDate: 'Feb 2, 2026',
      expiryStatus: 'soon',
      source: 'donation',
      donorName: 'SaveMart',
      addedDate: 'Jan 30, 2026',
    },
    {
      id: '2',
      name: 'Whole Wheat Bread',
      category: 'grains',
      categoryEmoji: '🍞',
      quantity: '20 loaves',
      expiryDate: 'Feb 1, 2026',
      expiryStatus: 'urgent',
      source: 'donation',
      donorName: 'Sunrise Bakery',
      addedDate: 'Jan 29, 2026',
    },
    {
      id: '3',
      name: 'Canned Tomatoes',
      category: 'canned',
      categoryEmoji: '🥫',
      quantity: '50 cans',
      expiryDate: 'Dec 2026',
      expiryStatus: 'good',
      source: 'purchased',
      addedDate: 'Jan 28, 2026',
    },
    {
      id: '4',
      name: 'Fresh Milk',
      category: 'dairy',
      categoryEmoji: '🥛',
      quantity: '10 gallons',
      expiryDate: 'Feb 3, 2026',
      expiryStatus: 'soon',
      source: 'donation',
      donorName: 'FreshMart',
      addedDate: 'Jan 30, 2026',
    },
    {
      id: '5',
      name: 'Ground Beef',
      category: 'protein',
      categoryEmoji: '🥩',
      quantity: '25 lbs',
      expiryDate: 'Feb 1, 2026',
      expiryStatus: 'urgent',
      source: 'donation',
      donorName: 'Downtown Butcher',
      addedDate: 'Jan 29, 2026',
    },
    {
      id: '6',
      name: 'Rice',
      category: 'grains',
      categoryEmoji: '🍚',
      quantity: '40 lbs',
      expiryDate: 'Jun 2026',
      expiryStatus: 'good',
      source: 'purchased',
      addedDate: 'Jan 25, 2026',
    },
    {
      id: '7',
      name: 'Carrots',
      category: 'produce',
      categoryEmoji: '🥕',
      quantity: '20 lbs',
      expiryDate: 'Feb 4, 2026',
      expiryStatus: 'good',
      source: 'donation',
      donorName: 'SaveMart',
      addedDate: 'Jan 30, 2026',
    },
    {
      id: '8',
      name: 'Chicken Breast',
      category: 'protein',
      categoryEmoji: '🍗',
      quantity: '30 lbs',
      expiryDate: 'Feb 2, 2026',
      expiryStatus: 'soon',
      source: 'donation',
      donorName: 'Fresh Poultry Co',
      addedDate: 'Jan 29, 2026',
    },
    {
      id: '9',
      name: 'Pasta',
      category: 'grains',
      categoryEmoji: '🍝',
      quantity: '35 lbs',
      expiryDate: 'Aug 2026',
      expiryStatus: 'good',
      source: 'manual',
      addedDate: 'Jan 20, 2026',
    },
    {
      id: '10',
      name: 'Yogurt',
      category: 'dairy',
      categoryEmoji: '🥛',
      quantity: '30 cups',
      expiryDate: 'Feb 5, 2026',
      expiryStatus: 'good',
      source: 'donation',
      donorName: 'Dairy Fresh',
      addedDate: 'Jan 30, 2026',
    },
  ];

  const filterItems = (items: InventoryItem[]) => {
    return items
      .filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
        return matchesSearch && matchesCategory;
      });
  };

  const filteredItems = filterItems(inventoryItems);

  const getStats = () => {
    const totalItems = inventoryItems.length;
    const categories = new Set(inventoryItems.map(item => item.category)).size;
    const expiringSoon = inventoryItems.filter(item => 
      item.expiryStatus === 'urgent' || item.expiryStatus === 'soon'
    ).length;
    const urgentItems = inventoryItems.filter(item => item.expiryStatus === 'urgent').length;

    return { totalItems, categories, expiringSoon, urgentItems };
  };

  const stats = getStats();

  const categories = [
    { id: 'all', label: 'All Items', emoji: '📦' },
    { id: 'produce', label: 'Produce', emoji: '🥬' },
    { id: 'dairy', label: 'Dairy', emoji: '🥛' },
    { id: 'protein', label: 'Protein', emoji: '🥩' },
    { id: 'grains', label: 'Grains', emoji: '🍞' },
    { id: 'canned', label: 'Canned', emoji: '🥫' },
    { id: 'other', label: 'Other', emoji: '📦' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl mb-2">Your Inventory</h1>
            <p className="text-muted-foreground">Manage and track your food supplies</p>
          </div>
          <Button variant="primary" size="lg" onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5 mr-2" />
            Add Item Manually
          </Button>
        </div>

        {/* Expiring Soon Alert */}
        {stats.expiringSoon > 0 && (
          <div className="bg-accent/15 border border-accent/30 rounded-[14px] p-4 mb-6 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-accent-foreground flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium text-accent-foreground mb-1">
                {stats.expiringSoon} item{stats.expiringSoon !== 1 ? 's' : ''} expiring in the next 3 days
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Use these ingredients soon to reduce waste
              </p>
              <button className="text-sm text-secondary hover:text-secondary/80 font-medium transition-colors">
                View recipe suggestions →
              </button>
            </div>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-card rounded-[14px] p-5 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-medium" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                  {stats.totalItems}
                </p>
                <p className="text-sm text-muted-foreground">Total items</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-[14px] p-5 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                <Tag className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-2xl font-medium" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                  {stats.categories}
                </p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-[14px] p-5 shadow-sm border border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="w-6 h-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-2xl font-medium text-accent-foreground" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                  {stats.expiringSoon}
                </p>
                <p className="text-sm text-muted-foreground">Expiring within 3 days</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-input bg-input-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
            />
          </div>

          {/* Category Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setCategoryFilter(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  categoryFilter === category.id
                    ? 'bg-secondary text-secondary-foreground shadow-sm'
                    : 'bg-card border border-border hover:bg-muted'
                }`}
              >
                <span>{category.emoji}</span>
                <span className="text-sm font-medium">{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredItems.length} of {inventoryItems.length} items
          </p>
        </div>

        {/* Inventory Table */}
        <InventoryTable items={filteredItems} />

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-card rounded-[14px] border border-border">
            <Package className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl mb-2">No items found</h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery || categoryFilter !== 'all'
                ? 'Try adjusting your search or filters'
                : 'Add your first item to get started'}
            </p>
            {!searchQuery && categoryFilter === 'all' && (
              <Button variant="primary" onClick={() => setShowAddModal(true)}>
                <Plus className="w-5 h-5 mr-2" />
                Add Item
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Legal Footer */}
      <div className="mt-16 bg-muted/30 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            FoodBridge is an intermediary platform facilitating connections between donors and shelters. 
            FoodBridge does not handle, transport, or guarantee the safety of donated food. All parties 
            are responsible for compliance with local food safety regulations.
          </p>
        </div>
      </div>

      {/* Add Item Modal */}
      {showAddModal && <AddItemModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
