'use client';

import { useMemo, useState } from 'react';
import {
  Bell,
  CheckCheck,
  Trash2,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

export type NotificationType = 'system' | 'orders' | 'billing' | 'users';
export type NotificationSeverity = 'info' | 'success' | 'warning' | 'error';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  severity: NotificationSeverity;
  createdAt: string; // ISO string
  read: boolean;
}

const initialNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New order received',
    message: 'Order #OID-4829 has been placed and is awaiting confirmation.',
    type: 'orders',
    severity: 'info',
    createdAt: '2025-01-22T10:15:00Z',
    read: false,
  },
  {
    id: 'n2',
    title: 'Subscription renewed',
    message: 'Subscription SUB-0001 has been renewed for another month.',
    type: 'billing',
    severity: 'success',
    createdAt: '2025-01-22T09:45:00Z',
    read: true,
  },
  {
    id: 'n3',
    title: 'High failure rate',
    message: 'Payment failure rate exceeded 5% in the last 24 hours.',
    type: 'billing',
    severity: 'warning',
    createdAt: '2025-01-21T22:10:00Z',
    read: false,
  },
];

const PAGE_SIZE = 8;

interface NotificationsListProps {
  onSelectNotification?: (n: NotificationItem) => void;
}

const NotificationsList: React.FC<NotificationsListProps> = ({
  onSelectNotification,
}) => {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<'all' | NotificationType>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>(
    'all',
  );
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const unreadCount = items.filter((n) => !n.read).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return items.filter((n) => {
      if (filterType !== 'all' && n.type !== filterType) return false;
      if (filterRead === 'read' && !n.read) return false;
      if (filterRead === 'unread' && n.read) return false;
      return (
        n.title.toLowerCase().includes(q) ||
        n.message.toLowerCase().includes(q)
      );
    });
  }, [items, search, filterType, filterRead]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const allOnPageSelected =
    paginated.length > 0 &&
    paginated.every((n) => selectedIds.includes(n.id));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginated.some((n) => n.id === id)),
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...paginated
          .map((n) => n.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const bulkMarkRead = () => {
    setItems((prev) =>
      prev.map((n) =>
        selectedIds.includes(n.id) ? { ...n, read: true } : n,
      ),
    );
    setSelectedIds([]);
  };

  const bulkDelete = () => {
    setItems((prev) => prev.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
  };

  const markSingleRead = (id: string) => {
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const resolveSeverityColor = (severity: NotificationSeverity) => {
    switch (severity) {
      case 'success':
        return 'bg-emerald-100 text-emerald-700';
      case 'warning':
        return 'bg-amber-100 text-amber-700';
      case 'error':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  const resolveTypeLabel = (type: NotificationType) => {
    switch (type) {
      case 'orders':
        return 'Orders';
      case 'billing':
        return 'Billing';
      case 'users':
        return 'Users';
      default:
        return 'System';
    }
  };

  return (
    <>
      <Card className="w-full border-0 shadow-sm">
        {/* Header row */}
        <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-700">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">
                Notifications
              </div>
              <div className="text-xs text-gray-500">
                {unreadCount} unread
              </div>
            </div>
          </div>

          {/* Search + filters */}
          <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
            <div className="relative w-full md:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                className="w-full rounded-full border-gray-200 bg-gray-50 pl-9 pr-3 text-xs md:text-sm focus:bg-white"
                placeholder="Search notifications..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full border-gray-200 text-gray-700"
                onClick={() => {
                  // simple cycle through filters; replace with real popover if needed
                  setFilterRead((prev) =>
                    prev === 'all' ? 'unread' : prev === 'unread' ? 'read' : 'all',
                  );
                }}
              >
                <Filter className="mr-2 h-4 w-4" />
                {filterRead === 'all'
                  ? 'All'
                  : filterRead === 'unread'
                  ? 'Unread'
                  : 'Read'}
              </Button>

              {selectedIds.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-gray-200 text-gray-700"
                    onClick={bulkMarkRead}
                  >
                    <CheckCheck className="mr-2 h-4 w-4" />
                    Mark read
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full border-gray-200 text-red-600 hover:bg-red-50"
                    onClick={bulkDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="max-h-[28rem] overflow-y-auto">
          {paginated.length === 0 ? (
            <div className="flex items-center justify-center py-10 text-sm text-gray-500">
              No notifications match this filter.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {/* Header row for checkbox + “mark all read” */}
              <li className="flex items-center gap-3 bg-gray-50/60 px-4 py-2 text-xs text-gray-500">
                <Checkbox
                  checked={allOnPageSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all notifications on page"
                />
                <span className="ml-1">Select</span>
              </li>

              {paginated.map((n) => (
                <li
                  key={n.id}
                  className={`flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-gray-50 ${
                    !n.read ? 'bg-purple-50/40' : ''
                  }`}
                  onClick={() => {
                    markSingleRead(n.id);
                    onSelectNotification?.(n);
                  }}
                >
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRow(n.id);
                    }}
                    className="mt-1"
                  >
                    <Checkbox
                      checked={selectedIds.includes(n.id)}
                      aria-label={`Select ${n.title}`}
                    />
                  </div>

                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                    <Bell className="h-4 w-4 text-purple-600" />
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <p className="max-w-[260px] truncate text-sm font-medium text-gray-900 md:max-w-none">
                        {n.title}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${resolveSeverityColor(
                          n.severity,
                        )}`}
                      >
                        {resolveTypeLabel(n.type)}
                      </span>
                      {!n.read && (
                        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-purple-500" />
                      )}
                    </div>

                    <p className="line-clamp-2 text-xs text-gray-500 md:text-sm">
                      {n.message}
                    </p>

                    <span className="text-[11px] text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / pagination */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-100 px-4 py-3 text-xs text-gray-500 md:flex-row">
          <div>
            {paginated.length > 0 ? (
              <>
                {1 + (currentPage - 1) * PAGE_SIZE}–{Math.min(
                  currentPage * PAGE_SIZE,
                  filtered.length,
                )}{' '}
                of {filtered.length} notifications
              </>
            ) : (
              '0 notifications'
            )}
          </div>

          <div className="flex items-center gap-3">
            <span>Page</span>
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
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default NotificationsList;
