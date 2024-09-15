import { AxiosRequestConfig } from "axios";
import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";
import ApiRoutes from "../../api/ApiRoutes";
import UserModel from "../../types/UserModel";
import {
  CreateNewTaskRequestModel,
  DeleteTaskRequestModel,
  GetAllTodosPayload,
  StatusesResponseModel,
  UpdateTaskRequestModel,
} from "../../types/api";
import { TaskItem } from "../../types/todos";

const ApiEndPoints = (
  builder: EndpointBuilder<BaseQueryFn, string, string>
) => ({
  getAllUsers: builder.query<UserModel[], void>({
    query: (): AxiosRequestConfig => ({
      url: ApiRoutes.GetAllUsers,
      method: "GET",
    }),
  }),
  getDefinedStatuses: builder.query<StatusesResponseModel, void>({
    query: (): AxiosRequestConfig => ({
      url: ApiRoutes.GetStatuses,
      method: "GET",
    }),
  }),
  getAllTodos: builder.query<TaskItem[], GetAllTodosPayload>({
    query: (payload: GetAllTodosPayload): AxiosRequestConfig => ({
      url: ApiRoutes.GetTodos,
      method: "GET",
      params: payload,
    }),
  }),
  addTask: builder.mutation<void, CreateNewTaskRequestModel>({
    query: (payload: CreateNewTaskRequestModel): AxiosRequestConfig => ({
      url: ApiRoutes.CreateTodo,
      method: "POST",
      data: payload,
    }),
  }),
  updateTask: builder.mutation<void, UpdateTaskRequestModel>({
    query: ({
      param,
      ...payload
    }: UpdateTaskRequestModel): AxiosRequestConfig => ({
      url: ApiRoutes.UpdateTodo,
      method: "POST",
      data: payload,
      params: param,
    }),
  }),
  deleteTask: builder.mutation<void, DeleteTaskRequestModel>({
    query: ({ param }: DeleteTaskRequestModel): AxiosRequestConfig => ({
      url: ApiRoutes.RemoveTodo,
      method: "POST",
      params: param,
    }),
  }),
  // deleteConnection: builder.mutation<void, DeleteOrDownlaodConnectionPayload>({
  //   query: (payload: DeleteOrDownlaodConnectionPayload): AxiosRequestConfig => ({
  //     url: ApiRoutes.DeleteConnection,
  //     method: 'POST',
  //     data: payload,
  //   }),
  // }),
  // getServers: builder.query<ServerModel[], void>({
  //   query: (): AxiosRequestConfig => ({
  //     url: ApiRoutes.GetServer,
  //     method: 'GET',
  //   }),
  // }),
  // addServer: builder.mutation<void, AddServerPayload>({
  //   query: (payload: AddServerPayload): AxiosRequestConfig => ({
  //     url: ApiRoutes.AddServer,
  //     method: 'POST',
  //     data: payload,
  //   }),
  // }),
  // editServer: builder.mutation<void, EditServerPayload>({
  //   query: (payload: EditServerPayload): AxiosRequestConfig => ({
  //     url: ApiRoutes.EditServer,
  //     method: 'POST',
  //     data: payload,
  //   }),
  // }),
  // deleteServer: builder.mutation<void, DeleteServerPayload>({
  //   query: (payload: DeleteServerPayload): AxiosRequestConfig => ({
  //     url: ApiRoutes.DeleteServer,
  //     method: 'POST',
  //     data: payload,
  //   }),
  // }),
});
export default ApiEndPoints;
