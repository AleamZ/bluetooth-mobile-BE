import { NotFoundException } from "../domain/exceptions/not-found.exception";
import { ISubBanner } from "../infrastructure/model/sub-banner.model";
import { SubBannerRepositoryImpl } from "../infrastructure/repositoriesImpl/sub-banner.repository.impl";
import { SubBannerDTO } from "../presentations/dtos/sub-banner/sub-banner.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

const subBannerRepo = new SubBannerRepositoryImpl();
export const SubBannerService = {
  createSubBanner: async (data: ISubBanner) => {
    const dataDTO = await createAndValidateDto(SubBannerDTO, data);
    return await subBannerRepo.createSubBanner(dataDTO);
  },
  updateOrder: async (id: string, order: number) => {
    const subBanners = await subBannerRepo.findSubBannerIsShow();
    const subBannerUpdate = await subBannerRepo.findSubBannerById(id);
    if (!subBannerUpdate) {
      throw new NotFoundException("Sub Banner not found");
    }
    subBannerUpdate.order = order;
    const filterSubBanners = subBanners
      .filter((item) => item._id !== id && item.order >= order)
      .sort((a, b) => a.order - b.order);

    const updatePromises = filterSubBanners.map((item, index) => {
      item.order = order + index + 1;
      return subBannerRepo.updateSubBanner(String(item._id), item);
    });
    await Promise.all(updatePromises);
    await subBannerRepo.updateSubBanner(
      String(subBannerUpdate._id),
      subBannerUpdate
    );
  },
  getSubBannerIsShow: async () => {
    return await subBannerRepo.findSubBannerIsShow();
  },
  getAllSubBanner: async () => {
    return await subBannerRepo.findAllSubBanners();
  },
  deleteSubBanner: async (id: string) => {
    return await subBannerRepo.deleteSubBanner(id);
  },
  updateSubBanner: async (id: string, data: any) => {
    return await subBannerRepo.updateSubBanner(id, data);
  },
};
