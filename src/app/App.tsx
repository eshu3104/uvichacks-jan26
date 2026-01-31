import React, { useState } from 'react';
import { Store, MapPin, UtensilsCrossed } from 'lucide-react';
import { Button } from '@/app/components/button';
import { Card } from '@/app/components/card';
import { BreadBridgeLogo } from '@/app/components/logo';
import { HandsIllustration } from '@/app/components/hands-illustration';
import { ShelterDashboard } from '@/app/components/shelter-dashboard';
import { DonorDashboard } from '@/app/components/donor-dashboard';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'shelter' | 'donor'>('landing');

  if (currentView === 'shelter') {
    return <ShelterDashboard />;
  }

  if (currentView === 'donor') {
    return <DonorDashboard />;
  }

  return (
    <div className="min-h-screen">
      {/* Sticky Minimal Navbar */}
      <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BreadBridgeLogo className="w-10 h-10" />
            <span className="text-xl md:text-2xl">FoodBridge</span>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setCurrentView('donor')}>
              Donor View
            </Button>
            <Button size="sm" variant="primary" onClick={() => setCurrentView('shelter')}>
              Shelter View
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full Viewport */}
      <section className="min-h-[calc(100vh-73px)] flex items-center px-6 md:px-8 py-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight">
              Every meal matters. None should go to waste.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              FoodBridge connects surplus food from businesses and homes to shelters that need it most — with smart routing, inventory tracking, and zero hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="primary" onClick={() => setCurrentView('donor')}>
                I want to donate
              </Button>
              <Button size="lg" variant="outline" onClick={() => setCurrentView('shelter')}>
                I run a shelter
              </Button>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex justify-center lg:justify-end">
            <HandsIllustration className="w-full max-w-md lg:max-w-lg" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-24 px-6 md:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-16">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="bg-[#FAF3E0] text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <Store className="w-10 h-10 text-primary" />
                </div>
              </div>
              <h3 className="text-xl mb-3">Donors list surplus food</h3>
              <p className="text-muted-foreground">
                Restaurants, grocery stores, and individuals post available food with pickup details.
              </p>
            </Card>

            {/* Step 2 */}
            <Card className="bg-[#FAF3E0] text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
                  <MapPin className="w-10 h-10 text-secondary" />
                </div>
              </div>
              <h3 className="text-xl mb-3">We optimize pickup routes</h3>
              <p className="text-muted-foreground">
                Our smart system matches donations with nearby shelters and plans efficient routes.
              </p>
            </Card>

            {/* Step 3 */}
            <Card className="bg-[#FAF3E0] text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                  <UtensilsCrossed className="w-10 h-10 text-accent-foreground" />
                </div>
              </div>
              <h3 className="text-xl mb-3">Shelters serve fresh meals</h3>
              <p className="text-muted-foreground">
                Communities receive nutritious food quickly, reducing waste and feeding those in need.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 md:py-24 px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            <div className="text-center">
              <div className="text-5xl md:text-6xl mb-3 text-accent" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                12,400 lbs
              </div>
              <p className="text-lg text-foreground/70">Food rescued this month</p>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl mb-3 text-accent" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                89
              </div>
              <p className="text-lg text-foreground/70">Active shelters served</p>
            </div>

            <div className="text-center">
              <div className="text-5xl md:text-6xl mb-3 text-accent" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                34,000+
              </div>
              <p className="text-lg text-foreground/70">Meals enabled</p>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left Half - For Donors */}
        <div className="bg-primary/10 px-8 md:px-12 py-16 md:py-20 flex items-center">
          <div className="max-w-lg mx-auto text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl mb-4">For Donors</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Turn surplus into impact. List your extra food in minutes and see it go directly to those who need it. Tax-deductible, zero cost, maximum good.
            </p>
            <Button size="lg" variant="primary" onClick={() => setCurrentView('donor')}>
              Start Donating
            </Button>
          </div>
        </div>

        {/* Right Half - For Shelters */}
        <div className="bg-secondary/10 px-8 md:px-12 py-16 md:py-20 flex items-center">
          <div className="max-w-lg mx-auto text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl mb-4">For Shelters</h2>
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Access fresh food daily. Browse available donations, schedule pickups, and track inventory — all in one simple platform designed for you.
            </p>
            <Button size="lg" variant="secondary" onClick={() => setCurrentView('shelter')}>
              Join as Shelter
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-6">
            <div className="flex items-center gap-3">
              <BreadBridgeLogo className="w-8 h-8" />
              <span className="text-lg" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                FoodBridge
              </span>
            </div>
            
            <div className="flex gap-8 text-sm">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                About
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </a>
              <a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </a>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-foreground/70">
              Made with ♥ for UVICHacks 2025
            </p>
            <p className="text-sm text-muted-foreground">
              FoodBridge is an intermediary platform. All food safety responsibilities remain with donors.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
