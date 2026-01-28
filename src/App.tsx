import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ListaApolices from './components/apolice/listaapolices/ListaApolices';
import { ToastContainer } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/apolices' element={<ListaApolices />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
