import { Link } from "react-router-dom";
import type Apolice from "../../../models/Apolice";
import { Shield, Calendar, DollarSign } from "lucide-react";

interface CardApoliceProps {
  apolice: Apolice;
}

function CardApolice({ apolice }: CardApoliceProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
      <header className="bg-[#002366] px-6 py-4 flex justify-between items-center">
        <h2 className="text-white font-bold text-lg tracking-tight uppercase">
          Nº {apolice.numero_apolice}
        </h2>
        <Shield className="text-blue-400" size={20} />
      </header>

      <div className="px-6 py-6 text-gray-700 bg-slate-50 flex-1 flex flex-col gap-3">
        <p className="flex items-center gap-2">
          <span className="font-bold text-[#4169E1]">Categoria:</span>
          <span className="text-gray-600">{apolice.categoria?.nome || 'Não informada'}</span>
        </p>
        <p className="flex items-center gap-2">
          <DollarSign size={16} className="text-green-600" />
          <span className="font-bold text-[#4169E1]">Valor:</span>
          <span className="text-gray-600">
            {apolice.valor_segurado ? `R$ ${apolice.valor_segurado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : 'R$ 0,00'}
          </span>
        </p>
        <p className="flex items-center gap-2">
          <Calendar size={16} className="text-blue-500" />
          <span className="text-xs text-gray-500">
            {apolice.data_inicio ? new Date(apolice.data_inicio).toLocaleDateString() : '--/--/----'} - 
            {apolice.data_fim ? new Date(apolice.data_fim).toLocaleDateString() : '--/--/----'}
          </span>
        </p>
      </div>

      <div className="flex border-t border-gray-100 bg-white">
        <Link
          to={`/apolices/editar/${apolice.id}`}
          className="flex-1 py-4 text-center font-bold text-[#4169E1] hover:bg-blue-50 transition-colors border-r border-gray-100"
        >
          EDITAR
        </Link>
        <Link
          to={`/apolices/deletar/${apolice.id}`}
          className="flex-1 py-4 text-center font-bold text-red-500 hover:bg-red-50 transition-colors"
        >
          EXCLUIR
        </Link>
      </div>
    </div>
  );
}

export default CardApolice;