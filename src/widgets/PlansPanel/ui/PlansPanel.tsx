'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AddPlanDialog, NewPlanFormValues } from '@/widgets/AddPlanDialog';

export interface Plan {
  id: string;
  name: string;
  code: string;
  price: number;
  cadence: 'month' | 'year';
  trialDays: number;
  description?: string;
}

const initialPlans: Plan[] = [
  {
    id: 'plan_pro_month',
    name: 'Pro Monthly',
    code: 'PLAN_PRO_MONTH',
    price: 19,
    cadence: 'month',
    trialDays: 7,
    description: 'Best for growing teams.',
  },
  {
    id: 'plan_pro_year',
    name: 'Pro Yearly',
    code: 'PLAN_PRO_YEAR',
    price: 190,
    cadence: 'year',
    trialDays: 14,
    description: 'Save 2 months with yearly billing.',
  },
];

const PlansPanel = () => {
    const [plans, setPlans] = useState<Plan[]>(initialPlans);
    const [isAddOpen, setIsAddOpen] = useState(false);
  
    const handleAddPlan = async (data: NewPlanFormValues) => {
      const newPlan: Plan = {
        id: crypto.randomUUID(),
        name: data.name,
        code: data.code,
        price: data.price,
        cadence: data.cadence,
        trialDays: data.trialDays ?? 0,
        description: data.description,
      };
      setPlans((prev) => [newPlan, ...prev]);
    };
  
    return (
      <>
        <Card className="w-full border-0 shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">
                Plans
              </h2>
              <p className="text-xs text-gray-500">
                Billing plans used by subscriptions.
              </p>
            </div>
            <Button
              size="sm"
              className="rounded-full bg-primary px-3 text-xs text-primary-foreground hover:bg-primary/90"
              onClick={() => setIsAddOpen(true)}
            >
              New plan
            </Button>
          </div>
  
          <div className="max-h-[22rem] space-y-3 overflow-y-auto px-4 py-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className="rounded-lg bg-gray-50 px-3 py-2 text-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium text-gray-900">
                      {plan.name}
                    </div>
                    <div className="text-xs text-gray-500">{plan.code}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      ${plan.price}
                      <span className="text-xs text-gray-500">
                        /{plan.cadence}
                      </span>
                    </div>
                    {plan.trialDays > 0 && (
                      <div className="text-[11px] text-emerald-600">
                        {plan.trialDays} days trial
                      </div>
                    )}
                  </div>
                </div>
  
                {plan.description && (
                  <p className="mt-1 text-xs text-gray-500">
                    {plan.description}
                  </p>
                )}
  
                <div className="mt-2 flex items-center justify-between">
                  <Badge className="rounded-full bg-purple-100 px-2 py-0.5 text-[11px] text-purple-700">
                    Active
                  </Badge>
                  <div className="flex gap-2 text-xs text-primary">
                    <button type="button" className="hover:underline">
                      Edit
                    </button>
                    <button
                      type="button"
                      className="text-red-500 hover:underline"
                    >
                      Archive
                    </button>
                  </div>
                </div>
              </article>
            ))}
  
            {plans.length === 0 && (
              <p className="text-xs text-gray-500">
                No plans yet. Click &quot;New plan&quot; to add one.
              </p>
            )}
          </div>
        </Card>
  
        <AddPlanDialog
          open={isAddOpen}
          onOpenChange={setIsAddOpen}
          onSubmitPlan={handleAddPlan}
        />
      </>
    );
  };
  

export default PlansPanel;
