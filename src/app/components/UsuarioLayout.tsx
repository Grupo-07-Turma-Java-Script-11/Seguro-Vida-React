import React from "react";
import { Outlet, Link } from "react-router-dom";

// Você pode criar componentes pequenos aqui mesmo ou em arquivos separados
const UsuarioHeader = () => (
  <header className="bg-gray-800 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="font-bold text-xl text-blue-400">Painel</Link>
      <nav className="space-x-4">
        <Link to="/usuario" className="hover:text-blue-300">Usuarios</Link>
        <Link to="/apolices" className="hover:text-blue-300">Apólices</Link>
        <Link to="/categorias" className="hover:text-blue-300">Categorias</Link>
      </nav>
    </div>
  </header>
);

const UsuarioFooter = () => (
  <footer className="bg-gray-100 py-4 text-center text-gray-500 text-sm border-t">
    © {new Date().getFullYear()} - Sistema de Gestão de Seguro de Vida
  </footer>
);

export function UsuarioLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <UsuarioHeader />
      <main className="flex-1 container mx-auto p-6">
        <Outlet />
      </main>
      <UsuarioFooter />
    </div>
  );
}