import React, { useEffect, useState } from 'react'
import type Apolice from '../../../models/Apolice'
import { useNavigate, useParams } from 'react-router-dom'
import { buscar, deletar } from '../../../services/Service'
import { ToastAlerta } from '../../../utils/ToastAlerta'
import { ClipLoader } from 'react-spinners'

function DeletarApolice() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [apolice, setApolice] = useState<Apolice>({} as Apolice)

    const { id } = useParams<{ id: string }>()

    async function buscarApolicePorId(id: string) {
        try {
            await buscar(`/apolices/${id}`, setApolice);
        } catch (erro: any) {
            ToastAlerta(`Erro ao localizar apolice ${apolice.numero_apolice}.`, "erro");
        }
    }

    useEffect(() => {
        if (id !== undefined) {
            buscarApolicePorId(id)
        }
    }, [id])

    async function deletarApolice() {
        setIsLoading(true)

        try {
            await deletar(`/apolice/${id}`)
            ToastAlerta('Apolice apagada com sucesso', 'sucesso')
        } catch (error: any) {
            ToastAlerta('Erro ao deletar a postagem.', 'erro')
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/postagens")
    }


    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar Apolice</h1>

            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar a apolice a seguir?
            </p>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header
                    className='py-2 px-6 bg-indigo-600 text-white font-bold text-2xl'>
                    Apolice
                </header>
                <div className="p-4">
                    <p className='text-xl h-full'>{apolice.numero_apolice}</p>
                    <p>{apolice.valor_segurado}</p>
                </div>
                <div className="flex">
                    <button
                        className='text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button
                        className='w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center'
                        onClick={deletarApolice}>

                        {isLoading ?
                            <ClipLoader
                                color="#ffffff"
                                size={24}
                            /> :
                            <span>Sim</span>
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarApolice