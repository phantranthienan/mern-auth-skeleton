import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import Loading from '@/components/ui/loading';

const ProtectedRoute = () => {
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
