import AuthRouter from "./routes/auth";
import UserRouter from "./routes/user";
import TodoRouter from "./routes/todo";

export const DBCredentials = {
  HOST_NAME: "todo.nqeff.mongodb.net",
  ADMIN_DB_NAME: "admin",
  APP_DB_NAME: "todoApp",
  USERNAME: "root",
  PASSWORD: "qjwnlRrdDut1HOIq",
  UsersCollection: "users",
  TodosCollection: "todos",
};

export const AuthProp = {
  secret: "41aa67bcdc265334364d6dfd6b3718174fdbfeb15512be98926858aade6e5a82",
  refreshSecret:
    "2bbe0767d74c8a314315f02ebdc999e1c9b9e18959a9e53350a3d3dfa2d4c79a",
  expiresIn: 86400,
  refreshExpiresIn: 31556926,
};

export const Routes = {
  Auth: {
    index: "auth",
    Register: "/register",
    Login: "/login",
    Refresh: "/refresh"
  },
  User: {
    index: "user",
    GetUser: "/",
    GetUsers: "/all",
    DeleteUser: "/delete",
    UpdateUser: "/update"
  },
  Todo: {
    index: "todo",
    GetTodos: "/get/",
    DeleteTodo: "/delete/",
    UpdateTodo: "/update/",
    CreateTodo: "/create",
    GetStatuses: "/getStatuses"
  },
};


export class ResponseError extends Error {
  message = "";
  code = "";
  responseCode = 0
  data = {};
  constructor(message: string, code: string, responseCode : number, data = {}) {
    super(message);
    this.code = code;
    this.responseCode = responseCode;
    this.data = data;
  }
}

export const USER_NOTFOUND_ERROR = new ResponseError("No user with this username exists!", "USER_NOT_FOUND", 404)
export const INCORRECT_PASSWORD = new ResponseError("Password is incorrect", "INCORRECT_PASSWORD", 400)
export const INTERNAL_ERROR = new ResponseError("Internal Server", "INTERNAL_ERROR", 500)