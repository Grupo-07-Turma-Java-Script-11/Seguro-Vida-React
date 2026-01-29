// src/app/components/usuario/LinhaUsuario.tsx
import { Link } from "react-router-dom";
import type Usuario from "../../../models/Usuario";

interface LinhaProps {
  usuario: Usuario;
  onDelete: (id: number) => void;
}

export function LinhaUsuario({ usuario, onDelete }: LinhaProps) {
  return (
    <tr className="border-b hover:bg-gray-50 transition-colors">
      <td className="px-6 py-4 font-medium text-gray-900">{usuario.id}</td>
      <td className="px-6 py-4 text-gray-700 font-bold">{usuario.nome}</td>
      <td className="px-6 py-4 text-gray-600">{usuario.usuario}</td>
      <td className="px-6 py-4 text-gray-600">
        {new Date(usuario.data_nascimento).toLocaleDateString('pt-BR')}
      </td>
      <td className="px-6 py-4 text-right space-x-4">
        <Link
          to={`/editarUsuario/${usuario.id}`}
          className="text-[#4169E1] hover:underline font-bold"
        >
          EDITAR
        </Link>
        <button
          onClick={() => onDelete(usuario.id)}
          className="text-red-500 hover:underline font-bold"
        >
          EXCLUIR
        </button>
      </td>
    </tr>
  );
}