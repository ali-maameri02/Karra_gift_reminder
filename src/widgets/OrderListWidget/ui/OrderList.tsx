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
  ListPlus,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import {
  AddOrderDialog,
  NewOrderFormValues,
} from '@/widgets/AddOrderWidget';

type OrderStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled';

interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

interface Order {
  id: string;
  code: string;
  clientName: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  createdAt: string;
}

const initialOrders: Order[] = [
  {
    id: 'o1',
    code: 'ORD-0001',
    clientName: 'John Doe',
    status: 'pending',
    items: [
      {
        productId: '1',
        name: 'Beigi Coffe (Navy)',
        sku: '021231',
        quantity: 1,
        unitPrice: 20,
      },
      {
        productId: '2',
        name: 'Story Honzo (Cream)',
        sku: '021232',
        quantity: 2,
        unitPrice: 20,
      },
    ],
    totalAmount: 60,
    createdAt: '04/21/23 10:15 AM',
  },
  {
    id: 'o2',
    code: 'ORD-0002',
    clientName: 'Jane Smith',
    status: 'completed',
    items: [
      {
        productId: '3',
        name: 'Birthday Surprise Box',
        sku: 'PACK-BDAY-01',
        quantity: 1,
        unitPrice: 35,
      },
    ],
    totalAmount: 35,
    createdAt: '04/22/23 3:45 PM',
  },
];

const PAGE_SIZE = 10;

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return orders.filter(
      (o) =>
        o.code.toLowerCase().includes(query) ||
        o.clientName.toLowerCase().includes(query),
    );
  }, [search, orders]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const allOnPageSelected =
    paginated.length > 0 &&
    paginated.every((o) => selectedIds.includes(o.id));

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginated.some((o) => o.id === id)),
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...paginated
          .map((o) => o.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleView = (order: Order) => {
    console.log('View order', order.id);
  };

  const handleEdit = (order: Order) => {
    console.log('Edit order', order.id);
  };

  const handleDelete = (order: Order) => {
    console.log('Delete order', order.id);
  };

  const handleExport = () => {
    console.log('Export orders');
  };

  const handleFilterClick = () => {
    console.log('Open filters');
  };

  const handleNewOrderClick = () => {
    setIsAddOpen(true);
  };

  const handleQuickAddItem = (order: Order) => {
    console.log('Quick add item to order', order.id);
    // later: open a mini dialog to attach existing products/packs
  };

  const handleCreateOrder = async (data: NewOrderFormValues) => {
    const now = new Date();
    const items: OrderItem[] = data.items.map((it) => ({
      productId: it.productId,
      name: it.name,
      sku: it.sku,
      quantity: it.quantity,
      unitPrice: it.unitPrice,
    }));

    const totalAmount = items.reduce(
      (sum, it) => sum + it.unitPrice * it.quantity,
      0,
    );

    const newOrder: Order = {
      id: crypto.randomUUID(),
      code: data.code,
      clientName: data.clientName,
      status: data.status,
      items,
      totalAmount,
      createdAt: `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setPage(1);
  };

  return (
    <>
      <Card className="w-full border-0 shadow-sm">
        {/* Top bar */}
        <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-full rounded-full border-gray-200 bg-gray-50 pl-9 pr-3 text-sm focus:bg-white"
              placeholder="Search order code, client name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 justify-end">
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
              onClick={handleNewOrderClick}
            >
              New Order
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
                    aria-label="Select all orders"
                  />
                </TableHead>
                <TableHead className="min-w-[160px]">Order</TableHead>
                <TableHead className="min-w-[160px]">Client</TableHead>
                <TableHead className="w-24 text-center">Items</TableHead>
                <TableHead className="w-24 text-right">Total</TableHead>
                <TableHead className="w-32 text-center">Status</TableHead>
                <TableHead className="w-40 text-left">Created at</TableHead>
                <TableHead className="w-40 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((order) => (
                <TableRow
                  key={order.id}
                  className="border-b border-gray-50 hover:bg-gray-50/60"
                >
                  <TableCell className="align-middle">
                    <Checkbox
                      checked={selectedIds.includes(order.id)}
                      onCheckedChange={() => toggleRow(order.id)}
                      aria-label={`Select ${order.code}`}
                    />
                  </TableCell>

                  {/* Order */}
                  <TableCell>
                    <button
                      type="button"
                      className="text-xs font-medium text-primary hover:underline text-left"
                      onClick={() => handleView(order)}
                    >
                      {order.code}
                    </button>
                  </TableCell>

                  {/* Client */}
                  <TableCell className="text-sm text-gray-800">
                    {order.clientName}
                  </TableCell>

                  {/* Items count */}
                  <TableCell className="text-center text-sm text-gray-700">
                    {order.items.length}{' '}
                    <span className="text-[11px] text-gray-400">
                      items
                    </span>
                  </TableCell>

                  {/* Total */}
                  <TableCell className="text-right text-sm text-gray-800">
                    ${order.totalAmount.toFixed(2)}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    {order.status === 'completed' ? (
                      <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200">
                        Completed
                      </Badge>
                    ) : order.status === 'pending' ? (
                      <Badge className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-700 hover:bg-yellow-200">
                        Pending
                      </Badge>
                    ) : order.status === 'in_progress' ? (
                      <Badge className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200">
                        In progress
                      </Badge>
                    ) : (
                      <Badge className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-200">
                        Cancelled
                      </Badge>
                    )}
                  </TableCell>

                  {/* Created at */}
                  <TableCell className="text-sm text-gray-700">
                    {order.createdAt}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleQuickAddItem(order)}
                        aria-label="Add item to order"
                      >
                        <ListPlus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleView(order)}
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleEdit(order)}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="rounded-full p-1 hover:bg-gray-100"
                            aria-label="More"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(order)}
                          >
                            Delete order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {paginated.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="py-10 text-center text-sm text-gray-500"
                  >
                    No orders found for this search.
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
                {filtered.length} orders
              </>
            ) : (
              '0 orders'
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

      {/* Add order dialog */}
      <AddOrderDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmitOrder={handleCreateOrder}
      />
    </>
  );
};

export default OrderList;
