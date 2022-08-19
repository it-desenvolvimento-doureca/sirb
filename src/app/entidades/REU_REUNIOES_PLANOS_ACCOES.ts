export class REU_REUNIOES_PLANOS_ACCOES {
	id: number;
	responsavel: number;
	data_PREVISTA: Date;
	data_REAL: Date;
	id_ACCAO: number;
	id_REUNIAO: number;
	data_CRIA: Date;
	utz_CRIA: number;
	data_ULT_MODIF: Date;
	utz_ULT_MODIF: number;
	tipo: string;
	tipo_RESPONSAVEL: string;
	concluido_DATA: Date;
	concluido_UTZ: number;
	ordem: number;
	observacoes: string;
	estado: string;
	id_TAREFA: number;
	obriga_EVIDENCIAS: boolean;
	area: string;
}
