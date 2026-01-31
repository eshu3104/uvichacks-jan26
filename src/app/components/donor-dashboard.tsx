import React, { useState } from 'react';
import { Package, ClipboardList, TrendingUp, Utensils, Leaf } from 'lucide-react';
import { DonorNavbar } from '@/app/components/donor-navbar';
import { Button } from '@/app/components/button';
import { Card } from '@/app/components/card';
import { MapPreview } from '@/app/components/map-preview';
import { RecentDonationsTable } from '@/app/components/recent-donations-table';
import { DonationForm } from '@/app/components/donation-form';
import { DonationTrackingPage } from '@/app/components/donation-tracking-page';

interface DonorDashboardProps {
  onLogout?: () => void;
}

export function DonorDashboard({ onLogout }: DonorDashboardProps) {
  const [showDonationForm, setShowDonationForm] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'tracking'>('home');

  if (currentView === 'tracking') {
    return <DonationTrackingPage onBack={() => setCurrentView('home')} onLogout={onLogout} />;
  }

  const recentDonations = [
    {
      id: '1',
      item: '20 lbs fresh produce',
      shelter: 'Hope Kitchen',
      status: 'accepted' as const,
      date: 'Jan 28, 2026',
    },
    {
      id: '2',
      item: 'Assorted baked goods (15 items)',
      shelter: 'Downtown Shelter',
      status: 'pending' as const,
      date: 'Jan 30, 2026',
    },
    {
      id: '3',
      item: '10 lbs canned vegetables',
      shelter: 'Community Center',
      status: 'accepted' as const,
      date: 'Jan 25, 2026',
    },
    {
      id: '4',
      item: '5 gallons of milk',
      shelter: 'Westside Food Bank',
      status: 'no-response' as const,
      date: 'Jan 23, 2026',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <DonorNavbar 
        activeTab="Home"
        onTabChange={(tab) => {
          if (tab === 'My Donations' || tab === 'Track Pickups') {
            setCurrentView('tracking');
          } else if (tab === 'Home') {
            setCurrentView('home');
          }
        }}
        onLogout={onLogout}
      />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-secondary/5 via-background to-accent/5 rounded-[16px] p-8 md:p-10 mb-8 shadow-sm border border-border/30">
          <h1 className="text-3xl md:text-4xl mb-3">
            Welcome back, Maria! 👋
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            You've helped rescue <span className="font-medium text-secondary">145 lbs</span> of food this month
          </p>

          <div className="bg-card/80 backdrop-blur-sm rounded-[14px] p-4 mb-6 inline-block border border-border/50">
            <p className="text-sm text-muted-foreground mb-1">Active shelters near you</p>
            <p className="text-2xl font-medium text-primary">12 shelters</p>
            <p className="text-sm text-muted-foreground">are accepting donations</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="primary" size="lg" onClick={() => setShowDonationForm(true)}>
              Donate Now
            </Button>
            <button 
              onClick={() => setCurrentView('tracking')}
              className="text-secondary hover:text-secondary/80 font-medium transition-colors"
            >
              View my donation history →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Impact Summary */}
            <div>
              <h2 className="text-2xl mb-6">Your Impact</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Package className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div className="text-3xl mb-1 text-accent" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                    145 lbs
                  </div>
                  <p className="text-sm text-muted-foreground">Total donated</p>
                </Card>

                <Card className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Utensils className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div className="text-3xl mb-1 text-accent" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                    ~290
                  </div>
                  <p className="text-sm text-muted-foreground">Meals enabled</p>
                </Card>

                <Card className="text-center">
                  <div className="w-14 h-14 mx-auto rounded-full bg-accent/10 flex items-center justify-center mb-3">
                    <Leaf className="w-7 h-7 text-accent-foreground" />
                  </div>
                  <div className="text-3xl mb-1 text-accent" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                    87 kg
                  </div>
                  <p className="text-sm text-muted-foreground">CO₂ saved</p>
                </Card>
              </div>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="text-2xl mb-6">Quick Actions</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowDonationForm(true)}
                  className="bg-card rounded-[14px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left border border-border/50"
                >
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Package className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg mb-2">Start a Donation</h3>
                  <p className="text-sm text-muted-foreground">List surplus food and connect with local shelters</p>
                </button>

                <button 
                  onClick={() => setCurrentView('tracking')}
                  className="bg-card rounded-[14px] p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-left border border-border/50"
                >
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                    <ClipboardList className="w-7 h-7 text-secondary" />
                  </div>
                  <h3 className="text-lg mb-2">Track My Donations</h3>
                  <p className="text-sm text-muted-foreground">View status and history of all donations</p>
                </button>
              </div>
            </div>

            {/* Recent Donations */}
            <div>
              <RecentDonationsTable 
                donations={recentDonations} 
                onViewAll={() => setCurrentView('tracking')}
              />
            </div>
          </div>

          {/* Sidebar - Map */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl mb-6">Nearby Shelters</h2>
            <MapPreview />
          </div>
        </div>
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

      {/* Donation Form Modal */}
      {showDonationForm && <DonationForm onClose={() => setShowDonationForm(false)} />}
    </div>
  );
}
