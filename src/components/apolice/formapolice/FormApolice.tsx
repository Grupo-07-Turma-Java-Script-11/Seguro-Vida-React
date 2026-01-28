import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import type Apolice from '../../../models/Apolice';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { ClipLoader } from 'react-spinners';
import type { Categoria } from '../../../models/Categoria';

function FormApolice() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [categorias, setCategorias] = useState<Categoria[]>([])
    const [categoria, setCategoria] = useState<Categoria>({ id: 0, nome: '', descricao: '', })

    const [apolice, setApolice] = useState<Apolice>({} as Apolice)

    const { id } = useParams<{ id: string }>()

    async function buscarApolicePorId(id: string) {
        try {
            await buscar(`/apolices/${id}`, setApolice);
        } catch (erro: any) {
            ToastAlerta(`Erro ao localizar apolice ${apolice.numero_apolice}.`, "erro");
        }
    }

    async function buscarApolices() {
        try {
            await buscar('/apolices', setApolice);
        } catch (erro: any) {
            ToastAlerta(`Erro ao localizar apolices.`, "erro");
        }
    }

    useEffect(() => {
        buscarApolices()

        if (id !== undefined) {
            buscarApolicePorId(id);
        }
    }, [id])


    useEffect(() => {
        setApolice({
            ...apolice,
            categoria: categoria,
        })
    }, [categoria])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setApolice({
            ...apolice,
            [e.target.name]: e.target.value,
            categoria: categoria,
            // usuario: usuario,
        });
    }

    function retornar() {
        navigate('/apolices');
    }

    async function gerarNovaApolice(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar('/apolices', apolice, setApolice)
                ToastAlerta('Apolice atualizada com sucesso!', 'sucesso')
            } catch (error: any) {
                ToastAlerta('Erro ao atuaizar a Apolice', 'erro');
            }
        } else {
            try {
                await cadastrar('/apolices', apolice, setApolice);
                ToastAlerta('Apolice cadastrada com sucesso!', 'sucesso')
            } catch (error: any) {
                ToastAlerta('Erro ao cadastrar a Apolice', 'erro');
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandocategoria = categoria.nome === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Apolice' : 'Cadastrar Apolice'}
            </h1>

            <form className="flex flex-col w-1/2 gap-4"
                onSubmit={gerarNovaApolice}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Numero da Apolice</label>
                    <input
                        type="number"
                        placeholder="numero_apolice"
                        name="numero_apolice"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.numero_apolice}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Valor Segurado</label>
                    <input
                        type="number"
                        placeholder="valor_segurado"
                        name="valor_segurado"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.valor_segurado}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Data de incio</label>
                    <input
                        type="Date"
                        placeholder="data_inicio"
                        name="data_inicio"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.data_inicio.toLocaleDateString()}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Data de termino</label>
                    <input
                        type="Date"
                        placeholder="data_fim"
                        name="data_fim"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                        value={apolice.data_fim.toLocaleDateString()}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Categoria da Apolice</p>
                    <select name="categoria" id="categoria" className='border p-2 border-slate-800 rounded'
                        onChange={(e) => buscarApolicePorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione uma categoria</option>

                        {categorias.map((categoria) => (
                            <>
                                <option value={categoria.id} >{categoria.nome}</option>
                            </>
                        ))}

                    </select>
                </div>
                <button
                    type='submit'
                    className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center'
                    disabled={carregandocategoria}
                >
                    {isLoading ?
                        <ClipLoader
                            color="#ffffff"
                            size={24}
                        /> :
                        <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>
                    }

                </button>
            </form>
        </div>
    )
}

export default FormApolice