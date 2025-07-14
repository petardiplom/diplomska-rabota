import {
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  Tooltip,
  ListItemButton,
  Collapse,
  Fade,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRight,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useCenter } from "../../contexts/CenterContext";
import { getDrawerItems, getMinimalDrawerItems } from "./MenuItems";

const SidebarContent = ({ sidebarOpen, toggleSidebar, isMinimal }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { centerId } = useCenter();

  const drawerItems = getDrawerItems(centerId);
  const minimalItems = getMinimalDrawerItems();
  const [openMenus, setOpenMenus] = useState({});

  const handleClick = (text, path) => {
    if (text === "Logout") {
      logout();
      return;
    }
    navigate(path);
  };

  const handleToggleMenu = (text) => {
    setOpenMenus((prev) => ({
      ...prev,
      [text]: !prev[text],
    }));
  };

  const renderListItems = (items) =>
    items.map(({ text, icon, path, children }) => {
      const isOpen = openMenus[text] || false;

      if (children) {
        return (
          <div key={text}>
            <Tooltip title={!sidebarOpen ? text : ""} placement="right">
              <ListItemButton
                onClick={() => handleToggleMenu(text)}
                sx={{ px: 2.6 }}
              >
                <ListItemIcon
                  sx={{
                    color: theme.palette.text.primary,
                    minWidth: 0,
                    mr: sidebarOpen ? 2 : "auto",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ visibility: sidebarOpen ? "visible" : "hidden" }}
                />
                {sidebarOpen && (
                  <Fade in timeout={1200}>
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                  </Fade>
                )}
              </ListItemButton>
            </Tooltip>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {children.map(
                  ({ text: childText, path: childPath, icon: childIcon }) => (
                    <Tooltip
                      key={`${text}_${childText}`}
                      title={!sidebarOpen ? `${text} ${childText}` : ""}
                      placement="right"
                    >
                      <ListItemButton
                        key={childText}
                        sx={{ pl: sidebarOpen ? 4 : 2.6 }}
                        onClick={() => handleClick(childText, childPath)}
                      >
                        {childIcon && (
                          <ListItemIcon
                            sx={{
                              color: theme.palette.text.primary,
                              minWidth: 0,
                              mr: sidebarOpen ? 2 : "auto",
                            }}
                          >
                            {childIcon}
                          </ListItemIcon>
                        )}
                        <ListItemText
                          primary={childText}
                          sx={{
                            visibility: sidebarOpen ? "visible" : "hidden",
                          }}
                        />
                      </ListItemButton>
                    </Tooltip>
                  )
                )}
              </List>
            </Collapse>
          </div>
        );
      }

      return (
        <Tooltip key={text} title={!sidebarOpen ? text : ""} placement="right">
          <ListItemButton
            onClick={() => handleClick(text, path)}
            sx={{ px: 2.6 }}
          >
            <ListItemIcon
              sx={{
                color: theme.palette.text.primary,
                minWidth: 0,
                mr: sidebarOpen ? 2 : "auto",
              }}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={{ visibility: sidebarOpen ? "visible" : "hidden" }}
            />
          </ListItemButton>
        </Tooltip>
      );
    });

  return (
    <>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: sidebarOpen ? "space-between" : "center",
          px: 2,
        }}
      >
        {sidebarOpen && (
          <Typography variant="h6" noWrap>
            MyApp
          </Typography>
        )}
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <List>{renderListItems(isMinimal ? minimalItems : drawerItems)}</List>
    </>
  );
};

export default SidebarContent;
