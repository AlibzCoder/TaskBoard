import { Todo } from "../types/todo";
import { model, Schema } from "mongoose";

export const TodoSchema = new Schema<Todo>({
  user: { 
    type: Schema.ObjectId,
    ref: "user"
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String
  },
  assignedTo : {
    type: String
  },
  status: { 
    type: String,
    enum: ["created" , "active" , "reviewed" , "completed"],
    required: true,
    default : 'created'
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdatedDate: {
    type: Date,
    default: Date.now,
  },
  completedDate: {
    type: Date
  },
  effort: {
    type: Number
  },
  estimation: {
    type: Number
  }
});

const TodoDBSchema = model<Todo>("todo", TodoSchema);
export default TodoDBSchema;
