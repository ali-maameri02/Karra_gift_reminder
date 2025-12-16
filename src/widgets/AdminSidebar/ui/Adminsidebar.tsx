'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Home, Package, Boxes, ShoppingBag, Bell, HelpCircle, Settings, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import profilepic from '@/assets/photo_2025-12-16_04-52-51.jpg';

export const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // true = icon-only

  const user = {
    name: 'Maamri ali',
    email: 'ali@see-vra.com',
    avatar: profilepic,
  };

  // Toggle sidebar
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  return (
    <div className="sticky top-0 my-5 h-screen">
      {/* 🌐 Responsive Sidebar */}
      <div
        className={`bg-[#3E236E] text-white flex flex-col transition-all duration-300 rounded-r-3xl ease-in-out ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        style={{ height: '100vh' }}
      >
        {/* Logo Toggle (Top) */}
        <div className="p-4 border-b border-white/10">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="w-full h-12 rounded-xl"
          >
            <div className="bg-white rounded-full p-2 flex items-center justify-center">
              <img src={logo} alt="Karaa" className={`h-12 w-12 ${isCollapsed ? 'scale-x-150 w-24 h-8' : 'scale-100'} `} />
            </div>
          </Button>
        </div>

        {/* Search (only visible when expanded) */}
        {!isCollapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-yellow-500/20 text-white placeholder-white/70 focus:outline-none"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
            </div>
          </div>
        )}

        {/* Navigation — Icons always visible */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          <SidebarItem icon={<Home />} label="Dashboard" to="/admin" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Package />} label="Products" to="/admin/products" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Boxes />} label="Packs" to="/admin/packs" isCollapsed={isCollapsed} />
          <SidebarItem icon={<ShoppingBag />} label="Orders" to="/admin/orders" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Users />} label="Users" to="/admin/users" isCollapsed={isCollapsed} />
        </nav>

        {/* Bottom Section */}
        <div className="px-2 py-4 border-t border-white/10 space-y-1">
          <SidebarItem 
            icon={<Bell />} 
            label="Notifications" 
            to="/admin/notifications" 
            isCollapsed={isCollapsed}
            badge={isCollapsed ? null : <Badge variant="secondary" className="ml-2">12</Badge>}
          />
          <SidebarItem icon={<HelpCircle />} label="Support" to="/admin/support" isCollapsed={isCollapsed} />
          <SidebarItem icon={<Settings />} label="Settings" to="/admin/settings" isCollapsed={isCollapsed} />

          {/* User Profile (full only) */}
          {!isCollapsed && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/10 mt-4">
              <img src={user.avatar} alt={user.name} className="h-8 w-8 rounded-full" />
              <div className="min-w-0">
                <div className="text-sm font-medium text-white truncate">{user.name}</div>
                <div className="text-xs text-white/70 truncate">{user.email}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// 🔹 Sidebar Item Component
const SidebarItem = ({
  icon,
  label,
  to,
  isCollapsed,
  badge = null,
}: {
  icon: React.ReactNode;
  label: string;
  to: string;
  isCollapsed: boolean;
  badge?: React.ReactNode;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 transition-colors ${
      isCollapsed ? 'justify-center px-2' : 'justify-start'
    }`}
  >
    <span className="flex-shrink-0">{icon}</span>
    {!isCollapsed && (
      <>
        <span className="text-sm font-medium text-white">{label}</span>
        {badge}
      </>
    )}
  </Link>
);

// 🔹 Search Icon
const SearchIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);