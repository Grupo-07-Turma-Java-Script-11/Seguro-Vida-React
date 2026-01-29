// src/app/components/usuario/LinhaUsuario.tsx
import { Link } from "react-router-dom";
import type Usuario from "../../../models/Usuario";
import { Pencil, Trash2 } from "lucide-react";

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
          className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-bold"
        >
          <Pencil size={16} /> EDITAR
        </Link>
        <button
          onClick={() => onDelete(usuario.id)}
          className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 font-bold"
        >
        <Trash2 size={16} /> EXCLUIR
        </button>
      </td>
    </tr>
  );
}