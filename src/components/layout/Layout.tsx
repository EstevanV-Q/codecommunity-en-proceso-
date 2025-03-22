import React from 'react';
import { Box, styled } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';
import { dimensions } from '../../theme/tokens';

const LayoutRoot = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  paddingTop: dimensions.navbar.height,
  backgroundColor: theme.palette.background.default,
}));

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <LayoutRoot>
      <Navbar />
      <MainContent>
        {children}
      </MainContent>
      <Footer />
    </LayoutRoot>
  );
};

export default Layout; 