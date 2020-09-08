import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERPARAMETROSService } from 'app/servicos/ger-parametros.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GER_PARAMETROS } from 'app/entidades/GER_PARAMETROS';
import { UploadService } from 'app/servicos/upload.service';
import { GERPOSTOSService } from 'app/servicos/ger-postos.service';
import { GER_POSTOS } from 'app/entidades/GER_POSTOS';
import { ConfirmationService } from 'primeng/primeng';
import { GERATUALIZACAOSILVERBITABELASService } from 'app/servicos/ger-atualizacao-silver-bi-tabelas.service';
import { RH_EXCLUSAO_TIPO_EXTRAService } from 'app/servicos/RH_EXCLUSAO_TIPO_EXTRA.service';
import { GER_ATUALIZACAO_SILVER_BI_TABELAS } from 'app/entidades/GER_ATUALIZACAO_SILVER_BI_TABELAS';
import { RH_EXCLUSAO_TIPO_EXTRA } from 'app/entidades/RH_EXCLUSAO_TIPO_EXTRA';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.css']
})
export class ParametrosComponent implements OnInit {
  tempo_MAX_PLANEADAS: any;
  tempo_SINCRO_CARTELAS: number;
  cartelas_ATIVO: boolean;
  tempo_PLANEADAS: any;
  pasta_JASPERREPORT: string;
  modelo_REPORT: string;
  modelo_REPORT_PRODUCAO;
  pasta_ETIQUETAS: any;
  temp_ip: any = "192.168.01.01";
  pos: any = 0;
  impressoras = [];
  postos = [];
  url_SILVER: string;
  modoedicao: boolean;
  pasta_ficheiro: string;
  parametros: any;
  classstep = 'geral';
  user: any;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  logs_SILVER_ATIVO: boolean;
  caminho_LOGS_SILVER: string;
  dominio_LOGS_SILVER: string;
  senha_LOGS_SILVER: string;
  tempo_SINCRO_LOGS_SILVER: number;
  utilizador_LOGS_SILVER: string;
  pasta_DESTINO_ERRO: string;
  atualizacao_SILVER_BI_ATIVO: boolean;

  dias_semana: { label: string; value: any; }[];
  tabelasSincronismo = [];
  tipo_repicao: any[];
  tipo_repete: any = [];
  tipos_dias: any = [];
  bases_de_dados: any[] = [];
  tiposextra = [];
  tabelaTiposExtra: any[];
  postabelaTiposExtra = 0;
  tempo_PAUSA_TURNOS_CONTINUOS;
  sectores_ABSENTISMO: any;
  taxa_ABSENTISMO: number;
  taxa_REJEICAO: number;
  sectores: any[];

  constructor(private RHSECTORESService: RHSECTORESService, private RH_EXCLUSAO_TIPO_EXTRAService: RH_EXCLUSAO_TIPO_EXTRAService, private GERATUALIZACAOSILVERBITABELASService: GERATUALIZACAOSILVERBITABELASService, private confirmationService: ConfirmationService, private GERPOSTOSService: GERPOSTOSService, private UploadService: UploadService, private renderer: Renderer, private route: ActivatedRoute, private router: Router, private location: Location, private GERPARAMETROSService: GERPARAMETROSService, private globalVar: AppGlobals) { }

