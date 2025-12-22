'use client';

import {
  Plus,
  Package,
  Users,
  Truck,
  DollarSign,
  Bell,
  FileText,
  Settings,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const quickActions = [
  {
    icon: Plus,
    title: 'New Gift Order',
    description: 'Create gift reminder for users',
    href: '/admin/orders/new',
    color: 'from-primary to-accent-purple',
  },
  {
    icon: Package,
    title: 'Manage Inventory',
    description: 'Vendor stock & availability',
    href: '/admin/vendors/inventory',
    color: 'from-accent-red to-primary',
  },
  {
    icon: Truck,
    title: 'Delivery Assignments',
    description: 'Assign delivery personnel',
    href: '/admin/delivery/assignments',
    color: 'from-primary to-accent-red',
  },
  {
    icon: DollarSign,
    title: 'Payment Dashboard',
    description: 'Process refunds & payouts',
    href: '/admin/payments',
    color: 'from-accent-purple to-accent-red',
  },
  {
    icon: Users,
    title: 'Partner Management',
    description: 'Approve partner requests',
    href: '/admin/partners',
    color: 'from-primary to-accent-purple',
  },
  {
    icon: Bell,
    title: 'Notification Center',
    description: 'Bulk send reminders',
    href: '/admin/notifications',
    color: 'from-accent-red to-primary',
  },
];

export const AdminQuickActions = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-primary mb-2">
          Quick Actions
        </h3>
        <p className="text-sm text-gray-500">
          Jump to frequently used admin tools
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Card
              key={action.title}
              className="group relative overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-gradient-to-br bg-gradient-to-br from-white/80 to-gray-50"
            >
              {/* Gradient accent line */}
              <div 
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${action.color}`}
              />
              
              <CardHeader className="pb-3 pt-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'p-2.5 rounded-xl shadow-sm group-hover:shadow-md transition-all duration-300 flex-shrink-0',
                    `bg-gradient-to-br ${action.color} text-white`
                  )}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-primary transition-colors">
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
                  className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-transparent transition-all duration-200 border-gray-200"
                >
                  <Link to={action.href}>
                    Go to {action.title} <ChevronRight className="h-4 w-4 ml-1" />
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
