import { IPromotion } from "../../infrastructure/model/promotion.model";

export interface IPromotionRepository {
  createPromotion(event: IPromotion): Promise<IPromotion>;
  updatePromotion(
    eventId: string,
    formData: IPromotion
  ): Promise<IPromotion | null>;
  deletePromotion(eventId: string): Promise<boolean>;
  getPromotion(eventId: string): Promise<IPromotion | null>;
  getPromotionActive(): Promise<IPromotion | null>;
}
