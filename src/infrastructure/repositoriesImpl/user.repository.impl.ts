import { IUserRepository } from "../../domain/repositories/user.repository";
import bcrypt from "bcryptjs";
import User, { IUser } from "../model/user.model";

export class UserRepositoryImpl implements IUserRepository {
  async checkPassword(user: IUser, password: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch;
  }
  async createUser(user: Partial<IUser>): Promise<IUser> {
    return await User.create(user);
  }
  async findUserByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }
  async findUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }
}
