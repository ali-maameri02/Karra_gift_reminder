// DeliverySidebar.tsx
'use client';

import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Bell, 
  Settings, 
  MapPin, 
  PackageCheck, 
  Search, 
  Home
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import logo from '@/assets/logo.png';

interface DeliverySidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export const DeliverySidebar: React.FC<DeliverySidebarProps> = ({
  collapsed,
  onToggleCollapsed,
}) => {
  return (
    <div className="fixed left-0 top-0 z-40 my-5">
      <div
        className={`
          bg-[#3E236E] text-white flex flex-col rounded-r-2xl
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-64'}
          h-[calc(100vh-2.5rem)]
        `}
      >
        {/* Logo / toggle */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          {!collapsed && (
            <div className="bg-white rounded-full p-2 flex items-center justify-center">
              <img
                src={logo}
                alt="Karaa"
                className={`transition-transform ${
                  collapsed ? 'h-8 w-48 scale-x-150' : 'h-12 w-12 scale-100'
                }`}
              />
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="ml-auto rounded-lg p-2 hover:bg-white/10"
          >
            <div className='flex flex-col justify-around items-center h-4'>
              <span className="block h-0.5 w-4 bg-white" />
              <span className="block h-0.5 w-4 bg-white" />
              <span className="block h-0.5 w-4 bg-white" />
            </div>
          </button>
        </div>

        {/* Search (only when expanded) */}
        {!collapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
              <input
                type="text"
                placeholder="Search deliveries..."
                className="w-full rounded-lg bg-yellow-500/20 px-4 py-2 pl-10 text-white placeholder-white/70 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Navigation - Delivery specific */}
        <nav className="flex-1 space-y-2 px-2 py-4">

        <NavItem
            to="/delivery"
            icon={<Home size={18} />}
            label="Dashboard"
            collapsed={collapsed}
          />
          {/* My Deliveries - from /api/deliveries */}
          <NavItem
            to="/delivery/deliveries"
            icon={<PackageCheck size={18} />}
            label="My Deliveries"
            collapsed={collapsed}
          />
         
          
          {/* Assignments - from /api/deliveries/assign */}
          <NavItem
            to="/delivery/assignments"
            icon={<ShoppingBag size={18} />}
            label="Assignments"
            collapsed={collapsed}
          />
          
          {/* Tracking - from /api/deliveries/{deliveryId}/tracking */}
          <NavItem
            to="/delivery/tracking"
            icon={<MapPin size={18} />}
            label="Tracking"
            collapsed={collapsed}
          />
        </nav>

        {/* Bottom - Required items */}
        <div className="space-y-2 border-t border-white/10 px-2 py-4">
          <NavItem
            to="/delivery/notifications"
            icon={<Bell size={18} />}
            label="Notifications"
            collapsed={collapsed}
          >
            {!collapsed && (
              <Badge variant="secondary" className="ml-2 bg-yellow-400 text-black">
                3
              </Badge>
            )}
          </NavItem>
          
          <NavItem
            to="/delivery/support"
            icon={<PackageCheck size={18} />}
            label="Support"
            collapsed={collapsed}
          />
          
          <NavItem
            to="/delivery/settings"
            icon={<Settings size={18} />}
            label="Settings"
            collapsed={collapsed}
          />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({
  to,
  icon,
  label,
  collapsed,
  children,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  children?: React.ReactNode;
}) => (
  <Link
    to={to}
    className={`flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-white/10 transition-colors ${
      collapsed ? 'justify-center' : ''
    }`}
  >
    {icon}
    {!collapsed && (
      <>
        <span className="text-sm font-medium">{label}</span>
        {children}
      </>
    )}
  </Link>
);
