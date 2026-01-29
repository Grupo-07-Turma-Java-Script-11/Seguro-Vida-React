// src/app/pages/categoria/FormCategoria.tsx
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Plus } from "lucide-react";
import { Categoria } from "../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../app/services/Service";

function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: "",
  });

  // Busca a categoria caso o ID esteja presente na URL (Edição)
  useEffect(() => {
    if (id !== undefined) {
      buscar(`/categorias/${id}`, setCategoria);
    }
  }, [id]);

  // Atualiza o estado conforme o usuário digita
  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  // Função para salvar ou atualizar
  async function salvarCategoria(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (id !== undefined) {
        // Para atualizar, passamos o objeto inteiro. 
        // Verifique se sua API espera o ID na URL ou no corpo.
        await atualizar(`/categorias`, categoria, setCategoria);
        alert("Categoria atualizada com sucesso!");
      } else {
        await cadastrar(`/categorias`, categoria, setCategoria);
        alert("Categoria cadastrada com sucesso!");
      }
      navigate("/categorias");
    } catch (error) {
      alert("Erro ao salvar a categoria. Verifique os campos e tente novamente.");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-2xl font-bold text-[#002366] mb-6 flex items-center gap-2">
          {id ? <Pencil className="text-blue-500" /> : <Plus className="text-blue-500" />}
          {id ? "Editar Categoria" : "Nova Categoria"}
        </h1>

        <form onSubmit={salvarCategoria} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
              Nome da Categoria
            </label>
            <input 
              name="nome" 
              value={categoria.nome} 
              onChange={atualizarEstado} 
              placeholder="Ex: Vida Individual"
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all"
              required 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
              Descrição
            </label>
            <textarea 
              name="descricao" 
              value={categoria.descricao} 
              onChange={atualizarEstado} 
              placeholder="Descreva os benefícios desta categoria..."
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-blue-500 outline-none transition-all h-32 resize-none"
              required 
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 hover:bg-[#002366] text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-100"
            >
              SALVAR CATEGORIA
            </button>
            <button 
              type="button" 
              onClick={() => navigate("/categorias")}
              className="px-6 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 transition-all"
            >
              CANCELAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;