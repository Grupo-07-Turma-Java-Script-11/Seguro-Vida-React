import { Shield } from "lucide-react";
import React from "react";
import { Outlet, Link } from "react-router-dom";

// Você pode criar componentes pequenos aqui mesmo ou em arquivos separados
const UsuarioHeader = () => (
  <header className="bg-gray-800 text-white p-4 shadow-md">
    <div className="container mx-auto flex justify-between items-center">
      {/* <Link to="/" className="font-bold text-xl text-blue-400">
        <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Shield className="size-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Vitalis Seguros</span>
      </Link> */}

      <Link to="/" className="flex items-center gap-2 group">
        <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
            <Shield className="size-5 text-white" />
        </div>
        <span className="text-xl font-semibold text-white-900">Vitalis Seguros</span>
      </Link>

      <nav className="space-x-4">
        <Link to="/usuario" className="hover:text-blue-300">Usuarios</Link>
        <Link to="/apolices" className="hover:text-blue-300">Apólices</Link>
        <Link to="/categorias" className="hover:text-blue-300">Categorias</Link>
        <Link to="/" className="hover:text-blue-300">Sair</Link>
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