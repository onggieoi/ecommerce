import React from 'react';
import App from 'next/app';
import { ThemeProvider } from 'styled-components';
import { theme } from 'theme';
import { Provider as ReduxProvider } from "react-redux";
import NProgress from "nprogress";

import { CartProvider } from 'contexts/cart/cart.provider';
import { AuthProvider } from 'contexts/auth/auth.provider';
import { StickyProvider } from 'contexts/app/app.provider';
import { SearchProvider } from 'contexts/search/search.provider';
import LanguageProvider from 'contexts/language/language.provider';

import AppLayout from 'containers/LayoutContainer/AppLayout';
import { useDeviceType } from 'helper/useDeviceType';

// Language translation files
import localEn from 'data/translation/en.json';
import localAr from 'data/translation/ar.json';
import localEs from 'data/translation/es.json';
import localDe from 'data/translation/de.json';
import localCn from 'data/translation/zh.json';
import localIl from 'data/translation/he.json';
import localVi from 'data/translation/vi.json';

// External CSS import here
import 'rc-table/assets/index.css';
import 'rc-collapse/assets/index.css';
import 'react-multi-carousel/lib/styles.css';
import '@redq/reuse-modal/lib/index.css';
import { GlobalStyle } from 'styled/global.style';
import "nprogress/nprogress.css";

import store from 'redux/store';

// import store from 'redux/';

// Language translation Config
const messages = {
  en: localEn,
  ar: localAr,
  es: localEs,
  de: localDe,
  zh: localCn,
  he: localIl,
  vi: localVi,
};

export default function ExtendedApp({
  Component,
  pageProps,
  query,
  userAgent,
}) {
  const deviceType = useDeviceType(userAgent);
  NProgress.configure({ minimum: 1 });

  return (
    <ThemeProvider theme={theme}>
      <LanguageProvider messages={messages}>
        <CartProvider>
          <SearchProvider query={query}>
            <StickyProvider>
              <ReduxProvider store={store}>
                <AuthProvider>
                  <>
                    <AppLayout deviceType={deviceType}>
                      <Component {...pageProps} deviceType={deviceType} />
                    </AppLayout>
                    <GlobalStyle />
                  </>
                </AuthProvider>

              </ReduxProvider>

            </StickyProvider>
          </SearchProvider>
        </CartProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

ExtendedApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext);
  const { req, query } = appContext.ctx;
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { ...appProps, userAgent, query };
};
