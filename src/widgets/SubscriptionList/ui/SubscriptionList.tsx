'use client';

import { useMemo, useState } from 'react';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Pencil,
  Trash2,
  Download,
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
import {
  AddSubscriptionDialog,
  NewSubscriptionFormValues,
} from '@/widgets/AddSubscriptionDialog';

type SubscriptionStatus = 'active' | 'trialing' | 'cancelled';

interface Subscription {
  id: string;
  code: string;
  customerName: string;
  customerEmail: string;
  planName: string;
  planPrice: number;
  planCadence: string;
  status: SubscriptionStatus;
  startDate: string;
  endDate?: string;
}

const initialSubscriptions: Subscription[] = [
  {
    id: 's1',
    code: 'SUB-0001',
    customerName: 'Natashia Bunny',
    customerEmail: 'natashiabunny@mail.com',
    planName: 'Pro Monthly',
    planPrice: 19,
    planCadence: 'month',
    status: 'active',
    startDate: '2025-01-02',
  },
  {
    id: 's2',
    code: 'SUB-0002',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    planName: 'Starter Yearly',
    planPrice: 99,
    planCadence: 'year',
    status: 'trialing',
    startDate: '2025-01-10',
  },
];

const mockPlans = [
  { id: 'plan_pro_month', name: 'Pro Monthly', price: 19, cadence: 'month' },
  { id: 'plan_pro_year', name: 'Pro Yearly', price: 190, cadence: 'year' },
  { id: 'plan_starter_year', name: 'Starter Yearly', price: 99, cadence: 'year' },
];

const PAGE_SIZE = 10;

const SubscriptionList = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return subscriptions.filter(
      (s) =>
        s.code.toLowerCase().includes(q) ||
        s.customerName.toLowerCase().includes(q) ||
        s.customerEmail.toLowerCase().includes(q),
    );
  }, [search, subscriptions]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const allOnPageSelected =
    paginated.length > 0 &&
    paginated.every((s) => selectedIds.includes(s.id));

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginated.some((s) => s.id === id)),
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...paginated
          .map((s) => s.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleView = (s: Subscription) => {
    console.log('View subscription', s.id);
  };

  const handleEdit = (s: Subscription) => {
    console.log('Edit subscription', s.id);
  };

  const handleDelete = (s: Subscription) => {
    console.log('Delete subscription', s.id);
  };

  const handleExport = () => {
    console.log('Export subscriptions');
  };

  const handleFilterClick = () => {
    console.log('Open filters');
  };

  const handleNewSubscriptionClick = () => {
    setIsAddOpen(true);
  };

  const handleCreateSubscription = async (data: NewSubscriptionFormValues) => {
    const plan = mockPlans.find((p) => p.id === data.planId);
    const newSub: Subscription = {
      id: crypto.randomUUID(),
      code: data.code,
      customerName: data.customerName,
      customerEmail: data.customerEmail,
      planName: plan?.name ?? 'Custom plan',
      planPrice: plan?.price ?? 0,
      planCadence: plan?.cadence ?? 'month',
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
    };
    setSubscriptions((prev) => [newSub, ...prev]);
    setPage(1);
  };

  return (
    <>
    <Card className="w-full border-0 shadow-sm">
      {/* Top bar */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
        {/* Left: title + search (centered relative to header) */}
        <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:gap-4">
          {/* Optional small title; remove if you do not want it */}
          {/* <h2 className="text-sm font-semibold text-gray-900">
            Subscriptions
          </h2> */}

          <div className="relative w-full max-w-xl md:ml-auto md:mr-auto">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-full rounded-full border-gray-200 bg-gray-50 pl-9 pr-3 text-sm focus:bg-white"
              placeholder="Search subscription code, customer..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Right: buttons in one row, centered within their area */}
        <div className="flex w-full items-center justify-center gap-2 md:w-auto md:justify-end">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 text-gray-700"
            onClick={handleFilterClick}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-gray-200 text-gray-700"
            onClick={handleExport}
          >
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>

          <Button
            size="sm"
            className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
            onClick={handleNewSubscriptionClick}
          >
            New Subscription
            <Plus className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>


        {/* Table */}
        <div className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="border-b border-gray-100 bg-gray-50/60">
                <TableHead className="w-10">
                  <Checkbox
                    checked={allOnPageSelected}
                    onCheckedChange={toggleSelectAll}
                    aria-label="Select all subscriptions"
                  />
                </TableHead>
                <TableHead className="w-32">Code</TableHead>
                <TableHead className="min-w-[180px]">Customer</TableHead>
                <TableHead className="min-w-[160px]">Plan</TableHead>
                <TableHead className="w-28 text-right">Price</TableHead>
                <TableHead className="w-32 text-center">Status</TableHead>
                <TableHead className="w-40 text-left">Start date</TableHead>
                <TableHead className="w-32 text-left">End date</TableHead>
                <TableHead className="w-32 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((sub) => (
                <TableRow
                  key={sub.id}
                  className="border-b border-gray-50 hover:bg-gray-50/60"
                >
                  <TableCell className="align-middle">
                    <Checkbox
                      checked={selectedIds.includes(sub.id)}
                      onCheckedChange={() => toggleRow(sub.id)}
                      aria-label={`Select ${sub.code}`}
                    />
                  </TableCell>

                  <TableCell>
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline text-left"
                      onClick={() => handleView(sub)}
                    >
                      {sub.code}
                    </button>
                  </TableCell>

                  <TableCell className="text-sm text-gray-800">
                    <div>{sub.customerName}</div>
                    <div className="text-xs text-gray-500">
                      {sub.customerEmail}
                    </div>
                  </TableCell>

                  <TableCell className="text-sm text-gray-800">
                    {sub.planName}
                    <div className="text-xs text-gray-500">
                      ${sub.planPrice}/{sub.planCadence}
                    </div>
                  </TableCell>

                  <TableCell className="text-right text-sm text-gray-800">
                    ${sub.planPrice.toFixed(2)}
                  </TableCell>

                  <TableCell className="text-center">
                    {sub.status === 'active' && (
                      <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200">
                        Active
                      </Badge>
                    )}
                    {sub.status === 'trialing' && (
                      <Badge className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200">
                        Trialing
                      </Badge>
                    )}
                    {sub.status === 'cancelled' && (
                      <Badge className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-200">
                        Cancelled
                      </Badge>
                    )}
                  </TableCell>

                  <TableCell className="text-sm text-gray-700">
                    {sub.startDate}
                  </TableCell>

                  <TableCell className="text-sm text-gray-400">
                    {sub.endDate || '—'}
                  </TableCell>

                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleView(sub)}
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleEdit(sub)}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleDelete(sub)}
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {paginated.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="py-10 text-center text-sm text-gray-500"
                  >
                    No subscriptions found for this search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-xs text-gray-500 md:flex-row">
          <div>
            {paginated.length > 0 ? (
              <>
                {1 + (currentPage - 1) * PAGE_SIZE} –{' '}
                {Math.min(currentPage * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length} subscriptions
              </>
            ) : (
              '0 subscriptions'
            )}
          </div>

          <div className="flex items-center gap-3">
            <span>The page</span>
            <select
              className="h-8 rounded-full border border-gray-200 bg-white px-3 text-xs"
              value={currentPage}
              onChange={(e) => setPage(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-gray-200"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 rounded-full border-gray-200"
                disabled={currentPage >= totalPages}
                onClick={() =>
                  setPage((p) => Math.min(totalPages, p + 1))
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <AddSubscriptionDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        availablePlans={mockPlans}
        onSubmitSubscription={handleCreateSubscription}
      />
    </>
  );
};

export default SubscriptionList;
