export class RC_MOV_RECLAMACAO {
	id_RECLAMACAO: number;
	titulo: string;
	numero_RECLAMACAO_CLIENTE: string;
	data_RECLAMACAO: Date;
	rejeicao: number;
	id_TIPO_RECLAMACAO: number;
	utz_RESPONSAVEL: number;
	grau_IMPORTANCIA: number;

	id_CLIENTE: number;
	nome_CLIENTE: string;
	morada_CLIENTE: string;
	contato_CLIENTE: string;
	email_CLIENTE: string;
	telefone_CLIENTE: string;
	referencia: string;
	designacao_REF: string;
	familia_REF: string;
	lote: string;
	tipo_DEFEITO: number;
	reclamacao_REVISTA: boolean;
	qtd_ENVIADA: number;
	qtd_RECUSADA: number;
	devolucao: boolean;
	observacoes_RECLAMACAO: string;
	step1CONCLUIDO: boolean;
	step2CONCLUIDO: boolean;
	step3CONCLUIDO: boolean;
	step4CONCLUIDO: boolean;
	step5CONCLUIDO: boolean;
	step6CONCLUIDO: boolean;
	step7CONCLUIDO: boolean;
	step8CONCLUIDO: boolean;
	descricao_PROBLEMA: string;
	descricao_PROBLEMA_IDIOMA_CLIENTE: string;
	problema_REPETIDO: boolean;
	numero_RECLAMACAO_REPETIDA: number;
	reclamacao_REPETIDA_ACEITE: boolean;

	ref_IGUAIS: boolean;
	accoes_EVITAR: boolean;
	estado: string;
	utz_CANCELADA: number;
	data_CANCELADA: Date;
	causas_PROBLEMA: string;
	causas_PROBLEMA_IDIOMA_CLIENTE: string;
	accoes_NECESSARIAS: number;
	accoes_NECESSARIAS_TEXTO: string;
	reclamacao_ENCERRADA: boolean;
	data_FECHO: Date;
	utz_FECHO: number;

	dias_ATRASO1: number;
	responsabilidade_ATRASO1: string;
	responsabilidade_ATRASO1_DESCRICAO: string;

	dias_ATRASO2: number;
	responsabilidade_ATRASO2: string;
	responsabilidade_ATRASO2_DESCRICAO: string;

	dias_ATRASO3: number;
	responsabilidade_ATRASO3: string;
	responsabilidade_ATRASO3_DESCRICAO: string;

	dias_ATRASO4: number;
	responsabilidade_ATRASO4: string;
	responsabilidade_ATRASO4_DESCRICAO: string;

	dias_ATRASO5: number;
	responsabilidade_ATRASO5: string;
	responsabilidade_ATRASO5_DESCRICAO: string;

	dias_ATRASO6: number;
	responsabilidade_ATRASO6: string;
	responsabilidade_ATRASO6_DESCRICAO: string;

	dias_ATRASO7: number;
	responsabilidade_ATRASO7: string;
	responsabilidade_ATRASO7_DESCRICAO: string;

	dias_ATRASO8: number;
	responsabilidade_ATRASO8: string;
	responsabilidade_ATRASO8_DESCRICAO: string;


	observacoes_RESULTADOS: string;
	custos_EXTERNA: number;
	custos_INTERNA: number;
	custos_DEVOLUCAO: number;
	custos_OUTROS: number;
	custos_TOTAL: number;
	custos_INTERNA_QTD_CLASSIF: number;
	custos_INTERNA_QTD_REJEITADA: number;
	custos_REJEICAO_INTERNA: number;
	custos_EXTERNA_QTD_CLASSIF: number;
	custos_EXTERNA_QTD_REJEITADA: number;
	custos_REJEICAO_EXTERNA: number;
	tipo_RECLAMACAO: string;
	data_CRIA: Date;
	utz_CRIA: number;
	data_ULT_MODIF: Date;
	utz_ULT_MODIF: number;
	tipo_CAMPO_LOTE: string;
	inativo: boolean;
	utz_ANULACAO: number;
	data_ANULACAO: Date;

	step1CONCLUIDO_UTZ: number;
	step2CONCLUIDO_UTZ: number;
	step3CONCLUIDO_UTZ: number;
	step4CONCLUIDO_UTZ: number;
	step5CONCLUIDO_UTZ: number;
	step6CONCLUIDO_UTZ: number;
	step7CONCLUIDO_UTZ: number;
	step8CONCLUIDO_UTZ: number;

	step1CONCLUIDO_DATA: Date;
	step2CONCLUIDO_DATA: Date;
	step3CONCLUIDO_DATA: Date;
	step4CONCLUIDO_DATA: Date;
	step5CONCLUIDO_DATA: Date;
	step6CONCLUIDO_DATA: Date;
	step7CONCLUIDO_DATA: Date;
	step8CONCLUIDO_DATA: Date;

	step1CONCLUIDO_DATA_MOD: Date;
	step2CONCLUIDO_DATA_MOD: Date;
	step3CONCLUIDO_DATA_MOD: Date;
	step4CONCLUIDO_DATA_MOD: Date;
	step5CONCLUIDO_DATA_MOD: Date;
	step6CONCLUIDO_DATA_MOD: Date;
	step7CONCLUIDO_DATA_MOD: Date;
	step8CONCLUIDO_DATA_MOD: Date;

	etsnum: string;

	data_RECLAMACAO_REVISTA: Date;
	data_PRAZO_REVISAO: Date;
	reclamacao_COM_REVISAO: Boolean;

	numero_ENVIOS_GARANTIDOS: number;
	envio_GARANTIDO_POR: string;
	data_PREVISTA_REPOSTA4: Date;

	tipo_OCORRENCIA: number;
	tipo_NAO_DETECAO: number;


	step1_DATA: Date;
	step2_DATA: Date;
	step3_DATA: Date;
	step4_DATA: Date;
	step5_DATA: Date;
	step6_DATA: Date;
	step7_DATA: Date;
	step8_DATA: Date;

	check_SR: boolean;
	revista_MURO: boolean;
	impacto_SR: boolean;
	analise_CAUSAS_PROBLEMA: string;
	analise_CAUSAS_PROBLEMA_IDIOMA_CLIENTE: string;
	existem_OUTROS_CLIENTES: boolean;

	ficheiro_PRODUCAO_NOME: string;
	ficheiro_PRODUCAO_1: string;
	ficheiro_PRODUCAO_2: string;
	operarios_ENVOLVIDOS: string;

}
