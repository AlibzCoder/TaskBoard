import vine from "@vinejs/vine";
import { SchemaTypes } from "@vinejs/vine/build/src/types";

export const UpdateUserSchema: SchemaTypes = vine.object({
  firstName: vine.string().nullable(),
  lastName: vine.string().nullable(),
  email: vine.string().email().nullable(),
  password: vine.string().minLength(8).maxLength(32),
  prevPassword: vine.string().minLength(8).maxLength(32),
});
export const DeleteUserSchema: SchemaTypes = vine.object({
  password: vine.string().minLength(8).maxLength(32)
});
