import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class BrandUpdateDTO {
  @IsString()
  @IsNotEmpty({ message: "brandId is required" })
  brandId!: string;

  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  logo?: string;
}
