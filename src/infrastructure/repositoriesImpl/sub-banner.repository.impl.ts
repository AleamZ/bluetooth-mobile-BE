import { ISubBannerRepository } from "../../domain/repositories/sub-banner.repository";
import SubBanner, { ISubBanner } from "../model/sub-banner.model";

export class SubBannerRepositoryImpl implements ISubBannerRepository {
  async deleteSubBanner(id: string): Promise<void | null> {
    return await SubBanner.findByIdAndDelete(id);
  }
  async findAllSubBanners(): Promise<ISubBanner[]> {
    return await SubBanner.find();
  }
  async updateSubBanner(
    id: string,
    data: Partial<ISubBanner>
  ): Promise<ISubBanner | null> {
    return await SubBanner.findByIdAndUpdate(id, data, {
      new: true,
    });
  }
  async findSubBannerIsShow(): Promise<ISubBanner[]> {
    return await SubBanner.find({ isShow: true }).sort({ order: 1 });
  }
  async findSubBannerById(id: string): Promise<ISubBanner | null> {
    return await SubBanner.findById(id);
  }
  async createSubBanner(data: ISubBanner): Promise<ISubBanner> {
    return await SubBanner.create(data);
  }
}
