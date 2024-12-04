import { lazy } from 'react';
import AuthLayout from '../layout/AuthLayout';
import DashboardLayout from '../layout/DashboardLayout';

// // project import
// import Loadable from 'components/Loadable';
// import Dashboard from 'layout/Dashboard';

// const Color = Loadable(lazy(() => import('pages/component-overview/color')));
// const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
// const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/index')));

// // render - sample page
// const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));


const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    // {
    //   path: '/',
    //   element: <Home />
    // },
    // {
    //   path: 'color',
    //   element: <Color />
    // },
    // {
    //   path: 'dashboard',
    //   children: [
    //     {
    //       path: 'default',
    //       element: <DashboardDefault />
    //     }
    //   ]
    // },
    // {
    //   path: 'sample-page',
    //   element: <SamplePage />
    // },
    // {
    //   path: 'shadow',
    //   element: <Shadow />
    // },
    // {
    //   path: 'typography',
    //   element: <Typography />
    // }
  ]
};

export default MainRoutes;
