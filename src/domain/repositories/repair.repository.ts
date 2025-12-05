import { IRepair } from "../../infrastructure/model/repair.model";

export interface IRepairRepository {
  createOrderRepair(data: IRepair): Promise<IRepair>;
}
