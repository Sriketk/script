import { ZeroProvider } from "@rocicorp/zero/react";
import { schema } from "@script/db/zero-schema.gen";
import { env } from "@script/env/web";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import Loader from "./components/loader";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  context: {},
  defaultPendingComponent: () => <Loader />,
  defaultPreload: "intent",
  routeTree,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.querySelector("#app");

if (!rootElement) {
  throw new Error("Root element not found");
}

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ZeroProvider
      cacheURL={env.VITE_ZERO_CACHE_URL}
      schema={schema}
      userID="anon"
    >
      <RouterProvider router={router} />
    </ZeroProvider>
  );
}
