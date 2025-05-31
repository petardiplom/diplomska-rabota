import React from 'react';
import { Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
import { ChevronLeft, Dashboard as DashboardIcon, AccountCircle, Logout } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const MobileSidebarContent = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();

  const drawerItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
    { text: 'Logout', icon: <Logout />, path: '/logout' },
  ];

  return (
    <>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', px: 2 }}>
        <Typography variant="h6" noWrap>MyApp</Typography>
        <IconButton onClick={handleDrawerToggle}><ChevronLeft /></IconButton>
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