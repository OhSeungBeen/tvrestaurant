'use client';

import React, { useEffect, useState } from 'react';

import { useApiError } from '@hooks/useApiError';
import {
  DehydratedState,
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/lib/index.prod.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

type Props = {
  dehydratedState: DehydratedState;
  children: React.ReactNode;
};

export default function ReactQueryProvider({
  dehydratedState,
  children,
}: Props) {
  const [showDevtools, setShowDevtools] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.toggleDevtools = () => setShowDevtools((old) => !old);
  }, []);

  const { handleError } = useApiError();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        onError: handleError,
      },
      mutations: {
        onError: handleError,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <ReactQueryDevtools initialIsOpen />
        {showDevtools && (
          <React.Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </React.Suspense>
        )}
        {children}
      </Hydrate>
    </QueryClientProvider>
  );
}
