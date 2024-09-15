import { Request, Response } from "express";
import { User } from "../types/user";
import { cleanString, fullName } from "../utils";
import vine, { errors } from "@vinejs/vine";
import { getUserByAuthPayloadOrUserName } from "../handlers/utils";
import { USER_NOTFOUND_ERROR } from "../consts";
import TodoDBSchema, { completedStatusKey, statuses } from "../db/todo";
import { CreateTodoSchema, UpdateTodoSchema } from "../schemes/todo";
import UserDBSchema from "../db/user";
import { Schema } from "mongoose";

export function createTodo(req: Request, res: Response<User | any>) {
  const payload = {
    title: cleanString(req.body?.title),
    description: cleanString(req.body?.description),
    estimation: cleanString(req.body?.estimation) || 0,
    userName: cleanString(req.body?.userName),
  };

  vine
    .validate({ schema: CreateTodoSchema, data: payload })
    .then(() => {
      getUserByAuthPayloadOrUserName(
        payload.userName ? null : req,
        payload.userName
      )
        .then((user: User) => {
          new TodoDBSchema(
            Object.assign(payload, {
              user,
              assignedTo: fullName(user.firstName || "", user.lastName || ""),
            })
          )
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

export async function getTodos(request: Request, res: Response) {
  const _id = request.query?.id;
  const userName = cleanString(`${request.query?.userName}`);
  let user;
  if (userName) {
    try {
      user = await getUserByAuthPayloadOrUserName(null, userName);
    } catch (e) {}
  }
  const userFilter = user ? { user: user._id } : {};
  try {
    let result;
    if (typeof _id === "string" && _id.length > 0) {
      result = await TodoDBSchema.findOne({
        _id: _id,
        ...userFilter,
      }).select("-__v");
    } else {
      result = await TodoDBSchema.find(userFilter).select("-__v");
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(500).json(e);
  }
}
export function getStatuses(request: Request, res: Response) {
  res.status(200).json(TodoDBSchema.schema.path("status").options);
}

export function updateTodo(req: Request, res: Response<User | any>) {
  const payload = {
    title: cleanString(req.body?.title) || "",
    description: cleanString(req.body?.description) || "",
    status: cleanString(req.body?.status as string),
    estimation: cleanString(req.body?.estimation) || "",
    effort: cleanString(req.body?.effort) || "",
    userName: cleanString(req.body?.userName) || "",
  };

  vine
    .validate({ schema: UpdateTodoSchema, data: payload })
    .then(() => {
      getUserByAuthPayloadOrUserName(req)
        .then(async (user: User) => {
          const _id = req.query?.id;
          try {
            let userAssignedTo = null;
            if (payload.userName) {
              try {
                userAssignedTo = await UserDBSchema.findOne({
                  _id: payload.userName,
                });
              } catch (e) {
                console.log(USER_NOTFOUND_ERROR);
              }
            }
            const todo = await TodoDBSchema.findOne({ _id: _id });

            if (todo) {
              if (payload.title) todo.title = payload.title;
              if (payload.description) todo.description = payload.description;
              if (payload.estimation) todo.estimation = payload.estimation;
              if (payload.effort) todo.effort = payload.effort;
              if (
                typeof payload.status === "string" &&
                statuses.includes(payload.status)
              )
                /*@ts-ignore*/
                todo.status = payload.status || statuses[0];
              if (userAssignedTo && userAssignedTo?._id !== user._id) {
                todo.user = new Schema.ObjectId(String(userAssignedTo?._id));
                todo.assignedTo = fullName(
                  userAssignedTo.firstName || "",
                  userAssignedTo.lastName || ""
                );
              }
              todo.lastUpdatedDate = Date.now();
              if (payload.status === completedStatusKey) {
                todo.completedDate = Date.now();
              }
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

export async function deleteTodo(req: Request, res: Response) {
  const _id = req.query?.id;
  try {
    const todo = await TodoDBSchema.findOne({ _id: _id });
    if (todo) {
      await todo.deleteOne();
      res.status(200).json({ message: "Todo Removed" });
    } else {
      res.status(404).json({ message: "Record not found" });
    }
  } catch (e) {
    res.status(500).json(e);
  }
}
