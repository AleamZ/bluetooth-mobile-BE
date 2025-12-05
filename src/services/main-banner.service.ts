import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { IMainBanner } from "../infrastructure/model/main-banner.model";
import { MainBannerRepositoryImpl } from "../infrastructure/repositoriesImpl/main-banner.repository.impl";
import { MainBannerDTO } from "../presentations/dtos/main-banner/main-banner.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const MainBannerRepo = new MainBannerRepositoryImpl();
export const MainBannerService = {
  createMainBanner: async (data: IMainBanner) => {
    const dataDTO = await createAndValidateDto(MainBannerDTO, data);
    return await MainBannerRepo.createMainBanner(dataDTO);
  },
  updateOrder: async (id: string, order: number) => {
    const mainBanners = await MainBannerRepo.findMainBannerIsShow();
    const mainBannerUpdate = await MainBannerRepo.findMainBannerById(id);
    if (!mainBannerUpdate) {
      throw new NotFoundException("Banner not found");
    }
    mainBannerUpdate.order = order;
    const filterMainBanners = mainBanners
      .filter((item) => item._id !== id && item.order >= order)
      .sort((a, b) => a.order - b.order);

    const updatePromises = filterMainBanners.map((item, index) => {
      item.order = order + index + 1;
      return MainBannerRepo.updateMainBanner(String(item._id), item);
    });
    await Promise.all(updatePromises);
    await MainBannerRepo.updateMainBanner(
      String(mainBannerUpdate._id),
      mainBannerUpdate
    );
  },
  getMainBannerIsShow: async () => {
    return await MainBannerRepo.findMainBannerIsShow();
  },
  getAllMainBanner: async () => {
    return await MainBannerRepo.findAllMainBanners();
  },
  deleteMainBanner: async (id: string) => {
    return await MainBannerRepo.deleteMainBanner(id);
  },
  updateMainBanner: async (id: string, data: any) => {
    return await MainBannerRepo.updateMainBanner(id, data);
  },
};
