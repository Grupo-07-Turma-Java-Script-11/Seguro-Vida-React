// LoginPage.tsx
import React, { useState } from "react";
import { Shield, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/app/components/ui/button";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
    // Lógica de autenticação aqui
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Card de Login */}
        <div className="bg-card border border-border rounded-xl shadow-sm p-8">
          <div className="flex flex-col items-center mb-8">
            <div className="p-3 bg-blue-600 rounded-xl mb-4">
              <Shield className="size-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Bem-vindo de volta</h1>
            <p className="text-muted-foreground text-sm mt-2">
              Acesse seu painel de segurado Vitalis
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="nome@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:ring-2 focus:ring-blue-600 outline-none transition-all text-foreground"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-sm font-medium text-foreground">
                  Senha
                </label>
                <a href="#" className="text-xs text-blue-600 hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-input-background border border-border rounded-md focus:ring-2 focus:ring-blue-600 outline-none transition-all text-foreground"
                required
              />
            </div>

            <Button 
              type="submit"
              onClick={() => navigate("/usuario")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 flex items-center justify-center gap-2 text-lg"
            >
              Entrar
              <ArrowRight className="size-5" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <p className="text-sm text-muted-foreground">
              Ainda não tem uma apólice?{" "}
              <Link to="/planos" className="text-blue-600 font-semibold hover:underline">
                Conheça nossos planos
              </Link>
            </p>
          </div>
        </div>

        {/* Links de Suporte */}
        <div className="mt-6 flex justify-center gap-6 text-xs text-muted-foreground">
          <Link to="/ajuda" className="hover:text-foreground">Central de Ajuda</Link>
          <Link to="/privacidade" className="hover:text-foreground">Privacidade</Link>
          <Link to="/termos" className="hover:text-foreground">Termos de Uso</Link>
        </div>
      </div>
    </div>
  );
}