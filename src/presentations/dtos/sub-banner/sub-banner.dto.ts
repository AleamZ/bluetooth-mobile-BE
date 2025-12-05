import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class SubBannerDTO {
  @IsNumber()
  @IsOptional()
  order?: number;

  @IsString()
  @IsNotEmpty({ message: "Url is required" })
  url!: string;

  @IsString()
  @IsNotEmpty({ message: "image is required" })
  image!: string;
}
