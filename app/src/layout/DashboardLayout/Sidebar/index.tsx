import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupIcon from "@mui/icons-material/Group";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../../constants/routes";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      name: "Clients",
      icon: <GroupIcon />,
      path:  routes.CLIENTS,
    },
    {
      name: "Projects",
      icon: <InboxIcon />,
      path: routes.PROJECTS,
    },
  ];

  const drawerWidth = 240;
  return (
    <Drawer
      sx={{
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "64px",
          fontWeight: "bold",
          fontSize: "1.5rem",
          color: "#1976d2",
          borderBottom: "1px solid #ccc",
        }}
      >
      KC 
      </Toolbar>
    
      <Divider />
      <List>
        {items.map((data, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
            onClick={() => {navigate(data.path)}}
            selected={data.path === location.pathname}
            >
              <ListItemIcon>
                {data.icon}
              </ListItemIcon>
              <ListItemText primary={data.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;
