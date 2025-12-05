import { IRepair } from "../infrastructure/model/repair.model";
import { RepairDTO } from "../presentations/dtos/repair/repair.dto";
import { createAndValidateDto } from "../utils/createAndValidateDto.util";

export const RepairService = {
  createOrderRepair: async (data: IRepair) => {
    const dataDTO = await createAndValidateDto(RepairDTO, data);
  },
};
