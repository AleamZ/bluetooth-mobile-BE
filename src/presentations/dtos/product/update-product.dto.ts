import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  IsObject,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";
import { ProductStatus } from "../../../domain/enums/product-status.enum";

class VariantDTO {
  @IsObject()
  @IsNotEmpty({ message: "Attributes are required" })
  @IsOptional()
  attributes!: Record<string, string>;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  status?: ProductStatus;
}

class SpecificationSubDTO {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class SpecificationDTO {
  @IsString()
  nameGroup: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecificationSubDTO)
  specificationsSub: SpecificationSubDTO[];
}

// DTO cho sản phẩm
export class UpdateProductDTO {
  @IsString()
  @IsOptional()
  productId?: string;

  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  @IsOptional()
  name?: string;

  @IsString()
  @IsNotEmpty({ message: "CategoryId is required" })
  @IsOptional()
  categoryId?: string;

  @IsString()
  @IsNotEmpty({ message: "BrandId is required" })
  @IsOptional()
  brandId?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsNumber()
  @IsOptional()
  stock?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => VariantDTO)
  @IsOptional()
  variants?: VariantDTO[];

  @IsString()
  @IsOptional()
  status?: ProductStatus;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SpecificationDTO)
  specifications?: SpecificationDTO[];
}
