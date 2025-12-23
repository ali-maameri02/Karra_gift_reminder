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

// Zod schema – validates text/number fields + ensures at least one image
const productSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  sku: z.string().min(1, 'SKU is required'),
  price: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Price must be a number' })
    .nonnegative('Price must be positive'),
  qty: z
    .number()
    .refine((v) => !Number.isNaN(v), { message: 'Quantity must be a number' })
    .int('Quantity must be an integer')
    .nonnegative('Quantity must be >= 0'),
  color: z.string().optional(),
  status: z.enum(['available', 'out_of_stock']),
  hasImages: z
    .boolean()
    .refine((v) => v, { message: 'At least one image is required' }),
  description: z.string().max(400, 'Max 400 characters').optional(),
});

export type NewProductFormValues = z.infer<typeof productSchema>;

interface AddProductDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  // You can extend this later to (data, files) if needed
  onSubmitProduct?: (data: NewProductFormValues, files: File[]) => Promise<void> | void;
}

export const AddProductDialog: React.FC<AddProductDialogProps> = ({
  open,
  onOpenChange,
  onSubmitProduct,
}) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const form = useForm<NewProductFormValues>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: '',
      sku: '',
      price: 0,
      qty: 0,
      color: '',
      status: 'available',
      hasImages: false,
      description: '',
    },
  });

  const handleFilesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files;
    if (!selected) return;

    const list = Array.from(selected);
    setFiles((prev) => [...prev, ...list]);

    form.setValue('hasImages', true, { shouldValidate: true });
  };

  const removeFileAt = (index: number) => {
    setFiles((prev) => {
      const copy = [...prev];
      copy.splice(index, 1);
      const stillHas = copy.length > 0;
      form.setValue('hasImages', stillHas, { shouldValidate: true });
      return copy;
    });
  };

  const handleSubmit = async (values: NewProductFormValues) => {
    try {
      setIsSubmitting(true);

      if (files.length === 0) {
        form.setValue('hasImages', false, { shouldValidate: true });
        setIsSubmitting(false);
        return;
      }

      if (onSubmitProduct) {
        await onSubmitProduct(values, files);
      } else {
        console.log('New product:', values, files);
      }

      setFiles([]);
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
      <DialogContent className="max-w-lg rounded-2xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-primary">
            New Product
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Add a new product to your catalog. You can edit all details later.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit as any)}
          className="mt-4 space-y-4"
        >
          {/* Name + SKU */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="name">Product name</Label>
              <Input
                id="name"
                placeholder="Valentine Gift Box"
                {...form.register('name')}
              />
              {form.formState.errors.name && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="sku">SKU</Label>
              <Input
                id="sku"
                placeholder="SKU-0001"
                {...form.register('sku')}
              />
              {form.formState.errors.sku && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.sku.message}
                </p>
              )}
            </div>
          </div>

          {/* Price + Qty + Color */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              <Label htmlFor="qty">QTY</Label>
              <Input
                id="qty"
                type="number"
                {...form.register('qty', { valueAsNumber: true })}
              />
              {form.formState.errors.qty && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.qty.message}
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                placeholder="Red / #FF0000"
                {...form.register('color')}
              />
            </div>
          </div>

          {/* Status + Images */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Status</Label>
              <Select
                value={form.watch('status')}
                onValueChange={(val) =>
                  form.setValue(
                    'status',
                    val as NewProductFormValues['status'],
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="out_of_stock">Out of stock</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.status && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.status.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images (files)</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFilesChange}
              />
              {form.formState.errors.hasImages && (
                <p className="text-xs text-red-500">
                  {form.formState.errors.hasImages.message}
                </p>
              )}

              {files.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2 max-h-40 overflow-y-auto pr-1">
                  {files.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div
                        key={index}
                        className="relative h-20 w-full rounded-md border border-gray-200 overflow-hidden"
                      >
                        <img
                          src={previewUrl}
                          alt={file.name}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          className="absolute right-1 top-1 rounded-full bg-white/80 px-1 text-xs text-red-600"
                          onClick={() => removeFileAt(index)}
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <Label htmlFor="description">Description (optional)</Label>
            <Textarea
              id="description"
              rows={3}
              placeholder="Short description about this gift product..."
              {...form.register('description')}
            />
            {form.formState.errors.description && (
              <p className="text-xs text-red-500">
                {form.formState.errors.description.message}
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
              {isSubmitting ? 'Saving...' : 'Save product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
