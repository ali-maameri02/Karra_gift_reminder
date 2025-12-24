'use client';

import { Truck, PackageCheck, MapPin, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const deliveryStats = [
  {
    label: 'Today\'s Deliveries',
    value: '18',
    sublabel: 'Active',
    trend: '+2',
    icon: Truck,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
  },
  {
    label: 'Pending Assignments',
    value: '5',
    sublabel: 'Awaiting pickup',
    trend: '-1',
    icon: PackageCheck,
    color: 'from-indigo-500 to-indigo-600',
    bg: 'bg-indigo-50',
  },
  {
    label: 'On Route',
    value: '12',
    sublabel: 'In transit',
    trend: '+3',
    icon: MapPin,
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    label: 'On-time Rate',
    value: '94%',
    sublabel: 'This week',
    trend: '+1.2%',
    icon: Clock,
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
  },
  {
    label: 'Completed Today',
    value: '23',
    sublabel: 'Delivered',
    trend: '+4',
    icon: CheckCircle,
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
  },
];

export const DeliveryStatsOverview = () => {
  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Delivery Overview
        </h2>
        <p className="text-sm text-gray-500">
          Today's deliveries and performance metrics
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {deliveryStats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'
              )}
            >
              {/* Top gradient bar */}
              <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', item.color)} />
              
              <div className="p-5 flex items-start gap-4">
                {/* Icon background - fixed with proper bg classes */}
                <div className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300',
                  item.bg
                )}>
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                      {item.label}
                    </p>
                    <span className="text-xs bg-gray-50 px-2 py-1 rounded-full text-gray-600">
                      {item.sublabel}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-bold text-gray-900">
                      {item.value}
                    </p>
                    <span className={cn(
                      'text-sm font-semibold px-2 py-1 rounded-full',
                      item.trend.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                    )}>
                      {item.trend}
                    </span>
                  </div>

                  {/* Hover accent line - fixed */}
                  <div className="mt-2 h-px bg-gradient-to-r from-gray-100 to-gray-100 group-hover:from-blue-500/30 group-hover:to-emerald-500/30 transition-colors duration-300" />
                  
                 
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
