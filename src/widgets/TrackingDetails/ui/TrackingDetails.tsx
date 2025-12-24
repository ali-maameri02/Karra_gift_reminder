'use client';

import { User, Package, MapPin, Phone, Clock, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrackingDetailsProps {
  delivery: {
    id: string;
    orderId: string;
    customerName: string;
    customerPhone: string;
    pickupAddress: string;
    deliveryAddress: string;
    items: string[];
    specialNotes?: string;
  };
}

export const TrackingDetails: React.FC<TrackingDetailsProps> = ({ delivery }) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-100">
            <Package className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-lg font-semibold">Delivery #{delivery.id.slice(-6)}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Order {delivery.orderId}</span>
              <Badge variant="secondary" className="text-xs">In Transit</Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Customer info */}
        <div className="space-y-2">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <User className="h-4 w-4" />
            Customer
          </h4>
          <div className="space-y-1">
            <div className="font-semibold">{delivery.customerName}</div>
            <Button variant="ghost" size="sm" className="h-7 justify-start p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <Phone className="h-3 w-3 mr-1" />
              Call customer
            </Button>
          </div>
        </div>

        {/* Addresses */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Truck className="h-4 w-4" />
            Route
          </h4>
          <div className="space-y-2">
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-medium text-sm">Pickup</div>
                <div className="text-xs text-gray-600">{delivery.pickupAddress}</div>
              </div>
            </div>
            <div className="flex items-start gap-2 p-3 bg-emerald-50 rounded-xl border-2 border-emerald-100">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0" />
              <div className="space-y-1">
                <div className="font-medium text-sm">Dropoff</div>
                <div className="text-xs text-gray-600 font-semibold">{delivery.deliveryAddress}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div>
          <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
            Items ({delivery.items.length})
          </h4>
          <div className="space-y-2">
            {delivery.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-white border rounded-lg hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  📦
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{item}</div>
                  <div className="text-xs text-gray-500">Fragile</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* {delivery.specialNotes && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl">
            <div className="font-medium text-orange-900 flex items-start gap-2 mb-2">
              📝 Special instructions
            </div>
            <p className="text-sm text-orange-900">{delivery.specialNotes}</p>
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};
