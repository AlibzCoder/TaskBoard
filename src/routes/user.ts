import { Router } from "express";
import AuthMiddleware from "../middleware/auth";
import { Routes } from "../consts";
import { deleteUser, getUser, getUsers, updateUser } from "../handlers/users";

const UserRouter = Router();

UserRouter.use(AuthMiddleware)
// /api/user
UserRouter.get(Routes.User.GetUser, getUser);
//api/user/all
UserRouter.get(Routes.User.GetUsers, getUsers);
// /api/user/update
UserRouter.post(Routes.User.UpdateUser, updateUser);
// /api/user/delete
UserRouter.post(Routes.User.DeleteUser, deleteUser);

export default UserRouter
