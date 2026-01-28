import { Link } from "react-router-dom";
import type Usuario from "../../../models/Usuario";

interface CardUsuarioProps {
  usuario: Usuario;
}

function CardUsuario({ usuario }: CardUsuarioProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      <header className="bg-[#002366] px-6 py-4">
        <h2 className="text-white font-bold text-xl tracking-tight uppercase">
          {usuario.nome}
        </h2>
      </header>

      <div className="px-6 py-8 text-gray-700 bg-slate-50 flex-1 flex flex-col gap-2">
        <p className="flex items-center gap-2">
          <span className="font-bold text-[#4169E1]">Email:</span>
          <span className="text-gray-600">{usuario.usuario}</span>
        </p>
        <p className="flex items-center gap-2">
          <span className="font-bold text-[#4169E1]">Nascimento:</span>
          <span className="text-gray-600">{usuario.data_nascimento}</span>
        </p>
      </div>

      <div className="flex border-t border-gray-100 bg-white">
        <Link
          to={`/editarUsuario/${usuario.id}`}
          className="flex-1 py-4 text-center font-bold text-[#4169E1] hover:bg-blue-50 transition-colors border-r border-gray-100"
        >
          EDITAR
        </Link>

        <button
          onClick={() => {}}
          className="flex-1 py-4 text-center font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          EXCLUIR
        </button>
      </div>
    </div>
  );
}

export default CardUsuario;
