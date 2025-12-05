import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "categoryId is required" })
  categoryId!: string;

  @IsString()
  @IsNotEmpty({ message: "category name is required" })
  name!: string;

  
    @IsNumber()
    @IsNotEmpty({message: "Order không được để trống"})
    order?: number
}
