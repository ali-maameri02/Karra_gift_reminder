'use client';

import { PackageCheck, MapPin, Truck, Clock, CheckCircle, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const deliveryActions = [
  {
    icon: PackageCheck,
    title: 'My Deliveries',
    description: 'View all assigned deliveries',
    href: '/delivery/deliveries',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Truck,
    title: 'New Assignments',
    description: 'Accept new delivery jobs',
    href: '/delivery/assignments',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: MapPin,
    title: 'Tracking',
    description: 'Live tracking & routes',
    href: '/delivery/tracking',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: CheckCircle,
    title: 'Mark Complete',
    description: 'Complete deliveries & update status',
    href: '/delivery/completed',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Clock,
    title: 'Time Report',
    description: 'View delivery times & performance',
    href: '/delivery/reports',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Bell,
    title: 'Notifications',
    description: 'Delivery alerts & updates',
    href: '/delivery/notifications',
    color: 'from-amber-500 to-amber-600',
  },
];

export const DeliveryQuickActions = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Quick Actions
        </h3>
        <p className="text-sm text-gray-500">
          Jump to your delivery tools
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveryActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br bg-gradient-to-br from-white/80 to-gray-50"
            >
              {/* Fixed: Top gradient bar */}
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${action.color}`} />
              
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-center gap-3">
                  {/* Fixed: Missing bg-gradient-to-br + proper className */}
                  <div className={`p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all flex-shrink-0 bg-gradient-to-br ${action.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-blue-600">
                      {action.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pb-4 pt-0">
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {action.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all border-gray-200"
                >
                  <Link to={action.href}>
                    Go to {action.title.split(' ')[0]} <span className="ml-auto">→</span>
                  </Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
