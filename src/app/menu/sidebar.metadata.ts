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
  voltar: boolean = false;
  seguinte: boolean = false;
  anterior: boolean = false;
  menu_edi: boolean = false;
  pesquisar: boolean = false;
  duplicar: boolean = false;

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

  setpesquisar(var_pesquisar) {
    this.pesquisar = var_pesquisar;
  }

  getpesquisar() {
    return this.pesquisar;
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

  setleitura(var_leitura) {
    this.leitura = var_leitura;
  }
  getleitura() {
    return this.leitura;
  }

  seteditar(var_alterar) {
    this.editar = var_alterar;
  }
  getleditar() {
    return this.editar;
  }

  setapagar(var_apagar) {
    this.apagar = var_apagar;
  }
  getapagar() {
    return this.apagar;
  }
}