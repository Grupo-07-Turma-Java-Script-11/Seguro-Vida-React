import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type Apolice from '../../../models/Apolice';
import { buscar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { SyncLoader } from 'react-spinners';
import ItemApolice from '../itemapolice/ItemApolice';

function ListaApolices() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [apolices, setApolices] = useState<Apolice[]>([])

    useEffect(() => {
        buscarApolices();
    }, [apolices.length])

    async function buscarApolices() {
        try {
            setIsLoading(true);

            await buscar('/apolices', setApolices);
        } catch (erro: any) {
            ToastAlerta("Erro ao buscar Apolices", "erro");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <>
            {isLoading && (
                <div className="flex justify-center content-center ali w-full my-8">
                    <SyncLoader
                        color="#312e81"
                        size={32}
                    />
                </div>
            )}
            <div className="flex justify-center w-full my-4">
                <div className="w-full">
                    {(!isLoading && apolices.length === 0) && (
                        <span className="text-3xl text-center my-8">
                            Nenhuma Apolice foi encontrada!
                        </span>
                    )}

                    <table className="w-full table-auto">
                        <tbody>
                            {
                                apolices.map((apolice) => (
                                    <ItemApolice key={apolice.id} apolice={apolice} />
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ListaApolices