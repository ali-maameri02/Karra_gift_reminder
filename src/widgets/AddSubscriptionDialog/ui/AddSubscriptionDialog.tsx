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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export type SubscriptionStatus = 'active' | 'trialing' | 'cancelled';

const subscriptionSchema = z.object({
  code: z.string().min(1, 'Subscription code is required'),
  customerName: z.string().min(1, 'Customer name is required'),
  customerEmail: z.string().email('Invalid email'),
  planId: z.string().min(1, 'Plan is required'),
  status: z.enum(['active', 'trialing', 'cancelled']),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().optional(),
  notes: z.string().max(400, 'Max 400 characters').optional(),
});

export type NewSubscriptionFormValues = z.infer<typeof subscriptionSchema>;

interface AddSubscriptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availablePlans: { id: string; name: string; price: number; cadence: string }[];
  onSubmitSubscription?: (data: NewSubscriptionFormValues) => Promise<void> | void;
}

export const AddSubscriptionDialog: React.FC<AddSubscriptionDialogProps> = ({
  open,
  onOpenChange,
  availablePlans,
  onSubmitSubscription,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewSubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema) as any,
    defaultValues: {
      code: '',
      customerName: '',
      customerEmail: '',
      planId: '',
      status: 'active',
      startDate: '',
      endDate: '',
      notes: '',
    },
  });

  const handleSubmit = async (values: NewSubscriptionFormValues) => {
    try {
      setIsSubmitting(true);
      if (onSubmitSubscription) {
        await onSubmitSubscription(values);
      } else {
        console.log('New subscription', values);
      }
      form.reset();
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl rounded-2xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            New Subscription
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Create a subscription for a customer and attach a plan.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit as any)}
          className="mt-4 space-y-4"
        >
          {/* Customer */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="customerName">Customer name</Label>
              <Input
                id="customerName"
                {...form.register('customerName')}
                placeholder="Natashia Bunny"
              />
              {form.formState.errors.customerName && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.customerName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                {...form.register('customerEmail')}
                placeholder="user@example.com"
              />
              {form.formState.errors.customerEmail && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.customerEmail.message}
                </p>
              )}
            </div>
          </div>

          {/* Subscription meta */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Label htmlFor="code">Subscription code</Label>
              <Input
                id="code"
                {...form.register('code')}
                placeholder="SUB-0001"
              />
              {form.formState.errors.code && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Plan</Label>
              <Select
                value={form.watch('planId')}
                onValueChange={(val) => form.setValue('planId', val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select plan" />
                </SelectTrigger>
                <SelectContent>
                  {availablePlans.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.name} · ${p.price}/{p.cadence}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {form.formState.errors.planId && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.planId.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.watch('status')}
                onValueChange={(val) =>
                  form.setValue('status', val as NewSubscriptionFormValues['status'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="trialing">Trialing</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="startDate">Start date</Label>
              <Input
                id="startDate"
                type="date"
                {...form.register('startDate')}
              />
              {form.formState.errors.startDate && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.startDate.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="endDate">End date (optional)</Label>
              <Input id="endDate" type="date" {...form.register('endDate')} />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Trial info, discounts, special terms..."
              {...form.register('notes')}
            />
            {form.formState.errors.notes && (
              <p className="text-xs text-red-500">
                {form.formState.errors.notes.message}
              </p>
            )}
          </div>

          {/* Footer */}
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
              {isSubmitting ? 'Saving...' : 'Save subscription'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
