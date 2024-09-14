
import { AxiosError, AxiosRequestConfig } from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';
import ApiEndPoints from './ApiEndpoints';
import httpApi from '../../api/http.api';

export const apiReducerSlice = createApi({
  reducerPath: 'api',
  baseQuery: async (options: AxiosRequestConfig) => {
    try {
      const result = await httpApi(options);
      return { data: result.data };
    } catch (axiosError: any | AxiosError) {
      const err = axiosError;
      return {
        error: {
          status: err?.status || err?.data?.status || err?.response?.status,
          data: err.data || err.response.data || err.message,
        },
      };
    }
  },
  endpoints: ApiEndPoints,
});

export const {
  // useGetConnectionsQuery,
  // useGetServersQuery,
  // useAddConnectionMutation,
  // useUpdateConnectionMutation,
  // useDeleteConnectionMutation,
  // useAddServerMutation,
  // useEditServerMutation,
  // useDeleteServerMutation,
  middleware: ApiMiddleware,
  reducerPath: ApiReducerPath,
  reducer: ApiReducer,
} = apiReducerSlice;
