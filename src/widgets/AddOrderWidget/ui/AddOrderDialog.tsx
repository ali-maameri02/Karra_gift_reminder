'use client';

import * as React from 'react';
import { z } from 'zod';
import { useForm, useFieldArray } from 'react-hook-form';
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

const orderItemSchema = z.object({
  productId: z.string().min(1, 'Product id is required'),
  name: z.string().min(1, 'Product name is required'),
  sku: z.string().min(1, 'SKU is required'),
  quantity: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Quantity must be a number' })
    .int('Quantity must be an integer')
    .positive('Quantity must be > 0'),
  unitPrice: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Unit price must be a number' })
    .nonnegative('Unit price must be >= 0'),
});

const orderSchema = z.object({
  code: z.string().min(1, 'Order code is required'),
  clientName: z.string().min(1, 'Client name is required'),
  status: z.enum(['pending', 'in_progress', 'completed', 'cancelled']),
  notes: z.string().max(400, 'Max 400 characters').optional(),
  items: z
    .array(orderItemSchema)
    .min(1, 'Add at least one item to the order'),
});

export type NewOrderFormValues = z.infer<typeof orderSchema>;

interface AddOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitOrder?: (data: NewOrderFormValues) => Promise<void> | void;
}

export const AddOrderDialog: React.FC<AddOrderDialogProps> = ({
  open,
  onOpenChange,
  onSubmitOrder,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewOrderFormValues>({
    resolver: zodResolver(orderSchema) as any,
    defaultValues: {
      code: '',
      clientName: '',
      status: 'pending',
      notes: '',
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'items',
  });

  const handleAddItemRow = () => {
    append({
      productId: crypto.randomUUID(),
      name: '',
      sku: '',
      quantity: 1,
      unitPrice: 0,
    });
  };

  const handleSubmit = async (values: NewOrderFormValues) => {
    try {
      setIsSubmitting(true);
      if (onSubmitOrder) {
        await onSubmitOrder(values);
      } else {
        console.log('New order:', values);
      }
      form.reset();
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const items = form.watch('items') ?? [];
  const totalAmount = items.reduce(
    (sum, it) => sum + (it.unitPrice || 0) * (it.quantity || 0),
    0,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            New Order
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Create a new order and add items with quantities and prices.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit as any)}
          className="mt-4 space-y-4"
        >
          {/* Header info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="clientName">Client name</Label>
              <Input
                id="clientName"
                placeholder="John Doe"
                {...form.register('clientName')}
              />
              {form.formState.errors.clientName && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.clientName.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="code">Order code</Label>
              <Input
                id="code"
                placeholder="ORD-0001"
                {...form.register('code')}
              />
              {form.formState.errors.code && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>
          </div>

          {/* Status + total */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.watch('status')}
                onValueChange={(val) =>
                  form.setValue(
                    'status',
                    val as NewOrderFormValues['status'],
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            <div className="space-y-1 md:col-span-2">
              <Label>Total amount (calculated)</Label>
              <div className="rounded-md border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Gift card message, delivery instructions..."
              {...form.register('notes')}
            />
            {form.formState.errors.notes && (
              <p className="text-xs text-red-500">
                {form.formState.errors.notes.message}
              </p>
            )}
          </div>

          {/* Order items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Order items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full px-3 text-xs"
                onClick={handleAddItemRow}
              >
                + Add item
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-xs text-gray-500">
                No items yet. Click &quot;Add item&quot; to insert products into the order.
              </p>
            )}

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-12 items-end gap-2 rounded-md border border-gray-100 bg-gray-50/60 p-2"
                >
                  <div className="col-span-4 space-y-1">
                    <Label htmlFor={`items.${index}.name`}>Name</Label>
                    <Input
                      id={`items.${index}.name`}
                      placeholder="Product name"
                      {...form.register(`items.${index}.name` as const)}
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <Label htmlFor={`items.${index}.sku`}>SKU</Label>
                    <Input
                      id={`items.${index}.sku`}
                      placeholder="SKU-0001"
                      {...form.register(`items.${index}.sku` as const)}
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor={`items.${index}.quantity`}>Qty</Label>
                    <Input
                      id={`items.${index}.quantity`}
                      type="number"
                      {...form.register(
                        `items.${index}.quantity` as const,
                        { valueAsNumber: true },
                      )}
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor={`items.${index}.unitPrice`}>
                      Unit price
                    </Label>
                    <Input
                      id={`items.${index}.unitPrice`}
                      type="number"
                      step="0.01"
                      {...form.register(
                        `items.${index}.unitPrice` as const,
                        { valueAsNumber: true },
                      )}
                    />
                  </div>
                  <div className="col-span-1 flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => remove(index)}
                    >
                      ×
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {form.formState.errors.items && (
              <p className="text-xs text-red-500">
                {form.formState.errors.items.message as string}
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
              {isSubmitting ? 'Saving...' : 'Save order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
