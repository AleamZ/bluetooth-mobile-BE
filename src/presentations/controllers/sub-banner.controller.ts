import { Request, Response } from "express";
import { SubBannerService } from "../../services/sub-banner.service";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";

export const SubBannerController = {
  createSubBanner: async (req: Request, res: Response) => {
    const newSubBanner = await SubBannerService.createSubBanner(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(
        successResponse(
          HttpStatus.CREATED,
          "Create subbanner success",
          newSubBanner
        )
      );
  },
  updateOrder: async (req: Request, res: Response) => {
    const { subBannerId } = req.params;
    const { order } = req.body;
    await SubBannerService.updateOrder(subBannerId, order);
    return res.json(successResponse(HttpStatus.OK, "Update success"));
  },

  getSubBannerIsShow: async (req: Request, res: Response) => {
    const subBanners = await SubBannerService.getSubBannerIsShow();
    return res.json(
      successResponse(HttpStatus.OK, "Get Data Success", subBanners)
    );
  },
  getAllSubBanner: async (req: Request, res: Response) => {
    const subBanners = await SubBannerService.getAllSubBanner();
    return res.json(
      successResponse(HttpStatus.OK, "Get Data Success", subBanners)
    );
  },
  deleteSubBanner: async (req: Request, res: Response) => {
    const { subBannerId } = req.params;
    await SubBannerService.deleteSubBanner(subBannerId);
    return res.json(successResponse(HttpStatus.OK, "Delete Success"));
  },

  updateSubBanner: async (req: Request, res: Response) => {
    const { subBannerId } = req.params;
    await SubBannerService.updateSubBanner(subBannerId, req.body);
    return res.json(successResponse(HttpStatus.OK, "Update Success"));
  },
};
