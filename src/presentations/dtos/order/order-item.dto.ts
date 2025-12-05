import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class OrderItemDTO {
  @IsString()
  @IsNotEmpty({ message: "Product Id is required" })
  productId!: string;

  @IsOptional()
  @IsString()
  variantId?: string;

  @IsNumber()
  @IsNotEmpty({ message: "Quantity is required" })
  quantity!: number;

  @IsString()
  @IsNotEmpty({ message: "Customer Name is required" })
  customerName!: string;

  @IsString()
  @IsNotEmpty({ message: "Address is required" })
  address!: string;

  @IsString()
  @IsNotEmpty({ message: "Phone Number is required" })
  phone!: string;
}
