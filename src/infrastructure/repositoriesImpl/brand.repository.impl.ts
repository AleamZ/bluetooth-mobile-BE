import { IBrandRepository } from "../../domain/repositories/brand.repository";
import Brand, { IBrand } from "../model/brand.model";
import { ProductRepositoryImpl } from "./product.repository.impl";
const productRepository = new ProductRepositoryImpl();
export class BrandRepositoryImpl implements IBrandRepository {
  async getBrandById(brandId: string): Promise<IBrand | null> {
    return await Brand.findById(brandId);
  }
  async updateIsDeleted(
    brandId: string,
    isDeleted: boolean
  ): Promise<IBrand | null> {
    const findProduct = productRepository.findProductByBrand(brandId);
    await Promise.all(
      (
        await findProduct
      ).map(async (item: any) => {
        await productRepository.updateProduct(item._id, {
          isDeleted: isDeleted,
        });
      })
    );
    return await Brand.findByIdAndUpdate(brandId, { isDeleted });
  }
  async createBrand(brand: IBrand): Promise<IBrand> {
    return await Brand.create(brand);
  }
  async getAllBrands(): Promise<IBrand[]> {
    return await Brand.find();
  }
  async getBrandsActive(): Promise<IBrand[]> {
    return await Brand.find({ isDeleted: false });
  }
  async updateBrand(
    brandId: string,
    formUpdate: Partial<IBrand>
  ): Promise<IBrand | null> {
    return await Brand.findByIdAndUpdate(brandId, formUpdate, {
      new: true,
    });
  }
  async getBrandByName(name: string): Promise<IBrand | null> {
    return await Brand.findOne({ name: name, isDeleted: false });
  }
}
