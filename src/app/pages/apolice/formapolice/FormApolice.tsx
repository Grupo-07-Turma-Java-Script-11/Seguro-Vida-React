import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Apolice from '../../../models/Apolice';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { ClipLoader } from 'react-spinners';
import Categoria from '../../../models/Categoria';

function FormApolice() {

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [isLoading, setIsLoading] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | null>(null);

  const [apolice, setApolice] = useState<Apolice>({
    id: 0,
    numero_apolice: 0,
    valor_segurado: 0,
    data_inicio: '',
    data_fim: '',
    categoria: null,
  });

  async function buscarCategorias() {
    try {
      await buscar('/categorias', setCategorias);
    } catch {
      ToastAlerta('Erro ao buscar categorias', 'erro');
    }
  }

  async function buscarApolicePorId(id: string) {
    try {
      await buscar(`/apolices/${id}`, (data: Apolice) => {
        setApolice({
          ...data,
          data_inicio: data.data_inicio?.split('T')[0],
          data_fim: data.data_fim?.split('T')[0],
        });

        setCategoriaSelecionada(data.categoria);
      });
    } catch {
      ToastAlerta('Erro ao buscar apólice', 'erro');
    }
  }

  useEffect(() => {
    buscarCategorias();

    if (id) {
      buscarApolicePorId(id);
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setApolice({
      ...apolice,
      [name]: name === 'numero_apolice' || name === 'valor_segurado'
        ? Number(value)
        : value,
    });
  }

  function selecionarCategoria(e: ChangeEvent<HTMLSelectElement>) {
    const categoria = categorias.find(
      c => c.id === Number(e.target.value)
    ) || null;

    setCategoriaSelecionada(categoria);

    setApolice({
      ...apolice,
      categoria: categoria,
    });
  }

  function retornar() {
    navigate("/apolices");
  }

  async function gerarNovaApolice(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!categoriaSelecionada) {
      ToastAlerta('Selecione uma categoria', 'erro');
      return;
    }

    setIsLoading(true);

    try {
      const apoliceEnvio: Apolice = {
        ...apolice,
        categoria: categoriaSelecionada,
      };

      if (id) {
        await atualizar(`/apolices/${id}`, apoliceEnvio, setApolice);
        ToastAlerta('Apólice atualizada com sucesso!', 'sucesso');
      } else {
        await cadastrar('/apolices', apoliceEnvio, setApolice);
        ToastAlerta('Apólice cadastrada com sucesso!', 'sucesso');
      }

      navigate('/apolices');

    } catch {
      ToastAlerta('Erro ao salvar a apólice', 'erro');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center min-h-[80vh] bg-gray-50 p-4">
      <div className="w-full max-w-lg bg-white rounded-md shadow-2xl overflow-hidden border border-gray-100">
        <div className="bg-blue-600 p-8 text-center">
          <h1 className="text-3xl font-bold text-white uppercase tracking-wider">
            {id === undefined ? "Nova Apólice" : "Editar Apólice"}
          </h1>
          <p className="text-blue-200 mt-2">Preencha as informações abaixo</p>
        </div>

        <form onSubmit={gerarNovaApolice} className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-md shadow-lg">
          <div className="flex flex-col gap-1">
            <label htmlFor="numero_apolice" className="font-semibold text-gray-700">Número da Apólice</label>
            <input
              type="text"
              name="numero_apolice"
              value={apolice.numero_apolice}
              onChange={atualizarEstado}
              className="border-2 border-slate-200 p-3 rounded-md focus:border-[#4169E1] outline-none"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="valor_segurado" className="font-semibold text-gray-700">Valor Segurado (R$)</label>
            <input
              type="text"
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
              <input type="date" name="data_inicio" value={apolice.data_inicio} onChange={atualizarEstado} className="border-2 border-slate-200 p-3 rounded-md" required />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-semibold text-gray-700">Data Fim</label>
              <input type="date" name="data_fim" value={apolice.data_fim} onChange={atualizarEstado} className="border-2 border-slate-200 p-3 rounded-md" required />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-700">Categoria</label>
            <select
              name="categoria"
              className="cursor-pointer border-2 border-slate-200 p-3 rounded-md focus:border-[#4169E1] outline-none"
              value={categoriaSelecionada?.id ?? ''}
              onChange={selecionarCategoria}
              required
            >
              <option value="" disabled>
                Selecione uma categoria
              </option>

              {categorias.map(categoria => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nome}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading || !apolice.categoria?.id}
            className="cursor-pointer bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 rounded-md mt-4 transition-colors flex justify-center items-center"
          >
            {isLoading ? <ClipLoader size={24} color="#fff" /> : id !== undefined ? "ATUALIZAR" : "CADASTRAR"}
          </button>
          <button
            type="button"
            onClick={retornar}
            className=" cursor-pointer text-gray-400 font-semibold text-sm hover:text-gray-600 transition-colors uppercase"
          >
            Cancelar e Voltar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormApolice;