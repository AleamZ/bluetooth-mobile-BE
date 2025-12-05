import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class ProductInCartDTO {
  @IsString()
  @IsNotEmpty({ message: "Product ID is required" })
  productId!: string;

  @IsString()
  @IsNotEmpty({ message: "Variant ID is required" })
  variantId!: string;

  @IsNumber()
  @Min(1, { message: "Quantity must be at least 1" })
  quantity!: number;
}
