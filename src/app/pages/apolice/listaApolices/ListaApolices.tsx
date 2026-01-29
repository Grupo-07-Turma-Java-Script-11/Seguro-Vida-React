import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type Apolice from '../../../models/Apolice';
import { buscar } from '../../../services/Service';
import { ClipLoader, SyncLoader } from 'react-spinners';
import CardApolice from '../cardapolice/CardApolice';

function ListaApolices() {
  const [apolices, setApolices] = useState<Apolice[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function buscarApolices() {
    setIsLoading(true);
    try {
      await buscar('/apolices', setApolices);
    } catch (error) {
      console.error("Erro ao buscar apólices", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    buscarApolices();
  }, []);

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      <h1 className="text-4xl text-center my-10 font-bold text-[#002366] uppercase tracking-tighter">
        Gestão de Apólices
      </h1>

        <div className="flex justify-between items-center mb-10">
         <p className="text-gray-500 font-medium">Total: {apolices.length} apolices</p>
        <Link
          to="/apolices/cadastrar"
          className="bg-[#4169E1] hover:bg-[#002366] text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all"
        >
          + NOVA APÓLICE
        </Link>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <ClipLoader color="#4169E1" size={50} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {apolices.length === 0 && (
            <p className="col-span-full text-center text-gray-500">Nenhuma apólice encontrada.</p>
          )}
          {apolices.map((apolice) => (
            <CardApolice key={apolice.id} apolice={apolice} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaApolices;