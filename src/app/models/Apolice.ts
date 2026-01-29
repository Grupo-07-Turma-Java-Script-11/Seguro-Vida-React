import type Categoria from "./Categoria";
import type  Usuario  from "./Usuario";

export default interface Apolice {
    id: number;
    numero_apolice: number;
    valor_segurado: number;
    data_inicio: string;
    data_fim: string;
    categoria: Categoria | null;
    usuario: Usuario | null;
}