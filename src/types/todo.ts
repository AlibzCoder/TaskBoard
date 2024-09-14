import { ObjectId, Document } from "mongoose";

export interface Todo extends Document {
  id?: number;
  user?: ObjectId;
  title: string;
  assignedTo: string;
  description: string;
  status?: "created" | "active" | "reviewed" | "completed";
  createdDate?: string | Date;
  completedDate?: string | Date | any;
  lastUpdatedDate?: string | Date | any;
  effort?: number | any;
  estimation?: number | any;
}
