import "bootstrap/dist/css/bootstrap.min.css";
import "@client/styles/globals.css";
import { NextComponentType, NextPageContext } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { AuthGuard, WithAuthProps } from "@client/auth";
import Header from "@client/components/Header";
import { Container, SSRProvider } from "react-bootstrap";

type LocalAppProps<T = {}> = AppProps<T> & {
  Component: WithAuthProps<NextComponentType<NextPageContext, any, T>>;
};

function App({ Component, pageProps }: LocalAppProps) {
  return (
    <SessionProvider>
      <SSRProvider>
        <Head>
          <title>catcch.me - Dead Simple Error Tracking</title>
          <meta
            name="description"
            content="catcch.me is an error tracking app. You can setup and start use it in one minute. Start today, start free."
          />
          <link rel="icon" href="/icons/octopus.svg" />
        </Head>

        <Header />
        <Container>
          {Component.authStatus ? (
            <AuthGuard authStatus={Component.authStatus} redirect={Component.redirect}>
              <Component {...pageProps} />
            </AuthGuard>
          ) : (
            <Component {...pageProps} />
          )}
        </Container>
      </SSRProvider>
    </SessionProvider>
  );
}

export default App;
