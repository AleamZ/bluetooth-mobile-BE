import { IsNotEmpty, IsString } from "class-validator";

export class ContentCategoryDTO {
  @IsString()
  @IsNotEmpty({ message: "Category Id is required" })
  categoryId!: string;

  @IsString()
  @IsNotEmpty({ message: "content is required" })
  content!: string;
}
