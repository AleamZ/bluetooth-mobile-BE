import { IPromotionRepository } from "../../domain/repositories/promotion.repository";
import { IPromotion, Promotion } from "../model/promotion.model";

export class PromotionRepositoryImpl implements IPromotionRepository {
  async createPromotion(event: IPromotion): Promise<IPromotion> {
    const newPromotion = new Promotion(event);
    return await newPromotion.save();
  }

  async updatePromotion(
    eventId: string,
    formData: IPromotion
  ): Promise<IPromotion | null> {
    return await Promotion.findByIdAndUpdate(eventId, formData, {
      new: true,
    });
  }

  async deletePromotion(eventId: string): Promise<boolean> {
    const result = await Promotion.findByIdAndDelete(eventId);
    return result ? true : false;
  }

  async getPromotion(eventId: string): Promise<IPromotion | null> {
    return await Promotion.findById(eventId);
  }
  async getPromotionActive(): Promise<IPromotion | null> {
    const now = new Date();
    const promotion = await Promotion.findOne({
      isShow: true,
      startDate: { $lte: now }, // Ngày bắt đầu <= thời gian hiện tại
      endDate: { $gte: now }, // Ngày kết thúc >= thời gian hiện tại
    });
    return promotion;
  }
}
