import React, { useState } from 'react';
import { Bell, Menu, X, LogOut, User, Building } from 'lucide-react';
import { BreadBridgeLogo } from '@/app/components/logo';

interface DashboardNavbarProps {
  activeTab?: string;
  onNavigate?: (view: 'dashboard' | 'donations' | 'inventory' | 'recipes' | 'routes') => void;
  onLogout?: () => void;
}

const tabToView: Record<string, 'dashboard' | 'donations' | 'inventory' | 'recipes' | 'routes'> = {
  'Dashboard': 'dashboard',
  'Inventory': 'inventory',
  'Donations': 'donations',
  'Recipes': 'recipes',
  'Routes': 'routes',
};

export function DashboardNavbar({ activeTab: externalActiveTab, onNavigate, onLogout }: DashboardNavbarProps) {
  const [activeTab, setActiveTab] = useState(externalActiveTab || 'Dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const tabs = ['Dashboard', 'Inventory', 'Donations', 'Recipes', 'Routes'];

  // Mock notifications
  const notifications = [
    { id: '1', text: 'SaveMart donated 20 lbs of produce', time: '2h ago', unread: true },
    { id: '2', text: 'New recipe unlocked: Vegetable Stew', time: '5h ago', unread: true },
    { id: '3', text: '3 items expiring in 2 days', time: '1d ago', unread: false },
  ];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    if (onNavigate) {
      onNavigate(tabToView[tab]);
    }
  };

  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Hamburger */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg hover:bg-muted transition-colors"
            >
              {showMobileMenu ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <div className="flex items-center gap-2">
              <BreadBridgeLogo className="w-8 h-8" />
              <span className="text-lg font-medium hidden sm:inline" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                FoodBridge
              </span>
            </div>
          </div>

          {/* Desktop Navigation Tabs */}
          <div className="hidden lg:flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`min-h-[44px] px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Right Side - Notifications & Profile */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full hover:bg-muted transition-colors"
              >
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => setShowNotifications(false)}
                        className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors ${
                          notif.unread ? 'bg-primary/5' : ''
                        }`}
                      >
                        <p className="text-sm">{notif.text}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                      </button>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-border">
                    <button className="text-sm text-primary hover:text-primary/80 font-medium">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileMenu(!showProfileMenu);
                  setShowNotifications(false);
                }}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-medium text-sm">
                  HK
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-xl shadow-lg py-2 z-50" style={{ boxShadow: 'var(--shadow-soft)' }}>
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
                  >
                    <User className="w-4 h-4" />
                    Profile Settings
                  </button>
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
                  >
                    <Building className="w-4 h-4" />
                    Shelter Info
                  </button>
                  <hr className="my-2 border-border" />
                  <button 
                    onClick={() => {
                      setShowProfileMenu(false);
                      if (onLogout) onLogout();
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    handleTabClick(tab);
                    setShowMobileMenu(false);
                  }}
                  className={`min-h-[44px] px-4 py-3 rounded-lg transition-all text-left ${
                    activeTab === tab
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}