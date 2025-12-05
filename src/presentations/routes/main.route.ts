import { NextFunction, Request, Response } from "express";
import { NotFoundException } from "../../domain/exceptions/not-found.exception";
import { HttpException } from "../../domain/exceptions/http.exception";
import userRoutes from "./auth.route";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import categoryRoutes from "./category.route";
import variantRoutes from "./variant.route";
import productRoutes from "./product.route";
import specificaionRoutes from "./specification.route";
import shoppingCartRoutes from "./shopping-cart.route";
import brandRoutes from "./brand.route";
import orderRoutes from "./order.route";
import statisticalRoutes from "./statistical.route";
import feedbackRoutes from "./feedback.route";
import uploadImageRoutes from "./upload-image.route";
import contentCategoryRoutes from "./content-category.route";
import subBannerRoutes from "./sub-banner.route";
import mainBannerRoutes from "./main-banner.route";
import promotionRoutes from "./promotion.route";
import tagRoutes from "./tag.route";
import categoyNewRoutes from "./category-new.route";
import blogRoutes from "./blog.route";

export const mainRoutes = (app: any) => {
  app.use("/", userRoutes);
  app.use("/category", categoryRoutes);
  app.use("/brand", brandRoutes);
  app.use("/variant", variantRoutes);
  app.use("/specification", specificaionRoutes);
  app.use("/product", productRoutes);
  app.use("/feedback", feedbackRoutes);
  app.use("/shopping", shoppingCartRoutes);
  app.use("/order", orderRoutes);
  app.use("/upload", uploadImageRoutes);
  app.use("/statistical", statisticalRoutes);
  app.use("/content-category", contentCategoryRoutes);
  app.use("/sub-banner", subBannerRoutes);
  app.use("/main-banner", mainBannerRoutes);
  app.use("/promotion", promotionRoutes);
  app.use("/tag", tagRoutes);
  app.use("/category-new", categoyNewRoutes);
  app.use("/blog", blogRoutes);
  app.use("*", (req: Request, res: Response) => {
    const notFoundException = new NotFoundException("Endpoint not found");
    res.status(HttpStatus.NOT_FOUND).json(notFoundException.toResponse());
  });
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err?.name === "MongoServerError") {
      const badRequestException = new BadRequestException(err.message);
      res.status(HttpStatus.BAD_REQUEST).json(badRequestException.toResponse());
    }
    if (err instanceof HttpException) {
      res.status(err.status).json(err.toResponse());
    }
    res.status(500).json({ message: err?.message || "Internal server error" });
  });
};
