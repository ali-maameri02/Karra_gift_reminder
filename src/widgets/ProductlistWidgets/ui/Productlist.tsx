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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';

type ProductStatus = 'available' | 'out_of_stock';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  size: string | number;
  qty: number;
  date: string; // ISO or formatted
  time: string;
  status: ProductStatus;
  image: string;
}

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    sku: '021231',
    name: 'Beigi Coffe (Navy)',
    price: 20,
    size: 40,
    qty: 234,
    date: '04/17/23',
    time: '8:25 PM',
    status: 'available',
    image: 'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=80',
  },
  {
    id: '2',
    sku: '021232',
    name: 'Story Honzo (Cream)',
    price: 20,
    size: 40,
    qty: 234,
    date: '04/17/23',
    time: '8:25 PM',
    status: 'out_of_stock',
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=80',
  },
  // add more as needed
];

const PAGE_SIZE = 10;

export const ProductList = () => {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return mockProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query)
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, currentPage]);

  const allOnPageSelected =
    paginated.length > 0 &&
    paginated.every((p) => selectedIds.includes(p.id));

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      setSelectedIds((prev) =>
        prev.filter((id) => !paginated.some((p) => p.id === id))
      );
    } else {
      setSelectedIds((prev) => [
        ...prev,
        ...paginated
          .map((p) => p.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleView = (product: Product) => {
    // TODO: open drawer / modal
    console.log('View product', product.id);
  };

  const handleEdit = (product: Product) => {
    // TODO: go to edit page
    console.log('Edit product', product.id);
  };

  const handleDelete = (product: Product) => {
    // TODO: show confirm dialog
    console.log('Delete product', product.id);
  };

  const handleExport = () => {
    // TODO: implement export
    console.log('Export products');
  };

  const handleFilterClick = () => {
    // TODO: open filter sheet / dialog
    console.log('Open filters');
  };

  const handleNewProduct = () => {
    // TODO: navigate to create product page
    console.log('New product');
  };

  return (
    <Card className="w-full border-0 shadow-sm">
      {/* Top bar */}
      <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative w-full max-w-xl">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            className="w-full rounded-full border-gray-200 bg-gray-50 pl-9 pr-3 text-sm focus:bg-white"
            placeholder="Search SKU, product name..."
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
            onClick={handleNewProduct}
          >
            New Product
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
                  aria-label="Select all products"
                />
              </TableHead>
              <TableHead className="min-w-[220px]">Product</TableHead>
              <TableHead className="w-24 text-right">Price</TableHead>
              <TableHead className="w-16 text-center">Size</TableHead>
              <TableHead className="w-16 text-center">QTY</TableHead>
              <TableHead className="w-40 text-left">Date</TableHead>
              <TableHead className="w-32 text-center">Status</TableHead>
              <TableHead className="w-32 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((product) => (
              <TableRow
                key={product.id}
                className="border-b border-gray-50 hover:bg-gray-50/60"
              >
                <TableCell className="align-middle">
                  <Checkbox
                    checked={selectedIds.includes(product.id)}
                    onCheckedChange={() => toggleRow(product.id)}
                    aria-label={`Select ${product.name}`}
                  />
                </TableCell>

                {/* Product */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage src={product.image} alt={product.name} />
                      <AvatarFallback className="rounded-lg bg-gray-100 text-xs">
                        IMG
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        className="text-xs font-medium text-primary hover:underline text-left"
                        onClick={() => handleView(product)}
                      >
                        {product.sku}
                      </button>
                      <span className="text-sm text-gray-800">
                        {product.name}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Price */}
                <TableCell className="text-right text-sm text-gray-800">
                  ${product.price.toFixed(2)}
                </TableCell>

                {/* Size */}
                <TableCell className="text-center text-sm text-gray-700">
                  {product.size}
                </TableCell>

                {/* QTY */}
                <TableCell className="text-center text-sm text-gray-700">
                  {product.qty}
                </TableCell>

                {/* Date */}
                <TableCell className="text-sm text-gray-700">
                  <div>{product.date}</div>
                  <div className="text-xs text-gray-500">{product.time}</div>
                </TableCell>

                {/* Status */}
                <TableCell className="text-center">
                  {product.status === 'available' ? (
                    <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200">
                      Available
                    </Badge>
                  ) : (
                    <Badge className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-200">
                      Out of Stock
                    </Badge>
                  )}
                </TableCell>

                {/* Actions */}
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2 text-gray-500">
                    <button
                      type="button"
                      className="rounded-full p-1 hover:bg-gray-100"
                      onClick={() => handleView(product)}
                      aria-label="View"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-full p-1 hover:bg-gray-100"
                      onClick={() => handleEdit(product)}
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
                          onClick={() => handleDelete(product)}
                        >
                          Delete product
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
                  No products found for this search.
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
              {filtered.length} products
            </>
          ) : (
            '0 products'
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
  );
};
