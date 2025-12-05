import { IContentCategory } from "../infrastructure/model/content-category.model";
import { ContentCategoryRepositoryImpl } from "../infrastructure/repositoriesImpl/content-category,repository.impl";
import { ContentCategoryDTO } from "../presentations/dtos/content-category/content-category.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const contentCategoryRepo = new ContentCategoryRepositoryImpl();
export const ContentCategoryService = {
  createContent: async (data: IContentCategory) => {
    const dataDTO = await createAndValidateDto(ContentCategoryDTO, data);
    return await contentCategoryRepo.createContent(dataDTO);
  },
};
