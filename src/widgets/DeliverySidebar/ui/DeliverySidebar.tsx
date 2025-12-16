'use client';

import { useAuth } from '@/app/providers/AuthProvider';
import { Link } from 'react-router-dom';
import { ShoppingBag, Bell, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const DeliverySidebar = () => {
//   const { userRole } = useAuth();

  return (
    <div className="w-64 bg-[#3E236E] text-white h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Karaa" className="h-8 w-auto" />
          <span className="font-bold">Karaa</span>
        </div>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-yellow-500/20 text-white placeholder-white/70 focus:outline-none"
          />
          <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavItem to="/delivery/orders" icon={<ShoppingBag />} label="Orders" />
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-white/10 space-y-4">
        <NavItem to="/delivery/notifications" icon={<Bell />} label="Notifications">
          <Badge variant="secondary" className="ml-2">3</Badge>
        </NavItem>
        <NavItem to="/delivery/settings" icon={<Settings />} label="Settings" />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon, label, children }: any) => (
  <Link
    to={to}
    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
  >
    {icon}
    <span>{label}</span>
    {children}
  </Link>
);

const SearchIcon = ({ ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);