import { IMainBanner } from "../../infrastructure/model/main-banner.model";

export interface IMainBannerRepository {
  createMainBanner(data: IMainBanner): Promise<IMainBanner>;
  findMainBannerById(id: string): Promise<IMainBanner | null>;
  findMainBannerIsShow(): Promise<IMainBanner[]>;
  updateMainBanner(
    id: string,
    data: Partial<IMainBanner>
  ): Promise<IMainBanner | null>;
  findAllMainBanners(): Promise<IMainBanner[]>;
  deleteMainBanner(id: string): Promise<void | null>;
}
