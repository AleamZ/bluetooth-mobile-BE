import {
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  ValidateNested,
} from "class-validator";
import { AttributesDTO } from "./attributes.dto";
import { Type } from "class-transformer";

export class VariantDTO {
  @IsString()
  @IsNotEmpty({ message: "productId is required" })
  productId!: string;

  @IsString()
  @IsNotEmpty({ message: "variant name is required" })
  variantName!: string;

  @IsObject({ message: "Attributes must be an object" })
  @ValidateNested()
  @Type(() => AttributesDTO)
  attributes!: AttributesDTO;

  @IsNumber()
  @IsNotEmpty({ message: "price is required" })
  price!: number;

  @IsNumber()
  @IsNotEmpty({ message: "quantity is required" })
  quantity!: number;
}
