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
import { INCORRECT_PASSWORD } from "../consts";
import TodoDBSchema from "../db/todo";
import { CreateTodoSchema, UpdateTodoSchema } from "../schemes/todo";

export function createTodo(req: Request, res: Response<User | any>) {
  const payload = {
    title: cleanString(req.body?.title),
    description: cleanString(req.body?.description),
  };

  vine
    .validate({ schema: CreateTodoSchema, data: payload })
    .then(() => {
      getUserByAuthPayloadOrUserName(req)
        .then((user: User) => {
          new TodoDBSchema(Object.assign(payload, { user }))
            .save()
            .then(() => {
              res.status(200).json({ message: "Todo Saved" });
            })
            .catch((e: any) => {
              res.status(500).json(e);
            });
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

export function getTodos(request: Request, res: Response) {
  getUserByAuthPayloadOrUserName(request)
    .then(async (user: User) => {
      const _id = request.params?.id;
      try {
        let result;
        if (typeof _id === "string" && _id.length > 0) {
          result = await TodoDBSchema.findOne({ _id: _id, user: user }).select(
            "-__v"
          );
        } else {
          result = await TodoDBSchema.find({ user: user }).select("-__v");
        }
        res.status(200).json(result);
      } catch (e) {
        res.status(500).json(e);
      }
    })
    .catch((e) => {
      res.status(e?.responseCode ? e?.responseCode : 500).json(e);
    });
}

export function updateTodo(req: Request, res: Response<User | any>) {
  const payload = {
    title: cleanString(req.body?.title) || "",
    description: cleanString(req.body?.description) || "",
    status:
      cleanString(req.query?.status as string) ||
      TodoDBSchema.schema.path("status").options.default,
  };

  vine
    .validate({ schema: UpdateTodoSchema, data: payload })
    .then(() => {
      getUserByAuthPayloadOrUserName(req)
        .then(async (user: User) => {
          const _id = req.params?.id;
          try {
            const todo = await TodoDBSchema.findOne({ user, _id: _id });
            if (todo) {
              if(payload.title) todo.title = payload.title;
              if(payload.description) todo.description = payload.description;
              todo.status = payload.status;
              await todo.save();
              res.status(200).json({ message: "Todo Updated" });
            } else {
              res.status(404).json({ message: "Record not found" });
            }
          } catch (e) {
            res.status(500).json(e);
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

export function deleteTodo(req: Request, res: Response) {
  getUserByAuthPayloadOrUserName(req)
    .then(async (user: User) => {
      const _id = req.params?.id;
      try {
        const todo = await TodoDBSchema.findOne({ user, _id: _id });
        if (todo) {
          await todo.deleteOne();
          res.status(200).json({ message: "Todo Removed" });
        } else {
          res.status(404).json({ message: "Record not found" });
        }
      } catch (e) {
        res.status(500).json(e);
      }
    })
    .catch((e) => {
      res.status(e?.responseCode ? e?.responseCode : 500).json(e);
    });
}
