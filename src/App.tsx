import { BrowserRouter, Routes, Route } from "react-router-dom"
import ListaCategoria from "./pages/categoria/ListaCategoria"
import FormCategoria from "./pages/categoria/FormCategoria"
import DeletarCategoria from "./pages/categoria/DeletarCategoria"



function App() {
  return (
    <BrowserRouter>
      <Routes>
        

        
        <Route path="/categorias" element={<ListaCategoria />} />
        <Route path="/categorias/cadastrar" element={<FormCategoria />} />
        <Route path="/categorias/editar/:id" element={<FormCategoria />} />
        <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
