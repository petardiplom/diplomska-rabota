import React from 'react';
import { Toolbar, Typography, IconButton, List, ListItem, ListItemIcon, ListItemText, Tooltip, ListItemButton } from '@mui/material';
import { ChevronLeft, ChevronRight, Dashboard as DashboardIcon, AccountCircle, Logout } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const SidebarContent = ({ sidebarOpen, toggleSidebar, isMinimal }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const drawerItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Calendar', icon: <AccountCircle />, path: '/calendar' },
    { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
    { text: 'Logout', icon: <Logout />, path: '/logout' },
  ];

  const minimalItems = [
    { text: 'Profile', icon: <AccountCircle />, path: '/profile' },
    { text: 'Logout', icon: <Logout />, path: '/logout' },
  ];

  return (
    <>
      <Toolbar sx={{ display: 'flex', justifyContent: sidebarOpen ? 'space-between' : 'center', px: 2 }}>
        {sidebarOpen && <Typography variant="h6" noWrap>MyApp</Typography>}
        <IconButton onClick={toggleSidebar}>
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Toolbar>
      <List>
        {isMinimal ? minimalItems.map(({ text, icon, path }) => (
          <Tooltip key={text} title={!sidebarOpen ? text : ''} placement="right">
            <ListItemButton onClick={() => navigate(path)} sx={{ px: 2.6 }}>
              <ListItemIcon sx={{ color: theme.palette.text.primary, minWidth: 0, mr: sidebarOpen ? 2 : 'auto' }}>
                {icon}
              </ListItemIcon>
              <ListItemText primary={text} sx={{ visibility: sidebarOpen ? 'visible' : 'hidden' }} />
            </ListItemButton>
          </Tooltip>)) : drawerItems.map(({ text, icon, path }) => (
            <Tooltip key={text} title={!sidebarOpen ? text : ''} placement="right">
              <ListItemButton onClick={() => navigate(path)} sx={{ px: 2.6 }}>
                <ListItemIcon sx={{ color: theme.palette.text.primary, minWidth: 0, mr: sidebarOpen ? 2 : 'auto' }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ visibility: sidebarOpen ? 'visible' : 'hidden' }} />
              </ListItemButton>
            </Tooltip>
          ))}
      </List>
    </>
  );
};

export default SidebarContent;
