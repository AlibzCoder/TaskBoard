import { User } from "../types/user";
import { Request, Response } from "express";
import { RegisterDto } from "../dtos/index.dto";
import { RegisterQueryParams } from "../types/query-params";
import { LoginSchema, RegisterSchema } from "../schemes/auth";
import vine, { errors } from "@vinejs/vine";
import UserDBSchema from "../db/user";
import { cleanString } from "../utils";
import {
  compareHashedPassword,
  GenerateAuthCredentials,
  getUserByAuthPayloadOrUserName,
  HashPassword,
  RefreshAuthCredentials,
  UserDBDocToJson,
} from "../handlers/utils";
import { INCORRECT_PASSWORD } from "../consts";

export function Login(req: Request, res: Response) {
  const loginData = {
    username: cleanString(req.body?.username),
    password: cleanString(req.body?.password, true),
  };

  vine
    .validate({ schema: LoginSchema, data: loginData })
    .then(() => {
      getUserByAuthPayloadOrUserName(req, loginData.username)
        .then((user: User) => {
          const isMatch = compareHashedPassword(
            loginData.password,
            user.password
          );
          if (isMatch) {
            GenerateAuthCredentials({
              _id: user._id,
              username: user.username,
            })
              .then((c) => {
                res.status(200).json(c);
              })
              .catch((e) => {
                res.status(500).send();
              });
          } else {
            res.status(400).json(INCORRECT_PASSWORD);
          }
        })
        .catch((e) => {
          res.status(e?.responseCode ? e?.responseCode : 500).json(e);
        });
    })
    .catch((e) => {
      if (e instanceof errors.E_VALIDATION_ERROR) {
        res.status(400).json(e.messages);
      }
    });
}

export function Register(
  req: Request<object, object, RegisterDto, RegisterQueryParams, object>,
  res: Response<User | object>
) {
  const newUser = {
    username: cleanString(req.body?.username),
    password: cleanString(req.body?.password, true),
    firstName: cleanString(req.body?.firstName),
    lastName: cleanString(req.body?.lastName),
    email: cleanString(req.body?.email),
    fullName: "",
  };
  (newUser.fullName = `${newUser.firstName} ${newUser.lastName}`),
    vine
      .validate({ schema: RegisterSchema, data: newUser })
      .then(() => {
        try {
          newUser.password = HashPassword(newUser.password);
          new UserDBSchema(newUser)
            .save()
            .then((user : User) => {
              const result = UserDBDocToJson(user);
              if (req.query.loginAfterCreate) {
                GenerateAuthCredentials({
                  _id: result.id,
                  username: result.username,
                })
                  .then((c) => {
                    res.status(200).json(Object.assign(result, c));
                  })
                  .catch((e) => {
                    res.status(500).send();
                  });
              } else {
                res.status(200).json(result);
              }
            })
            .catch((e : any) => res.status(400).json(e));
        } catch (e: any) {
          res.status(500).json(e);
        }
      })
      .catch((e) => {
        if (e instanceof errors.E_VALIDATION_ERROR) {
          res.status(400).json(e.messages);
        }
      });
}

export function Refresh(req: Request, res: Response) {
  RefreshAuthCredentials(req.headers["refreshtoken"])
    .then((c) => {
      res.status(200).json(c);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
}
