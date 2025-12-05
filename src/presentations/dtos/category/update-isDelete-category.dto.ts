import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIsDeleteCategoryDto {
  @IsString()
  @IsNotEmpty({ message: "categoryId is required" })
  categoryId!: string;
}
