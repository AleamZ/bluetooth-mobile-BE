import { Router } from "express";
import {
  upload,
  uploadImageSingle,
  uploadMultipleImages,
} from "../controllers/upload-image.controller";

const uploadImageRoutes = Router();

uploadImageRoutes.post("/single", upload.single("image"), uploadImageSingle);
uploadImageRoutes.post(
  "/multiple",
  upload.array("images", 10),
  uploadMultipleImages
);
export default uploadImageRoutes;
