import { IRepairRepository } from "../../domain/repositories/repair.repository";
import Repair, { IRepair } from "../model/repair.model";

export class RepairRepositoryImpl implements IRepairRepository {
  async createOrderRepair(data: IRepair): Promise<IRepair> {
    return Repair.create(data);
  }
}
