import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsArray,
  IsEnum,
  ValidateIf,
  IsNumber,
} from "class-validator";
import { DiscountType } from "../../../domain/enums/discount-type.enum";

export class PromotionDTO {
  @IsString()
  @IsNotEmpty({ message: "Name event is required" })
  nameEvent!: string;

  @IsString()
  @IsNotEmpty({ message: "Image header is required" })
  imageHeader!: string;

  @IsString()
  @IsNotEmpty({ message: "Banner is required" })
  banner!: string;

  @IsArray()
  @IsNotEmpty({ message: "List product is required" })
  listProducts!: string[];

  @IsArray()
  @IsOptional()
  listImageEvent?: string[];

  @IsString()
  @IsNotEmpty({ message: "Background is required" })
  background!: string;

  @IsString()
  @IsNotEmpty({ message: "Color navigation is required" })
  colorNavigation!: string;

  @IsString()
  @IsNotEmpty({ message: "Start date is required" })
  startDate!: string;

  @IsString()
  @IsNotEmpty({ message: "End date is required" })
  endDate!: string;

  @IsEnum(DiscountType, {
    message: "Discount type must be 'percentage' or 'money'",
  })
  @IsNotEmpty({ message: "Discount type is required" })
  discountType!: DiscountType;

  @ValidateIf((o) => o.discountType === DiscountType.PERCENTAGE)
  @IsNumber({}, { message: "Discount percent must be a number" })
  @IsNotEmpty({
    message: "Discount percent is required when discount type is 'percentage'",
  })
  discountPercent?: number;

  @ValidateIf((o) => o.discountType === DiscountType.MONEY)
  @IsNumber({}, { message: "Discount money must be a number" })
  @IsNotEmpty({
    message: "Discount money is required when discount type is 'money'",
  })
  discountMoney?: number;
}
