import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";

import type { AppProps } from "next/app";
import Head from "next/head";
import Header from "../components/Header";
import { Container, SSRProvider } from "react-bootstrap";

function App({ Component, pageProps }: AppProps) {
  return (
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
        <Component {...pageProps} />
      </Container>
    </SSRProvider>
  );
}

export default App;
