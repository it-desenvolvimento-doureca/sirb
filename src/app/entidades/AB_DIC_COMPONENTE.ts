export class AB_DIC_COMPONENTE {
    id_COMPONENTE: number;
    cod_REF: string;
    nome_REF: string;
    nome_COMPONENTE: string;
    id_UNIDADE_COMPONENTE: string;
    obs: string;
    utz_CRIA: number;
    data_CRIA: Date;
    utz_ULT_MODIF: number;
    data_ULT_MODIF: Date;
    utz_ANULACAO: number;
    data_ANULACAO: Date;
    inativo: boolean;
    id_UNIDADE_ADITIVO: number;
    id_FORNECEDOR: number
    tipo: string;
    obrigatorio: string;
    unisto: string;
    factor_MULTIPLICACAO_AGUA: number;
    factor_CONVERSAO: number;
    cisterna: boolean;
    cod_REF_SUBSTITUTA: string;
    nome_REF_SUBSTITUTA: string;
}
