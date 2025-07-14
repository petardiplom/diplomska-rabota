import {
  Toolbar,
  Typography,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import { ChevronLeft } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { getMinimalDrawerItems } from "./MenuItems";

const MobileSidebarContent = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const drawerItems = getMinimalDrawerItems();

  return (
    <>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Typography variant="h6" noWrap>
          MyApp
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <ChevronLeft />
        </IconButton>
      </Toolbar>
      <List>
        {drawerItems.map(({ text, icon, path }) => (
          <ListItemButton
            key={text}
            onClick={() => {
              navigate(path);
              handleDrawerToggle();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        ))}
      </List>
    </>
  );
};

export default MobileSidebarContent;
