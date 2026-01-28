import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaApolices from './components/apolice/listaapolices/ListaApolices';
import { ToastContainer } from 'react-toastify';
import DeletarApolice from './components/apolice/deletarapolice/DeletarApolice';
import FormApolice from './components/apolice/formapolice/FormApolice';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <div className="min-h-[80vh]">
          <Routes>
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
