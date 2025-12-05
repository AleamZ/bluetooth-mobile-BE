import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";
import { StatusRepair } from "../../../domain/enums/status-repair.enum";

export class RepairDTO {
  @IsString()
  @IsNotEmpty({ message: "Customer is required" })
  customerId!: string;

  @IsString()
  @IsNotEmpty({ message: "phone customer is requied" })
  phoneCustomer!: string;

  @IsString()
  @IsNotEmpty({ message: "Name order is required" })
  nameOrder!: string;

  @IsString()
  @IsOptional()
  descriptionOrder?: string;

  @IsString()
  @IsNotEmpty({ message: "expecte date is required" })
  expectedDate!: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsEnum(StatusRepair, {
    message:
      "Status must be one of the following: new order, under repair, repair completed, payment, delivered",
  })
  @IsOptional()
  status?: StatusRepair;

  @IsString()
  @IsOptional()
  equipmentRepair?: string;
}
