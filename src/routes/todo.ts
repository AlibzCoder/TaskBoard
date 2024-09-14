import { Router } from "express";
import AuthMiddleware from "../middleware/auth";
import { Routes } from "../consts";
import {
  createTodo,
  deleteTodo,
  getStatuses,
  getTodos,
  updateTodo,
} from "../handlers/todos";

const TodoRouter = Router();

TodoRouter.use(AuthMiddleware);
// /api/todo
TodoRouter.get(Routes.Todo.GetTodos, getTodos);
// /api/todo/:id:userName
TodoRouter.get(Routes.Todo.GetTodo, getTodos);
// /api/todo/getStatuses
TodoRouter.get(Routes.Todo.GetStatuses, getStatuses);
// /api/todo/create
TodoRouter.post(Routes.Todo.CreateTodo, createTodo);
// /api/todo/update
TodoRouter.post(Routes.Todo.UpdateTodo, updateTodo);
// /api/todo/delete
TodoRouter.post(Routes.Todo.DeleteTodo, deleteTodo);

export default TodoRouter;
