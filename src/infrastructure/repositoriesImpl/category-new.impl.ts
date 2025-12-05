import { ICategoryNewRepository } from "../../domain/repositories/category-new.repository";
import CategoryNew, { ICategoryNew } from "../model/category-new.model";

export class CategoryNewRepositoryImpl implements ICategoryNewRepository {
  async createCategoryNew(data: ICategoryNew): Promise<ICategoryNew> {
    return await CategoryNew.create(data);
  }
  async getAllCategoriesNew(): Promise<ICategoryNew[]> {
    return await CategoryNew.find();
  }
  async getCategoriesNewActive(): Promise<ICategoryNew[]> {
    return await CategoryNew.find({ isDeleted: false });
  }
  async getCategoryNewById(
    categoryNewId: string
  ): Promise<ICategoryNew | null> {
    return CategoryNew.findById(categoryNewId);
  }
}
