import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./router";

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <RouterProvider router={router} />
        <Outlet />
      </QueryClientProvider>
    </>
  );
}

export default App;
