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

const packProductSchema = z.object({
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

const packSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  code: z.string().min(1, 'Code is required'),
  status: z.enum(['active', 'inactive']),
  packPrice: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Pack price must be a number' })
    .nonnegative('Pack price must be >= 0'),
  description: z.string().max(400, 'Max 400 characters').optional(),
  products: z
    .array(packProductSchema)
    .min(1, 'Add at least one product to the pack'),
});

export type NewPackFormValues = z.infer<typeof packSchema>;

interface AddPackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitPack?: (data: NewPackFormValues) => Promise<void> | void;
}

export const AddPackDialog: React.FC<AddPackDialogProps> = ({
  open,
  onOpenChange,
  onSubmitPack,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<NewPackFormValues>({
    resolver: zodResolver(packSchema) as any,
    defaultValues: {
      name: '',
      code: '',
      status: 'active',
      packPrice: 0,
      description: '',
      products: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'products',
  });

  const handleAddProductRow = () => {
    append({
      productId: crypto.randomUUID(),
      name: '',
      sku: '',
      quantity: 1,
      unitPrice: 0,
    });
  };

  const handleSubmit = async (values: NewPackFormValues) => {
    try {
      setIsSubmitting(true);
      if (onSubmitPack) {
        await onSubmitPack(values);
      } else {
        console.log('New pack:', values);
      }
      form.reset();
      onOpenChange(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const products = form.watch('products') ?? [];
  const estimatedTotal = products.reduce(
    (sum, p) => sum + (p.unitPrice || 0) * (p.quantity || 0),
    0,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl rounded-2xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            New Pack
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Create a new pack composed of multiple products with a custom price.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit as any)}
          className="mt-4 space-y-4"
        >
          {/* Basic info */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1 md:col-span-2">
              <Label htmlFor="name">Pack name</Label>
              <Input
                id="name"
                placeholder="Valentine Special Pack"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="code">Pack code</Label>
              <Input
                id="code"
                placeholder="PACK-001"
                {...form.register('code')}
              />
              {form.formState.errors.code && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.code.message}
                </p>
              )}
            </div>
          </div>

          {/* Price + status */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-1">
              <Label htmlFor="packPrice">Pack price</Label>
              <div className="relative">
                <span className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  $
                </span>
                <Input
                  id="packPrice"
                  type="number"
                  step="0.01"
                  className="pl-5"
                  {...form.register('packPrice', { valueAsNumber: true })}
                />
              </div>
              {form.formState.errors.packPrice && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.packPrice.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.watch('status')}
                onValueChange={(val) =>
                  form.setValue('status', val as NewPackFormValues['status'])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Estimated sum of items</Label>
              <div className="rounded-md border border-dashed border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700">
                ${estimatedTotal.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Short description of what is included in this pack..."
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* Products in pack */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Products in this pack</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full px-3 text-xs"
                onClick={handleAddProductRow}
              >
                + Add product to pack
              </Button>
            </div>

            {fields.length === 0 && (
              <p className="text-xs text-gray-500">
                No products added yet. Click &quot;Add product to pack&quot; to start.
              </p>
            )}

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-12 items-end gap-2 rounded-md border border-gray-100 bg-gray-50/60 p-2"
                >
                  <div className="col-span-4 space-y-1">
                    <Label htmlFor={`products.${index}.name`}>Name</Label>
                    <Input
                      id={`products.${index}.name`}
                      placeholder="Product name"
                      {...form.register(`products.${index}.name` as const)}
                    />
                  </div>
                  <div className="col-span-3 space-y-1">
                    <Label htmlFor={`products.${index}.sku`}>SKU</Label>
                    <Input
                      id={`products.${index}.sku`}
                      placeholder="SKU-0001"
                      {...form.register(`products.${index}.sku` as const)}
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor={`products.${index}.quantity`}>
                      Qty
                    </Label>
                    <Input
                      id={`products.${index}.quantity`}
                      type="number"
                      {...form.register(
                        `products.${index}.quantity` as const,
                        { valueAsNumber: true },
                      )}
                    />
                  </div>
                  <div className="col-span-2 space-y-1">
                    <Label htmlFor={`products.${index}.unitPrice`}>
                      Unit price
                    </Label>
                    <Input
                      id={`products.${index}.unitPrice`}
                      type="number"
                      step="0.01"
                      {...form.register(
                        `products.${index}.unitPrice` as const,
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

            {form.formState.errors.products && (
              <p className="text-xs text-red-500">
                {form.formState.errors.products.message as string}
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
              {isSubmitting ? 'Saving...' : 'Save pack'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
