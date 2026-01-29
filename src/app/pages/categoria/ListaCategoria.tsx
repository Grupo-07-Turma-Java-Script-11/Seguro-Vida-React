import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Categoria } from "../../models/Categoria";
import { buscar, deletar } from "../../services/Service"; // Importe as funções genéricas
import { FolderTree, Plus, Pencil, Trash2 } from "lucide-react";

function ListaCategoria() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function buscarCategorias() {
    setIsLoading(true);
    try {
      await buscar('/categorias', setCategorias);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarCategorias();
  }, []);

  async function handleDelete(id: number) {
    if (window.confirm("Deseja realmente excluir esta categoria?")) {
      try {
        await deletar(`/categorias/${id}`);
        alert("Categoria excluída!");
        buscarCategorias(); // Recarrega a lista
      } catch (error) {
        alert("Erro ao excluir.");
      }
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#002366] flex items-center gap-2">
          <FolderTree className="text-blue-500" /> Categorias
        </h1>
        <Link to="/categorias/cadastrar" className="bg-[#4169E1] hover:bg-[#002366] text-white px-5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all">
          <Plus size={20} /> NOVA CATEGORIA
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-bold uppercase text-xs">Nome</th>
              <th className="px-6 py-4 font-bold uppercase text-xs">Descrição</th>
              <th className="px-6 py-4 font-bold uppercase text-xs text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categorias.map((cat) => (
              <tr key={cat.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-medium text-gray-800">{cat.nome}</td>
                <td className="px-6 py-4 text-gray-600">{cat.descricao}</td>
                <td className="px-6 py-4 text-right space-x-4">
                  <Link to={`/categorias/editar/${cat.id}`} className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-1 font-bold">
                    <Pencil size={16} /> EDITAR
                  </Link>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 inline-flex items-center gap-1 font-bold">
                    <Trash2 size={16} /> EXCLUIR
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaCategoria;