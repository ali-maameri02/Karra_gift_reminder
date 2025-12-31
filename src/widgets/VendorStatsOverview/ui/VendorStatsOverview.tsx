'use client';

import { Package, DollarSign, TrendingUp, ShoppingCart, Star, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

const vendorStats = [
  {
    label: 'Total Orders',
    value: '247',
    sublabel: 'This month',
    trend: '+18%',
    icon: ShoppingCart,
    color: 'from-emerald-500 to-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    label: 'Revenue',
    value: 'AED 23.4K',
    sublabel: 'This month',
    trend: '+12%',
    icon: DollarSign,
    color: 'from-green-500 to-green-600',
    bg: 'bg-green-50',
  },
  {
    label: 'Top Product',
    value: 'Rose Gift Box',
    sublabel: 'Most sold',
    trend: '156 sold',
    icon: Package,
    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
  },
  {
    label: 'Avg Rating',
    value: '4.8⭐',
    sublabel: 'From 189 reviews',
    trend: '+0.2',
    icon: Star,
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
  },
  {
    label: 'Pending Orders',
    value: '12',
    sublabel: 'Awaiting prep',
    trend: '-3',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-600',
    bg: 'bg-orange-50',
  },
  {
    label: 'Active Customers',
    value: '89',
    sublabel: 'Repeat buyers',
    trend: '+5',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bg: 'bg-blue-50',
  },
];

export const VendorStatsOverview = () => {
  return (
    <section className="w-full">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          Vendor Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Your store performance and key metrics
        </p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {vendorStats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1'
              )}
            >
              <div className={cn('absolute inset-x-0 top-0 h-1 bg-gradient-to-r', item.color)} />
              
              <div className="p-5 flex items-start gap-4">
                <div className={cn(
                  'flex h-12 w-12 items-center justify-center rounded-xl shadow-sm group-hover:shadow-md transition-all',
                  item.bg
                )}>
                  <Icon className="h-6 w-6 text-gray-700" />
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
                      item.trend.startsWith('+') || item.trend.includes('⭐') ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'
                    )}>
                      {item.trend}
                    </span>
                  </div>

                  <div className="mt-2 h-px bg-gradient-to-r from-gray-100 to-gray-100 group-hover:from-emerald-500/30" />
                  
                  <p className="mt-2 text-xs text-gray-500">
                    Live from /api/vendors/{/*vendorId*/}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
