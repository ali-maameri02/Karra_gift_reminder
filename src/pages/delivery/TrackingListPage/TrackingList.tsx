'use client';

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const TrackingListPage = () => {
  const sampleDeliveries = ['d123', 'd456', 'd789'];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Tracking</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sampleDeliveries.map((id) => (
          <Link key={id} to={`/delivery/tracking/${id}`}>
            <div className="p-6 border rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 bg-white">
              <h3 className="font-semibold mb-2">Delivery {id.slice(-3)}</h3>
              <p className="text-sm text-gray-500 mb-4">Live tracking</p>
              <Button className="w-full">Track Now</Button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default TrackingListPage;
