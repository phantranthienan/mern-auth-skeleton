import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/stores/auth.store';
import useNotification from '@/hooks/use-notification';
import Loading from '@/components/ui/loading';
import { LINKS } from '@/constants/links';

const ProtectedRoute = () => {
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();
  const { handleError } = useNotification();
  // track whether we've already attempted a check in this render lifecycle
  const [didAttemptCheck, setDidAttemptCheck] = useState(false);

  useEffect(() => {
    const attemptCheck = async () => {
      try {
        await checkAuth();
      } catch (error) {
        handleError(error);
      } finally {
        setDidAttemptCheck(true);
      }
    };
    if (!didAttemptCheck) {
      // if we haven't attempted a check in this session, do it now
      attemptCheck();
    }
  }, [checkAuth, didAttemptCheck, handleError]);

  // if still checking or haven't attempted the check yet, show a loader
  if (isCheckingAuth || !didAttemptCheck) {
    return <Loading />;
  }

  // if have completed the check and user is not authenticated, redirect
  if (!isAuthenticated) {
    return <Navigate to={LINKS.LOGIN} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
