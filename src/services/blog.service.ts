import { IBlog } from "../infrastructure/model/blog.model";
import { BlogRepositoryImpl } from "../infrastructure/repositoriesImpl/blog.repository.impl";

const blogRepo = new BlogRepositoryImpl();
export const BlogService = {
  createBlog: async (data: IBlog) => {
    return await blogRepo.createBlog(data);
  },
  getBlogByTags: async (tags: string[]) => {
    return await blogRepo.getBlogByTags(tags);
  },
  getBlogByCategoryNewId: async (categoryNewId: string) => {
    return await blogRepo.getBlogByCategoryNewId(categoryNewId);
  },
  getAllBlogs: async () => {
    return await blogRepo.getAllBlogs();
  },
  getBlogById: async (id: string) => {
    return await blogRepo.getBlogById(id);
  },
};
