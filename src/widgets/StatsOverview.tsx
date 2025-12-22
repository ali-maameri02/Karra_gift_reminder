'use client';

import {
  Users,
  Gift,
  Truck,
  CreditCard,
  Bell,
  UserCog,
} from 'lucide-react';
import { cn } from '@/lib/utils'; // or remove if you don't use a cn helper

const stats = [
  {
    label: 'Active Users',
    value: '12,430',
    sublabel: 'Last 24h',
    trend: '+4.3%',
    icon: Users,
    color: 'from-primary to-accent-purple',
    bg: 'bg-primary/5',
  },
  {
    label: 'Partners',
    value: '3,210',
    sublabel: 'Private partner links',
    trend: '+2.1%',
    icon: UserCog,
    color: 'from-accent-purple to-primary',
    bg: 'bg-accent-purple/5',
  },
  {
    label: 'Gifts Scheduled',
    value: '842',
    sublabel: 'Next 7 days',
    trend: '+12.5%',
    icon: Gift,
    color: 'from-primary to-accent-red',
    bg: 'bg-accent-red/5',
  },
  {
    label: 'Deliveries in Progress',
    value: '129',
    sublabel: 'Delivery team',
    trend: '+6.0%',
    icon: Truck,
    color: 'from-accent-red to-primary',
    bg: 'bg-primary/5',
  },
  {
    label: 'Payments Processed',
    value: '$18.4K',
    sublabel: 'This month',
    trend: '+8.9%',
    icon: CreditCard,
    color: 'from-primary to-accent-purple',
    bg: 'bg-primary/5',
  },
  {
    label: 'Notifications Sent',
    value: '4,986',
    sublabel: 'Reminders & updates',
    trend: '+15.2%',
    icon: Bell,
    color: 'from-accent-red to-accent-purple',
    bg: 'bg-accent-red/5',
  },
];

export const StatsOverview = () => {
  return (
    <section className="w-full">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-semibold text-primary">
            Dashboard Overview
          </h2>
          <p className="text-xs md:text-sm text-gray-500">
            Key metrics for your gift reminder system at a glance.
          </p>
        </div>
        {/* Optional small tag / time range */}
        <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1">
            Last 24 hours
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className={cn(
                'group relative overflow-hidden rounded-2xl border border-gray-100 bg-white',
                'shadow-sm hover:shadow-md transition-all duration-300',
                'hover:-translate-y-1 hover:cursor-pointer'
              )}
              style={{
                animation: `fadeInUp 0.4s ease-out ${i * 0.05}s both`,
              }}
            >
              {/* Gradient accent bar */}
              <div
                className={cn(
                  'absolute inset-x-0 top-0 h-1 bg-gradient-to-r',
                  item.color
                )}
              />

              <div className="relative p-4 md:p-5 flex items-start gap-4">
                {/* Icon with subtle glow */}
                <div
                  className={cn(
                    'flex h-11 w-11 items-center justify-center rounded-xl',
                    'bg-gradient-to-br from-primary to-accent-purple text-white',
                    'shadow-sm group-hover:shadow-md group-hover:scale-105 transition-transform duration-300',
                    item.bg
                  )}
                >
                  <Icon className="h-5 w-5 text-purple-900" />
                </div>

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium uppercase tracking-wide text-black">
                      {item.label}
                    </p>
                    <span className="text-[11px] rounded-full bg-gray-50 px-2 py-0.5 text-gray-500">
                      {item.sublabel}
                    </span>
                  </div>

                  <div className="mt-2 flex items-baseline justify-between gap-2">
                    <p className="text-xl md:text-2xl font-semibold text-gray-900">
                      {item.value}
                    </p>
                    <span className="text-xs font-medium text-emerald-500 bg-emerald-50 rounded-full px-2 py-1">
                      {item.trend}
                    </span>
                  </div>

                  {/* Animated underline accent */}
                  <div className="mt-3 h-px w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 group-hover:from-primary/40 group-hover:via-accent-purple/60 group-hover:to-accent-red/40 transition-colors duration-300" />

                  {/* Small description row (optional) */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-gray-500">
                    <span>Real-time synced</span>
                    <span className="italic text-gray-400">
                      Updated just now
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

     
    </section>
  );
};
