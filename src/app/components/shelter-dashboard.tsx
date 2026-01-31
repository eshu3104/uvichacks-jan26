import React, { useState } from 'react';
import { Package, Archive, Tag, ChefHat, Map, ArrowRight } from 'lucide-react';
import { DashboardNavbar } from '@/app/components/dashboard-navbar';
import { StatPill } from '@/app/components/stat-pill';
import { QuickActionCard } from '@/app/components/quick-action-card';
import { ActivityFeed } from '@/app/components/activity-feed';
import { Button } from '@/app/components/button';
import { AvailableDonationsPage } from '@/app/components/available-donations-page';
import { InventoryPage } from '@/app/components/inventory-page';
import { RecipePage } from '@/app/components/recipe-page';
import { PickupRoutePlanner } from '@/app/components/pickup-route-planner';
import { MobileBottomNav } from '@/app/components/mobile-bottom-nav';

export function ShelterDashboard() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'donations' | 'inventory' | 'recipes' | 'routes'>('dashboard');

  if (currentView === 'donations') {
    return (
      <>
        <AvailableDonationsPage />
        <MobileBottomNav activeView={currentView} onNavigate={setCurrentView} />
      </>
    );
  }

  if (currentView === 'inventory') {
    return (
      <>
        <InventoryPage />
        <MobileBottomNav activeView={currentView} onNavigate={setCurrentView} />
      </>
    );
  }

  if (currentView === 'recipes') {
    return (
      <>
        <RecipePage />
        <MobileBottomNav activeView={currentView} onNavigate={setCurrentView} />
      </>
    );
  }

  if (currentView === 'routes') {
    return (
      <>
        <PickupRoutePlanner />
        <MobileBottomNav activeView={currentView} onNavigate={setCurrentView} />
      </>
    );
  }

  const activities = [
    {
      id: '1',
      text: 'SaveMart donated 20 lbs of produce',
      time: '2h ago',
      type: 'donation' as const,
    },
    {
      id: '2',
      text: 'New recipe unlocked: Vegetable Stew',
      time: '5h ago',
      type: 'recipe' as const,
    },
    {
      id: '3',
      text: 'Completed pickup from Downtown Bakery',
      time: '1d ago',
      type: 'pickup' as const,
    },
    {
      id: '4',
      text: 'Inventory update: 3 items expiring in 2 days',
      time: '1d ago',
      type: 'inventory' as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardNavbar />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#FAF3E0] to-white rounded-[16px] p-8 md:p-10 mb-8 shadow-sm border border-border/30">
          <h1 className="text-3xl md:text-4xl mb-6">
            Good morning, Hope Kitchen 🌱
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <StatPill variant="primary">14 donations available</StatPill>
            <StatPill variant="secondary">8 recipes possible</StatPill>
            <StatPill variant="accent">Serves ~120 people</StatPill>
          </div>

          <Button variant="primary" size="lg" onClick={() => setCurrentView('donations')}>
            View Available Donations
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Quick Actions */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl mb-6">Quick Actions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              <QuickActionCard
                icon={Package}
                title="Available Donations"
                description="14 pending from 6 donors nearby"
                iconBg="bg-primary/10"
                iconColor="text-primary"
                onClick={() => setCurrentView('donations')}
              />
              
              <QuickActionCard
                icon={Archive}
                title="Current Inventory"
                description="47 items • 3 expiring soon"
                iconBg="bg-secondary/10"
                iconColor="text-secondary"
                onClick={() => setCurrentView('inventory')}
              />
              
              <QuickActionCard
                icon={Tag}
                title="Clearance Deals"
                description="12 items from SaveMart under $2"
                iconBg="bg-accent/10"
                iconColor="text-accent-foreground"
              />
              
              <QuickActionCard
                icon={ChefHat}
                title="Recipe Ideas"
                description="8 recipes from your inventory"
                iconBg="bg-primary/10"
                iconColor="text-primary"
                onClick={() => setCurrentView('recipes')}
              />
              
              <QuickActionCard
                icon={Map}
                title="Plan Pickup Route"
                description="Optimize for 5 pending pickups"
                iconBg="bg-secondary/10"
                iconColor="text-secondary"
                onClick={() => setCurrentView('routes')}
              />
            </div>
          </div>

          {/* Sidebar - Activity Feed */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl mb-6">Recent Activity</h2>
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="mt-16 mb-20 lg:mb-0 bg-muted/30 border-t border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            FoodBridge is an intermediary platform facilitating connections between donors and shelters. 
            FoodBridge does not handle, transport, or guarantee the safety of donated food. All parties 
            are responsible for compliance with local food safety regulations.
          </p>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav activeView={currentView} onNavigate={setCurrentView} />
    </div>
  );
}