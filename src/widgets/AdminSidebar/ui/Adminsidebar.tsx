'use client';

import {
  Home,
  Package,
  Boxes,
  ShoppingBag,
  Bell,
  HelpCircle,
  Settings,
  Users,
  CreditCard,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';
import profilepic from '@/assets/photo_2025-12-16_04-52-51.jpg';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  collapsed,
  onToggleCollapsed,
}) => {
  const user = {
    name: 'Maamri ali',
    email: 'ali@see-vra.com',
    avatar: profilepic,
  };

  return (
    <div className="fixed top-0 left-0 z-40 my-5">
      <div
        className={`
          bg-[#3E236E] text-white flex flex-col rounded-r-2xl
          transition-all duration-300 ease-in-out
          ${collapsed ? 'w-16' : 'w-60'}
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
        {/* Search (expanded only) */}
        {!collapsed && (
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-yellow-500/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-yellow-400/70"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto sidebar-scroll">
          <SidebarItem
            icon={<Home size={18} />}
            label="Dashboard"
            to="/admin"
            isCollapsed={collapsed}
          />
          <SidebarItem
            icon={<Package size={18} />}
            label="Products"
            to="/admin/products"
            isCollapsed={collapsed}
          />
          <SidebarItem
            icon={<Boxes size={18} />}
            label="Packs"
            to="/admin/packs"
            isCollapsed={collapsed}
          />
          <SidebarItem
            icon={<ShoppingBag size={18} />}
            label="Orders"
            to="/admin/orders"
            isCollapsed={collapsed}
          />
          <SidebarItem
            icon={<Users size={18} />}
            label="Users"
            to="/admin/users"
            isCollapsed={collapsed}
          />
          <SidebarItem
            icon={<CreditCard size={18} />}
            label="Subscriptions"
            to="/admin/subscriptions"
            isCollapsed={collapsed}
          />
        </nav>

        {/* Bottom section */}
        <div className="px-2 py-4 border-t border-white/10 space-y-1">
          <SidebarItem
            icon={<Bell size={18} />}
            label="Notifications"
            to="/admin/notifications"
            isCollapsed={collapsed}
            badge={
              collapsed ? null : (
                <Badge
                  variant="secondary"
                  className="ml-auto bg-yellow-400 text-black"
                >
                  12
                </Badge>
              )
            }
          />
          <SidebarItem
            icon={<HelpCircle size={18} />}
            label="Support"
            to="/admin/support"
            isCollapsed={collapsed}
          />
          <SidebarItem
            icon={<Settings size={18} />}
            label="Settings"
            to="/admin/settings"
            isCollapsed={collapsed}
          />

          {!collapsed && (
            <div className="mt-4 flex items-center gap-3 rounded-lg bg-white/10 p-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full"
              />
              <div className="min-w-0">
                <div className="truncate text-sm font-medium text-white">
                  {user.name}
                </div>
                <div className="truncate text-xs text-white/70">
                  {user.email}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/10 hover:text-yellow-200 transition-colors ${
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

const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
