import vine from "@vinejs/vine";
import { SchemaTypes } from "@vinejs/vine/build/src/types";
import TodoDBSchema from "../db/todo";

export const UpdateTodoSchema: SchemaTypes = vine.object({
  title: vine.string().nullable(),
  description: vine.string().nullable(),
  status: vine.enum(TodoDBSchema.schema.path('status')?.options?.enum),
  estimation: vine.number().max(48).nullable(),
  effort: vine.number().max(48).nullable(),
  userName: vine.string(),
});

export const CreateTodoSchema: SchemaTypes = vine.object({
  title: vine.string().maxLength(128),
  description: vine.string(),
  estimation: vine.number().max(48),
  userName: vine.string().nullable(),
});
