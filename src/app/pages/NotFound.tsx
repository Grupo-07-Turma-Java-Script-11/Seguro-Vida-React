import React from "react";
import { Link } from "react-router";
import { Home, Search } from "lucide-react";
import { Button } from "@/app/components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="mb-8">
          <Search className="size-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-700 mb-4">
            Página Não Encontrada
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              <Home className="mr-2 size-5" />
              Voltar para Início
            </Button>
          </Link>
          <Link to="/planos">
            <Button size="lg" variant="outline">
              Ver Nossos Planos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}