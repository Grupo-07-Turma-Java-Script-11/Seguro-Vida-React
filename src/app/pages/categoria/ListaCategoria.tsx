import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Categoria } from "../../models/Categoria";
import { buscar, deletar } from "../../services/Service"; // Importe as funções genéricas
import { FolderTree, Plus, Pencil, Trash2 } from "lucide-react";
import { ClipLoader } from "react-spinners";

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

    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl text-center my-10 font-bold text-blue-600 uppercase tracking-tighter">
        Painel de Controle de Categorias
      </h1>

      <div className="flex justify-between items-center mb-10">
        <p className="text-gray-500 font-medium">Total: {categorias.length} categorias</p>
        <Link
          to="/categorias/cadastrar"
          className="bg-blue-600 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-bold shadow-lg transition-all"
        >
          + NOVA CATEGORIA
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader color="#4169E1" size={50} />
        </div>
      ) : (
        <div className="bg-white rounded-md shadow-xl overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-6 py-4 uppercase text-sm font-bold">Nome</th>
                <th className="px-6 py-4 uppercase text-sm font-bold">Descrição</th>
                <th className="px-6 py-4 uppercase text-sm font-bold text-right">Ações</th>
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
      )}
    </div>
  );
}

export default ListaCategoria;