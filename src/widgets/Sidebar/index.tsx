// Sidebar/index.tsx
'use client';

import { useAuth } from '@/app/providers/AuthProvider';
import { AdminSidebar } from '../AdminSidebar/ui/Adminsidebar';
import { VendorSidebar } from '../VendorSidebar/ui/VendorSidebar';
import { DeliverySidebar } from '../DeliverySidebar/ui/DeliverySidebar';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapsed,
}) => {
  const { userRole } = useAuth();

  switch (userRole) {
    case 'admin':
      return (
        <AdminSidebar
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
        />
      );
    case 'vendor':
      return (
        <VendorSidebar
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
        />
      );
    case 'delivery':
      return (
        <DeliverySidebar
          collapsed={collapsed}
          onToggleCollapsed={onToggleCollapsed}
        />
      );
    default:
      return null;
  }
};
