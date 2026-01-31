import React, { useState } from 'react';
import { DashboardNavbar } from '@/app/components/dashboard-navbar';
import { PickupList } from '@/app/components/pickup-list';
import { RouteMap } from '@/app/components/route-map';
import { RouteSummary } from '@/app/components/route-summary';

interface Pickup {
  id: string;
  donorName: string;
  donorType: 'restaurant' | 'grocery' | 'individual';
  itemSummary: string;
  address: string;
  fullAddress: string;
  pickupWindow: string;
  coordinates: { lat: number; lng: number };
  selected: boolean;
}

export function PickupRoutePlanner() {
  const [pickups, setPickups] = useState<Pickup[]>([
    {
      id: '1',
      donorName: 'Sunrise Bakery',
      donorType: 'restaurant',
      itemSummary: '25 loaves of bread',
      address: '123 Baker St',
      fullAddress: '123 Baker St, Downtown',
      pickupWindow: 'Today 5:00 PM - 8:00 PM',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      selected: true,
    },
    {
      id: '2',
      donorName: 'SaveMart',
      donorType: 'grocery',
      itemSummary: '40 lbs of produce',
      address: '456 Market Ave',
      fullAddress: '456 Market Ave, Midtown',
      pickupWindow: 'Today 6:00 PM - 9:00 PM',
      coordinates: { lat: 37.7849, lng: -122.4094 },
      selected: true,
    },
    {
      id: '3',
      donorName: 'Downtown Café',
      donorType: 'restaurant',
      itemSummary: '50 prepared meals',
      address: '789 Main St',
      fullAddress: '789 Main St, Downtown',
      pickupWindow: 'Today 3:00 PM - 6:00 PM',
      coordinates: { lat: 37.7649, lng: -122.4294 },
      selected: true,
    },
    {
      id: '4',
      donorName: 'FreshMart',
      donorType: 'grocery',
      itemSummary: '20 gallons of milk',
      address: '555 Elm St',
      fullAddress: '555 Elm St, Uptown',
      pickupWindow: 'Today 8:00 AM - 11:00 AM',
      coordinates: { lat: 37.7949, lng: -122.3994 },
      selected: true,
    },
    {
      id: '5',
      donorName: 'Downtown Butcher',
      donorType: 'restaurant',
      itemSummary: '25 lbs of ground beef',
      address: '321 Oak Dr',
      fullAddress: '321 Oak Dr, Old Town',
      pickupWindow: 'Today 4:00 PM - 7:00 PM',
      coordinates: { lat: 37.7549, lng: -122.4394 },
      selected: true,
    },
    {
      id: '6',
      donorName: 'Community Member',
      donorType: 'individual',
      itemSummary: '100 cans of vegetables',
      address: '222 Pine Ln',
      fullAddress: '222 Pine Ln, Westside',
      pickupWindow: 'Today 12:00 PM - 6:00 PM',
      coordinates: { lat: 37.7449, lng: -122.4494 },
      selected: false,
    },
    {
      id: '7',
      donorName: 'Farm Fresh Restaurant',
      donorType: 'restaurant',
      itemSummary: '15 lbs of greens',
      address: '888 Garden Way',
      fullAddress: '888 Garden Way, Riverside',
      pickupWindow: 'Today 4:00 PM - 7:00 PM',
      coordinates: { lat: 37.7349, lng: -122.4594 },
      selected: false,
    },
  ]);

  const shelterLocation = {
    name: 'Hope Kitchen',
    address: '100 Community Blvd',
    coordinates: { lat: 37.7749, lng: -122.4394 },
  };

  const selectedPickups = pickups.filter(p => p.selected);

  const togglePickup = (id: string) => {
    setPickups(pickups.map(p => (p.id === id ? { ...p, selected: !p.selected } : p)));
  };

  const selectAll = () => {
    setPickups(pickups.map(p => ({ ...p, selected: true })));
  };

  const clearAll = () => {
    setPickups(pickups.map(p => ({ ...p, selected: false })));
  };

  const optimizeRoute = () => {
    console.log('Optimizing route for:', selectedPickups);
    // In a real app, this would call a route optimization API
  };

  const openInGoogleMaps = () => {
    // Generate Google Maps URL with waypoints
    const waypoints = selectedPickups.map(p => `${p.coordinates.lat},${p.coordinates.lng}`).join('|');
    const url = `https://www.google.com/maps/dir/?api=1&waypoints=${waypoints}&destination=${shelterLocation.coordinates.lat},${shelterLocation.coordinates.lng}`;
    window.open(url, '_blank');
  };

  const printRouteSheet = () => {
    window.print();
  };

  // Calculate route stats (simplified)
  const calculateRouteStats = () => {
    const stops = selectedPickups.length;
    const distance = stops * 2.5; // Simplified calculation
    const time = stops * 9 + 15; // Simplified calculation

    return {
      stops,
      distance: distance.toFixed(1),
      time,
    };
  };

  const routeStats = calculateRouteStats();

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Plan Pickup Route</h1>
          <p className="text-muted-foreground">Optimize your route for pending donation pickups</p>
        </div>

        {/* Split View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-20 lg:mb-0">
          {/* Left Panel - Pickup List */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <PickupList
              pickups={pickups}
              onTogglePickup={togglePickup}
              onSelectAll={selectAll}
              onClearAll={clearAll}
            />
          </div>

          {/* Right Panel - Map and Summary */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            <RouteMap
              selectedPickups={selectedPickups}
              shelterLocation={shelterLocation}
            />

            <RouteSummary
              stats={routeStats}
              onOptimize={optimizeRoute}
              onOpenInGoogleMaps={openInGoogleMaps}
              onPrint={printRouteSheet}
            />
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="mt-16 bg-muted/30 border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 py-6">
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