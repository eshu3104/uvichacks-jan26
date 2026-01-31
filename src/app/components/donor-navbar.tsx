import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { BreadBridgeLogo } from '@/app/components/logo';

interface DonorNavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function DonorNavbar({ activeTab = 'Home', onTabChange }: DonorNavbarProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const tabs = ['Home', 'My Donations', 'Track Pickups'];

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <BreadBridgeLogo className="w-8 h-8" />
              <span className="text-lg font-medium" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                FoodBridge
              </span>
            </div>

            {/* Navigation Tabs */}
            <div className="hidden md:flex gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    currentTab === tab
                      ? 'bg-secondary/10 text-secondary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
            </button>

            {/* Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  M
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-[14px] shadow-lg py-2">
                  <a href="#profile" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                    Profile Settings
                  </a>
                  <a href="#business" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                    Business Info
                  </a>
                  <a href="#tax" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                    Tax Documents
                  </a>
                  <hr className="my-2 border-border" />
                  <a href="#logout" className="block px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">
                    Sign Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
