import mongoose, { Schema, Document } from "mongoose";
import { RoleEnum } from "../../domain/enums/role-enum.enum";
export interface IUser extends Document {
  username: string;
  password: string;
  phone?: string;
  address?: string;
  email?: string;
  avatar?: string;
  role: RoleEnum;
}
const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      enum: Object.values(RoleEnum),
      default: RoleEnum.CUSTOMER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
