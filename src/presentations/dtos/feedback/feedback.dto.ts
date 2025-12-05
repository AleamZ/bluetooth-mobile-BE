import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class FeedbackDTO {
  @IsString()
  @IsNotEmpty({ message: "Product Id cannot be empty" })
  productId!: string;

  @IsString()
  @IsNotEmpty({ message: "Comment cannot be empty" })
  comment!: string;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsOptional()
  rating?: number;
}
