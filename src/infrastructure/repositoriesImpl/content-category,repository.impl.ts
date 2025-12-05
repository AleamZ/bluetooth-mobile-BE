import { IContentCategoryRepository } from "../../domain/repositories/content-category.repository";
import ContentCategory, {
  IContentCategory,
} from "../model/content-category.model";

export class ContentCategoryRepositoryImpl
  implements IContentCategoryRepository
{
  async createContent(data: IContentCategory): Promise<IContentCategory> {
    return ContentCategory.create(data);
  }
}
