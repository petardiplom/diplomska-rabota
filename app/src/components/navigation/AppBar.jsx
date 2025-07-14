import { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ThemeToggle from "../ThemeToggle";
import UserMenu from "./UserMenu";
import { useCenter } from "../../contexts/CenterContext";

const drawerWidth = 240;
const collapsedWidth = 70;

const CustomAppBar = ({ sidebarOpen }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const center = useCenter();
  const theme = useTheme();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          xs: "100%",
          md: `calc(100% - ${sidebarOpen ? drawerWidth : collapsedWidth}px)`,
        },
        ml: { md: `${sidebarOpen ? drawerWidth : collapsedWidth}px` },
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        boxShadow: "none",
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          {center.center ? center.center.name : ""}
        </Typography>

        <ThemeToggle />
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
};

export default CustomAppBar;
