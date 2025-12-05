import { IsArray } from "class-validator";

export class AddCategoryTreeDTO {
  @IsArray()
  subCategories!: string[];
}
