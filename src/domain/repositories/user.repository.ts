import { IUser } from "../../infrastructure/model/user.model";

export interface IUserRepository {
  createUser(user: Partial<IUser>): Promise<IUser>;
  findUserByUsername(username: string): Promise<IUser | null>;
  findUserByEmail(email: string): Promise<IUser | null>;
  checkPassword(user: IUser, password: string): Promise<boolean>;
}
