import { Request, Response } from "express";
import { HttpStatus } from "../../domain/enums/http-status.enum";
import { successResponse } from "../../utils/response-success.util";
import { MainBannerService } from "../../services/main-banner.service";

export const MainBannerController = {
  createMainBanner: async (req: Request, res: Response) => {
    const newMainBanner = await MainBannerService.createMainBanner(req.body);
    return res
      .status(HttpStatus.CREATED)
      .json(
        successResponse(
          HttpStatus.CREATED,
          "Create MainBanner success",
          newMainBanner
        )
      );
  },
  updateOrder: async (req: Request, res: Response) => {
    const { mainBannerId } = req.params;
    const { order } = req.body;
    await MainBannerService.updateOrder(mainBannerId, order);
    return res.json(successResponse(HttpStatus.OK, "Update success"));
  },

  getMainBannerIsShow: async (req: Request, res: Response) => {
    const MainBanners = await MainBannerService.getMainBannerIsShow();
    return res.json(
      successResponse(HttpStatus.OK, "Get Data Success", MainBanners)
    );
  },
  getAllMainBanner: async (req: Request, res: Response) => {
    const MainBanners = await MainBannerService.getAllMainBanner();
    return res.json(
      successResponse(HttpStatus.OK, "Get Data Success", MainBanners)
    );
  },
  deleteMainBanner: async (req: Request, res: Response) => {
    const { mainBannerId } = req.params;
    await MainBannerService.deleteMainBanner(mainBannerId);
    return res.json(successResponse(HttpStatus.OK, "Delete Success"));
  },

  updateMainBanner: async (req: Request, res: Response) => {
    const { mainBannerId } = req.params;
    await MainBannerService.updateMainBanner(mainBannerId, req.body);
    return res.json(successResponse(HttpStatus.OK, "Update Success"));
  },
};
