import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>catcch.me - Dead Simple Error Tracking</title>
        <meta
          name="description"
          content="catcch.me is an error tracking app. You can setup and start use it in one minute. Start today, start free."
        />
        <link rel="icon" href="/icons/octopus.svg" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
