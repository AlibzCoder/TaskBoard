import { Application } from "express";
import { Routes } from "../consts";
import AuthRouter from "./auth";
import UserRouter from "./user";
import TodoRouter from "./todo";

const InitializeRoutes = (app: Application) => {
  app.use(`/api/${Routes.Auth.index}`, AuthRouter);
  app.use(`/api/${Routes.User.index}`, UserRouter);
  app.use(`/api/${Routes.Todo.index}`, TodoRouter);
};
export default InitializeRoutes;
