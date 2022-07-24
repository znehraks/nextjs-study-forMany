import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { GlobalStyle } from "../styles/GlobalStyles";
import ErrorBoundary from "../components/ErrorBoundary";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default MyApp;
