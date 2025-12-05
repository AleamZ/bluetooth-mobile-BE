import { IsEmail, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

export class LoginUserDto {
  @ValidateIf((o) => !o.email)
  @IsString()
  @IsNotEmpty({ message: "Username or email is required" })
  username?: string;

  @ValidateIf((o) => !o.username)
  @IsEmail({}, { message: "Invalid email format" })
  @IsNotEmpty({ message: "Username or email is required" })
  email?: string;

  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  password!: string;
}
