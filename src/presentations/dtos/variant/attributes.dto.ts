import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from "class-validator";
import { AttributeKey } from "../../../domain/enums/attribute.enum";

export class AttributesDTO {
  @IsString()
  @IsNotEmpty({ message: "Color is required" })
  color!: string;

  @IsString()
  @IsOptional()
  storage?: string;

  @IsString()
  @IsOptional()
  size?: string;

  @ValidateIf((object, value) => value !== undefined)
  @IsEnum(AttributeKey, {
    message: `Invalid attribute key. Allowed keys are: color, storage, size`,
  })
  @IsNotEmpty({ message: "Invalid attribute key" })
  key!: string;
}
