// shared types (e.g. src/entities/pack.ts)

export type PackStatus = 'active' | 'inactive';

export interface PackProduct {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  unitPrice: number; // price for this product within the pack
}

export interface Pack {
  id: string;
  name: string;
  code: string;          // like SKU for the pack
  status: PackStatus;
  packPrice: number;     // customized price for the whole pack
  products: PackProduct[];
  createdAt: string;
}
