import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import { useRouter } from 'next/router';
import { useTheme } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import PageLoading from '@/components/PageLoading';

export default function ProgressBar() {
  const theme = useTheme();
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  NProgress.configure({ showSpinner: false });

  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
      NProgress.start();
    };
    const handleStop = () => {
      setPageLoading(false);
      NProgress.done();
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);

  return (
    <>
      <GlobalStyles
        styles={{
          '#nprogress': {
            pointerEvents: 'none',
            '& .bar': {
              top: 0,
              left: 0,
              height: 4,
              width: '100%',
              position: 'fixed',
              zIndex: theme.zIndex.snackbar,
              backgroundColor: theme.palette.primary.main,
              boxShadow: `0 0 2px ${theme.palette.primary.main}`,
            },
            '& .peg': {
              right: 0,
              opacity: 1,
              width: 100,
              height: '100%',
              display: 'block',
              position: 'absolute',
              transform: 'rotate(3deg) translate(0px, -4px)',
              boxShadow: `0 0 10px ${theme.palette.primary.main}, 0 0 5px ${theme.palette.primary.main}`,
            },
          },
        }}
      />
      <PageLoading loading={pageLoading} />
    </>
  );
}
