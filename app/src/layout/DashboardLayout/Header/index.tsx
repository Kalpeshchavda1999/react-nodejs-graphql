import { Logout } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../store";
import { logout } from "../../../store/redux/authSlice";
import routes from "../../../constants/routes";

const Header: React.FC = () => {
  const drawerWidth = 240;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <AppBar
      position="fixed"
      sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <IconButton
        sx={{
          color: "white"
        }}
        onClick = {() => {  
          dispatch(logout());
          navigate(routes.LOGIN);
        }}
        >
          <Logout />
          <Typography variant="h6" noWrap component="div">  
            Logout
          </Typography>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
