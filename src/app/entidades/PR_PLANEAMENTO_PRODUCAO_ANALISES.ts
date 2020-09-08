export class PR_PLANEAMENTO_PRODUCAO_ANALISES {
    id_PLANEAMENTO_PRODUCAO_ANALISES: number;
    ano: number;
    semana: number;
    n_SEMANAS: number;
    id_PLANO_LINHA_1: number;
    id_PLANO_LINHA_2: number;
    data_CRIA: Date;
    utz_CRIA: number;
    data_MODIF: Date;
    utz_MODIF: number;
    data_ANULA: Date;
    utz_ANULA: number;
    ativo: boolean;
    data_MRP: Date;
}
