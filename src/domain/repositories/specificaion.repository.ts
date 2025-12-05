import { IProductSpecification } from "../../infrastructure/model/productSpecification.model";

export interface ISpecificationRepository {
  createSpecifications(
    specifications: IProductSpecification[]
  ): Promise<IProductSpecification[]>;
  getSpecificationByCategoryId(
    categoryId: string
  ): Promise<IProductSpecification[]>;
  updateSpecification(
    id: string,
    data: any
  ): Promise<IProductSpecification | null>;
}
