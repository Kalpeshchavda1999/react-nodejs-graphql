import DashboardLayout from '../layout/DashboardLayout';
import Client from '../pages/Client';
import Project from '../pages/Project';


const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <Client />
    },
    {
      path: '/projects',
      element: <Project />  
    },
  ]
};

export default MainRoutes;
