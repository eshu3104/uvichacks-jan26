import React, { useState } from 'react';
import { DashboardNavbar } from '@/app/components/dashboard-navbar';
import { AvailableDonationCard } from '@/app/components/available-donation-card';
import { DonationDetailModal } from '@/app/components/donation-detail-modal';
import { SlidersHorizontal, Zap } from 'lucide-react';

interface Donation {
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
  description: string;
  address: string;
  pickupWindow: string;
  contactPhone: string;
  photos?: string[];
}

interface AvailableDonationsPageProps {
  onNavigate?: (view: 'dashboard' | 'donations' | 'inventory' | 'recipes' | 'routes') => void;
  onLogout?: () => void;
}

export function AvailableDonationsPage({ onNavigate, onLogout }: AvailableDonationsPageProps) {
  const [selectedDonation, setSelectedDonation] = useState<Donation | null>(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [maxDistance, setMaxDistance] = useState(10);
  const [sortBy, setSortBy] = useState<'expiry' | 'distance'>('expiry');

  // Mock data
  const donations: Donation[] = [
    {
      id: '1',
      photo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      category: 'Bakery',
      categoryEmoji: '🍞',
      quantity: '25 loaves',
      donorType: 'restaurant',
      donorName: 'Sunrise Bakery',
      distance: 2.3,
      expiryDate: 'Tomorrow',
      expiryUrgent: true,
      description: 'Fresh artisan bread baked this morning. Mix of sourdough, whole wheat, and white loaves. Perfect for sandwiches or toast.',
      address: '123 Baker St, Downtown',
      pickupWindow: 'Today 5:00 PM - 8:00 PM',
      contactPhone: '(555) 123-4567',
      photos: [
        'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&h=600&fit=crop',
      ],
    },
    {
      id: '2',
      photo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop',
      category: 'Produce',
      categoryEmoji: '🥬',
      quantity: '40 lbs',
      donorType: 'grocery',
      donorName: 'SaveMart',
      distance: 1.5,
      expiryDate: 'Jan 31',
      expiryUrgent: false,
      description: 'Fresh seasonal vegetables including lettuce, tomatoes, carrots, and bell peppers. All in good condition.',
      address: '456 Market Ave',
      pickupWindow: 'Tomorrow 9:00 AM - 12:00 PM',
      contactPhone: '(555) 234-5678',
      photos: [
        'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=800&h=600&fit=crop',
      ],
    },
    {
      id: '3',
      photo: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
      category: 'Prepared Meals',
      categoryEmoji: '🍱',
      quantity: '50 meals',
      donorType: 'restaurant',
      donorName: 'Downtown Café',
      distance: 3.7,
      expiryDate: 'Today',
      expiryUrgent: true,
      description: 'Pre-packaged lunch boxes with sandwiches, salad, and fruit. Ready to serve.',
      address: '789 Main St',
      pickupWindow: 'Today 3:00 PM - 6:00 PM',
      contactPhone: '(555) 345-6789',
      photos: [
        'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop',
      ],
    },
    {
      id: '4',
      photo: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
      category: 'Canned Goods',
      categoryEmoji: '🥫',
      quantity: '100 cans',
      donorType: 'individual',
      donorName: 'Community Member',
      distance: 4.2,
      expiryDate: 'Mar 2026',
      expiryUrgent: false,
      description: 'Assorted canned vegetables, soups, and beans. All unexpired with long shelf life.',
      address: '321 Oak Dr',
      pickupWindow: 'This weekend, flexible',
      contactPhone: '(555) 456-7890',
      photos: [
        'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=800&h=600&fit=crop',
      ],
    },
    {
      id: '5',
      photo: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
      category: 'Dairy',
      categoryEmoji: '🥛',
      quantity: '20 gallons',
      donorType: 'grocery',
      donorName: 'FreshMart',
      distance: 2.8,
      expiryDate: 'Feb 2',
      expiryUrgent: false,
      description: 'Fresh milk in gallon containers. Kept refrigerated.',
      address: '555 Elm St',
      pickupWindow: 'Tomorrow 8:00 AM - 11:00 AM',
      contactPhone: '(555) 567-8901',
      photos: [
        'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop',
      ],
    },
    {
      id: '6',
      photo: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop',
      category: 'Produce',
      categoryEmoji: '🥬',
      quantity: '15 lbs',
      donorType: 'restaurant',
      donorName: 'Farm Fresh Restaurant',
      distance: 1.9,
      expiryDate: 'Today',
      expiryUrgent: true,
      description: 'Fresh greens and herbs from our kitchen. Must be picked up today.',
      address: '222 Garden Way',
      pickupWindow: 'Today 4:00 PM - 7:00 PM',
      contactPhone: '(555) 678-9012',
      photos: [
        'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=800&h=600&fit=crop',
      ],
    },
  ];

  const urgentDonations = donations.filter(d => d.expiryUrgent);
  
  const filteredDonations = donations
    .filter(d => categoryFilter === 'all' || d.category.toLowerCase() === categoryFilter)
    .filter(d => d.distance <= maxDistance)
    .sort((a, b) => {
      if (sortBy === 'expiry') {
        return a.expiryUrgent === b.expiryUrgent ? 0 : a.expiryUrgent ? -1 : 1;
      }
      return a.distance - b.distance;
    });

  const handleAccept = (donation: Donation) => {
    console.log('Accepted donation:', donation.id);
    // Would add to pending pickups
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar 
        activeTab="Donations" 
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Available Donations</h1>
          <p className="text-muted-foreground">Food available for pickup from donors near you</p>
        </div>

        {/* Urgency Section */}
        {urgentDonations.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-destructive/10 to-accent/10 rounded-[16px] p-6 border border-destructive/20">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-destructive" />
              <h2 className="text-xl font-medium">Expiring Soon</h2>
              <span className="text-sm text-muted-foreground">({urgentDonations.length} items)</span>
            </div>
            
            <div className="overflow-x-auto -mx-6 px-6">
              <div className="flex gap-4 pb-2">
                {urgentDonations.map((donation) => (
                  <div 
                    key={donation.id}
                    className="flex-shrink-0 w-64 cursor-pointer"
                    onClick={() => setSelectedDonation(donation)}
                  >
                    <div className="bg-card rounded-[14px] overflow-hidden border border-border shadow-sm hover:shadow-md transition-all">
                      <img 
                        src={donation.photo} 
                        alt={donation.category}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <p className="font-medium text-sm mb-1">
                          {donation.categoryEmoji} {donation.category}
                        </p>
                        <p className="text-xs text-muted-foreground mb-2">{donation.quantity}</p>
                        <p className="text-xs text-destructive font-medium">
                          Expires: {donation.expiryDate}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-card rounded-[14px] p-4 mb-6 shadow-sm border border-border">
          <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal className="w-5 h-5 text-muted-foreground" />
            <span className="font-medium">Filters</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-input bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                <option value="all">All Categories</option>
                <option value="produce">Produce</option>
                <option value="bakery">Bakery</option>
                <option value="dairy">Dairy</option>
                <option value="prepared meals">Prepared Meals</option>
                <option value="canned goods">Canned Goods</option>
              </select>
            </div>

            {/* Distance Filter */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Distance: Up to {maxDistance} miles
              </label>
              <input
                type="range"
                min="1"
                max="25"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* Sort By */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'expiry' | 'distance')}
                className="w-full px-4 py-2 rounded-lg border border-input bg-input-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
              >
                <option value="expiry">Expiry (soonest first)</option>
                <option value="distance">Distance (nearest first)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Donation Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonations.map((donation) => (
            <AvailableDonationCard
              key={donation.id}
              donation={donation}
              onViewDetails={() => setSelectedDonation(donation)}
              onAccept={() => handleAccept(donation)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredDonations.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground mb-2">No donations match your filters</p>
            <p className="text-sm text-muted-foreground">Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedDonation && (
        <DonationDetailModal
          donation={selectedDonation}
          onClose={() => setSelectedDonation(null)}
          onAccept={() => {
            handleAccept(selectedDonation);
            setSelectedDonation(null);
          }}
        />
      )}

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
    </div>
  );
}
