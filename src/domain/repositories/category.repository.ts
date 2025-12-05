import { ICategory } from "../../infrastructure/model/category.model";

export interface ICategoryRepository {
  createCategory(category: Partial<ICategory>): Promise<ICategory>;
  updateCategory(
    categoryId: string,
    formUpdate: Partial<ICategory>
  ): Promise<ICategory | null>;
  updateIsDeleted(
    categoryId: string,
    status: boolean
  ): Promise<ICategory | null>;
  findCategoryById(categoryId: string): Promise<ICategory | null>;
  getAllCategories(): Promise<ICategory[]>;
  deleteCategory(categoryId: string): Promise<void>;
  getCategoriesActive(): Promise<ICategory[]>;
  getCategoriesInActive(): Promise<ICategory[]>;
  getCategoryById(categoryId: string): Promise<ICategory | null>;
  getCategoryByUrl(url: string): Promise<ICategory | null>;
  updateCategoriesOrder(
    categoryFilter: ICategory[],
    updateData: Partial<ICategory>
  ): Promise<ICategory[]>;
  updateCategoryOrder(categoryUpdate: ICategory): Promise<ICategory | null>;
  getCategoryNameById(categoryId: string): Promise<string | null>;
}
