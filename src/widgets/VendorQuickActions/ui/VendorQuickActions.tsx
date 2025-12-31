'use client';

import { Package, Plus, DollarSign, TrendingUp, Star, Truck, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const vendorActions = [
  {
    icon: Package,
    title: 'Manage Products',
    description: 'View, edit and add products (/api/products)',
    href: '/vendor/products',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Plus,
    title: 'New Product',
    description: 'Add new gift items to your catalog',
    href: '/vendor/products/new',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Truck,
    title: 'Pending Orders',
    description: 'Prepare and update order status (/api/vendors/{id}/orders)',
    href: '/vendor/orders',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: DollarSign,
    title: 'Payouts',
    description: 'View earnings and request payouts',
    href: '/vendor/payments',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: TrendingUp,
    title: 'Analytics',
    description: 'Sales trends and performance reports',
    href: '/vendor/analytics',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Star,
    title: 'Reviews',
    description: 'Customer feedback and ratings',
    href: '/vendor/reviews',
    color: 'from-amber-500 to-amber-600',
  },
];

export const VendorQuickActions = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Quick Actions
        </h3>
        <p className="text-sm text-gray-500">
          Jump to your vendor tools
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {vendorActions.map((action) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br bg-gradient-to-br from-white/80 to-gray-50"
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${action.color}`} />
              
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all flex-shrink-0 bg-gradient-to-br ${action.color} text-white`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-emerald-600">
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
                  className="w-full group-hover:bg-emerald-600 group-hover:text-white transition-all border-gray-200"
                >
                  <Link to={action.href}>
                    Go to {action.title} <span className="ml-auto">→</span>
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
