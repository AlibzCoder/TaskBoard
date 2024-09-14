import userReducer from './userSlice';
import authReducer from './authSlice';
import { ApiReducer, ApiReducerPath } from '../middlewares/createApiReducer';

export default {
  user: userReducer,
  auth: authReducer,
  [ApiReducerPath]: ApiReducer,
};
