import type { Categoria } from "./Categoria";

export default interface Apolice {
    id: number;
    numero_apolice: number;
    valor_segurado: number;
    data_inicio: Date;
    data_fim: Date;
    categoria: Categoria | null;
}