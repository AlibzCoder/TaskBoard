import { Request, Response } from "express";
import { User } from "../types/user";
import { cleanString } from "../utils";
import vine, { errors } from "@vinejs/vine";
import { DeleteUserSchema, UpdateUserSchema } from "../schemes/user";
import {
  compareHashedPassword,
  getUserByAuthPayloadOrUserName,
  HashPassword,
  UserDBDocToJson,
} from "../handlers/utils";
import {
  INCORRECT_PASSWORD,
  INTERNAL_ERROR,
  USER_NOTFOUND_ERROR,
} from "../consts";
import UserDBSchema from "../db/user";

export function getUser(request: Request, res: Response) {
  getUserByAuthPayloadOrUserName(request)
    .then((user: User) => {
      try {
        res.status(200).json(UserDBDocToJson(user));
      } catch (e) {
        res.status(500).json(e);
      }
    })
    .catch((e) => {
      res.status(e?.responseCode ? e?.responseCode : 500).json(e);
    });
}
export function getUsers(request: Request, res: Response) {
  UserDBSchema.find()
    .then((users: User[] | any) => {
      if (!users) return res.status(500).json(INTERNAL_ERROR);
      const _users: User[] = [];
      users.forEach((user: User) => {
        _users.push(UserDBDocToJson(user));
      });
      res.status(200).json(_users);
    })
    .catch((e) => {
      res.status(500).json(e);
    });
}

export function updateUser(req: Request, res: Response<User | any>) {
  const newUser = {
    prevPassword: cleanString(req.body?.prevPassword),
    password: cleanString(req.body?.password),
    firstName: cleanString(req.body?.firstName),
    lastName: cleanString(req.body?.lastName),
    email: cleanString(req.body?.email),
    fullName: "",
  };
  newUser.fullName = `${newUser.firstName} ${newUser.lastName}`;

  vine
    .validate({ schema: UpdateUserSchema, data: newUser })
    .then(() => {
      getUserByAuthPayloadOrUserName(req)
        .then((user: User) => {
          const isMatch = compareHashedPassword(
            newUser.prevPassword,
            user.password
          );
          const isSamePassword = compareHashedPassword(
            newUser.password,
            user.password
          );
          if (isMatch) {
            if (!isSamePassword) user.password = HashPassword(newUser.password);
            if (newUser.firstName) user.firstName = newUser.firstName;
            if (newUser.lastName) user.lastName = newUser.lastName;
            if (newUser.email) user.email = newUser.email;
            if (newUser.fullName) user.fullName = newUser.fullName;
            user
              .save()
              .then(() => {
                try {
                  res.status(200).json(UserDBDocToJson(user));
                } catch (e) {
                  res.status(500).json(e);
                }
              })
              .catch((e: any) => res.status(400).json(e));
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

export function deleteUser(req: Request, res: Response) {
  const payload = { password: req.body?.password };
  vine
    .validate({ schema: DeleteUserSchema, data: payload })
    .then(() => {
      getUserByAuthPayloadOrUserName(req)
        .then((user: User) => {
          const isMatch = compareHashedPassword(
            payload.password,
            user.password
          );
          if (isMatch) {
            user
              .deleteOne()
              .then(() => {
                res.status(200).send();
              })
              .catch((e: any) => {
                res.status(500).json(e);
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
