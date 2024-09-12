import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthorizedResponse extends Response{
  tokenPayload : JwtPayload | object | any
}

export interface AuthorizedRequest extends Request{
  tokenPayload : JwtPayload | object | any
}
