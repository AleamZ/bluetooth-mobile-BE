import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "Tên danh mục không được để trống" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "url không được để trống" })
  url!: string;

  @IsString()
  @IsOptional()
  imageLogo!: string;

  @IsNumber()
  @IsOptional()
  order?: number;
}
