'use client';

import { useState, useEffect } from 'react';
// import { useAuth } from '@/app/providers/AuthProvider';
import { DeliveriesList, DeliveryItem } from '@/widgets/DeliveriesList/ui/DeliveriesList';
import { DeliveryFilters } from '@/widgets/DeliveryFilters/ui/DeliveryFilters';

const DeliveriesPage = () => {
//   const { userId } = useAuth();
  const [deliveries, setDeliveries] = useState<DeliveryItem[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [loading, setLoading] = useState(true);

  // Fetch deliveries from /api/deliveries
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/deliveries?status=${statusFilter}&range=${dateRange}`);
        const data = await response.json();
        setDeliveries(data);
      } catch (error) {
        console.error('Failed to fetch deliveries:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, [statusFilter, dateRange, ]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-lg text-gray-500">Loading deliveries...</div>
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Deliveries</h1>
        <p className="text-xl text-gray-600">
          Manage your assigned deliveries and tracking
        </p>
      </div>

      {/* Filters */}
      <DeliveryFilters
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />

      {/* Main list */}
      <DeliveriesList deliveries={deliveries} />
    </main>
  );
};

export default DeliveriesPage;
