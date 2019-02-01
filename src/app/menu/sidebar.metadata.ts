import { Injectable } from "@angular/core";

export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  acesso: acessos[];
}

export class acessos {
  leitura: boolean;
  alterar: boolean;
  apagar: boolean;
}


@Injectable()
export class AppGlobals {
  id_linha: number = 0;
  leitura: boolean = false;
  editar: boolean = false;
  apagar: boolean = false;
  criar: boolean = false;
  criarmanutencao: boolean = false;
  voltar: boolean = false;
  seguinte: boolean = false;
  anterior: boolean = false;
  historico: boolean = false;
  menu_edi: boolean = false;
  atualizar: boolean = false;
  duplicar: boolean = false;
  disCriar: boolean = true;
  disApagar: boolean = true;
  disDuplicar: boolean = true;
  disValidar: boolean = true;
  disEditar: boolean = true;
  mensagemlinhas: string = "";
  disCriarmanutencao: boolean = true;
  filtros = [];

  setfiltros(var_item, filtro) {
    this.filtros[var_item] = filtro;
  }

  getfiltros(var_item) {
    return this.filtros[var_item];
  }

  setMensagem(var_Mensagem) {
    this.mensagemlinhas = var_Mensagem;
  }

  getMensagem() {
    return this.mensagemlinhas;
  }
  setdisEditar(var_disEditar) {
    this.disEditar = var_disEditar;
  }

  getdisValidar() {
    return this.disValidar;
  }
  setdisValidar(var_disValidar) {
    this.disValidar = var_disValidar;
  }
  getdisEditar() {
    return this.disEditar;
  }

  setdisDuplicar(var_disDuplicar) {
    this.disDuplicar = var_disDuplicar;
  }

  getdisDuplicar() {
    return this.disDuplicar;
  }

  setdisApagar(var_disApagar) {
    this.disApagar = var_disApagar;
  }

  getdisApagar() {
    return this.disApagar;
  }

  setdisCriar(var_disCriar) {
    this.disCriar = var_disCriar;
  }

  getdisCriar() {
    return this.disCriar;
  }

  setdisCriarmanutencao(var_disCriarmanutencao) {
    this.disCriarmanutencao = var_disCriarmanutencao;
  }

  getdisCriarmanutencao() {
    return this.disCriarmanutencao;
  }

  setlinha(var_linhar) {
    this.id_linha = var_linhar;
  }

  getlinha() {
    return this.id_linha;
  }

  setduplicar(var_duplicar) {
    this.duplicar = var_duplicar;
  }

  getduplicar() {
    return this.duplicar;
  }

  setatualizar(var_atualizar) {
    this.atualizar = var_atualizar;
  }

  getatualizar() {
    return this.atualizar;
  }
  setmenu_edi(var_menu_edi) {
    this.voltar = var_menu_edi;
  }
  getmenu_edi() {
    return this.menu_edi;
  }
  setseguinte(var_seguinte) {
    this.seguinte = var_seguinte;
  }
  getseguinte() {
    return this.seguinte;
  }
  setanterior(var_anterior) {
    this.anterior = var_anterior;
  }
  getanterior() {
    return this.anterior;
  }
  setvoltar(var_voltar) {
    this.voltar = var_voltar;
  }
  getvoltar() {
    return this.voltar;
  }

  setcriar(var_criar) {
    this.criar = var_criar;
  }

  getcriar() {
    return this.criar;
  }

  setcriarmanutencao(var_criarmanutencao) {
    this.criarmanutencao = var_criarmanutencao;
  }

  getcriarmanutencao() {
    return this.criarmanutencao;
  }  

  setleitura(var_leitura) {
    this.leitura = var_leitura;
  }
  getleitura() {
    return this.leitura;
  }

  seteditar(var_alterar) {
    this.editar = var_alterar;
  }
  geteditar() {
    return this.editar;
  }

  setapagar(var_apagar) {
    this.apagar = var_apagar;
  }
  getapagar() {
    return this.apagar;
  }

  sethistorico(var_historico) {
    this.historico = var_historico;
  }
  gethistorico() {
    return this.historico;
  }
}