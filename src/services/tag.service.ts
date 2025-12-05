import { TagRepositoryImpl } from "../infrastructure/repositoriesImpl/tag.repository.impl";

const tagRepo = new TagRepositoryImpl();
export const TagService = {
  createTag: async (nameTags: string[]) => {
    return await Promise.all(
      nameTags.map((nameTag) => tagRepo.createTag(nameTag))
    );
  },
  proposeTag: async (text: string) => {
    return await tagRepo.proposeTag(text);
  },
};
