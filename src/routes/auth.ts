import { Router } from "express";
import { Routes } from "../consts";
import { Login, Refresh, Register } from "../handlers/auth";

const AuthRouter = Router();

// /api/auth/login
AuthRouter.post(Routes.Auth.Login, Login);
// /api/auth/register
AuthRouter.post(Routes.Auth.Register, Register);
// /api/auth/refresh
AuthRouter.get(Routes.Auth.Refresh, Refresh);

export default AuthRouter
