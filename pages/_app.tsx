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
import Layout from "../components/layout/Layout";
import { AnimatePresence } from "framer-motion";


function MyApp({ Component, pageProps }: AppProps) {
  const _theme = buildTheme();

  return <AppContextProvider>
    <ChakraProvider theme={_theme} >
      <Layout>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => {
            window.scrollTo(0, 0);
          }}
        >
          {/* @ts-ignore */}
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  </AppContextProvider>
}

export default MyApp
