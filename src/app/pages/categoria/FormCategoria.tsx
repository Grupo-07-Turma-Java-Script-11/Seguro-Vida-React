// src/app/pages/categoria/FormCategoria.tsx
import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, Plus } from "lucide-react";
import { Categoria } from "../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../services/Service";
import { ClipLoader } from "react-spinners";

function FormCategoria() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);


  const [categoria, setCategoria] = useState<Categoria>({
    id: 0,
    nome: "",
    descricao: "",
  });

  useEffect(() => {
    if (id !== undefined) {
      buscar(`/categorias/${id}`, setCategoria);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setCategoria({
      ...categoria,
      [e.target.name]: e.target.value,
    });
  }

  async function salvarCategoria(e: React.FormEvent) {
    e.preventDefault();

    try {
      if (id !== undefined) {
        // CORREÇÃO AQUI: Adicionando o ID na URL para bater com o Insomnia
        await atualizar(`/categorias/${id}`, categoria, setCategoria);
        alert("Categoria atualizada com sucesso!");
      } else {
        // No cadastro (POST), geralmente a rota é apenas /categorias
        await cadastrar(`/categorias`, categoria, setCategoria);
        alert("Categoria cadastrada com sucesso!");
      }
      navigate("/categorias");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar a categoria. Verifique o console.");
    }
  }

  return (

    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
            {id ? "Editar Categoria" : "Nova Categoria"}
          </h1>
          <p className="text-blue-200 mt-2">Preencha as informações abaixo</p>
        </div>

        <form onSubmit={salvarCategoria} className="p-8 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">
              Nome da Categoria
            </label>
            <input
              name="nome"
              value={categoria.nome}
              onChange={atualizarEstado}
              placeholder="Ex: Vida Individual"
              className="w-full px-4 py-3 rounded-md border-2 border-gray-100 focus:border-blue-500 outline-none transition-all"
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
              placeholder="Descreva os benefícios..."
              className="w-full px-4 py-3 rounded-md border-2 border-gray-100 focus:border-blue-500 outline-none transition-all h-32 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="cursor-pointer bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 rounded-md mt-4 transition-colors flex justify-center items-center"
          >
            {isLoading ? <ClipLoader size={24} color="#fff" /> : id !== undefined ? "ATUALIZAR" : "CADASTRAR"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/categorias")}
            className=" cursor-pointer text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors uppercase"
          >
            Cancelar e Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormCategoria;