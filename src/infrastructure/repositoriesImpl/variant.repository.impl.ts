import { IVariantRepository } from "../../domain/repositories/variant.repository";
import { IProductVariant, ProductVariant } from "../model/productVariant.model";

export class VariantRepositoryImpl implements IVariantRepository {
  async findVariantById(variantId: string): Promise<IProductVariant | null> {
    return await ProductVariant.findById(variantId);
  }
  async getVariantByProductId(productId: string): Promise<IProductVariant[]> {
    return await ProductVariant.find({ productId });
  }
  async createVariant(variant: IProductVariant): Promise<IProductVariant> {
    return await ProductVariant.create(variant);
  }
  updateVariant(variant: IProductVariant): Promise<IProductVariant> {
    throw new Error("Method not implemented.");
  }
  deleteVariant(variantId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
