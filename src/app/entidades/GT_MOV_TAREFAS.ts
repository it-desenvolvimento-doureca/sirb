export class GT_MOV_TAREFAS {

    id_TAREFA: number;
    id_MODULO: number;
    id_CAMPO: number;
    estado: string;
    data_INICIO: Date;
    data_FIM: Date;
    data_FIM_ANTIGA: Date;
    justificacao_DATA_FIM: string;
    justificacao_RESPONSAVEL: string;
    data_CONCLUSAO: Date;
    utz_CONCLUSAO: number;
    observacoes: string;
    data_CRIA: Date;
    utz_CRIA: number;
    data_ULT_MODIF: Date;
    utz_ULT_MODIF: Date;
    data_ANULACAO: Date;
    utz_ANULACAO: number;
    inativo: boolean;
    utz_ID: number;
    utz_TIPO: string;
    id_ACCAO: number;
    sub_MODULO: string;
    utz_ENCAMINHADO: number;
    data_ENCAMINHADO: Date;
    utz_ENCAMINHOU: number;
    prioridade: number;
    tempo_GASTO: number;
    percentagem_CONCLUSAO: number;
    descricao: string;
    data_REJEITA: Date;
    utz_REJEITA: number;
    motivo_REJEICAO: string;

    data_VALIDA: Date;
    utz_VALIDA: number;
    data_CONTROLA: Date;
    utz_CONTROLA: number;
    justificacao_ALTERACAO_ESTADO: string;

    id_TAREFA_PAI: number;

}
