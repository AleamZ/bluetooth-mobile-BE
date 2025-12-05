import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { IPromotion, Promotion } from "../infrastructure/model/promotion.model";
import { PromotionRepositoryImpl } from "../infrastructure/repositoriesImpl/promotion.repository.impl";
import { PromotionDTO } from "../presentations/dtos/promotion/promotion.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";
const promotionRepository = new PromotionRepositoryImpl();
export const PromotionService = {
  createPromotion: async (promotionData: IPromotion) => {
    const createPromotionDTO = await createAndValidateDto(
      PromotionDTO,
      promotionData
    );
    const existingPromotion = await Promotion.findOne({
      isShow: true,
      $or: [
        {
          startDate: { $lt: createPromotionDTO.endDate },
          endDate: { $gt: createPromotionDTO.startDate },
        },
      ],
    });

    if (existingPromotion) {
      throw new BadRequestException(
        "Đã có khuyến mãi đang hoạt động trong khoảng thời gian này."
      );
    }

    // Nếu không có khuyến mãi trùng, tiến hành tạo mới
    return await promotionRepository.createPromotion(createPromotionDTO);
  },
  updatePromotion: async (promotionId: string, updateData: IPromotion) => {
    return await promotionRepository.updatePromotion(promotionId, updateData);
  },
  deletePromotion: async (promotionId: string) => {
    return await promotionRepository.deletePromotion(promotionId);
  },
  getPromotion: async (promotionId: string) => {
    return await promotionRepository.getPromotion(promotionId);
  },
  getPromotionActive: async () => {
    return await promotionRepository.getPromotionActive();
  },
};
