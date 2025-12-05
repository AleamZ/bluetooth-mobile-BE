import { IBrand } from "../infrastructure/model/brand.model";
import { BrandRepositoryImpl } from "../infrastructure/repositoriesImpl/brand.repository.impl";
import { BrandDTO } from "../presentations/dtos/brand/brand.dto";
import { BrandUpdateDTO } from "../presentations/dtos/brand/update-brand.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const brandRepository = new BrandRepositoryImpl();
export const createBrandService = async (brand: Partial<IBrand>) => {
  const createBrandDTO = await createAndValidateDto(BrandDTO, brand);
  return await brandRepository.createBrand(createBrandDTO);
};

export const deleteSoftBrandService = async (brandId: string) => {
  const arrBrandIds = brandId.split(",").map((id) => id.trim());
  await Promise.all(
    arrBrandIds.map(
      async (id) => await brandRepository.updateIsDeleted(id, true)
    )
  );
};

export const restoreBrandService = async (brandId: string) => {
  const arrBrandIds = brandId.split(",").map((id) => id.trim());
  await Promise.all(
    arrBrandIds.map(
      async (id) => await brandRepository.updateIsDeleted(id, false)
    )
  );
};

export const getAllBrandService = async (): Promise<IBrand[]> => {
  return await brandRepository.getAllBrands();
};

export const getBrandsActive = async (): Promise<IBrand[]> => {
  return await brandRepository.getBrandsActive();
};

export const updateBrandService = async (
  brandId: string,
  formUpdate: Partial<IBrand>
): Promise<IBrand | null> => {
  const updateCategoryDto = await createAndValidateDto(BrandUpdateDTO, {
    ...formUpdate,
    brandId: brandId,
  });
  return await brandRepository.updateBrand(
    updateCategoryDto.brandId,
    updateCategoryDto
  );
};
