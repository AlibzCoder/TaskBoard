export interface LoginRequest {
  username: string;
  password: string;
}
export interface SignUpRequest {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}
export interface LoginResponse {
  Authorization: string;
  refreshToken: string;
}
export interface StatusesResponseModel {
  enum: string[];
  default: string;
}
export interface UpdateUserRequestModel {
  firstName: string;
  lastName: string;
  email: string;
  prevPassword: string;
  password: string;
}
export interface DeleteUserRequestModel {
  password: string;
}
export interface CreateNewTaskRequestModel {
  title: string;
  description: string;
  estimation: number;
  userName: string | undefined;
}
export interface UpdateTaskRequestModel {
  title?: string;
  description?: string;
  estimation?: number;
  effort?: number;
  userName?: string;
  status?: string;
  param: {
    id : string
  }
}
export interface DeleteTaskRequestModel {
  param: {
    id : string
  }
}
export interface GetAllTodosPayload {
  userName?: string
}