import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ProductStatus } from "../../../domain/enums/product-status.enum";

export class ProductDTO {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  name!: string;

  @IsString()
  @IsNotEmpty({ message: "CategoryId is required" })
  categoryId!: string;

  @IsString()
  @IsNotEmpty({ message: "BrandId is required" })
  brandId!: string;

  @IsNumber()
  @IsNotEmpty({ message: "Price is required" })
  basePrice!: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  status?: ProductStatus;
}
