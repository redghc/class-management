'use client';

import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';

import Logo from '@/components/Logo';
import Spacer from '@/components/Spacer';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const MainStyled = styled('main')({ width: '100%', marginTop: 63 });

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Logo link size="small" />
          <Spacer />
        </Toolbar>
      </AppBar>

      <MainStyled>{children}</MainStyled>
    </>
  );
};

export default DashboardLayout;
