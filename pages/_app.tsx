import "../styles/globals.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Suspense fallback={<>Loading...</>}>
        <Component {...pageProps} />
      </Suspense>
    </RecoilRoot>
  );
}

export default MyApp;
