export class AT_ACCOES {
    id_ACCAO: number;
    descricao_ACCAO: string;
    responsavel: string;
    data_IMPLEMENTACAO: string;
    recursos: string;
    id_OCORRENCIA: number;
}

export class AT_ENTREVISTAS {
    id_ENTREVISTA: number;
    id_OCORRENCIA: number;
    nome: string;
    funcao: string;
}


export class AT_TESTEMUNHAS {
    id_TESTEMUNHA: number;
    id_OCORRENCIA: number;
    nome: string;
    numero: string;
}

export class AT_OCORRENCIAS {
    id_OCORRENCIA: number;
    data_CRIA: Date;
    utz_CRIA: number;
    data_MODIF: Date;
    utz_MODIF: number;
    nome_PESSOA: string;
    numero_PESSOA: string;
    idade_PESSOA: number;
    nacionalidade: string;
    funcao_PESSOA: string;
    departamento: string;
    tipo_RELATORIO: string;
    com_BAIXA: boolean;
    tipo_ACIDENTE: string;
    notificou_SEGURADORA: boolean;
    companhia: string;
    n_APOLICE: string;
    data_ACIDENTE: Date;
    hora_ACIDENTE: string;
    local_ACIDENTE: string;
    numero_PESSOAS_ENVOLVIDAS: number;
    numero_VITIMAS: number;
    descricao_ACIDENTE: string;
    grau_LESAO: string;
    gerou_IT: boolean;
    gerou_IP: boolean;
    danos_MATERIAS: string;
    trabalhadores_SIMILARES: boolean;
    pa_CABECA: boolean;
    pa_OLHOS: boolean;
    pa_PESCOCO: boolean;
    pa_COSTAS: boolean;
    pa_TORAX: boolean;
    pa_ABDOMEN: boolean;
    pa_OMBRO: boolean;
    pa_ANTEBRACO: boolean;
    pa_PE: boolean;
    pa_DEDOS_PE: boolean;
    pa_LOCALIZACOES_MULTIPLAS: boolean;
    pa_ANCA: boolean;
    pa_JOELHO: boolean;
    pa_MAO: boolean;
    pa_OUTRO: boolean;
    pa_OUTRO_TEXTO: string;
    recolha_EVIDENCIAS: string;
    testemunhas: boolean;
    numero_TESTEMUNHAS: number;
    medidas_FORMACAO: string;
    medidas_ORGANIZACAO: string;
    medidas_PROTECAO_COL: string;
    medidas_PROTECAO_IND: string;
    medidas_OUTRAS: string;
    diagrama_TOP_ESQ: string;
    diagrama_TOP_DIR: string;
    diagrama_DIR: string;
    diagrama_BT_ESQ: string;
    diagrama_BT_DIR: string;
    descricao_CAUSAS: string;
    analise_EFICACIA: string;
    eficaz: boolean;
    utz_ANULACAO: number;
    data_ANULACAO: Date;
    estado: string;
    inativo: boolean;
}
