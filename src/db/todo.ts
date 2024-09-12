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
  status: { 
    type: String,
    enum: ['created', 'active', 'done'],
    required: true,
    default : 'created'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const TodoDBSchema = model<Todo>("todo", TodoSchema);
export default TodoDBSchema;
