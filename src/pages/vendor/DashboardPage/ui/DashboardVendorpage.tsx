// src/pages/vendor/DashboardPage/index.tsx
'use client';

import { VendorStatsOverview } from '@/widgets/VendorStatsOverview/ui/VendorStatsOverview';
import { VendorQuickActions } from '@/widgets/VendorQuickActions/ui/VendorQuickActions';

export const DashboardVendorpage = () => {
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Vendor Dashboard
        </h1>
        <p className="text-xl text-gray-600">
          Manage your store, orders and analytics
        </p>
      </div>

      <VendorStatsOverview />
      <VendorQuickActions />
    </div>
  );
};
