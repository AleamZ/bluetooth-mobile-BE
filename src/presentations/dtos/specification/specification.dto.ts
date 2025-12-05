import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class SpecificationDTO {
  @IsString()
  @IsNotEmpty({ message: "categoryId is required" })
  categoryId!: string;

  @IsString()
  @IsNotEmpty({ message: "Name is required" })
  key!: string;

  @IsString()
  @IsNotEmpty({ message: "Value is required" })
  value!: string;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean;
}

// Add a DTO for the create specification request that better matches the actual structure
export class CreateSpecificationDTO {
  @IsString()
  @IsNotEmpty({ message: "categoryId is required" })
  categoryId!: string;

  @IsNotEmpty({ message: "type is required" })
  type!: SpecificationGroupDTO[];
}

class SpecificationGroupDTO {
  @IsString()
  @IsNotEmpty({ message: "groupName is required" })
  groupName!: string;

  @IsNotEmpty({ message: "specifications are required" })
  specifications!: SpecificationItemDTO[];
}

class SpecificationItemDTO {
  @IsString()
  @IsNotEmpty({ message: "name is required" })
  name!: string;

  @IsBoolean()
  @IsOptional()
  checkedFilter?: boolean;

  @IsBoolean()
  @IsOptional()
  isDeleted?: boolean = false;
}
