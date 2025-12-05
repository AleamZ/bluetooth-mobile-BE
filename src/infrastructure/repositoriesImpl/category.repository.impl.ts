import { ICategoryRepository } from "../../domain/repositories/category.repository";
import Category, { ICategory } from "../model/category.model";

export class CategoryRepositoryImpl implements ICategoryRepository {
  getCategoryNameById(categoryId: string): Promise<string | null> {
    throw new Error("Method not implemented.");
  }
  [x: string]: any;
  async updateCategoriesOrder(categoryFilter: ICategory[], updateData: Partial<ICategory>): Promise<ICategory[]> {
    const updatedCategories: ICategory[] = [];

    for (let category of categoryFilter) {
      // Cập nhật từng category
      category.order = updateData.order || category.order;  // Giả sử bạn chỉ cập nhật order, nếu có

      const updatedCategory = await Category.findOneAndUpdate(
        { url: category.url },  // Tìm theo url
        { $set: { order: category.order } },  // Cập nhật order
        { new: true }  // Trả về đối tượng đã cập nhật
      );

      if (updatedCategory) {
        updatedCategories.push(updatedCategory);
      }
    }

    if (updatedCategories.length === 0) {
      throw new Error("No categories were updated");
    }

    return updatedCategories;
  }
  async updateCategoryOrder(categoryUpdate: ICategory): Promise<ICategory | null> {
    const updatedCategory = await Category.findOneAndUpdate(
      { url: categoryUpdate.url },
      { $set: categoryUpdate },
      { new: true }
    );

    if (!updatedCategory) {
      throw new Error("Category not found or could not be updated");
    }

    return updatedCategory;
  }
  async getCategoryByUrl(url: string): Promise<ICategory | null> {
    return await Category.findOne({ url })
  }
  async findCategoryById(categoryId: string): Promise<ICategory | null> {
    //code
    return await Category.findById(categoryId);
  }
  async updateIsDeleted(
    categoryId: string,
    status: boolean
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(
      categoryId,
      { isDeleted: status },
      {
        new: true,
      }
    );
  }

  async updateCategory(
    categoryId: string,
    formUpdate: Partial<ICategory>
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(categoryId, formUpdate, {
      new: true,
    });
  }
  async createCategory(category: Partial<ICategory>): Promise<ICategory> {
    return await Category.create(category);
  }
  async getAllCategories(): Promise<ICategory[]> {
    return await Category.find();
  }
  async getCategoriesActive(): Promise<ICategory[]> {
    return await Category.find({ isDeleted: false });
  }
  async getCategoriesInActive(): Promise<ICategory[]> {
    return await Category.find({ isDeleted: true });
  }
  async getCategoryById(categoryId: string): Promise<ICategory | null> {
    return await Category.findById(categoryId);
  }
  deleteCategory(categoryId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
