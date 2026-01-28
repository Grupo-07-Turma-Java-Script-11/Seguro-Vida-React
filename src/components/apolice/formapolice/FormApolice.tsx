import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type Apolice from '../../../models/Apolice';
import type { Categoria } from '../../../models/Categoria';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { ClipLoader } from 'react-spinners';

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
        <div className="container flex flex-col mx-auto items-center">

            <h1 className="text-4xl text-center my-8">
                {id ? 'Editar Apólice' : 'Cadastrar Apólice'}
            </h1>

            <form
                className="flex flex-col w-1/2 gap-4"
                onSubmit={gerarNovaApolice}
            >

                {/* NÚMERO */}
                <div className="flex flex-col gap-2">
                    <label>Número da Apólice</label>
                    <input
                        type="number"
                        name="numero_apolice"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.numero_apolice}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* VALOR */}
                <div className="flex flex-col gap-2">
                    <label>Valor Segurado</label>
                    <input
                        type="number"
                        name="valor_segurado"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.valor_segurado}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* DATA INÍCIO */}
                <div className="flex flex-col gap-2">
                    <label>Data de Início</label>
                    <input
                        type="date"
                        name="data_inicio"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.data_inicio}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* DATA FIM */}
                <div className="flex flex-col gap-2">
                    <label>Data de Término</label>
                    <input
                        type="date"
                        name="data_fim"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.data_fim}
                        onChange={atualizarEstado}
                    />
                </div>

                {/* CATEGORIA */}
                <div className="flex flex-col gap-2">
                    <label>Categoria da Apólice</label>
                    <select
                        className="border p-2 border-slate-800 rounded"
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

                {/* BOTÃO */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="rounded disabled:bg-slate-200 bg-indigo-500 hover:bg-indigo-800
                     text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                >
                    {isLoading
                        ? <ClipLoader color="#ffffff" size={24} />
                        : <span>{id ? 'Atualizar' : 'Cadastrar'}</span>
                    }
                </button>
                {id && (
                    <button
                        type="button"
                        onClick={() => navigate(`/apolices/deletar/${id}`)}
                        className="rounded bg-red-500 hover:bg-red-700
                   text-white font-bold w-1/2 mx-auto py-2"
                    >
                        Deletar
                    </button>
                )}


            </form>
        </div>
    );
}

export default FormApolice;
