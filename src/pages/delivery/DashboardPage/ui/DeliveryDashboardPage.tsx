// src/pages/delivery/DashboardPage/index.tsx
'use client';

import { DeliveryStatsOverview } from '@/widgets/DeliveryStatsOverview/ui/DeliveryStatsOverview';
import { DeliveryQuickActions } from '@/widgets/DeliveryQuickActions/ui/DeliveryQuickActions';

export const DeliveryDashboardPage = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      

      {/* Stats */}
      <DeliveryStatsOverview />

      {/* Quick actions */}
      <DeliveryQuickActions />
    </div>
  );
};
