import { AxiosRequestConfig } from 'axios';
import { BaseQueryFn, EndpointBuilder } from '@reduxjs/toolkit/query';
import ApiRoutes from '../../api/ApiRoutes';


const ApiEndPoints = (builder: EndpointBuilder<BaseQueryFn, string, string>) => ({
  // getConnections: builder.query<ConnectionModel[], void>({
  //   query: (): AxiosRequestConfig => ({
  //     url: ApiRoutes.GetConnection,
  //     method: 'GET',
  //   }),
  // }),
  // addConnection: builder.mutation<void, AddConnectionPayload>({
  //   query: (payload: AddConnectionPayload): AxiosRequestConfig => ({
  //     url: ApiRoutes.CreateConnection,
  //     method: 'POST',
  //     data: payload,
  //   }),
  // }),
  // updateConnection: builder.mutation<void, UpdateConnectionPayload>({
  //   query: (payload: UpdateConnectionPayload): AxiosRequestConfig => ({
  //     url: ApiRoutes.UpdateConnection,
  //     method: 'POST',
  //     data: payload,
  //   }),
  // }),
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
