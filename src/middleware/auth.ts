import { AuthProp } from "../consts";
import { AuthorizedRequest, AuthorizedResponse } from "../types/middleware";
import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";

const AuthMiddleware : RequestHandler = (
  req: AuthorizedRequest | Request | any,
  res: AuthorizedResponse | Response | any,
  next: NextFunction
) => {
  const { secret } = AuthProp;
  const token = req.headers["authorization"];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, (err : any, payload : any) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.tokenPayload = payload;
    next();
  });
}

export default AuthMiddleware;
