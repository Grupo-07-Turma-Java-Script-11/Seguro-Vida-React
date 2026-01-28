import "./index.css";
import { Route, Routes } from "react-router-dom";
import FormUsuario from "./pages/usuario/formUsuario/formUsuario";
import ListarUsuario from "./pages/usuario/listarUsuario/listarUsuario";

function App() {
  return (
    <div className="min-h-[80vh]">
      {" "}
      <Routes>
        <Route path="/" element={<ListarUsuario />} />
        <Route path="/usuario" element={<ListarUsuario />} />
        <Route path="/cadastrarUsuario" element={<FormUsuario />} />
        <Route path="/editarUsuario/:id" element={<FormUsuario />} />
      </Routes>
    </div>
  );
}

export default App;
