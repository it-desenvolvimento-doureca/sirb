export class PA_MOV_CAB {
    id_PLANO_CAB: number;
    id_LINHA: number;
    unidade: number;
    departamento_ORIGEM: number;
    referencia: string;
    design_REFERENCIA: string;

    descricao: string;

    estado: string;
    data_CRIA: Date;
    utz_CRIA: number;
    data_MODIF: Date;
    utz_MODIF: number;
    data_ANULA: Date;
    utz_ANULA: number;
    ativo: boolean;

    data_OBJETIVO: Date;
    ambito: number;
    origem: string;
}
