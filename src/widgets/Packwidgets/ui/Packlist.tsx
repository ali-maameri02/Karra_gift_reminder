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
  PackagePlus,
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
import { Card } from '@/components/ui/card';
import {
  AddPackDialog,
  NewPackFormValues,
} from '@/widgets/AddPackWidget';

type PackStatus = 'active' | 'inactive';

interface PackProduct {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number;
}

interface Pack {
  id: string;
  name: string;
  code: string;
  status: PackStatus;
  packPrice: number;
  products: PackProduct[];
  createdAt: string;
}

// Mock packs
const initialPacks: Pack[] = [
  {
    id: 'p1',
    name: 'Valentine Couple Pack',
    code: 'PACK-VAL-01',
    status: 'active',
    packPrice: 49.99,
    products: [
      {
        productId: '1',
        name: 'Beigi Coffe (Navy)',
        sku: '021231',
        quantity: 1,
        unitPrice: 20,
      },
      {
        productId: '2',
        name: 'Story Honzo (Cream)',
        sku: '021232',
        quantity: 1,
        unitPrice: 20,
      },
    ],
    createdAt: '04/20/23 8:25 PM',
  },
  {
    id: 'p2',
    name: 'Birthday Surprise Box',
    code: 'PACK-BDAY-01',
    status: 'inactive',
    packPrice: 35.0,
    products: [
      {
        productId: '3',
        name: 'Gift Mug',
        sku: '050001',
        quantity: 1,
        unitPrice: 10,
      },
    ],
    createdAt: '05/10/23 4:10 PM',
  },
];

const PAGE_SIZE = 10;

const PackList = () => {
  const [packs, setPacks] = useState<Pack[]>(initialPacks);
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const filtered = useMemo(() => {
    const query = search.toLowerCase();
    return packs.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.code.toLowerCase().includes(query),
    );
  }, [search, packs]);

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
        prev.filter((id) => !paginated.some((p) => p.id === id)),
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
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleView = (pack: Pack) => {
    console.log('View pack', pack.id);
  };

  const handleEdit = (pack: Pack) => {
    console.log('Edit pack', pack.id);
  };

  const handleDelete = (pack: Pack) => {
    console.log('Delete pack', pack.id);
  };

  const handleExport = () => {
    console.log('Export packs');
  };

  const handleFilterClick = () => {
    console.log('Open filters');
  };

  const handleNewPackClick = () => {
    setIsAddOpen(true);
  };

  const handleQuickAddProduct = (pack: Pack) => {
    console.log('Quick add product to pack', pack.id);
    // later: open small side dialog to attach existing products
  };

  const handleCreatePack = async (data: NewPackFormValues) => {
    const now = new Date();
    const newPack: Pack = {
      id: crypto.randomUUID(),
      name: data.name,
      code: data.code,
      status: data.status,
      packPrice: data.packPrice,
      products: data.products.map((p) => ({
        productId: p.productId,
        name: p.name,
        sku: p.sku,
        quantity: p.quantity,
        unitPrice: p.unitPrice,
      })),
      createdAt: `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })}`,
    };

    setPacks((prev) => [newPack, ...prev]);
    setPage(1);
  };

  return (
    <>
      <Card className="w-full border-0 shadow-sm">
        {/* Top bar */}
        <div className="flex flex-col gap-3 border-b border-gray-100 px-4 py-3 md:flex-row md:items-center md:justify-between">
          {/* Search */}
          <div className="relative w-full max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              className="w-full rounded-full border-gray-200 bg-gray-50 pl-9 pr-3 text-sm focus:bg-white"
              placeholder="Search pack name, code..."
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
              onClick={handleNewPackClick}
            >
              New Pack
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
                    aria-label="Select all packs"
                  />
                </TableHead>
                <TableHead className="min-w-[220px]">Pack</TableHead>
                <TableHead className="w-32 text-center">
                  Products
                </TableHead>
                <TableHead className="w-24 text-right">Pack price</TableHead>
                <TableHead className="w-40 text-left">Created at</TableHead>
                <TableHead className="w-28 text-center">Status</TableHead>
                <TableHead className="w-40 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((pack) => (
                <TableRow
                  key={pack.id}
                  className="border-b border-gray-50 hover:bg-gray-50/60"
                >
                  <TableCell className="align-middle">
                    <Checkbox
                      checked={selectedIds.includes(pack.id)}
                      onCheckedChange={() => toggleRow(pack.id)}
                      aria-label={`Select ${pack.name}`}
                    />
                  </TableCell>

                  {/* Pack */}
                  <TableCell>
                    <div className="flex flex-col">
                      <button
                        type="button"
                        className="text-xs font-medium text-primary hover:underline text-left"
                        onClick={() => handleView(pack)}
                      >
                        {pack.code}
                      </button>
                      <span className="text-sm text-gray-800">
                        {pack.name}
                      </span>
                    </div>
                  </TableCell>

                  {/* Products count */}
                  <TableCell className="text-center text-sm text-gray-700">
                    {pack.products.length}{' '}
                    <span className="text-[11px] text-gray-400">
                      items
                    </span>
                  </TableCell>

                  {/* Pack price */}
                  <TableCell className="text-right text-sm text-gray-800">
                    ${pack.packPrice.toFixed(2)}
                  </TableCell>

                  {/* Created at */}
                  <TableCell className="text-sm text-gray-700">
                    {pack.createdAt}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="text-center">
                    {pack.status === 'active' ? (
                      <Badge className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-200">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-300">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2 text-gray-500">
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleQuickAddProduct(pack)}
                        aria-label="Add product to pack"
                      >
                        <PackagePlus className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleView(pack)}
                        aria-label="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="rounded-full p-1 hover:bg-gray-100"
                        onClick={() => handleEdit(pack)}
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
                            onClick={() => handleDelete(pack)}
                          >
                            Delete pack
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
                    colSpan={7}
                    className="py-10 text-center text-sm text-gray-500"
                  >
                    No packs found for this search.
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
                {filtered.length} packs
              </>
            ) : (
              '0 packs'
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

      {/* Add pack dialog */}
      <AddPackDialog
        open={isAddOpen}
        onOpenChange={setIsAddOpen}
        onSubmitPack={handleCreatePack}
      />
    </>
  );
};

export default PackList;
