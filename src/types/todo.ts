import { ObjectId, Document } from "mongoose";

export interface Todo extends Document {
  id?: number;
  user?: ObjectId;
  title: string;
  description: string;
  status?: "created" | "active" | "done";
  date?: string | Date;
}
