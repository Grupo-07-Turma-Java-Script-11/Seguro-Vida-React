import { useNavigate } from 'react-router-dom';
import type Apolice from '../../../models/Apolice';

interface ItemApoliceProps {
    apolice: Apolice
}

function ItemApolice({ apolice }: ItemApoliceProps) {
    const navigate = useNavigate();

    return (
        <tr className="text-[#5E6B7D] hover:bg-[#F8F8FA] relative">
            <td className="py-4 text-[18px]">{apolice.numero_apolice}</td>
            <td className="py-4 text-[18px]">{apolice.categoria?.nome}</td>
            <td className="py-4 text-[18px]">{apolice.valor_segurado}</td>
            <td className="py-4 text-[18px]">{new Date(apolice.data_inicio).toLocaleDateString('pt-BR')}</td>
            <td className="py-4 text-[18px]">{new Date(apolice.data_fim).toLocaleDateString('pt-BR')}</td>
            <td className="py-4 text-right relative">
                <button
                    onClick={() => navigate(`/editarapolice/${apolice.id}`)}
                    className="text-[#19439E] font-medium flex items-center gap-1 ml-auto"
                >Ver detalhes <span>{">"}</span></button>
            </td>
        </tr>
    );
}

export default ItemApolice