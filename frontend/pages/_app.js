import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import SnackbarController from '../components/snackbar';

import stores from '../stores/index.js';

import { CONFIGURE } from '../stores/constants';

import '../styles/globals.css';

import lightTheme from '../theme/light';
import darkTheme from '../theme/dark';

import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();

  const changeTheme = (dark) => {
    setIsDarkMode(dark ? true : false);
    localStorage.setItem('yearn.finance-dark-mode', dark ? 'dark' : 'light');
  };
  
  const Theme = useMemo(() => createTheme(isDarkMode ? darkTheme : lightTheme), [isDarkMode]);

  useEffect(function () {
    const localStorageDarkMode = window.localStorage.getItem('yearn.finance-dark-mode');
    changeTheme(localStorageDarkMode ? localStorageDarkMode === 'dark' : false);
  }, []);

  useEffect(function () {
    stores.dispatcher.dispatch({ type: CONFIGURE });
  }, []);

  useEffect(() => {
    Fathom.load('VRYAZFWG', {
      includedDomains: ['token-faucet.defillama.com'],
      url: 'https://surprising-powerful.llama.fi/script.js',
    });

    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Component {...pageProps} changeTheme={changeTheme} />
        <SnackbarController />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
