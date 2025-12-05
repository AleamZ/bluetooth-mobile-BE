import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";
import { RoleEnum } from "../../../domain/enums/role-enum.enum";

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty({ message: "Username is required" })
  username!: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @Length(6, 20, { message: "Password must be between 6 and 20 characters" })
  password!: string;

  @IsString()
  @IsOptional()
  @Matches(/^\+?\d{10,15}$/, { message: "Invalid phone number format" }) //
  phone?: string;

  @IsEmail({}, { message: "Invalid email format" })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  avatar?: string;

  @IsEnum(RoleEnum, {
    message: "Role must be one of the following: admin, user, staff",
  })
  @IsOptional()
  role?: RoleEnum;
}
