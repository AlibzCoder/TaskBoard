import { Document } from "mongoose";

export interface User extends Document {
  id?: number;
  email: string;
  username: string;
  firstName?: string,
  lastName?: string,
  fullName?: string,
  password: string,
  date?: string | Date
}