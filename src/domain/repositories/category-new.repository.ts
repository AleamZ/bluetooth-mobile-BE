import { ICategoryNew } from "../../infrastructure/model/category-new.model";

export interface ICategoryNewRepository {
  createCategoryNew(data: ICategoryNew): Promise<ICategoryNew>;
  getAllCategoriesNew(): Promise<ICategoryNew[]>;
  getCategoriesNewActive(): Promise<ICategoryNew[]>;
  getCategoryNewById(categoryNewId: string): Promise<ICategoryNew | null>;
}
