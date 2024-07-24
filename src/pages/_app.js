import '../styles/globals.css';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import nprogress styles
import Navbar from '../components/navbar';
import Router from 'next/router';
import { useEffect } from 'react';

NProgress.configure({ showSpinner: false, speed: 400, minimum: 0.25 });

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start();
    };

    const handleRouteChangeComplete = () => {
      NProgress.done();
    };

    const handleRouteChangeError = () => {
      NProgress.done();
    };

    Router.events.on('routeChangeStart', handleRouteChangeStart);
    Router.events.on('routeChangeComplete', handleRouteChangeComplete);
    Router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart);
      Router.events.off('routeChangeComplete', handleRouteChangeComplete);
      Router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;