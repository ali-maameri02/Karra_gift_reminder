// src/pages/admin/NotificationsPage/Notifications.tsx
'use client';

import { useState } from 'react';
import NotificationsList, {
  NotificationItem,
} from '@/widgets/NotificationsList/ui/NotificationsList';

const NotificationsPage = () => {
  const [selected, setSelected] = useState<NotificationItem | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const handleSelect = (n: NotificationItem) => {
    setSelected(n);
    setDetailsOpen(true);
  };

  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 lg:py-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Notifications
          </h1>
          <p className="text-sm text-gray-500">
            Review alerts from orders, billing, and system events.
          </p>
        </div>
      </div>

      {/* Main content */}
      <NotificationsList onSelectNotification={handleSelect} />

      {/* Details drawer (optional)
      <NotificationDetailsDrawer
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        notification={selected}
      /> */}
    </main>
  );
};

export default NotificationsPage;
