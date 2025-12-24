'use client';

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TrackingMap } from '@/widgets/TrackingMap/ui/TrackingMap';
import { TrackingDetails } from '@/widgets/TrackingDetails/ui/TrackingDetails';
import { TrackingActions } from '@/widgets/TrackingActions/ui/TrackingActions';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const mockDelivery = {
    id: 'd123',
    orderId: 'ORD-5678',
    customerName: 'Ali Mohammed Ahmed',
    customerPhone: '+971 50 123 4567',
    pickupAddress: 'Retail Center, Sheikh Zayed Road, Dubai',
    deliveryAddress: 'Burj Khalifa, Downtown Dubai, Apt 1804',
    currentLocation: 'Sheikh Zayed Road (2.1 km to delivery)',
    eta: '14:25',
    distance: '2.1 km',
    items: ['Luxury Chocolate Gift (Heat Sensitive)', 'Red Roses Bouquet (Very Fragile)', 'Personalized Greeting Card'],
    specialNotes: 'Leave with security guard if no answer. Recipient prefers morning delivery. Call before arrival.',
  };
  

const TrackingPage = () => {
  const { deliveryId } = useParams();
  const [progress, setProgress] = useState(65);

  // ✅ Map delivery data for TrackingMap (fixes type error)
  const mapDeliveryData = {
    id: mockDelivery.id,
    pickup: mockDelivery.pickupAddress,        // ✅ Map to expected prop
    dropoff: mockDelivery.deliveryAddress,     // ✅ Map to expected prop
    currentLocation: mockDelivery.currentLocation,
    eta: mockDelivery.eta,
    distance: mockDelivery.distance,
  };

  // Simulate real-time tracking updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 3;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleMarkComplete = async () => {
    try {
      await fetch(`/api/deliveries/${deliveryId}/complete`, { method: 'POST' });
      toast.success('Delivery completed successfully!');
    } catch (error) {
      toast.error('Failed to complete delivery');
    }
  };

  const handlePause = () => {
    toast.info('Delivery paused');
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 lg:px-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Button variant="outline" size="sm" className="h-8" asChild>
            <Link to="/delivery/deliveries">← Back to Deliveries</Link>
          </Button>
          <div className="h-2 w-20 bg-emerald-400 rounded-full animate-pulse" />
          <div className="text-3xl font-bold text-gray-900">Live Tracking</div>
        </div>
        <p className="text-xl text-gray-600">Track delivery in real-time</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Map - ✅ Fixed type error */}
        <TrackingMap delivery={mapDeliveryData} />

        {/* Details Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <TrackingDetails delivery={mockDelivery} />
          <TrackingActions
            progress={progress}
            onMarkComplete={handleMarkComplete}
            onPause={handlePause}
          />
        </div>
      </div>
    </main>
  );
};

export default TrackingPage;
