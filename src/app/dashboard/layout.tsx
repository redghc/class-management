'use client';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import Logo from '@/components/Logo';
import Spacer from '@/components/Spacer';

import MenuList from './MenuList';
import useLayout from './useLayout';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

interface AppBarProps {
  open: boolean;
}

interface MenuIconButtonProps {
  open: boolean;
}

const drawerWidth = 240;

const MainStyled = styled('main')(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
  height: '100vh',
  flexGrow: 1,
  overflow: 'auto',
}));

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<AppBarProps>(
  ({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }),
);

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const DrawerToolbar = styled(Toolbar)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  px: [1],
});

const MenuIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MenuIconButtonProps>(({ open }) => ({
  color: 'inherit',
  marginRight: '36px',
  ...(open && { display: 'none' }),
}));

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { handleLogout, open, toggleDrawer, loading } = useLayout();

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="absolute" open={open}>
        <Toolbar>
          <MenuIconButton onClick={toggleDrawer} open={open} edge="start">
            <MenuIcon />
          </MenuIconButton>
          <Logo link size="small" />
          <Spacer />
          <IconButton onClick={handleLogout} color="inherit" disabled={loading}>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerToolbar>
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerToolbar>

        <Divider />

        <List component="nav">
          <MenuList />
          <Divider sx={{ my: 1 }} />
        </List>
      </Drawer>

      <MainStyled>
        <Toolbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          {children}
        </Container>
      </MainStyled>
    </Box>
  );
};

export default DashboardLayout;
