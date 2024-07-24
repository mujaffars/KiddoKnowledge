// src/components/ProgressBar.tsx
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: true, speed: 200, minimum: 0.2 });

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChangeStart = () => NProgress.start(function(){
      console.log('progress started');
    });
    const handleRouteChangeComplete = () => NProgress.done();
    const handleRouteChangeError = () => NProgress.done();

    // Add event listeners
    window.addEventListener('routeChangeStart', handleRouteChangeStart);
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete);
    window.addEventListener('routeChangeError', handleRouteChangeError);

    // Cleanup event listeners
    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart);
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete);
      window.removeEventListener('routeChangeError', handleRouteChangeError);
    };
  }, [pathname]);

  return null;
}
