'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

const planSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string().min(1, 'Plan code is required'),
  price: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Price must be a number' })
    .nonnegative('Price must be >= 0'),
  cadence: z.enum(['month', 'year']),
  trialDays: z
    .number()
    .optional()
    .transform((v) => v ?? 0),
  description: z.string().max(400, 'Max 400 characters').optional(),
});

export type NewPlanFormValues = z.infer<typeof planSchema>;

interface AddPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitPlan?: (data: NewPlanFormValues) => Promise<void> | void;
}

export const AddPlanDialog: React.FC<AddPlanDialogProps> = ({
  open,
  onOpenChange,
  onSubmitPlan,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewPlanFormValues>({
    resolver: zodResolver(planSchema) as any,
    defaultValues: {
      name: '',
      code: '',
      price: 0,
      cadence: 'month',
      trialDays: 0,
      description: '',
    },
  });

  const handleSubmit = async (values: NewPlanFormValues) => {
    try {
      setIsSubmitting(true);
      if (onSubmitPlan) {
        await onSubmitPlan(values);
      } else {
        console.log('New plan', values);
      }
      form.reset();
      onOpenChange(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            New Plan
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Define a subscription plan that can be attached to subscriptions.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit as any)}
          className="mt-4 space-y-4"
        >
          <div className="space-y-1">
            <Label htmlFor="name">Plan name</Label>
            <Input
              id="name"
              placeholder="Pro Monthly"
              {...form.register('name')}
            />
            {form.formState.errors.name && (
              <p className="text-xs text-red-500">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="code">Plan code</Label>
            <Input
              id="code"
              placeholder="PLAN_PRO_MONTH"
              {...form.register('code')}
            />
            {form.formState.errors.code && (
              <p className="text-xs text-red-500">
                {form.formState.errors.code.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Label htmlFor="price">Price</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  $
                </span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  className="pl-5"
                  {...form.register('price', { valueAsNumber: true })}
                />
              </div>
              {form.formState.errors.price && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Cadence</Label>
              <Select
                value={form.watch('cadence')}
                onValueChange={(val) =>
                  form.setValue(
                    'cadence',
                    val as NewPlanFormValues['cadence'],
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Monthly</SelectItem>
                  <SelectItem value="year">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="trialDays">Trial days</Label>
              <Input
                id="trialDays"
                type="number"
                {...form.register('trialDays', { valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Short description of the plan..."
              {...form.register('description')}
            />
          </div>

          <div className="mt-2 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={cn(
                'rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90',
              )}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save plan'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
