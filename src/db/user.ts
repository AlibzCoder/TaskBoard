import { User } from "../types/user";
import mongoose, { model, Schema } from "mongoose"

const UserSchema = new Schema<User>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  fullName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const UserDBSchema = model<User>("user", UserSchema);

export default UserDBSchema
