import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import { ClipLoader } from "react-spinners";
import Apolice from "../../../models/Apolice";
import Categoria from "../../../models/Categoria";

function FormApolice() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: "", descricao: "" });

  const [apolice, setApolice] = useState<Apolice>({
    id: 0,
    numero_apolice: 0,
    valor_segurado: 0,
    data_inicio: "",
    data_fim: "",
    categoria: null,
  });

  async function buscarApolicePorId(id: string) {
    await buscar(`/apolices/${id}`, setApolice);
  }

  async function buscarCategorias() {
    await buscar("/categorias", setCategorias);
  }

  useEffect(() => {
    buscarCategorias();
    if (id !== undefined) {
      buscarApolicePorId(id);
    }
  }, [id]);

  useEffect(() => {
    setApolice({
      ...apolice,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setApolice({
      ...apolice,
      [e.target.name]: e.target.value,
    });
  }

  async function buscarCategoriaPorId(id: string) {
    await buscar(`/categorias/${id}`, setCategoria);
  }

  async function gerarNovaApolice(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/apolices`, apolice, setApolice);
        ToastAlerta("Apólice atualizada com sucesso", "sucesso");
        retornar();
      } catch (error) {
        ToastAlerta("Erro ao atualizar a Apólice", "erro");
      }
    } else {
      try {
        await cadastrar(`/apolices`, apolice, setApolice);
        ToastAlerta("Apólice cadastrada com sucesso", "sucesso");
        retornar();
      } catch (error) {
        ToastAlerta("Erro ao cadastrar a Apólice", "erro");
      }
    }

    setIsLoading(false);
  }

  function retornar() {
    navigate("/apolices");
  }

  return (
    <div className="container flex flex-col mx-auto items-center py-10">
      <h1 className="text-4xl font-bold text-[#002366] mb-8">
        {id !== undefined ? "Editar Apólice" : "Cadastrar Apólice"}
      </h1>

      <form onSubmit={gerarNovaApolice} className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-3xl shadow-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="numero_apolice" className="font-semibold text-gray-700">Número da Apólice</label>
          <input
            type="number"
            name="numero_apolice"
            value={apolice.numero_apolice}
            onChange={atualizarEstado}
            className="border-2 border-slate-200 p-3 rounded-xl focus:border-[#4169E1] outline-none"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="valor_segurado" className="font-semibold text-gray-700">Valor Segurado (R$)</label>
          <input
            type="number"
            name="valor_segurado"
            value={apolice.valor_segurado}
            onChange={atualizarEstado}
            className="border-2 border-slate-200 p-3 rounded-xl focus:border-[#4169E1] outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Data Início</label>
            <input type="date" name="data_inicio" value={apolice.data_inicio} onChange={atualizarEstado} className="border-2 border-slate-200 p-3 rounded-xl" required />
          </div>
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Data Fim</label>
            <input type="date" name="data_fim" value={apolice.data_fim} onChange={atualizarEstado} className="border-2 border-slate-200 p-3 rounded-xl" required />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-semibold text-gray-700">Categoria</label>
          <select
            name="categoria"
            className="border-2 border-slate-200 p-3 rounded-xl focus:border-[#4169E1] outline-none"
            onChange={(e) => buscarCategoriaPorId(e.target.value)}
            value={apolice.categoria?.id || ""}
            required
          >
            <option value="" disabled>Selecione uma categoria</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nome}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading || !apolice.categoria?.id}
          className="bg-[#4169E1] hover:bg-[#002366] text-white font-bold py-4 rounded-xl mt-4 transition-colors flex justify-center items-center"
        >
          {isLoading ? <ClipLoader size={24} color="#fff" /> : id !== undefined ? "ATUALIZAR" : "CADASTRAR"}
        </button>
      </form>
    </div>
  );
}

export default FormApolice;