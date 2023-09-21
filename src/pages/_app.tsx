import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextPage } from 'next';
import { RootStoreProvider } from '../providers/rootStoreProvider';

export default function App({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  return (
    <RootStoreProvider hydrationData={pageProps.hydrationData}>
      <Component {...pageProps} />;
    </RootStoreProvider>
  );
}
