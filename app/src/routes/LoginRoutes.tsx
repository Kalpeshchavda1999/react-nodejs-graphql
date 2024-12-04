import { lazy } from 'react';
import AuthLayout from '../layout/AuthLayout';
import Loadable from '../components/Loadable';

const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));

const LoginRoutes = {
  path: '/',
  element: <AuthLayout />,
  children: [
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    }
  ]
};

export default LoginRoutes;
