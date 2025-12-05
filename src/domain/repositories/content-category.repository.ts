import { IContentCategory } from "../../infrastructure/model/content-category.model";

export interface IContentCategoryRepository {
  createContent(data: IContentCategory): Promise<IContentCategory>;
}
