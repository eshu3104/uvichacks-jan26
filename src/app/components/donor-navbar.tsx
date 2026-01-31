import React, { useState } from 'react';
import { Bell, LogOut, User, Building, FileText } from 'lucide-react';
import { BreadBridgeLogo } from '@/app/components/logo';

interface DonorNavbarProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onLogout?: () => void;
}

export function DonorNavbar({ activeTab = 'Home', onTabChange, onLogout }: DonorNavbarProps) {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const tabs = ['Home', 'My Donations', 'Track Pickups'];

  // Mock notifications
  const notifications = [
    { id: '1', text: 'Hope Kitchen accepted your donation', time: '2h ago', unread: true },
    { id: '2', text: 'Pickup scheduled for tomorrow at 2 PM', time: '5h ago', unread: true },
    { id: '3', text: 'Thank you! Your donation fed 50 people', time: '1d ago', unread: false },
  ];

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
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <BreadBridgeLogo className="w-8 h-8" />
              <span className="text-lg font-medium" style={{ fontFamily: 'DM Serif Display, Georgia, serif' }}>
                FoodBridge
              </span>
            </button>

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
            <div className="relative">
              <button 
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowProfileMenu(false);
                }}
                className="relative p-2 rounded-full hover:bg-muted transition-colors"
              >
                <Bell className="w-5 h-5 text-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-[14px] shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-border">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <button
                        key={notif.id}
                        onClick={() => setShowNotifications(false)}
                        className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors ${
                          notif.unread ? 'bg-secondary/5' : ''
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
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
                  M
                </div>
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-[14px] shadow-lg py-2">
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
                    Business Info
                  </button>
                  <button 
                    onClick={() => setShowProfileMenu(false)}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors text-left"
                  >
                    <FileText className="w-4 h-4" />
                    Tax Documents
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
      </div>
    </nav>
  );
}
