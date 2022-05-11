import "@fontsource/raleway/500.css";
import "@fontsource/raleway/300.css";
import "@fontsource/raleway/100.css";
import '../styles/globals.css'
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import * as React from 'react';
import { AppContext, AppContextProvider } from '../contexts/AppContext';
import { buildTheme } from "../lib/theme";


function MyApp({ Component, pageProps }: AppProps) {
  const _theme = buildTheme();
  console.log(_theme);
  return <AppContextProvider> 
    <ChakraProvider theme={_theme} >
      <Component {...pageProps} />
    </ChakraProvider>
  </AppContextProvider>
}

export default MyApp
