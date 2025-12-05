import { Router } from "express";
import { catchAsync } from "../../utils/catchAsync.util";
import { TagController } from "../controllers/tag.controller";

const tagRoutes = Router();

tagRoutes.post("/create", catchAsync(TagController.createTag));
tagRoutes.get("/", catchAsync(TagController.proposeTag));

export default tagRoutes;
