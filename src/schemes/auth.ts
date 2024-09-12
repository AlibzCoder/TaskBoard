import vine from "@vinejs/vine";
import { SchemaTypes } from "@vinejs/vine/build/src/types";

export const RegisterSchema : SchemaTypes = vine.object({
    username: vine.string(),
    firstName: vine.string().nullable(),
    lastName: vine.string().nullable(),
    email: vine.string().email(),
    password: vine
      .string()
      .minLength(8)
      .maxLength(32)
  })
export const LoginSchema = vine.object({
    username: vine.string(),
    password: vine
      .string()
      .minLength(8)
      .maxLength(32)
  })