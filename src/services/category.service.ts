import { ICategory } from "../infrastructure/model/category.model";
import { CreateCategoryDto } from "../presentations/dtos/category/create-category.dto";
import { CategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/category.repository.impl";
import { UpdateCategoryDto } from "../presentations/dtos/category/update-category.dto";
import { UpdateIsDeleteCategoryDto } from "../presentations/dtos/category/update-isDelete-category.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
import { ProductRepositoryImpl } from "../infrastructure/repositoriesImpl/product.repository.impl";
import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { Types } from "mongoose";
const categoryRepositry = new CategoryRepositoryImpl();
const productRepository = new ProductRepositoryImpl();
export const createCategoryService = async (
  category: Partial<ICategory>
): Promise<ICategory> => {
  const createCategoryDto = await createAndValidateDto(
    CreateCategoryDto,
    category
  );
  return await categoryRepositry.createCategory(createCategoryDto);
};
export const addCategoryTree = async (
  categoryId: string,
  categories: string[]
) => {
  const categoryExited = await categoryRepositry.findCategoryById(categoryId);
  if (!categoryExited) {
    throw new NotFoundException("Category không tồn tại");
  }
  if (categories.length > 0) {
    const failResults: string[] = [];
    const successResults: string[] = [];
    if (categories.includes(String(categoryExited._id))) {
      throw new BadRequestException(
        "Không thể thêm category con vào category cha của nó"
      );
    }
    const validCategories = categories.filter((categoryId) => {
      const exists = categoryExited.subCategories.some(
        (subCategoryId) => String(subCategoryId) === categoryId
      );

      if (exists) {
        failResults.push(
          `Category ${categoryId} đã tồn tại trong danh mục ${categoryExited.name}`
        );
        return false; // Loại bỏ các danh mục đã tồn tại
      }
      successResults.push(
        `Đã thêm ${categoryId} vào danh mục ${categoryExited.name}`
      );
      return true; // Giữ lại các danh mục chưa tồn tại
    });
    const objectIdCategories = validCategories.map(
      (id) => new Types.ObjectId(id)
    );
    await Promise.all(
      validCategories.map(async (categoryId) => {
        const subCategory = await categoryRepositry.findCategoryById(
          categoryId
        );

        if (subCategory) {
          subCategory.parentId = categoryExited._id as string; // Gán parentId cho category con
          await subCategory.save();
        }
      })
    );
    categoryExited.subCategories.push(...(objectIdCategories as any));
    await categoryExited.save();
    return {
      failResults,
      successResults,
    };
  }
  throw new BadRequestException("Thêm thất bại");
};

export const updateCategoryService = async (
  categoryId: string,
  formUpdate: Partial<ICategory>
): Promise<ICategory | null> => {
  const updateCategoryDto = await createAndValidateDto(UpdateCategoryDto, {
    ...formUpdate,
    categoryId,
  });
  return await categoryRepositry.updateCategory(
    updateCategoryDto.categoryId,
    updateCategoryDto
  );
};

export const deleteCategoryService = async (
  categoryId: string
): Promise<void> => {
  const deleteCategoryDto = await createAndValidateDto(
    UpdateIsDeleteCategoryDto,
    { categoryId }
  );
  await categoryRepositry.updateIsDeleted(deleteCategoryDto.categoryId, true);
  const products = await productRepository.findProductByCategory(categoryId);
  if (products.length > 0) {
    await Promise.all(
      products.map(async (product) => {
        await productRepository.updateProduct(product._id as string, {
          isDeleted: true,
        });
      })
    );
  }
};

export const restoreCategoryService = async (
  categoryId: string
): Promise<ICategory | null> => {
  const deleteCategoryDto = await createAndValidateDto(
    UpdateIsDeleteCategoryDto,
    { categoryId }
  );

  return await categoryRepositry.updateIsDeleted(
    deleteCategoryDto.categoryId,
    false
  );
};

export const getAllCategoryService = async (): Promise<ICategory[]> => {
  return await categoryRepositry.getAllCategories();
};

export const getCategoriesActive = async (): Promise<ICategory[]> => {
  return await categoryRepositry.getCategoriesActive();
};
export const getCategoriesInActive = async (): Promise<ICategory[]> => {
  return await categoryRepositry.getCategoriesInActive();
};
export const getCategoryFormatMenu = async () => {
  const categories = await categoryRepositry.getCategoriesActive();
  const categoryMap: Record<string, any> = {};
  const formattedCategories: any[] = [];
  // Đầu tiên, lặp qua tất cả danh mục và thêm chúng vào map
  categories.forEach((category) => {
    categoryMap[category._id as string] = {
      ...category.toObject(),
      subCategories: [],
    };
  });
  categories.forEach((category) => {
    if (category.parentId) {
      // Nếu có parentId, thì thêm vào subCategories của danh mục cha
      if (categoryMap[category.parentId]) {
        categoryMap[category.parentId].subCategories.push(
          categoryMap[category._id as string]
        );
      }
    } else {
      // Nếu không có parentId, đây là danh mục cha
      formattedCategories.push(categoryMap[category._id as string]);
    }
  });
  const mappingSubMenu = (subMenu: any) => {
    return subMenu.map((sub: any) => ({
      name: sub.name,
      url: sub.url,
    }));
  };
  const cleanFormattedCategories = formattedCategories.map((category) => ({
    categoryId: category._id,
    order: category.order,
    name: category.name,
    url: category.url,
    imageLogo: category.imageLogo,
    subCategories: category.subCategories.map((subCategory: any) => ({
      subCategoryId: subCategory._id,
      name: subCategory.name,
      url: subCategory.url,
      subCategories: mappingSubMenu(subCategory.subCategories), // Nếu có sub-categories thì giữ lại
    })),
  }));
  return cleanFormattedCategories.sort((a, b) => a.order - b.order);
};

export const getCategoryById = async (
  categoryId: string
): Promise<ICategory | null> => {
  return await categoryRepositry.findCategoryById(categoryId);
};

export const updateOrderCategoryService = async (
  categoryUrl: string,
  order: number
) => {
  const categories = await categoryRepositry.getCategoriesActive();
  const categoryUpdate = await categoryRepositry.getCategoryByUrl(categoryUrl);
  if (!categoryUpdate) {
    throw new NotFoundException("Không tìm thấy category");
  }
  categoryUpdate.order = order;
  const categoryFilter = categories.filter(
    (item) => item.url !== categoryUrl && item.order >= order
  );
  categoryFilter.sort((a, b) => a.order - b.order);
  const updatePromises = categoryFilter.map((item, index) => {
    item.order = order + index + 1;
    return categoryRepositry.updateCategory(String(item._id), item);
  });
  await Promise.all(updatePromises);

  await categoryRepositry.updateCategory(
    String(categoryUpdate._id),
    categoryUpdate
  );
};

export const getCategoryByUrlService = async (url: string) => {
  const findCategory = await categoryRepositry.getCategoryByUrl(url);
  if (!findCategory) {
    throw new NotFoundException("Không tìm thấy category");
  }
  const mapData = {
    categoryId: findCategory._id,
    name: findCategory.name,
    url: findCategory.url,
    imageLogo: findCategory.imageLogo,
    subCategories: await Promise.all(
      findCategory.subCategories.map(async (subCategory) => {
        return await categoryRepositry.findCategoryById(subCategory);
      })
    ),
  }
  return mapData;
};

export const getCategoryNameByIdService = async (categoryId: string): Promise<string> => {
  const categoryName = await categoryRepositry.getCategoryNameById(categoryId);
  if (!categoryName) {
    throw new NotFoundException("Không tìm thấy category");
  }
  return categoryName;
};

export const getCategoryUrlByIdService = async (categoryId: string): Promise<string> => {
  const category = await categoryRepositry.findCategoryById(categoryId);
  if (!category) {
    throw new NotFoundException("Không tìm thấy category");
  }
  return category.url;
};
