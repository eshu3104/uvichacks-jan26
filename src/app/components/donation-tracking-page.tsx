import React, { useState } from 'react';
import { DonorNavbar } from '@/app/components/donor-navbar';
import { DonationCard } from '@/app/components/donation-card';
import { EmptyDonations } from '@/app/components/empty-donations';

type DonationStatus = 'all' | 'pending' | 'accepted' | 'completed' | 'no-response';

interface Donation {
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
}

export function DonationTrackingPage() {
  const [activeFilter, setActiveFilter] = useState<DonationStatus>('all');

  // Mock data - would come from API
  const donations: Donation[] = [
    {
      id: '1',
      thumbnail: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=300&fit=crop',
      category: 'Produce',
      categoryEmoji: '🥬',
      quantity: '15 lbs',
      dateSubmitted: 'Jan 30, 2026',
      status: 'accepted',
      shelterName: 'Hope Kitchen',
      shelterLogo: 'HK',
      pickupTime: 'Today, 2:00 PM - 5:00 PM',
      description: 'Fresh seasonal vegetables including lettuce, tomatoes, and carrots',
      address: '123 Main St, Downtown',
      contactPhone: '(555) 123-4567',
    },
    {
      id: '2',
      thumbnail: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop',
      category: 'Bakery',
      categoryEmoji: '🍞',
      quantity: '20 items',
      dateSubmitted: 'Jan 29, 2026',
      status: 'picked-up',
      shelterName: 'Community Shelter',
      shelterLogo: 'CS',
      pickupTime: 'Jan 29, 4:00 PM',
      description: 'Assorted baked goods: bagels, muffins, and bread',
      address: '456 Oak Ave',
      contactPhone: '(555) 987-6543',
    },
    {
      id: '3',
      thumbnail: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=300&fit=crop',
      category: 'Canned Goods',
      categoryEmoji: '🥫',
      quantity: '30 cans',
      dateSubmitted: 'Jan 28, 2026',
      status: 'pending',
      description: 'Mixed canned vegetables and soups',
      address: '789 Pine St',
      contactPhone: '(555) 456-7890',
    },
    {
      id: '4',
      thumbnail: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=300&fit=crop',
      category: 'Dairy',
      categoryEmoji: '🥛',
      quantity: '5 gallons',
      dateSubmitted: 'Jan 25, 2026',
      status: 'no-response',
      description: 'Fresh milk - expires Jan 28',
      address: '321 Elm St',
      contactPhone: '(555) 234-5678',
    },
    {
      id: '5',
      thumbnail: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop',
      category: 'Prepared Meals',
      categoryEmoji: '🍱',
      quantity: '25 meals',
      dateSubmitted: 'Jan 27, 2026',
      status: 'accepted',
      shelterName: 'Downtown Mission',
      shelterLogo: 'DM',
      pickupTime: 'Tomorrow, 10:00 AM - 12:00 PM',
      description: 'Pre-packaged lunch boxes with sandwiches and fruit',
      address: '555 Market St',
      contactPhone: '(555) 345-6789',
    },
  ];

  const filterDonations = (donations: Donation[], filter: DonationStatus) => {
    if (filter === 'all') return donations;
    if (filter === 'pending') return donations.filter(d => d.status === 'pending');
    if (filter === 'accepted') return donations.filter(d => d.status === 'accepted');
    if (filter === 'completed') return donations.filter(d => d.status === 'picked-up');
    if (filter === 'no-response') return donations.filter(d => d.status === 'no-response');
    return donations;
  };

  const filteredDonations = filterDonations(donations, activeFilter);

  const getFilterCount = (filter: DonationStatus) => {
    return filterDonations(donations, filter).length;
  };

  const filters: { id: DonationStatus; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'completed', label: 'Completed' },
    { id: 'no-response', label: 'No Response' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DonorNavbar />

      <div className="max-w-[1200px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">My Donations</h1>
          <p className="text-muted-foreground">Track and manage all your food donations</p>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 border-b border-border">
          <div className="flex gap-1 overflow-x-auto">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-3 font-medium transition-all whitespace-nowrap ${
                  activeFilter === filter.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {filter.label}
                <span className="ml-2 text-sm">({getFilterCount(filter.id)})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Donation Cards */}
        {filteredDonations.length === 0 ? (
          <EmptyDonations filterType={activeFilter} />
        ) : (
          <div className="space-y-4">
            {filteredDonations.map((donation) => (
              <DonationCard key={donation.id} donation={donation} />
            ))}
          </div>
        )}
      </div>

      {/* Legal Footer */}
      <div className="mt-16 bg-muted/30 border-t border-border">
        <div className="max-w-[1200px] mx-auto px-6 py-6">
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
