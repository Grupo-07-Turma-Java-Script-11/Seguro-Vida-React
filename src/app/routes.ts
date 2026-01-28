import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/app/components/RootLayout";
import { Home } from "@/app/pages/Home";
import { About } from "@/app/pages/About";
import { Plans } from "@/app/pages/Plans";
import { Contact } from "@/app/pages/Contact";
import { NotFound } from "@/app/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "sobre", Component: About },
      { path: "planos", Component: Plans },
      { path: "contato", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
]);
