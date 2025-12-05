import { IProduct } from "../model/product.model";

export interface IProductRepository {
    createProduct(product: Partial<IProduct>): Promise<IProduct>;
    getProducts(): Promise<IProduct[]>;
    findProductById(id: string): Promise<IProduct | null>;
    updateProduct(id: string, product: Partial<IProduct>): Promise<IProduct | null>;
    deleteProduct(id: string): Promise<void>;
    findProductByCategory(categoryId: string): Promise<IProduct[]>;
    findProductByBrand(brandId: string): Promise<IProduct[]>;
    findProductByBrandAndCategory(brandId: string, categoryId: string): Promise<IProduct[]>;
    getProductsActive(): Promise<IProduct[]>;
    countDocuments(query: any): Promise<number>;
    findProducts(query: any, options: { skip: number; limit: number; sort: any }): Promise<IProduct[]>;
    filterProduct(categoryId: string, values: string[]): Promise<IProduct[]>;
}
