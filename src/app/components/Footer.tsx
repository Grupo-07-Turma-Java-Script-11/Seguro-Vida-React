import React from "react";
import { Link } from "react-router";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Shield className="size-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">Vitalis Seguro</span>
            </div>
            <p className="text-sm leading-relaxed">
              Protegendo sua família e garantindo seu futuro há mais de 25 anos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/planos" className="text-sm hover:text-white transition-colors">
                  Nossos Planos
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-sm hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm">
              <li>Seguro de Vida Individual</li>
              <li>Seguro de Vida em Grupo</li>
              <li>Plano Familiar</li>
              <li>Assistência 24h</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="size-4" />
                <span>(11) 4000-0000</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="size-4" />
                <span>contato@vitalis.com.br</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="size-4 mt-0.5" />
                <span>Av. Paulista, 1000<br />São Paulo - SP</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} Vitalis Seguro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}