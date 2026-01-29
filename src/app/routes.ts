import { createBrowserRouter } from "react-router";
import { RootLayout } from "@/app/components/RootLayout";
import { Home } from "@/app/pages/Home";
import { About } from "@/app/pages/About";
import { Plans } from "@/app/pages/Plans";
import { Contact } from "@/app/pages/Contact";
import { NotFound } from "@/app/pages/NotFound";
// Importações do CRUD de Usuário
import ListarUsuario from "@/app/pages/usuario/listarUsuario/listarUsuario";
import FormUsuario from "@/app/pages/usuario/formUsuario/formUsuario";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "sobre", Component: About },
      { path: "planos", Component: Plans },
      { path: "contato", Component: Contact },
      
      // Rotas de Usuário
      {
        path: "usuario",
        children: [
          { index: true, Component: ListarUsuario },
          { path: "novo", Component: FormUsuario },
          { path: "editar/:id", Component: FormUsuario },
        ],
      },

      { path: "*", Component: NotFound },
    ],
  },
]);