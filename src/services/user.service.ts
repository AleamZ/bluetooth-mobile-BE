import { IUser } from "../infrastructure/model/user.model";
import { UserRepositoryImpl } from "../infrastructure/repositoriesImpl/user.repository.impl";
import bcrypt from "bcryptjs";
import { RegisterUserDto } from "../presentations/dtos/user/register-user.dto";
import { validateOrReject } from "class-validator";
import { BadRequestException } from "../domain/exceptions/bad-request.exception";
import { LoginUserDto } from "../presentations/dtos/user/login-user.dto";
import jwt from "jsonwebtoken";
import { UAParser } from "ua-parser-js";
const userRepository = new UserRepositoryImpl();
export const register = async (userData: Partial<IUser>): Promise<IUser> => {
  const registerUserDto = Object.assign(new RegisterUserDto(), userData);

  await validateOrReject(registerUserDto);

  const existedUser = await userRepository.findUserByUsername(
    registerUserDto.username
  );
  if (existedUser) {
    throw new BadRequestException("Tài khoản đã tồn tại");
  }

  const existedEmail = await userRepository.findUserByEmail(
    registerUserDto.email || ""
  );
  if (existedEmail) {
    throw new BadRequestException("Email đã tồn tại");
  }

  const hashedPassword = await bcrypt.hash(registerUserDto.password, 10);

  return await userRepository.createUser({
    ...registerUserDto,
    password: hashedPassword,
  });
};

export const loginService = async (
  usernameOrEmail: string,
  password: string,
  userAgent: string
): Promise<any> => {
  // Determine if input is email or username
  const isEmail = usernameOrEmail.includes("@");
  const loginUserDto = Object.assign(new LoginUserDto(), {
    [isEmail ? "email" : "username"]: usernameOrEmail,
    password,
  });
  await validateOrReject(loginUserDto);
  
  // Try to find user by username or email
  const user = isEmail
    ? await userRepository.findUserByEmail(usernameOrEmail)
    : await userRepository.findUserByUsername(usernameOrEmail);
    
  if (!user) {
    throw new BadRequestException("Tài khoản hoặc mật khẩu không đúng");
  }
  const isMatchPassword = await userRepository.checkPassword(
    user,
    loginUserDto.password
  );
  if (!isMatchPassword) {
    throw new BadRequestException("Tài khoản hoặc mật khẩu không đúng");
  }
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not set in environment variables");
  }
  const parser = new UAParser(userAgent);
  const deviceInfo = parser.getResult();
  const deviceType = deviceInfo.device.type || "computer";
  const token = jwt.sign(
    { userId: user._id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
  const { password: _, ...userWithoutPassword } = user.toObject();
  return {
    ...userWithoutPassword,
    access_token: token,
    device: {
      browser: deviceInfo.browser.name,
      os: deviceInfo.os.name,
      deviceType: deviceType,
    },
  };
};
