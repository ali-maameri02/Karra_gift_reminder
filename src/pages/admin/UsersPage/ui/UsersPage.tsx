'use client';

import { useState } from 'react';
import { Users, Package, Truck, Eye, MoreHorizontal, EditIcon } from 'lucide-react';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// ✅ Type-safe user interfaces (same as before)
interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  partnerCount: number;
  giftsScheduled: number;
  totalSpent: string;
  status: string;
  avatar: string;
}

interface VendorUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  products: number;
  ordersFulfilled: number;
  revenue: string;
  status: string;
  rating: number;
  avatar: string;
}

interface DeliveryUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  deliveries: number;
  activeOrders: number;
  location: string;
  status: string;
  avatar: string;
}

const mockUsers = {
  customers: [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+1 (555) 123-4567',
      partnerCount: 3,
      giftsScheduled: 12,
      totalSpent: '$1,245',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      id: '2',
      name: 'dd d',
      email: 'dd.j@example.com',
      phone: '+1 (555) 123-4567',
      partnerCount: 3,
      giftsScheduled: 12,
      totalSpent: '$1,245',
      status: 'active',
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
  ] as CustomerUser[],
  vendors: [
    {
      id: 'V001',
      name: 'Gift Haven Store',
      email: 'vendor@gifthaven.com',
      phone: '+1 (555) 987-6543',
      products: 156,
      ordersFulfilled: 342,
      revenue: '$24.8K',
      status: 'verified',
      rating: 4.8,
      avatar: 'https://i.pravatar.cc/150?img=2'
    }
  ] as VendorUser[],
  delivery: [
    {
      id: 'D001',
      name: 'Mike Rodriguez',
      email: 'mike.delivery@example.com',
      phone: '+1 (555) 456-7890',
      deliveries: 89,
      activeOrders: 12,
      location: 'Downtown',
      status: 'online',
      avatar: 'https://i.pravatar.cc/150?img=3'
    }
  ] as DeliveryUser[]
};

type UserTab = 'customers' | 'vendors' | 'delivery';

export const UsersPage = () => {
  const [activeTab, setActiveTab] = useState<UserTab>('customers');

  // ✅ FIX 1: onValueChange expects string, not UserTab
  const handleTabChange = (value: string) => {
    setActiveTab(value as UserTab);
  };

  const renderTableHeaders = () => {
    switch (activeTab) {
      case 'customers':
        return (
          <>
            <TableHead className="w-12"><Checkbox /></TableHead>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Partners</TableHead>
            <TableHead>Gifts</TableHead>
            <TableHead>Spent</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </>
        );
      case 'vendors':
        return (
          <>
            <TableHead className="w-12"><Checkbox /></TableHead>
            <TableHead>Vendor</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Products</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Revenue</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </>
        );
      case 'delivery':
        return (
          <>
            <TableHead className="w-12"><Checkbox /></TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Deliveries</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </>
        );
    }
  };

  const renderTableRows = () => {
    const users = activeTab === 'customers' ? mockUsers.customers :
                  activeTab === 'vendors' ? mockUsers.vendors :
                  mockUsers.delivery;

    return users.map((user: any) => (
      <TableRow key={user.id} className="hover:bg-gray-50/50 border-b border-gray-50 transition-colors">
        <TableCell><Checkbox /></TableCell>
        <TableCell className="font-medium">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent-purple text-white text-xs">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.id}</p>
            </div>
          </div>
        </TableCell>
        <TableCell className="font-medium">{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        
        {activeTab === 'customers' && (
          <>
            <TableCell className="font-medium">{(user as CustomerUser).partnerCount}</TableCell>
            <TableCell>{(user as CustomerUser).giftsScheduled}</TableCell>
            <TableCell className="font-semibold text-primary">{(user as CustomerUser).totalSpent}</TableCell>
          </>
        )}
        
        {activeTab === 'vendors' && (
          <>
            <TableCell>{(user as VendorUser).products}</TableCell>
            <TableCell>{(user as VendorUser).ordersFulfilled}</TableCell>
            <TableCell className="font-semibold text-primary">{(user as VendorUser).revenue}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1 text-sm">
                ★ {(user as VendorUser).rating}
              </div>
            </TableCell>
          </>
        )}
        
        {activeTab === 'delivery' && (
          <>
            <TableCell>{(user as DeliveryUser).deliveries}</TableCell>
            <TableCell>{(user as DeliveryUser).activeOrders}</TableCell>
            <TableCell className="font-medium">{(user as DeliveryUser).location}</TableCell>
          </>
        )}
        
        <TableCell>
          <Badge 
            variant={user.status === 'active' || user.status === 'online' ? 'default' : 'secondary'}
            className={
              user.status === 'active' || user.status === 'online' 
                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }
          >
            {user.status}
          </Badge>
        </TableCell>
        
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='bg-white' align="end">
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <EditIcon/>
                Edit Details
                </DropdownMenuItem>
              <DropdownMenuItem className="text-orange-600">Suspend Account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
            User Management
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Manage customers, vendors, and delivery personnel
          </p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-accent-purple hover:from-primary/90">
          <Users className="w-4 h-4 mr-2" />
          Invite New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/5 to-accent-purple/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-accent-purple text-white">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
                <p className="text-sm text-gray-500">Customers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs + Table */}
      <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-4">
          {/* ✅ FIX 2: Use handleTabChange instead of inline function */}
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-gradient-to-r from-gray-50 to-gray-100 border-0 rounded-2xl p-1">
              <TabsTrigger 
                value="customers" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg"
              >
                <Users className="w-4 h-4 mr-2" />
                Customers
              </TabsTrigger>
              <TabsTrigger 
                value="vendors" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg"
              >
                <Package className="w-4 h-4 mr-2" />
                Vendors
              </TabsTrigger>
              <TabsTrigger 
                value="delivery" 
                className="rounded-xl data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-lg"
              >
                <Truck className="w-4 h-4 mr-2" />
                Delivery
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-gray-100">
                  {renderTableHeaders()}
                </TableRow>
              </TableHeader>
              <TableBody>
                {renderTableRows()}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
