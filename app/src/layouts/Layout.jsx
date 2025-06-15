import { useState } from 'react';
import { Box, CssBaseline, Drawer, useTheme, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import SidebarContent from '../components/SidebarContent';
import MobileSidebarContent from '../components/MobileSidebarContent';
import CustomAppBar from '../components/AppBar';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 70;
const minimalPaths = ['/centers', '/profile']

const Layout = ({ children }) => {

  const location = useLocation();
  const isMinimal = minimalPaths.includes(location.pathname);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <CustomAppBar sidebarOpen={sidebarOpen}/>



      <Box component="nav" sx={{ flexShrink: 0 }}>
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              backgroundColor: theme.palette.background.paper,
            },
          }}
        >
          <MobileSidebarContent handleDrawerToggle={handleDrawerToggle} />
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              width: sidebarOpen ? drawerWidth : collapsedWidth,
              overflowX: 'hidden',
              backgroundColor: theme.palette.background.paper,
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.standard,
              }),
              whiteSpace: 'nowrap',
            },
          }}
          open
        >
          <SidebarContent sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} isMinimal={isMinimal}/>
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          ml: { md: `${sidebarOpen ? drawerWidth : collapsedWidth}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;