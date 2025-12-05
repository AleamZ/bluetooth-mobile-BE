import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class MainBannerDTO {
  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsNotEmpty({ message: "Url is required" })
  url!: string;

  @IsString()
  @IsNotEmpty({ message: "image is required" })
  image!: string;

  @IsString()
  @IsNotEmpty({ message: "title is required" })
  title!: string;

  @IsString()
  @IsNotEmpty({ message: "label is required" })
  label!: string;
}
