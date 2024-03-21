import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Query01 } from "./01/Query01";
import { Suspense, useState } from "react";
import { Query03 } from "./03/Query03";

import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient();

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        Show Query01
      </button>
      {visible && <Query01 />}
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return <div>{error.message}</div>;
        }}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Query03 />
        </Suspense>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
