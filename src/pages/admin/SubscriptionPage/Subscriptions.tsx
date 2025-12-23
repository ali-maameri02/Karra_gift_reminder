// src/pages/admin/SubscriptionPage/Subscriptions.tsx
'use client';

import SubscriptionList from '@/widgets/SubscriptionList/ui/SubscriptionList';
import { PlansPanel } from '@/widgets/PlansPanel';

const SubscriptionsPage = () => {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-4 md:px-6 lg:py-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Subscriptions
          </h1>
          <p className="text-sm text-gray-500">
            Manage active subscriptions, trials, and billing plans.
          </p>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2.1fr)_minmax(0,1fr)]">
        {/* Left: main list */}
        <section aria-label="Subscriptions list" className="min-w-0">
          <SubscriptionList />
        </section>

        {/* Right: plans panel */}
        <section
          aria-label="Subscription plans"
          className="min-w-0 xl:self-start"
        >
          <PlansPanel />
        </section>
      </div>
    </main>
  );
};

export default SubscriptionsPage;
