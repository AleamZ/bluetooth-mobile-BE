import { IMainBannerRepository } from "../../domain/repositories/main-banner.repository";
import MainBanner, { IMainBanner } from "../model/main-banner.model";

export class MainBannerRepositoryImpl implements IMainBannerRepository {
  async deleteMainBanner(id: string): Promise<void | null> {
    return await MainBanner.findByIdAndDelete(id);
  }
  async findAllMainBanners(): Promise<IMainBanner[]> {
    return await MainBanner.find();
  }
  async updateMainBanner(
    id: string,
    data: Partial<IMainBanner>
  ): Promise<IMainBanner | null> {
    return await MainBanner.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
  async findMainBannerIsShow(): Promise<IMainBanner[]> {
    return await MainBanner.find({ isShow: true }).sort({ order: 1 });
  }
  async findMainBannerById(id: string): Promise<IMainBanner | null> {
    return await MainBanner.findById(id);
  }
  async createMainBanner(data: IMainBanner): Promise<IMainBanner> {
    return await MainBanner.create(data);
  }
}
