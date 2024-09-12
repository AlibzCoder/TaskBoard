import { AuthProp, INTERNAL_ERROR, USER_NOTFOUND_ERROR } from "../consts";
import UserDBSchema from "../db/user";
import { AuthorizedRequest } from "../types/middleware";
import { User } from "../types/user";
import { Request } from "express";
import { scryptSync, randomBytes } from "crypto"
import jwt from "jsonwebtoken";
import { Todo } from "../types/todo";


export function getUserByAuthPayloadOrUserName(request: Request, username : string | null = null) : Promise<User> {
  return new Promise((res, rej) => {
    const req = request as AuthorizedRequest;
    const authPayload = req.tokenPayload?.data;
    if ((!authPayload || !authPayload?.username) && !username) return rej(USER_NOTFOUND_ERROR);
    UserDBSchema.findOne(username ? { username: username } : authPayload)
      .then((user: User | any) => {
        if (!user) return rej(USER_NOTFOUND_ERROR);
        res(user);
      })
      .catch(()=>{rej(INTERNAL_ERROR)});
  });
}
export function UserDBDocToJson(user: User | any) {
  if(user?.toJSON) user = user.toJSON();
  const { _id, __v, password, ...UserExcludedFields } = user;
  return Object.assign({ id: _id }, UserExcludedFields);
}
export function HashPassword(password : string){
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64);
  return `${hash.toString('hex')}.${salt}`;
}
export function compareHashedPassword(password : string, hash : string) {
  if(typeof password !== 'string' || password.length === 0 || typeof hash !== 'string' || hash.length === 0) return false;
  const [hashedPassword, salt] = hash.split(".");
  const key1 = scryptSync(password, salt, 64);
  return (key1.toString("hex") === hashedPassword) ? true : false;
}






export const GenerateAuthCredentials = (payload: object | any) => {
  return new Promise((res, rej) => {
    try {
      const { expiresIn, secret, refreshExpiresIn, refreshSecret } = AuthProp;
      const token = jwt.sign(
        { exp: Math.floor(Date.now() / 1000) + expiresIn, data: payload },
        secret
      );
      const refreshToken = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + refreshExpiresIn,
          data: payload,
        },
        refreshSecret
      );
      res({
        Authorization: token,
        refreshToken: refreshToken,
      });
    } catch (e) {
      rej(e);
    }
  });
};
export const RefreshAuthCredentials = (refreshToken: string | any) => {
  return new Promise((res, rej) => {
    try {
      const { expiresIn, secret, refreshExpiresIn, refreshSecret } = AuthProp;

      jwt.verify(refreshToken, refreshSecret, (err : any, payload: object | any) => {
        if (err) {
          rej(err);
        } else {
          payload.exp = Math.floor(Date.now() / 1000) + expiresIn;
          const token = jwt.sign(payload, secret);
          const refreshToken = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + refreshExpiresIn,
              data: payload,
            },
            refreshSecret
          );
          res({
            Authorization: token,
            refreshToken: refreshToken,
          });
        }
      });
    } catch (e) {
      rej(e);
    }
  });
};
