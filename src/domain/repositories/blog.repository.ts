import { IBlog } from "../../infrastructure/model/blog.model";

export interface IBlogRepository {
  createBlog(data: IBlog): Promise<IBlog>;
  getBlogByTags(tags: string[]): Promise<IBlog[]>;
  getBlogByCategoryNewId(categoryNewId: string): Promise<IBlog[]>;
  getAllBlogs(): Promise<IBlog[]>;
}
