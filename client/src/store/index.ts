import { configureStore } from "@reduxjs/toolkit";
//import { errorLoggingMiddleware } from 'middlewares/errorLogging.middleware';
import { ApiMiddleware } from "./middlewares/createApiReducer";
import rootReducer from "./slices";

export const store = configureStore({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  reducer: rootReducer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore:next-line
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(ApiMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
