import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { BlogController } from "../controllers/blog.controller";

const blogRoutes = Router();

blogRoutes.post("/create", catchAsync(BlogController.createBlog));
blogRoutes.post("/get-by-tags", catchAsync(BlogController.getBlogByTags));
blogRoutes.get(
  "/get-by-categoryNew/:categoryNewId",
  catchAsync(BlogController.getBlogByCategoryNewId)
);
blogRoutes.get("/get-all", catchAsync(BlogController.getAllBlogs));
blogRoutes.get("/:id", catchAsync(BlogController.getBlogById));

export default blogRoutes;
