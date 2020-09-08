export class RC_MOV_RECLAMACAO_ENVIOS_GARANTIDOS {
	id: number;
	ordem: number;
	id_RECLAMACAO: number;
	quantidade: number;
	numero_GUIA: string;
	data_CRIA: Date;
	utz_CRIA: number;
	data_ULT_MODIF: Date;
	utz_ULT_MODIF: number;
	envio: boolean;
	cliente: string;
	morada: string;
	data_ENTREGA: Date;
	data_ENVIO: Date;
	proref: string;
}
