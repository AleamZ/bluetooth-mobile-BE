import { IProductRepository } from "../repositories/product.repository";
import Product, { IProduct } from "../model/product.model";
import mongoose from "mongoose";

export class ProductRepositoryImpl implements IProductRepository {
  async countDocuments(query: any): Promise<number> {
    return await Product.countDocuments(query);
  }

  async findProducts(
    query: any,
    options: { skip: number; limit: number; sort: any }
  ): Promise<IProduct[]> {
    return await Product.find(query)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit)
      .exec();
  }

  async filterProduct(
    categoryId: string,
    values: string[]
  ): Promise<IProduct[]> {
    return await Product.find({
      categoryId: categoryId,
      specifications: {
        $elemMatch: {
          specificationsSub: {
            $elemMatch: { value: { $in: values } },
          },
        },
      },
    });
  }
  async findProductByBrandAndCategory(
    brandId: string,
    categoryId: string
  ): Promise<IProduct[]> {
    return await Product.find({ brandId, categoryId });
  }
  async findProductByCategory(categoryId: string): Promise<IProduct[]> {
    return await Product.find({ categoryId });
  }
  async findProductByBrand(brandId: string): Promise<IProduct[]> {
    return await Product.find({ brandId });
  }
  async findProductById(productId: string): Promise<IProduct | null> {
    return await Product.findById(productId);
  }
  async deleteProduct(productId: string): Promise<void> {
    await Product.findByIdAndDelete(productId);
  }
  async updateProduct(
    productId: string,
    formData: any
  ): Promise<IProduct | null> {
    const product = await Product.findByIdAndUpdate(productId, formData, {
      new: true,
    });
    return product;
  }
  async getProducts(): Promise<IProduct[]> {
    return await Product.find();
  }

  async getProductsActive(): Promise<IProduct[]> {
    return await Product.find({ isDeleted: false });
  }
  async createProduct(product: IProduct): Promise<IProduct> {
    return await Product.create(product);
  }
}
