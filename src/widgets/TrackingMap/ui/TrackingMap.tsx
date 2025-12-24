'use client';

import { MapPin, Navigation, Clock, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TrackingMapProps {
  delivery: {
    id: string;
    pickup: string;
    dropoff: string;
    currentLocation: string;
    eta: string;
    distance: string;
  };
}

export const TrackingMap: React.FC<TrackingMapProps> = ({ delivery }) => {
  return (
    <Card className="border-0 bg shadow-lg col-span-1 lg:col-span-2 h-[400px] md:h-[500px] overflow-hidden rounded-2xl">
      <CardContent className="p-0 h-full">
        {/* Map placeholder - replace with real map (Leaflet/Google Maps) */}
        <div className="h-full bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col justify-center items-center relative">
          {/* Map simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#3b82f6_1px,transparent_1px),radial-gradient(circle_at_70%_80%,#10b981_1px,transparent_1px)] bg-gray-50 bg-[length:40px_40px] opacity-30 animate-pulse" />
          
          {/* Current location marker */}
          <div className="relative z-10 bg-white p-3 rounded-2xl shadow-xl border-2 border-emerald-400 ring-4 ring-emerald-50/50">
            <MapPin className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <div className="text-xs font-semibold text-gray-900 text-center">
              {delivery.currentLocation}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium text-center">
              {delivery.distance} away
            </div>
          </div>

          {/* Route line simulation */}
          <div className="absolute left-1/4 top-1/4 w-1/2 h-px bg-gradient-to-r from-emerald-400 to-blue-500 transform rotate-[-15deg] shadow-sm" />
          <div className="absolute right-1/4 bottom-1/4 w-1/2 h-px bg-gradient-to-r from-blue-500 to-emerald-400 transform rotate-[15deg] shadow-sm" />
        </div>

        {/* Map controls */}
        <div className="absolute top-48 left-24 w-[50rem] right-4 flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 bg-white/90 backdrop-blur-sm w-28">
            {/* <Navigation className="h-4 w-4 mr-2" /> */}
            Navigate
          </Button>
          <Button size="sm" variant="ghost" className="bg-white/90 backdrop-blur-sm">
            <Clock className="h-4 w-4 mr-1" />
            ETA {delivery.eta}
          </Button>
        </div>

        {/* Bottom status bar */}
        {/* <div className="relative bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm border rounded-xl p-4 shadow-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              <div>
                <div className="font-semibold text-gray-900">In Transit</div>
                <div className="text-xs text-gray-500">Updated 2 min ago</div>
              </div>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
              On Time
            </Badge>
          </div>
        </div> */}
      </CardContent>
    </Card>
  );
};
