import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DeletarApolice from './components/apolice/deletarapolice/DeletarApolice';
import FormApolice from './components/apolice/formapolice/FormApolice';
import ListaCategoria from './pages/categoria/ListaCategoria';
import FormCategoria from './pages/categoria/FormCategoria';
import DeletarCategoria from './pages/categoria/DeletarCategoria';
import ListaApolices from './components/apolice/listaApolices/ListaApolices';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-[80vh]">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/categorias" element={<ListaCategoria />} />
            <Route path="/categorias/cadastrar" element={<FormCategoria />} />
            <Route path="/categorias/editar/:id" element={<FormCategoria />} />
            <Route path="/categorias/deletar/:id" element={<DeletarCategoria />} />
            <Route path='/apolices' element={<ListaApolices />} />
            <Route path='/cadastrarapolice' element={<FormApolice />} />
            <Route path='/deletarapolice/${id}' element={<DeletarApolice />} />
            <Route path='/editarapolice/${id}' element={<FormApolice />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
