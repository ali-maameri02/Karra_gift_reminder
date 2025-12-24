'use client';

import { useMemo, useState } from 'react';
import {
  PackageCheck,
  MapPin,
  Clock,
  CheckCircle,
  Truck,
  Search,
  Filter,
  Download,
  Eye,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export interface DeliveryItem {
  id: string;
  orderId: string;
  customerName: string;
  customerAddress: string;
  status: 'pending' | 'assigned' | 'in_transit' | 'delivered' | 'failed';
  assignedAt: string;
  eta: string;
  trackingUrl?: string;
}

const mockDeliveries: DeliveryItem[] = [
  {
    id: 'd1',
    orderId: 'ORD-1234',
    customerName: 'Sarah Johnson',
    customerAddress: '123 Main St, Amsterdam',
    status: 'assigned',
    assignedAt: '2025-12-24T09:30:00Z',
    eta: '14:30',
  },
  {
    id: 'd2',
    orderId: 'ORD-1235',
    customerName: 'Mike Chen',
    customerAddress: '456 Canal Rd, Utrecht',
    status: 'in_transit',
    assignedAt: '2025-12-24T08:15:00Z',
    eta: '13:45',
    trackingUrl: 'https://maps.google.com/track/abc123',
  },
];

const PAGE_SIZE = 10;

interface DeliveriesListProps {
  deliveries: DeliveryItem[];
}

export const DeliveriesList: React.FC<DeliveriesListProps> = ({ deliveries }) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return deliveries.filter((d) =>
      d.orderId.toLowerCase().includes(q) ||
      d.customerName.toLowerCase().includes(q) ||
      d.customerAddress.toLowerCase().includes(q)
    );
  }, [search, deliveries]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const allOnPageSelected =
    paginated.length > 0 && paginated.every((d) => selectedIds.includes(d.id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginated.some((d) => d.id === id))
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...paginated.map((d) => d.id).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const getStatusBadge = (status: DeliveryItem['status']) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'assigned':
        return <Badge className="bg-blue-100 text-blue-800">Assigned</Badge>;
      case 'in_transit':
        return <Badge className="bg-emerald-100 text-emerald-800">In Transit</Badge>;
      case 'delivered':
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full border-0 shadow-sm">
      {/* Top bar */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="w-full rounded-full border-gray-200 bg-gray-50 pl-9 pr-3 text-sm focus:bg-white"
            placeholder="Search deliveries by order ID, customer..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="rounded-full">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/60">
              <TableHead className="w-12">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all deliveries"
                />
              </TableHead>
              <TableHead className="w-32">Order ID</TableHead>
              <TableHead className="min-w-[200px]">Customer</TableHead>
              <TableHead className="min-w-[250px]">Address</TableHead>
              <TableHead className="w-32 text-center">Status</TableHead>
              <TableHead className="w-28 text-center">ETA</TableHead>
              <TableHead className="w-32 text-center">Assigned</TableHead>
              <TableHead className="w-40">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockDeliveries.map((delivery) => (
              <TableRow key={delivery.id} className="border-b border-gray-50 hover:bg-gray-50/60">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(delivery.id)}
                    onCheckedChange={() => toggleRow(delivery.id)}
                    aria-label={`Select ${delivery.orderId}`}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <span className="text-primary hover:underline cursor-pointer">
                    {delivery.orderId}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{delivery.customerName}</div>
                </TableCell>
                <TableCell className="text-sm">
                  <div className="line-clamp-2">{delivery.customerAddress}</div>
                </TableCell>
                <TableCell className="text-center">
                  {getStatusBadge(delivery.status)}
                </TableCell>
                <TableCell className="text-center font-semibold text-emerald-700">
                  {delivery.eta}
                </TableCell>
                <TableCell className="text-center text-sm text-gray-500">
                  {new Date(delivery.assignedAt).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-sm text-gray-500">
                  No deliveries found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-xs text-gray-500 md:flex-row">
        <div>
          {paginated.length > 0 ? (
            <>
              {1 + (currentPage - 1) * PAGE_SIZE}–{Math.min(currentPage * PAGE_SIZE, filtered.length)} of {filtered.length} deliveries
            </>
          ) : (
            '0 deliveries'
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span>Page {currentPage} of {totalPages}</span>
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
