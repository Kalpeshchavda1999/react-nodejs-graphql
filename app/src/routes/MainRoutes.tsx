import routes from "../constants/routes";
import DashboardLayout from "../layout/DashboardLayout";
import Client from "../pages/Client";
import CreateClient from "../pages/CreateClient";
import Project from "../pages/Project";

const MainRoutes = {
  path: "/",
  element: <DashboardLayout />,
  children: [
    {
      path: routes.CLIENTS,
      element: <Client />,
    },
    {
      path: routes.CREATE_CLIENT,
      element: <CreateClient />,
    },
    {
      path: routes.PROJECTS,
      element: <Project />,
    },
  ],
};

export default MainRoutes;
