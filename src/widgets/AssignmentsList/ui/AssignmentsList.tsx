'use client';

import { useMemo, useState } from 'react';
import {
  ShoppingBag,
  PackageCheck,
  Clock,
  MapPin,
  Search,
  Filter,
  Download,
  Check,
  X,
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

export interface AssignmentItem {
  id: string;
  orderId: string;
  customerName: string;
  pickupAddress: string;
  deliveryAddress: string;
  distance: string;
  estimatedTime: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedAt: string;
  expiresAt?: string;
}

const mockAssignments: AssignmentItem[] = [
  {
    id: 'a1',
    orderId: 'ORD-1234',
    customerName: 'Sarah Johnson',
    pickupAddress: 'Vendor Central, Amsterdam',
    deliveryAddress: '123 Main St, Amsterdam (2.4 km)',
    distance: '2.4 km',
    estimatedTime: '18 min',
    priority: 'medium',
    assignedAt: '2025-12-24T10:15:00Z',
  },
  {
    id: 'a2',
    orderId: 'ORD-1236',
    customerName: 'Mike Chen',
    pickupAddress: 'Vendor Central, Utrecht',
    deliveryAddress: '456 Canal Rd, Utrecht (5.1 km)',
    distance: '5.1 km',
    estimatedTime: '32 min',
    priority: 'high',
    assignedAt: '2025-12-24T09:45:00Z',
    expiresAt: '2025-12-24T11:00:00Z',
  },
];

const PAGE_SIZE = 10;

interface AssignmentsListProps {
  assignments: AssignmentItem[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const AssignmentsList: React.FC<AssignmentsListProps> = ({
  assignments,
  onAccept,
  onReject,
}) => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return assignments.filter((a) =>
      a.orderId.toLowerCase().includes(q) ||
      a.customerName.toLowerCase().includes(q)
    );
  }, [search, assignments]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const allOnPageSelected =
    paginated.length > 0 && paginated.every((a) => selectedIds.includes(a.id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginated.some((a) => a.id === id))
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...paginated.map((a) => a.id).filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const getPriorityBadge = (priority: AssignmentItem['priority']) => {
    switch (priority) {
      case 'low':
        return <Badge className="bg-gray-100 text-gray-800">Low</Badge>;
      case 'medium':
        return <Badge className="bg-blue-100 text-blue-800">Medium</Badge>;
      case 'high':
        return <Badge className="bg-orange-100 text-orange-800">High</Badge>;
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      default:
        return <Badge>Normal</Badge>;
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
            placeholder="Search assignments by order ID, customer..."
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
            Priority
          </Button>
          <Button variant="outline" size="sm" className="rounded-full">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          {selectedIds.length > 0 && (
            <Button size="sm" className="rounded-full bg-emerald-600 hover:bg-emerald-700">
              Accept Selected ({selectedIds.length})
            </Button>
          )}
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
                  aria-label="Select all assignments"
                />
              </TableHead>
              <TableHead className="w-32">Order ID</TableHead>
              <TableHead className="min-w-[180px]">Customer</TableHead>
              <TableHead className="w-28 text-center">Priority</TableHead>
              <TableHead className="min-w-[220px]">Pickup → Delivery</TableHead>
              <TableHead className="w-28 text-center">Distance</TableHead>
              <TableHead className="w-28 text-center">Est. Time</TableHead>
              <TableHead className="w-40">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAssignments.map((assignment) => (
              <TableRow key={assignment.id} className="border-b border-gray-50 hover:bg-gray-50/60">
                <TableCell>
                  <Checkbox
                    checked={selectedIds.includes(assignment.id)}
                    onCheckedChange={() => toggleRow(assignment.id)}
                  />
                </TableCell>
                <TableCell className="font-medium text-primary hover:underline cursor-pointer">
                  {assignment.orderId}
                </TableCell>
                <TableCell>
                  <div className="font-medium">{assignment.customerName}</div>
                </TableCell>
                <TableCell className="text-center">
                  {getPriorityBadge(assignment.priority)}
                </TableCell>
                <TableCell className="text-sm">
                  <div className="font-medium text-gray-900">{assignment.pickupAddress}</div>
                  <div className="text-xs text-gray-500 mt-1">{assignment.deliveryAddress}</div>
                </TableCell>
                <TableCell className="text-center font-semibold text-emerald-700">
                  {assignment.distance}
                </TableCell>
                <TableCell className="text-center font-semibold">
                  {assignment.estimatedTime}
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700"
                      onClick={() => onAccept(assignment.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
                      onClick={() => onReject(assignment.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {paginated.length === 0 && (
              <TableRow>
                <TableCell colSpan={8} className="py-12 text-center text-sm text-gray-500">
                  <PackageCheck className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <div>No assignments available</div>
                  <p className="text-xs mt-1 text-gray-400">
                    Check back later for new delivery jobs
                  </p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 md:flex-row">
        <div className="text-sm text-gray-500">
          {paginated.length > 0
            ? `${1 + (currentPage - 1) * PAGE_SIZE}–${Math.min(currentPage * PAGE_SIZE, filtered.length)} of ${filtered.length} assignments`
            : '0 assignments'}
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
          <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
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
