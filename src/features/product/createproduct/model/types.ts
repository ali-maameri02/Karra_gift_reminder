export interface CreateProductRequest {
  vendorId: string;
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
}
