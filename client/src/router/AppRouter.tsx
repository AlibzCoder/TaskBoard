import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { withLoading } from '../hocs/withLoading.hoc'
import RequireAuth from './RequireAuth';
import MainLayout from '../pages/MainLayout';
import LoginPage from '../pages/Auth/LoginPage';
import SignUpPage from '../pages/Auth/SignUpPage';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(() => import('../components/AuthLayout'));
const WorkFlowPage = React.lazy(() => import('../pages/WorkFlow/WorkFlow'));
const Logout = React.lazy(() => import('./Logout'));

const Workflow = withLoading(WorkFlowPage);
const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

export const AppRouter: React.FC = () => {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={protectedLayout}>
          <Route index element={<Workflow />} />
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="sign-up" element={<SignUpPage />} />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
      </Routes>
    </BrowserRouter>
  );
};
