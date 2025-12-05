import { ISubBanner } from "../../infrastructure/model/sub-banner.model";

export interface ISubBannerRepository {
  createSubBanner(data: ISubBanner): Promise<ISubBanner>;
  findSubBannerById(id: string): Promise<ISubBanner | null>;
  findSubBannerIsShow(): Promise<ISubBanner[]>;
  updateSubBanner(
    id: string,
    data: Partial<ISubBanner>
  ): Promise<ISubBanner | null>;
  findAllSubBanners(): Promise<ISubBanner[]>;
  deleteSubBanner(id: string): Promise<void | null>;
}
