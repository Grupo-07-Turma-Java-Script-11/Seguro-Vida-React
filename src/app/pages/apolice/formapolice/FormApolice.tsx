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

    /* =======================
       BUSCAS
    ======================= */

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

    /* =======================
       HANDLERS
    ======================= */

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

    /* =======================
       SUBMIT
    ======================= */

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

    /* =======================
       RENDER
    ======================= */
  return (
    <div className="container flex flex-col mx-auto items-center py-10">
      <h1 className="text-4xl font-bold text-[#002366] mb-8">
        {id !== undefined ? "Editar Apólice" : "Cadastrar Apólice"}
      </h1>

      <form onSubmit={gerarNovaApolice} className="flex flex-col w-full max-w-lg gap-4 bg-white p-8 rounded-3xl shadow-lg">
        <div className="flex flex-col gap-1">
          <label htmlFor="numero_apolice" className="font-semibold text-gray-700">Número da Apólice</label>
          <input
            type="text"
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
          className="bg-[#4169E1] hover:bg-[#002366] text-white font-bold py-4 rounded-xl mt-4 transition-colors flex justify-center items-center"
        >
          {isLoading ? <ClipLoader size={24} color="#fff" /> : id !== undefined ? "ATUALIZAR" : "CADASTRAR"}
        </button>
      </form>
    </div>
  );
}

export default FormApolice;