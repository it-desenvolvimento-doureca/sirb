
export class MAN_MOV_MANUTENCAO_EQUIPAMENTOS {
    ID_MANUTENCAO: number;
    NOME: string;
    COD_EQUIPAMENTO_PRINCIPAL: string;
    LOCALIZACAO: number;
    EQUIPA: number;
    GARANTIA: boolean;
    DATA_VALIDADE: Date;
    UTZ_CRIA: number;
    DATA_CRIA: Date;
    UTZ_ULT_MODIF: number;
    DATA_ULT_MODIF: Date;
    ATIVO: boolean;
    TIPO_LOCALIZACAO: string;
    TIPO_EQUIPA: string;
    UTILIZADOR: number;
    DESCRICAO_MANUTENCAO: string;
    NIVEL_CRITICIDADE: number;
    AMBITO_MANUTENCAO: number;
    COD_FORNECEDOR: string;
    NOME_FORNECEDOR: string;
    EMAIL_FORNECEDOR: string;
}
