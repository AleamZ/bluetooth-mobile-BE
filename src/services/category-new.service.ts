import { ICategoryNew } from "../infrastructure/model/category-new.model";
import { CategoryNewRepositoryImpl } from "../infrastructure/repositoriesImpl/category-new.impl";

const categoryNewRepo = new CategoryNewRepositoryImpl();
export const CategoryNewService = {
  createCategoryNew: async (data: ICategoryNew) => {
    return categoryNewRepo.createCategoryNew(data);
  },
  getAllCategoriesNew: async () => {
    return categoryNewRepo.getAllCategoriesNew();
  },
  getCategoriesNewActive: async () => {
    return categoryNewRepo.getCategoriesNewActive();
  },
  getCategoryNewById: async (categoryNewId: string) => {
    return categoryNewRepo.getCategoryNewById(categoryNewId);
  },
};
