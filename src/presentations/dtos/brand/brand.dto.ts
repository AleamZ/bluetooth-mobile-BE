import { ArrayNotEmpty, IsArray, IsOptional, IsString } from "class-validator";

export class BrandDTO {
  @IsString()
  name!: string;

  @IsString()
  @IsOptional()
  logo?: string;

  @IsArray()
  @ArrayNotEmpty({ message: "Category không được để trống" })
  @IsString({ each: true })
  categoryIds!: string[];
}
