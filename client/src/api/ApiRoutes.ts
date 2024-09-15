enum ApiRoutes {
  Login = "auth/login",
  Register = "auth/register?loginAfterCreate=true",
  RefreshToken = "/auth/refresh",
  GetTodos = "/todo/get/",
  GetStatuses = "/todo/getStatuses",
  CreateTodo = "/todo/create",
  UpdateTodo = "/todo/update/",
  RemoveTodo = "/todo/delete/",
  UserInfo = "/user",
  GetAllUsers = "/user/all",
  UpdateUserInfo = "/user/update",
  DeleteAccount = "/user/delete"
}
export default ApiRoutes;
