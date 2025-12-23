// DeliverySidebar.tsx
'use client';

import { Link } from 'react-router-dom';
import { ShoppingBag, Bell, Settings, SearchIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Karaa" className="h-8 w-auto" />
              <span className="font-bold">Karaa</span>
            </div>
          )}
          <button
            type="button"
            onClick={onToggleCollapsed}
            className="ml-auto rounded-lg p-2 hover:bg-white/10"
          >
            <span className="block h-0.5 w-4 bg-white" />
          </button>
        </div>

        {/* Search (only when expanded) */}
        {!collapsed && (
          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="w-full rounded-lg bg-yellow-500/20 px-4 py-2 pl-10 text-white placeholder-white/70 focus:outline-none"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-white/70" />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-2 py-4">
          <NavItem
            to="/delivery/orders"
            icon={<ShoppingBag />}
            label="Orders"
            collapsed={collapsed}
          />
        </nav>

        {/* Bottom */}
        <div className="space-y-2 border-t border-white/10 px-2 py-4">
          <NavItem
            to="/delivery/notifications"
            icon={<Bell />}
            label="Notifications"
            collapsed={collapsed}
          >
            {!collapsed && (
              <Badge variant="secondary" className="ml-2">
                3
              </Badge>
            )}
          </NavItem>
          <NavItem
            to="/delivery/settings"
            icon={<Settings />}
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
        <span>{label}</span>
        {children}
      </>
    )}
  </Link>
);
