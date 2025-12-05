import mongoose from "mongoose";
import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { IProductVariant } from "../infrastructure/model/productVariant.model";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { VariantRepositoryImpl } from "../infrastructure/repositoriesImpl/variant.repository.impl";
import { VariantDTO } from "../presentations/dtos/variant/variant.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const variantRepository = new VariantRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
export const createVariantService = async (
  variant: IProductVariant
): Promise<IProductVariant> => {
  const createVariantDto = await createAndValidateDto(VariantDTO, variant);

  const variantAdd = await variantRepository.createVariant(createVariantDto);
  if (!variantAdd) {
    throw new BadRequestException("Failed to create product variant");
  }
  const findProductAddVariant = await productRepository.findProductById(
    createVariantDto.productId
  );
  if (!findProductAddVariant) {
    throw new NotFoundException("Product not found");
  }

  // findProductAddVariant.variants.push(
  //   new mongoose.Types.ObjectId(variantAdd._id as string)
  // );
  await findProductAddVariant.save();
  return variantAdd;
};

export const updateProductSpecificationsService = async (
  productId: string,
  specifications: Array<{
    nameGroup: string;
    specificationsSub: Array<{
      key: string;
      value: string;
    }>;
  }>
): Promise<void> => {
  const product = await productRepository.findProductById(productId);
  if (!product) {
    throw new NotFoundException("Product not found");
  }

  product.specifications = specifications;
  await product.save();
};
