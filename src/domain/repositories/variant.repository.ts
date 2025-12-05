import { IProductVariant } from "../../infrastructure/model/productVariant.model";

export interface IVariantRepository {
  createVariant(variant: IProductVariant): Promise<IProductVariant>;
  updateVariant(variant: IProductVariant): Promise<IProductVariant>;
  deleteVariant(variantId: string): Promise<void>;
  getVariantByProductId(productId: string): Promise<IProductVariant[]>;
  findVariantById(variantId: string): Promise<IProductVariant | null>;
}
