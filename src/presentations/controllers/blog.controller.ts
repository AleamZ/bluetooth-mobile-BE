import { Request, Response } from "express";
import { BlogService } from "../../services/blog.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const BlogController = {
  createBlog: async (req: Request, res: Response) => {
    const newBlog = await BlogService.createBlog(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(
        successResponse(HttpStatus.CREATED, "Create Blog Success", newBlog)
      );
  },
  getBlogByTags: async (req: Request, res: Response) => {
    const { tags } = req.body;
    const data = await BlogService.getBlogByTags(tags);
    return res.json(successResponse(HttpStatus.OK, "Get Blogs Success", data));
  },
  getBlogByCategoryNewId: async (req: Request, res: Response) => {
    const { categoryNewId } = req.params;
    const data = await BlogService.getBlogByCategoryNewId(categoryNewId);
    return res.json(successResponse(HttpStatus.OK, "Get Blogs Success", data));
  },
  getAllBlogs: async (req: Request, res: Response) => {
    const data = await BlogService.getAllBlogs();
    return res.json(successResponse(HttpStatus.OK, "Get All Blogs Success", data));
  },
  getBlogById: async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await BlogService.getBlogById(id);
    return res.json(successResponse(HttpStatus.OK, "Get Blog Success", data));
  },
};
