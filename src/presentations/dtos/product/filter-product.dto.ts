import { IsOptional, IsString } from "class-validator";

export class FilterProductDto {
  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  brandName?: string;

  @IsOptional()
  @IsString()
  url?: string;
}
