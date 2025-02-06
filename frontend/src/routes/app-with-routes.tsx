/* eslint-disable prettier/prettier */
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loading from '@/components/ui/loading';
import AuthLayout from '@/layouts/auth.layout';

const HomePage = lazy(() => import('@/pages/home.page'));
const LoginPage = lazy(() => import('@/pages/auth/login.page'));
const RegisterPage = lazy(() => import('@/pages/auth/register.page'));
const VerifyAccountPage = lazy(() => import('@/pages/auth/verify-account.page'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password.page'));
const ResetPasswordPage = lazy(() => import('@/pages/auth/reset-password.page'));
const NotFoundPage = lazy(() => import('@/pages/not-found.page'));

const AppWithRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Auth routes */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="verify-account" element={<VerifyAccountPage />} />
          <Route path="request-reset-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password" element={<ResetPasswordPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppWithRoutes;
