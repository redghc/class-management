'use client';

import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { SnackbarProvider } from 'notistack';

import '@fontsource/poppins/100.css';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

interface ThemeProps {
  children: React.ReactNode;
}

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins',
  },
});

const Theme = ({ children }: ThemeProps) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <LocalizationProvider dateAdapter={AdapterLuxon}>{children}</LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default Theme;