  ngOnInit() {
    this.impressoras = [
      { label: 'Selecionar Impressora', value: null },
    ];

    this.dias_semana = [
      { label: 'Segunda-Feira', value: 2 },
      { label: 'Terça-Feira', value: 3 },
      { label: 'Quarta-Feira', value: 4 },
      { label: 'Quinta-Feira', value: 5 },
      { label: 'Sexta-Feira', value: 6 },
      { label: 'Sábado', value: 7 },
      { label: 'Domingo', value: 1 },
    ];
    this.tipos_dias[1] = "Domingo"
    this.tipos_dias[2] = "Segunda-Feira"
    this.tipos_dias[3] = "Terça-Feira"
    this.tipos_dias[4] = "Quarta-Feira"
    this.tipos_dias[5] = "Quinta-Feira"
    this.tipos_dias[6] = "Sexta-Feira"
    this.tipos_dias[7] = "Sábado"

    this.tipo_repicao = [
      { label: 'Diário', value: 1 },
      { label: 'Semanal', value: 2 },
      { label: 'Mensal', value: 3 },
      { label: 'Anual', value: 4 },
    ];
    this.tipo_repete[1] = "Diário";
    this.tipo_repete[2] = "Semanal";
    this.tipo_repete[3] = "Mensal";
    this.tipo_repete[4] = "Anual";

    this.bases_de_dados = [
      { label: 'SILVER', value: "SILVER" },
      { label: 'SGIID', value: "SGIID" },
      { label: 'SILVER_BI', value: "SILVER_BI" }];

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(true);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    // this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisEditar(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.modoedicao = true;
        this.globalVar.setvoltar(true);
      }
    }
    this.temp_ip = (this.getCookie("IP_CLIENT") != null) ? this.getCookie("IP_CLIENT") : this.temp_ip;
    this.inicia();
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  inicia() {

    this.UploadService.getImpressora().subscribe(
      response => {
        for (var x in response) {
          this.impressoras.push({ label: response[x], value: response[x] });
        }
      },
      error => console.log(error));

    this.GERPARAMETROSService.getAll().subscribe(
      response => {
        this.parametros = response[0];
        for (var x in response) {
          this.pasta_ficheiro = response[x].pasta_FICHEIRO;
          this.pasta_ETIQUETAS = response[x].pasta_ETIQUETAS;
          this.modelo_REPORT = response[x].modelo_REPORT;
          this.modelo_REPORT_PRODUCAO = response[x].modelo_REPORT_PRODUCAO;
          this.sectores_ABSENTISMO = (response[x].sectores_ABSENTISMO == null) ? null : response[x].sectores_ABSENTISMO.split(",");
          this.taxa_ABSENTISMO = response[x].taxa_ABSENTISMO;
          this.taxa_REJEICAO = response[x].taxa_REJEICAO;
          this.tempo_SINCRO_CARTELAS = response[x].tempo_SINCRO_CARTELAS;
          this.cartelas_ATIVO = response[x].cartelas_ATIVO;
          this.url_SILVER = response[x].url_SILVER;
          this.tempo_PLANEADAS = response[x].tempo_PLANEADAS;
          this.tempo_MAX_PLANEADAS = response[x].tempo_MAX_PLANEADAS;
          this.pasta_JASPERREPORT = response[x].pasta_JASPERREPORT;
          this.pasta_DESTINO_ERRO = response[x].pasta_DESTINO_ERRO;

          this.logs_SILVER_ATIVO = response[x].logs_SILVER_ATIVO;
          this.caminho_LOGS_SILVER = response[x].caminho_LOGS_SILVER;
          this.dominio_LOGS_SILVER = response[x].dominio_LOGS_SILVER;
          this.senha_LOGS_SILVER = (response[x].senha_LOGS_SILVER == null) ? null : atob(response[x].senha_LOGS_SILVER);
          this.tempo_SINCRO_LOGS_SILVER = response[x].tempo_SINCRO_LOGS_SILVER;
          this.utilizador_LOGS_SILVER = response[x].utilizador_LOGS_SILVER;
          this.tempo_PAUSA_TURNOS_CONTINUOS = response[x].tempo_PAUSA_TURNOS_CONTINUOS;
          this.atualizacao_SILVER_BI_ATIVO = response[x].atualizacao_SILVER_BI_ATIVO;

        }
      },
      error => console.log(error));
    this.tabelaPostos();
    this.tabelaAtualizacao();
    this.carregatabelatiposextra();
    this.drop_tipos();
    this.listarsectores();
  }


  //listar os dados sectores
  listarsectores() {
    this.sectores = [];
    this.RHSECTORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.sectores.push({

            value: response[x][0].cod_SECTOR,
            label: response[x][0].des_SECTOR,


          });
        }
        this.sectores = this.sectores.slice();
      },
      error => console.log(error));
  }

  //atualizar tabela postos
  tabelaPostos() {
    this.GERPOSTOSService.getAll().subscribe(
      response => {
        this.postos = [];
        for (var x in response) {
          this.postos.push({
            id_POSTO: response[x].id_POSTO, descricao: response[x].descricao, ip_POSTO: response[x].ip_POSTO, impressora: response[x].impressora,
            ip_IMPRESSORA: response[x].ip_IMPRESSORA, nome_IMPRESSORA: response[x].nome_IMPRESSORA
          });
        }
        this.postos = this.postos.slice();

      },
      error => { console.log(error); });
  }

  //atualizar tabela das tabelas
  tabelaAtualizacao() {
    this.GERATUALIZACAOSILVERBITABELASService.getAll().subscribe(
      response => {
        this.tabelasSincronismo = [];
        for (var x in response) {
          this.insertabelas(response, x);
        }
      },
      error => console.log(error));
  }

  insertabelas(response, x) {
    this.GERATUALIZACAOSILVERBITABELASService.getTABELAS(response[x].base_DE_DADOS).subscribe(
      response2 => {
        var tab = [];

        for (var y in response2) {
          tab.push({ label: response2[y][0], value: response2[y][0] })
        }
        this.push_tabela(response, x, tab);

      },
      error => { console.log(error); this.push_tabela(response, x, []); });
  }

  //PUSH tabela sincronismo
  push_tabela(response, x, tab) {
    this.tabelasSincronismo.push({
      data_ini: new Date(response[x].data_INICIAL),
      data: response[x], id: response[x].id, total: response[x].total, dias: response[x].dias, tabela: response[x].tabela,
      tipo_repicao_valor: response[x].tipo_OCORRENCIA, HORAS: response[x].horas, DIA_DA_SEMANA: response[x].dia_DA_SEMANA,
      ativo: response[x].ativo, bd: response[x].base_DE_DADOS, tables: tab
    });

    this.tabelasSincronismo = this.tabelasSincronismo.slice();
  }


  gravar() {

    var parametros = new GER_PARAMETROS;
    parametros = this.parametros;
    parametros.pasta_FICHEIRO = this.pasta_ficheiro.trim();
    parametros.url_SILVER = this.url_SILVER.trim();
    parametros.tempo_PLANEADAS = this.tempo_PLANEADAS;
    parametros.tempo_MAX_PLANEADAS = this.tempo_MAX_PLANEADAS;
    parametros.pasta_JASPERREPORT = this.pasta_JASPERREPORT.trim();
    parametros.pasta_DESTINO_ERRO = this.pasta_DESTINO_ERRO.trim();
    parametros.pasta_ETIQUETAS = this.pasta_ETIQUETAS.trim();
    parametros.modelo_REPORT = this.modelo_REPORT.trim();
    parametros.modelo_REPORT_PRODUCAO = this.modelo_REPORT_PRODUCAO.trim();

    parametros.sectores_ABSENTISMO = (this.sectores_ABSENTISMO.length > 0) ? this.sectores_ABSENTISMO.toString() : null;
    parametros.taxa_ABSENTISMO = this.taxa_ABSENTISMO;
    parametros.taxa_REJEICAO = this.taxa_REJEICAO;

    parametros.tempo_SINCRO_CARTELAS = this.tempo_SINCRO_CARTELAS;
    parametros.cartelas_ATIVO = this.cartelas_ATIVO;

    parametros.logs_SILVER_ATIVO = this.logs_SILVER_ATIVO;
    parametros.caminho_LOGS_SILVER = this.caminho_LOGS_SILVER;
    parametros.dominio_LOGS_SILVER = this.dominio_LOGS_SILVER;
    parametros.senha_LOGS_SILVER = (this.senha_LOGS_SILVER == null) ? null : btoa(this.senha_LOGS_SILVER);
    parametros.tempo_SINCRO_LOGS_SILVER = this.tempo_SINCRO_LOGS_SILVER;
    parametros.utilizador_LOGS_SILVER = this.utilizador_LOGS_SILVER;
    parametros.tempo_PAUSA_TURNOS_CONTINUOS = (this.tempo_PAUSA_TURNOS_CONTINUOS + ":00").slice(0, 8);

    parametros.atualizacao_SILVER_BI_ATIVO = this.atualizacao_SILVER_BI_ATIVO;

    this.GERPARAMETROSService.update(parametros).then(() => {
      for (var x in this.postos) {
        if (this.postos[x].id_POSTO.toString().substring(0, 1) == "P") {
          this.cria_posto(this.postos[x]);
        } else {
          this.atualiza_posto(this.postos[x]);
        }
      }
      for (var x in this.tabelasSincronismo) {
        if (this.tabelasSincronismo[x].id == null) {
          this.cria_tabelas(this.tabelasSincronismo[x]);
        } else {
          this.atualiza_tabelas(this.tabelasSincronismo[x]);
        }
      }
      for (var x in this.tabelaTiposExtra) {
        if (this.tabelaTiposExtra[x].id.toString().substring(0, 1) == "P") {
          this.cria_TiposExtra(this.tabelaTiposExtra[x]);
        } else {
          this.atualiza_TiposExtra(this.tabelaTiposExtra[x], this.tabelaTiposExtra[x].data);
        }
      }

      this.simular(this.inputgravou);
      //this.location.back();
      this.router.navigate(['parametros']);
    },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  atualiza_posto(data) {
    if (data.descricao != null && data.descricao != "") {
      var posto = new GER_POSTOS;
      posto = data;
      this.GERPOSTOSService.update(posto).then(() => {
        this.postos = this.postos.slice();
      });

    }

  }

  cria_posto(data) {
    if (data.descricao != null && data.descricao != "") {
      data.id_POSTO = null;
      this.GERPOSTOSService.update(data).then(() => {
        this.postos = this.postos.slice();
      },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  atualiza_tabelas(data) {
    if (data.tabela != null && data.tabela != "") {
      var tabelas = new GER_ATUALIZACAO_SILVER_BI_TABELAS;
      tabelas = data.data;
      tabelas.tabela = data.tabela;
      tabelas.total = data.total;
      tabelas.dias = data.dias;

      tabelas.tipo_OCORRENCIA = data.tipo_repicao_valor;
      tabelas.base_DE_DADOS = data.bd;
      tabelas.data_INICIAL = data.data_ini;
      tabelas.dia_DA_SEMANA = data.DIA_DA_SEMANA;
      tabelas.horas = data.HORAS;
      tabelas.ativo = data.ativo;

      this.GERATUALIZACAOSILVERBITABELASService.update(tabelas).then(result => {
        var horas = data.HORAS.toString().split(':');
        var hora = (horas[0] == "00") ? 0 : parseInt(horas[0]);
        var minutos = (horas[1] == "00") ? 0 : parseInt(horas[1]);

        var horas = data.HORAS.toString().split(':');
        var hora = (horas[0] == "00") ? 0 : parseInt(horas[0]);
        var minutos = (horas[1] == "00") ? 0 : parseInt(horas[1]);
        this.GERPARAMETROSService.atualizaData(hora, minutos, data.DIA_DA_SEMANA, data.tipo_repicao_valor, new Date(data.data_ini).toLocaleDateString(), result.id).subscribe(() => {

        }, error => { console.log(error); });
      }, error => { console.log(error); });
    }
  }

  cria_tabelas(data) {
    if (data.tabela != null && data.tabela != "") {
      var tabelas = new GER_ATUALIZACAO_SILVER_BI_TABELAS;
      tabelas.data_CRIA = new Date();
      tabelas.utz_CRIA = this.user;
      tabelas.tabela = data.tabela;
      tabelas.total = data.total;
      tabelas.dias = data.dias;

      tabelas.tipo_OCORRENCIA = data.tipo_repicao_valor;
      tabelas.base_DE_DADOS = data.bd;
      tabelas.data_INICIAL = data.data_ini;
      tabelas.dia_DA_SEMANA = data.DIA_DA_SEMANA;
      tabelas.horas = data.HORAS;
      tabelas.ativo = data.ativo;


      this.GERATUALIZACAOSILVERBITABELASService.update(tabelas).then(result => {

        var horas = data.HORAS.toString().split(':');
        var hora = (horas[0] == "00") ? 0 : parseInt(horas[0]);
        var minutos = (horas[1] == "00") ? 0 : parseInt(horas[1]);

        var horas = data.HORAS.toString().split(':');
        var hora = (horas[0] == "00") ? 0 : parseInt(horas[0]);
        var minutos = (horas[1] == "00") ? 0 : parseInt(horas[1]);
        this.GERPARAMETROSService.atualizaData(hora, minutos, data.DIA_DA_SEMANA, data.tipo_repicao_valor, new Date(data.data_ini).toLocaleDateString(), result.id).subscribe(() => {

        },
          error => { console.log(error); });
      },
        error => { console.log(error); });
    }
  }

  //bt cancelar
  backview() {
    //this.location.back();
    this.router.navigate(['parametros']);
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  //adicionar linha aos postos
  adicionar_linha() {
    this.pos++;
    this.postos.push({ id_POSTO: "P" + this.pos, descricao: "", ip_POSTO: "", impressora: null });
    this.postos = this.postos.slice();
  }

  //adicionar linha às tabelas
  adicionar_linha2() {
    this.GERATUALIZACAOSILVERBITABELASService.getTABELAS("SILVER").subscribe(
      response2 => {
        var tab = [];
        for (var x in response2) {
          tab.push({ label: response2[x][0], value: response2[x][0] })
        }

        this.tabelasSincronismo.push({
          data_ini: new Date(), bd: "SILVER", id: null, total: false, dias: 0, tabela: false, tipo_repicao_valor: 1,
          HORAS: "00:00", DIA_DA_SEMANA: 1, ativo: false, tables: tab
        });
        this.tabelasSincronismo = this.tabelasSincronismo.slice();
      },
      error => console.log(error));

  }

  apagar_linha(index) {
    var tab = this.tabelasSincronismo[index];
    if (tab.id == null) {
      this.tabelasSincronismo = this.tabelasSincronismo.slice(0, index).concat(this.tabelasSincronismo.slice(index + 1));
    } else {
      this.GERATUALIZACAOSILVERBITABELASService.delete(tab.id).then(
        res => {
          this.tabelasSincronismo = this.tabelasSincronismo.slice(0, index).concat(this.tabelasSincronismo.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  eliminar(posto: GER_POSTOS) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (posto.id_POSTO.toString().substring(0, 1) != "P") {
          this.GERPOSTOSService.delete(posto.id_POSTO).then(() => {
            this.tabelaPostos();
          },
            error => { console.log(error); this.simular(this.inputerro); });
        } else {
          let index = -1;
          for (let i = 0; i < this.postos.length; i++) {
            if (this.postos[i].id_POSTO == posto.id_POSTO) {
              index = i;
              break;
            }
          }
          this.postos.splice(index, 1);
          this.postos = this.postos.slice();
        }
      }
    });
  }

  //ao alterar bd atualiza tabelas
  atualizatabelas(event, index) {
    var tab = [];
    this.GERATUALIZACAOSILVERBITABELASService.getTABELAS(event.value).subscribe(
      response2 => {
        for (var x in response2) {
          tab.push({ label: response2[x][0], value: response2[x][0] })
        }

        this.tabelasSincronismo[index].tables = tab;
      },
      error => { console.log(error); this.tabelasSincronismo[index].tables = tab; });
  }

  //carrega tabela tipos extra (recursos humanos)
  drop_tipos() {
    this.tiposextra = [];
    this.RH_EXCLUSAO_TIPO_EXTRAService.getTiposExtra().subscribe(
      response => {
        this.tiposextra.push({ value: null, label: "Selecionar Tipo Extra" });
        for (var x in response) {
          this.tiposextra.push({ value: response[x][0], label: response[x][1] });
        }
      },
      error => { console.log(error); });
  }

  carregatabelatiposextra() {
    this.tabelaTiposExtra = [];

    this.RH_EXCLUSAO_TIPO_EXTRAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.tabelaTiposExtra.push({ id: response[x].id, id_TIPO: response[x].tipo_EXTRA, data: response[x] });
        }
        this.tabelaTiposExtra = this.tabelaTiposExtra.slice();

      },
      error => { console.log(error); });

  }

  getTipo(id) {
    var tipo = "";
    if (this.tiposextra.find(item => item.value == id)) {
      tipo = this.tiposextra.find(item => item.value == id).label;
    }
    return tipo;
  }

  eliminartiposextra(tipo: RH_EXCLUSAO_TIPO_EXTRA) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (tipo.id.toString().substring(0, 1) != "P") {
          this.RH_EXCLUSAO_TIPO_EXTRAService.delete(tipo.id).then(() => {
            this.carregatabelatiposextra();
          },
            error => { console.log(error); this.simular(this.inputerro); });
        } else {
          let index = -1;
          for (let i = 0; i < this.postos.length; i++) {
            if (this.tabelaTiposExtra[i].id == tipo.id) {
              index = i;
              break;
            }
          }
          this.tabelaTiposExtra.splice(index, 1);
          this.tabelaTiposExtra = this.tabelaTiposExtra.slice();
        }
      }
    });
  }

  //adicionar linha aos tipos extera
  adicionar_linhatipo_extra() {
    this.postabelaTiposExtra++;
    this.tabelaTiposExtra.push({ id: "P" + this.postabelaTiposExtra, id_TIPO: null });
    this.tabelaTiposExtra = this.tabelaTiposExtra.slice();
  }

  atualiza_TiposExtra(data, tab) {
    if (data.id_TIPO != null && data.id_TIPO != "") {
      var posto = new RH_EXCLUSAO_TIPO_EXTRA;
      posto = tab;
      posto.tipo_EXTRA = data.id_TIPO;
      posto.utz_ULT_MODIF = this.user;
      posto.data_ULT_MODIF = new Date();
      this.RH_EXCLUSAO_TIPO_EXTRAService.update(posto).then(() => {
        this.tabelaTiposExtra = this.tabelaTiposExtra.slice();
      });

    }

  }

  cria_TiposExtra(data) {
    if (data.id_TIPO != null && data.id_TIPO != "") {
      data.id = null;
      var posto = new RH_EXCLUSAO_TIPO_EXTRA;
      posto.tipo_EXTRA = data.id_TIPO;
      posto.utz_ULT_MODIF = this.user;
      posto.data_ULT_MODIF = new Date();
      posto.utz_CRIA = this.user;
      posto.data_ULT_MODIF = new Date();
      this.RH_EXCLUSAO_TIPO_EXTRAService.update(posto).then(() => {
        this.tabelaTiposExtra = this.tabelaTiposExtra.slice();
      },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }
}
