export class PA_MOV_LINHA {
    id_PLANO_LINHA: number;
    id_ACCAO: number;
    id_PLANO_CAB: number;
    responsavel: number;
    data_ACCAO: Date;
    hora_ACCAO: string;
    descricao: string;
    departamento: number;
    fastresponse: boolean;
    prioridade: number;
    unidade: number;
    estado: string;

    data_CONTROLADO: Date;
    utz_CONTROLADO: number;
    data_APROVADO: Date;
    utz_APROVADO: number;
    data_CANCELADO: Date;
    utz_CANCELADO: number;

    tipo_ACAO: number;
    item: string;

    referencia: string;
    design_REFERENCIA: string;
}
