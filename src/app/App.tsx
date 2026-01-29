// src/app/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/app/components/ui/sonner";
import ListarUsuario from "./pages/usuario/listarUsuario/listarUsuario";
import FormUsuario from "./pages/usuario/formUsuario/formUsuario";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Plans } from "./pages/Plans";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import "../styles/index.css";
import { UsuarioLayout } from "./components/UsuarioLayout";
import RootLayout from "./components/RootLayout";
import ListaCategoria from "./pages/categoria/ListaCategoria";
import FormCategoria from "./pages/categoria/FormCategoria";
import FormApolice from "./pages/apolice/formapolice/FormApolice";
import ListaApolices from "./pages/apolice/listaApolices/ListaApolices";
import DeletarApolice from "./pages/apolice/deletarapolice/DeletarApolice";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* GRUPO PÚBLICO: Header Branco (Vitalis Seguros) e Footer */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<About />} />
          <Route path="/planos" element={<Plans />} />
          <Route path="/contato" element={<Contact />} />
        </Route>

        {/* GRUPO ADMINISTRATIVO: Header Escuro (UsuarioLayout) */}
        <Route element={<UsuarioLayout />}>
          {/* Rotas de Usuário */}
          <Route path="/usuario" element={<ListarUsuario />} />
          <Route path="/cadastrarUsuario" element={<FormUsuario />} />
          <Route path="/editarUsuario/:id" element={<FormUsuario />} />

          {/* ROTAS DE CATEGORIA AGORA USAM O MESMO LAYOUT */}
          <Route path="/categorias" element={<ListaCategoria />} />
          <Route path="/categorias/cadastrar" element={<FormCategoria />} />
          <Route path="/categorias/editar/:id" element={<FormCategoria />} />

          {/* ROTAS DE APÓLICE */}
          <Route path="/apolices" element={<ListaApolices />} />
          <Route path="/apolices/cadastrar" element={<FormApolice />} />
          <Route path="/apolices/editar/:id" element={<FormApolice />} />
          <Route path="/apolices/deletar/:id" element={<DeletarApolice />} />

        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}