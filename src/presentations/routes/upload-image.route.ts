import { Router } from "express";
import {
  upload,
  uploadImageSingle,
  uploadMultipleImages,
} from "../controllers/upload-image.controller";
import { BadRequestException } from "../../domain/exceptions/bad-request.exception";

const uploadImageRoutes = Router();

// Multer error handler
const handleMulterError = (err: any, req: any, res: any, next: any) => {
  if (err) {
    console.error("Multer upload error:", err);
    return next(new BadRequestException(err.message || "File upload failed"));
  }
  next();
};

uploadImageRoutes.post(
  "/single", 
  upload.single("image"),
  handleMulterError,
  uploadImageSingle
);

uploadImageRoutes.post(
  "/multiple",
  upload.array("images", 10),
  handleMulterError,
  uploadMultipleImages
);

export default uploadImageRoutes;
