export class GER_PARAMETROS {
    id: number;
    pasta_FICHEIRO: string;
    url_SILVER: string;
    url_JASPER: string;
    pasta_ETIQUETAS: string;
    modelo_REPORT: string
    pasta_JASPERREPORT: string;
    tempo_PLANEADAS: number;
    cartelas_ATIVO: boolean;
    tempo_SINCRO_CARTELAS: number;
    tempo_MAX_PLANEADAS: number;

    tempo_SINCRO_LOGS_SILVER: number;
    logs_SILVER_ATIVO: boolean;
    caminho_LOGS_SILVER: string;
    utilizador_LOGS_SILVER: string;
    dominio_LOGS_SILVER: string;
    senha_LOGS_SILVER: string;
    pasta_DESTINO_ERRO: string;

    atualizacao_SILVER_BI_ATIVO: boolean;
    tempo_PAUSA_TURNOS_CONTINUOS: String;

    modelo_REPORT_PRODUCAO: string;
    sectores_ABSENTISMO: string;
    taxa_ABSENTISMO: number;
    taxa_REJEICAO: number;
    objetivo_AUDITORIAS: number;
    numero_MANUTENCOES_INICIAR: number;
}
