import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      Authentication
      <Outlet />
    </div>
  );
};

export default AuthLayout;
