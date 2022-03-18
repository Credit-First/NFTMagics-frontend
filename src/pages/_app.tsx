import { AppProps } from 'next/app';

import { useEffect } from "react";
import { useRouter } from "next/router";
import '@/styles/font.css';
import '@/styles/custom.css';
import '@/styles/colors.css';
import '@/styles/globals.css';
import ProgressBar from '@/components/ProgressBar';
import MaterialThemeProvider from '@/providers/ThemeProvider';
import Web3Provider from "@/providers/Web3Provider";
import { Provider } from "react-redux";
import store from '@/store';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleRouteChange = (url: any) => {
    // window.gtag("config", "[Tracking ID]", {
    //   page_path: url,
    // });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <MaterialThemeProvider>
      <Provider store={store}>
        <ProgressBar />
        <Web3Provider>
          <Component {...pageProps} />
        </Web3Provider>
        <ToastContainer
          theme='colored'
          position="bottom-left"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
      </Provider>
    </MaterialThemeProvider>
  );
}

export default MyApp;
