import { Outlet, useNavigate } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";
import { RootState, useAppSelector } from "../../store";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import routes from "../../constants/routes";


const  DashboardLayout = () => {
  const navigate = useNavigate();
  const token = useAppSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if(token === null || token === '') {
      navigate(routes.LOGIN);
    }
  },[])

  return (
    <Box sx={{ display: "flex" ,
      height: "100vh"
    }}>
      <CssBaseline />
      <Header />
      <Sidebar/>
      <Box
        component="main"        
        sx={{ width: 'calc(100% - 260px)',

         flexGrow: 1, margin: "64px 0px 0px 240px"  }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default DashboardLayout
