import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import {
  QueryClientProvider,
  queryClient,
  ReactQueryDevtools,
} from '../config/queryClient';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6e6e73',
      selected: '#cbcbef',
    },
    secondary: { main: '#ffffff' },
  },
  zIndex: {
    drawer: 1000,
  },
  overrides: {
    MuiAvatar: {
      colorDefault: {
        backgroundColor: grey[400],
      },
    },
  },
});

const Root = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
    </div>
  );
};

export default Root;
