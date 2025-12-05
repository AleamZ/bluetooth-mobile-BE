import { Request, Response } from "express";
import { TagService } from "../../services/tag.service";
import { successResponse } from "../../utils/response-success.util";
import { HttpStatus } from "../../domain/enums/http-status.enum";

export const TagController = {
  createTag: async (req: Request, res: Response) => {
    const { tags } = req.body;
    await TagService.createTag(tags);
    return res.json(successResponse(HttpStatus.OK, "Create Tag success"));
  },
  proposeTag: async (req: Request, res: Response) => {
    const { text } = req.query;

    const data = await TagService.proposeTag(text as string);
    return res.json(successResponse(HttpStatus.OK, "Get Tags success", data));
  },
};
