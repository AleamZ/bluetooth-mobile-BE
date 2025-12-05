import { IProduct } from "../../infrastructure/model/product.model";

export interface IProductRepository {
  createProduct(product: IProduct): Promise<IProduct>;
  getProducts(): Promise<IProduct[]>;
  updateProduct(
    productId: string,
    formData: IProduct
  ): Promise<IProduct | null>;
  deleteProduct(productId: string): Promise<boolean>;
  getProductsActive(): Promise<IProduct[]>;
  findProductById(productId: string): Promise<IProduct | null>;
  findProductByBrand(brandId: string): Promise<IProduct[]>;
  findProductByCategory(categoryId: string): Promise<IProduct[]>;
  findProductByBrandAndCategory(
    brandId: string,
    categoryId: string
  ): Promise<IProduct[]>;
  filterProduct(categoryId: string, values: string[]): Promise<IProduct[]>;
}
