import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { Location } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { ConfirmationService } from "primeng/primeng";
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { ABDICTURNOService } from "app/servicos/ab-dic-turno.service";
import { ABMOVMANUTENCAOService } from "app/servicos/ab-mov-manutencao.service";
import { AB_MOV_MANUTENCAO } from "app/entidades/AB_MOV_MANUTENCAO";
import { ABDICBANHOADITIVOService } from "app/servicos/ab-dic-banho-aditivo.service";
import { ABDICTIPOADICAOService } from "app/servicos/ab-dic-tipo-adicao.service";
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";
import { AB_MOV_MANUTENCAO_LINHA } from "app/entidades/AB_MOV_MANUTENCAO_LINHA";
import { AB_MOV_MANUTENCAO_CAB } from "app/entidades/AB_MOV_MANUTENCAO_CAB";
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";
import { ABMOVMANUTENCAOCABService } from "app/servicos/ab-mov-manutencao-cab.service";
import { ABMOVMANUTENCAOLINHAService } from "app/servicos/ab-mov-manutencao-linha.service";
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";
import { AD_MOV_REG_PARAM_OPERACAO } from "app/entidades/AD_MOV_REG_PARAM_OPERACAO";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";


@Component({
  selector: 'app-manutencaoform',
  templateUrl: './manutencaoform.component.html',
  styleUrls: ['./manutencaoform.component.css']
})
export class ManutencaoformComponent implements OnInit {
  id: any;
  manutencao_dados: any;
  gravarlinhas: boolean;
  pos_sele: any;
  pesquisa_analise: any = [];
  intervalo_op: any[];
  num_manutencao: any;
  manutencao = [];
  i: any;
  data_actual: Date;
  id_turno: any;
  turno: any[];
  tipo_manu_id: any;
  tipo_manu: any;
  estado: string;
  responsavel: any;
  tipo_adicao: any[];
  pos: any = 0;
  banhos: any[];
  cor_linha: any;
  linha: any;
  linhas: any[];
  user: any;
  medidas: any[];
  novo: boolean;
  arrayForm = [];
  modoedicao = false;
  planeamento = true;
  data_planeamento;
  planeado = false;
  preparado = false;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;
  @ViewChild('waitingDialog') waitingDialog: ElementRef;
  @ViewChild('waitingDialogclose') waitingDialogclose: ElementRef;
  @ViewChild('inputgduplica') inputgduplica: ElementRef;
  @ViewChild('aviso_gravar') aviso_gravar: ElementRef;

  constructor(private ADMOVREGPARAMOPERACAOService: ADMOVREGPARAMOPERACAOService, private ABMOVMANUTENCAOLINHAService: ABMOVMANUTENCAOLINHAService, private ABMOVMANUTENCAOCABService: ABMOVMANUTENCAOCABService, private ABMOVANALISEService: ABMOVANALISEService, private ABDICTIPOOPERACAOService: ABDICTIPOOPERACAOService, private ABDICTIPOADICAOService: ABDICTIPOADICAOService, private ABDICBANHOADITIVOService: ABDICBANHOADITIVOService, private ABMOVMANUTENCAOService: ABMOVMANUTENCAOService, private ABDICTURNOService: ABDICTURNOService, private ABDICTIPOMANUTENCAOService: ABDICTIPOMANUTENCAOService, private confirmationService: ConfirmationService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICBANHOService: ABDICBANHOService, private ABDICLINHAService: ABDICLINHAService, private globalVar: AppGlobals, private ABUNIDADADEMEDIDAService: ABUNIDADADEMEDIDAService, private location: Location, private router: Router, private renderer: Renderer, private route: ActivatedRoute) { }

  ngOnInit() {
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setpesquisar(true);
    this.globalVar.setduplicar(true);

    // this.pos=3;
    /* this.arrayForm = [{pos: 1, id: null, id_banho: 1, tina: 2, capacidade: "11 L", aditivos: [{ id: 1, valor: 10, unidade: "aa", obs: "" }] },
     {pos: 2, id: null, id_banho: 1, tina: 2, capacidade: "11 L", aditivos: [{ id: 1, valor: 10, unidade: "aa", obs: "" }] }];*/

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      //preenche array para navegar nas manutenções 
      this.ABMOVMANUTENCAOService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.manutencao.push(response[x][0].id_MANUTENCAO);
          }

          this.i = this.manutencao.indexOf(+id);
          this.inicia(this.manutencao[this.i]);
        }, error => { console.log(error); });

    }
    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.globalVar.setduplicar(true);
        this.modoedicao = true;
        this.planeamento = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setduplicar(false);
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formArranque';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();
        this.data_actual = new Date();
        this.data_planeamento = this.data_actual.toLocaleString();
        this.responsavel = JSON.parse(localStorage.getItem('userapp'))["nome"];
        this.estado = "Em Planeamento";
        this.planeamento = false;
        this.novalinha();

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
        this.modoedicao = false;
        this.planeamento = false;
      }
    }

    //preenche combobox unidades
    this.ABUNIDADADEMEDIDAService.getAll().subscribe(
      response => {

        this.medidas = [];
        for (var x in response) {
          this.medidas.push({ label: response[x].medida, value: response[x].id_MEDIDA });
        }
        this.medidas = this.medidas.slice();
      },
      error => console.log(error));

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "Sel. Linha", value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: { id: response[x].id_LINHA, cor: response[x].cor } });
        }
        if (this.globalVar.getlinha() != 0) this.linha = this.linhas.find(item => item.value.id == this.globalVar.getlinha()).value;
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));

    //preenche combobox Tipo Manutenção
    this.ABDICTIPOMANUTENCAOService.getAll().subscribe(
      response => {
        this.tipo_manu = [];
        this.tipo_manu.push({ label: "Sel. Tipo Manutenção", value: "" });
        for (var x in response) {
          this.tipo_manu.push({ label: response[x].nome_TIPO_MANUTENCAO, value: response[x].id_TIPO_MANUTENCAO });
        }
        this.tipo_manu = this.tipo_manu.slice();
      },
      error => console.log(error));

    //preenche tabela das análises
    this.ABMOVANALISEService.getAll2().subscribe(
      response => {
        for (var x in response) {
          this.pesquisa_analise.push({ id: response[x][0].id_ANALISE, linha: response[x][0].id_LINHA, data: new Date(response[x][0].data_ANALISE).toLocaleDateString(), nome: response[x][2].nome_BANHO, tina: response[x][3].cod_TINA, cor: response[x][1].cor });
        }
        this.pesquisa_analise = this.pesquisa_analise.slice();
      },
      error => console.log(error));

    //preenche combobox Turno
    this.ABDICTURNOService.getAll().subscribe(
      response => {
        this.turno = [];
        this.turno.push({ label: "Sel. Turno", value: "" });
        for (var x in response) {
          this.turno.push({ label: response[x].nome_TURNO, value: response[x].id_TURNO });
        }
        this.turno = this.turno.slice();
      },
      error => console.log(error));

    //preenche combobox Tipo Adição
    this.ABDICTIPOADICAOService.getAll().subscribe(
      response => {
        this.tipo_adicao = [];
        this.tipo_adicao.push({ label: "Sel. Tipo Adição", value: "" });
        for (var x in response) {
          this.tipo_adicao.push({ label: response[x].nome_TIPO_ADICAO, value: { id: response[x].id_TIPO_ADICAO, id195: response[x].id_TIPO_OPERACAO } });
        }
        this.tipo_adicao = this.tipo_adicao.slice();
      },
      error => console.log(error));

    //preenche combobox Intervalo Oper.
    this.ABDICTIPOOPERACAOService.getAll().subscribe(
      response => {
        this.intervalo_op = [];
        this.intervalo_op.push({ label: "Sel. Intervalo Oper.", value: "" });
        for (var x in response) {
          this.intervalo_op.push({ label: response[x].nome_TIPO_OPERACAO, value: { id: response[x].id_TIPO_OPERACAO, id195: response[x].id195 } });
        }
        this.intervalo_op = this.intervalo_op.slice();
      },
      error => console.log(error));

  }

  inicia(id) {
    this.planeado = false;
    this.preparado = false;
    this.planeamento = false;
    this.ABMOVMANUTENCAOService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.manutencao_dados = response[x][0];
            this.num_manutencao = response[x][0].id_MANUTENCAO;
            this.tipo_manu_id = response[x][0].id_TIPO_MANUTENCAO;
            this.data_planeamento = new Date(new Date(response[x][0].data_PLANEAMENTO).toDateString() + " " + response[x][0].hora_PLANEAMENTO.slice(0, 5)).toLocaleString();
            this.responsavel = response[x][4].nome_UTILIZADOR;
            this.linha = this.linhas.find(item => item.value.id === response[x][0].id_LINHA).value;
            this.id_turno = response[x][0].id_TURNO;
            this.estado = response[x][0].estado;
            this.cor_linha = response[x][1].cor;
            if (this.estado == "Planeado") {
              this.planeado = true;
            } else if (this.estado == "Preparado") {
              this.preparado = true;
            } else if (this.estado == "Em Planeamento") {
              this.planeamento = true;
            }
          }
          this.preenche_banhos(id);
        }
      },
      error => console.log(error));
  }

  //carrega linhas
  carregarlinhas(id) {
    this.arrayForm = [];
    this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var data_prev = new Date(new Date(response[x][0].data_PREVISTA).toDateString() + ' ' + response[x][0].hora_PREVISTA.slice(0, 5));
            var data_exec = null;
            var id_adicao = this.tipo_adicao.find(item => item.value.id == response[x][0].id_TIPO_ADICAO).value;
            var int_op = this.intervalo_op.find(item => item.value.id == response[x][0].id_TIPO_OPERACAO).value;
            var id_banho = this.banhos.find(item => item.value.id == response[x][0].id_BANHO).value;
            var nome_analise = "";
            var executado = false
            var preparado = false
            var disable = false;
            if (response[x][0].id_ANALISE != "" && response[x][0].id_ANALISE != null) nome_analise = response[x][0].id_ANALISE + ' - ' + response[x][1];
            if (id_adicao.id195 != "" && id_adicao.id195 != null) disable = true;
            if (response[x][0].data_EXECUCAO != null) {
              data_exec = new Date(new Date(response[x][0].data_EXECUCAO).toDateString() + ' ' + response[x][0].hora_EXECUCAO.slice(0, 5)).toLocaleString();
              executado = true;
            }
            if (response[x][0].data_PREPARACAO != null) {
              preparado = true;
            }

            this.pos++;
            this.arrayForm.push({
              executado: executado, preparado: preparado, obs_prep: response[x][0].obs_PREPARACAO,
              id_manu: response[x][0].id_MANUTENCAO, data: data_prev, cod_analise: response[x][0].id_ANALISE, nome_analise: nome_analise, disable_op: disable,
              pos: this.pos, id: response[x][0].id_MANUTENCAO_CAB, id_banho: id_banho, data_pre: data_prev.toLocaleString(), tipo_adicao: id_adicao,
              interva_ope: int_op, id_195: response[x][3], obs_pla: response[x][0].obs_PLANEAMENTO, obs_exec: response[x][0].obs_EXECUCAO,
              resp_exe: response[x][4], data_exc: data_exec,
              id_tina: response[x][0].id_TINA, tina: response[x][0].cod_TINA, capacidade: response[x][2], aditivos: []
            });
            this.carregaraditivoslinhas(response[x][0].id_MANUTENCAO_CAB, this.pos);
          }

        } else {
          if (this.modoedicao) this.novalinha();
        }
      },
      error => console.log(error));
  }

  carregaraditivoslinhas(id, pos) {
    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            this.arrayForm.find(item => item.pos == pos).aditivos.push(
              {
                id_LIN: response[x][0].id_MANUTENCAO_LIN, id: response[x][0].id_ADITIVO, nome: response[x][1].nome_COMPONENTE, valor1: response[x][0].valor1, valor2: response[x][0].valor2,
                unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: response[x][0].obs_PLANEAMENTO
              }
            );
          }
          this.arrayForm.find(item => item.pos == pos).aditivos = this.arrayForm.find(item => item.pos == pos).aditivos.slice();
        }
      },
      error => console.log(error));
  }

  //adicionar novo formulário
  novalinha() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    this.pos++;
    this.arrayForm.push({
      executado: false, preparado: false, obs_prep: null,
      id_manu: id, data: new Date(), cod_analise: null, nome_analise: null, disable_op: false,
      pos: this.pos, id: null, id_banho: null, data_pre: new Date().toLocaleString(), tipo_adicao: null,
      interva_ope: null, id_195: null, obs_pla: null, obs_exec: null, resp_exe: null, data_exc: null, tina: null, id_tina: null, capacidade: null, aditivos: []
    });
  }

  //preencher nome da tina/capacidade e tabela dos aditivos
  nome_tinas(event, pos) {
    this.arrayForm.find(item => item.pos == pos).tina = event.value.nome_tina;
    this.arrayForm.find(item => item.pos == pos).id_tina = event.value.id_tina;
    this.arrayForm.find(item => item.pos == pos).capacidade = event.value.capacidade;
    this.arrayForm.find(item => item.pos == pos).aditivos = [];
    if (event.value.id != "" && event.value.id != null) {
      this.ABDICBANHOADITIVOService.getbyID_banho(event.value.id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir componente Componente
          if (count > 0) {
            for (var x in response) {
              this.arrayForm.find(item => item.pos == pos).aditivos.push({ id_LIN: null, id: response[x][1].id_COMPONENTE, nome: response[x][1].nome_COMPONENTE, valor1: null, valor2: null, unidade1: response[x][0].id_UNIDADE1, unidade2: response[x][0].id_UNIDADE2, obs: "" });
            }
            this.arrayForm.find(item => item.pos == pos).aditivos = this.arrayForm.find(item => item.pos == pos).aditivos.slice();
          }
        }, error => console.log(error));
    }


  }

  //preenche combobox banhos
  preenche_banhos(id) {
    this.banhos = [];
    if (this.linha["id"] != "") {
      //preenche combobox banhos
      this.ABDICBANHOService.getAllLINHAbylinha(this.linha["id"]).subscribe(
        response => {
          this.banhos.push({ label: 'Seleccione Banho', value: "" });
          for (var x in response) {
            this.banhos.push({ label: response[x][0].id_BANHO + " / " + response[x][0].nome_BANHO + " - Tina: " + response[x][2].cod_TINA, value: { id: response[x][0].id_BANHO, id_tina: response[x][2].id_TINA, nome_tina: response[x][2].cod_TINA, capacidade: response[x][2].capacidade } });
          }
          this.banhos = this.banhos.slice();
          this.carregarlinhas(id);
        },
        error => console.log(error));
    }

  }


  //apagar linha
  apagarlinha(pos, id) {
    this.confirmapagarlinha(pos, id);
  }

  //popup apagarlinha
  confirmapagarlinha(pos, id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (id != null && id != "") {
          this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
            response => {
              for (var x in response) {
                var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
                MOV_MANUTENCAO_CAB = response[x][0];
                MOV_MANUTENCAO_CAB.data_ANULACAO = new Date();
                MOV_MANUTENCAO_CAB.utz_ANULACAO = this.user;
                MOV_MANUTENCAO_CAB.inativo = true;
                if (response[x][3] != null) {
                  this.ADMOVREGPARAMOPERACAOService.getbyID(response[x][3]).subscribe(
                    resp => {
                      var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
                      MOV_REG_PARAM_OPERACAO = resp[0][0];
                      MOV_REG_PARAM_OPERACAO.data_ANULACAO = new Date();
                      MOV_REG_PARAM_OPERACAO.utz_ANULACAO = this.user;
                      MOV_REG_PARAM_OPERACAO.inativo = true;

                      this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
                      }, error => {
                        console.log(error); this.simular(this.inputerro);
                      });
                    }, error => {
                      console.log(error); this.simular(this.inputerro);
                    });
                }
                this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
                }, error => {
                  console.log(error); this.simular(this.inputerro);
                });
              }
              this.arrayForm.splice(index, 1);
              this.arrayForm = this.arrayForm.slice();
              this.simular(this.inputapagar);
            },
            error => console.log(error));
        } else {
          var index = this.arrayForm.findIndex(item => item.pos === pos);
          this.arrayForm.splice(index, 1);
          this.arrayForm = this.arrayForm.slice();
          this.simular(this.inputapagar);
        }

      }
    });
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  gravar() {
    if (!this.planeamento) {
      var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
      MOV_MANUTENCAO.id_LINHA = this.linha["id"];
      MOV_MANUTENCAO.estado = this.estado;
      MOV_MANUTENCAO.hora_PLANEAMENTO = this.data_actual.toLocaleTimeString().slice(0, 5);
      MOV_MANUTENCAO.inativo = false;
      MOV_MANUTENCAO.id_TURNO = this.id_turno;
      MOV_MANUTENCAO.data_PLANEAMENTO = this.data_actual;
      MOV_MANUTENCAO.id_TIPO_MANUTENCAO = this.tipo_manu_id;
      MOV_MANUTENCAO.data_CRIA = new Date();
      MOV_MANUTENCAO.utz_CRIA = this.user;
      MOV_MANUTENCAO.utz_PLANEAMENTO = this.user;
      MOV_MANUTENCAO.inativo = false;
      this.ABMOVMANUTENCAOService.create(MOV_MANUTENCAO).subscribe(
        res => {

          this.simular(this.inputnotifi);
          this.router.navigate(['manutencao/editar'], { queryParams: { id: res.id_MANUTENCAO } });
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });

    }
  }

  gravarlinha(pos) {
    var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
    this.gravarlinhas = false;
    if (this.arrayForm.find(item => item.pos == pos).id != null) {
      //update
      this.ABMOVMANUTENCAOCABService.getbyID_cab(this.arrayForm.find(item => item.pos == pos).id).subscribe(
        response => {
          for (var x in response) {
            MOV_MANUTENCAO_CAB = response[x][0];
            MOV_MANUTENCAO_CAB.data_ULT_MODIF = new Date();
            MOV_MANUTENCAO_CAB.id_ANALISE = this.arrayForm.find(item => item.pos == pos).cod_analise;
            MOV_MANUTENCAO_CAB.id_BANHO = this.arrayForm.find(item => item.pos == pos).id_banho['id'];
            MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = this.arrayForm.find(item => item.pos == pos).tipo_adicao['id'];
            MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = this.arrayForm.find(item => item.pos == pos).interva_ope['id'];
            MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
            MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).obs_pla;
            MOV_MANUTENCAO_CAB.id_TINA = this.arrayForm.find(item => item.pos == pos).id_tina;
            MOV_MANUTENCAO_CAB.utz_ULT_MODIF = this.user;

            this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
              this.gravarlinhasaditivos(response[x][0].id_MANUTENCAO_CAB, pos)
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
          }
        },
        error => console.log(error));
    } else {
      this.gravarlinhas = true;
      //insere
      MOV_MANUTENCAO_CAB.data_CRIA = new Date();
      MOV_MANUTENCAO_CAB.data_PREVISTA = this.arrayForm.find(item => item.pos == pos).data;
      MOV_MANUTENCAO_CAB.hora_PREVISTA = this.arrayForm.find(item => item.pos == pos).data.toLocaleTimeString().slice(0, 5);
      MOV_MANUTENCAO_CAB.id_ANALISE = this.arrayForm.find(item => item.pos == pos).cod_analise;
      MOV_MANUTENCAO_CAB.id_BANHO = this.arrayForm.find(item => item.pos == pos).id_banho['id'];
      MOV_MANUTENCAO_CAB.id_MANUTENCAO = this.arrayForm.find(item => item.pos == pos).id_manu;
      MOV_MANUTENCAO_CAB.id_TINA = this.arrayForm.find(item => item.pos == pos).id_tina;
      MOV_MANUTENCAO_CAB.id_TIPO_ADICAO = this.arrayForm.find(item => item.pos == pos).tipo_adicao['id'];
      MOV_MANUTENCAO_CAB.id_TIPO_OPERACAO = this.arrayForm.find(item => item.pos == pos).interva_ope['id'];
      MOV_MANUTENCAO_CAB.utz_CRIA = this.user;
      MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
      MOV_MANUTENCAO_CAB.obs_PLANEAMENTO = this.arrayForm.find(item => item.pos == pos).obs_pla;
      MOV_MANUTENCAO_CAB.inativo = false;
      this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
        res => {
          this.gravarlinhasaditivos(res.id_MANUTENCAO_CAB, pos)
        }, error => {
          console.log(error); this.simular(this.inputerro);
        });
    }

  }
  gravarlinhasaditivos(id, pos) {
    if (this.arrayForm.find(item => item.pos == pos).aditivos.length > 0) {
      for (var x in this.arrayForm.find(item => item.pos == pos).aditivos) {
        if (this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN == null) {
          var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
          MOV_MANUTENCAO_LINHA.id_ADITIVO = this.arrayForm.find(item => item.pos == pos).aditivos[x].id;
          MOV_MANUTENCAO_LINHA.id_MANUTENCAO_CAB = id;
          MOV_MANUTENCAO_LINHA.id_UNIDADE1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade1;
          MOV_MANUTENCAO_LINHA.id_UNIDADE2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade2;
          MOV_MANUTENCAO_LINHA.valor1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1;
          MOV_MANUTENCAO_LINHA.valor2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor2;
          MOV_MANUTENCAO_LINHA.hora_PREVISTA = null;
          this.ABMOVMANUTENCAOLINHAService.create(MOV_MANUTENCAO_LINHA).subscribe(
            res => {
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
        } else {
          this.atualizalinhasaditivos(this.arrayForm.find(item => item.pos == pos).aditivos[x].id_LIN, pos, x)
        }
      }

    }
    if (this.gravarlinhas) {
      this.simular(this.inputnotifi);
    } else {
      this.simular(this.inputgravou);
    }

  }

  atualizalinhasaditivos(id, pos, x) {

    var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;

    this.ABMOVMANUTENCAOLINHAService.getbyID_lin(id).subscribe(
      response => {
        for (var x in response) {
          MOV_MANUTENCAO_LINHA = response[x];
          MOV_MANUTENCAO_LINHA.id_UNIDADE1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade1;
          MOV_MANUTENCAO_LINHA.id_UNIDADE2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].unidade2;
          MOV_MANUTENCAO_LINHA.valor1 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor1;
          MOV_MANUTENCAO_LINHA.valor2 = this.arrayForm.find(item => item.pos == pos).aditivos[x].valor2;

          this.ABMOVMANUTENCAOLINHAService.update(MOV_MANUTENCAO_LINHA).then(() => {
          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
        }
      },
      error => console.log(error));
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.manutencao.length;
    if (this.manutencao.length > 0) {
      this.inicia(this.manutencao[this.i]);
      this.router.navigate(['manutencao/view'], { queryParams: { id: this.manutencao[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.manutencao.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['manutencao/view'], { queryParams: { id: this.manutencao[this.i] } });
    if (this.manutencao.length > 0) {
      this.inicia(this.manutencao[this.i]);
    }
  }

  //abre popup de análises
  showDialog(event, pos) {
    this.pos_sele = pos;
    let elem = document.getElementById("pesquisa");
    let elm2 = document.getElementById("myModallinhas");
    let coords = elem.getBoundingClientRect();
    elm2.style.top = Math.abs(coords.bottom - event.screenY) + 'px';
    elm2.style.bottom = 'none';
    this.simular(this.dialoglinhas);
  }

  //seleccionar analise da tabela e grava campos
  seleciona(event) {
    this.arrayForm.find(item => item.pos == this.pos_sele).cod_analise = event.data.id
    this.arrayForm.find(item => item.pos == this.pos_sele).nome_analise = event.data.id + ' - ' + event.data.nome;
    this.simular(this.closedialoglinha);
  }

  //ao selecionar tipode adição verifica se tem id195 se sim o int. oper. fica por defeito vermelho
  verifica_adicao(event, pos) {
    this.arrayForm.find(item => item.pos == pos).disable_op = false;
    this.arrayForm.find(item => item.pos == pos).interva_ope = null;
    if (event.value.id195 != "" && event.value.id195 != null) {
      this.arrayForm.find(item => item.pos == pos).interva_ope = this.intervalo_op.find(item => item.value.id195 == true).value;
      this.arrayForm.find(item => item.pos == pos).disable_op = true;
    }
  }

  preencher_id195(id, id195) {
    if (id == null) {
      this.simular(this.aviso_gravar);
    } else {
      if (id195 == null) {
        this.router.navigate(['registopara/novo'], { queryParams: { manu: id } });
      } else {
        this.router.navigate(['registopara/editar'], { queryParams: { id: id195 } });
      }

    }

  }

  concluir() {
    var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
    MOV_MANUTENCAO = this.manutencao_dados;
    MOV_MANUTENCAO.data_ULT_MODIF = this.data_actual;
    MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
    MOV_MANUTENCAO.estado = "Planeado";
    this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
      this.router.navigate(['manutencao/view'], { queryParams: { id: MOV_MANUTENCAO.id_MANUTENCAO } });
      this.simular(this.inputgravou);
    }, error => {
      console.log(error); this.simular(this.inputerro);
    });

  }

  duplicar() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende duplicar?',
      header: 'Duplicar Registo',
      icon: 'fa fa-files-o',
      accept: () => {
        this.criarmanu(this.num_manutencao);
        this.simular(this.waitingDialog);
      }
    });
  }

  criarmanu(id) {
    this.data_actual = new Date();
    this.estado = "Em Planeamento";

    var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
    this.ABMOVMANUTENCAOService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO = response[x][0];
            MOV_MANUTENCAO.id_MANUTENCAO = null;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.hora_PLANEAMENTO = this.data_actual.toLocaleTimeString().slice(0, 5);
            MOV_MANUTENCAO.inativo = false;
            MOV_MANUTENCAO.data_PLANEAMENTO = this.data_actual;
            MOV_MANUTENCAO.data_CRIA = new Date();
            MOV_MANUTENCAO.utz_CRIA = this.user;
            MOV_MANUTENCAO.utz_PLANEAMENTO = this.user;
            MOV_MANUTENCAO.impresso = false;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_IMPRES = null;
            MOV_MANUTENCAO.data_ULT_MODIF = null;
            MOV_MANUTENCAO.utz_ULT_MODIF = null;
            this.ABMOVMANUTENCAOService.create(MOV_MANUTENCAO).subscribe(
              res => {
                this.criarmanu_cab(id, res.id_MANUTENCAO);
              }, error => {
                console.log(error);
              });

          }
        }
      },
      error => console.log(error));
  }

  criarmanu_cab(id, id_manu_nova) {
    this.id = id_manu_nova;
    var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
    this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            MOV_MANUTENCAO_CAB = response[x][0];
            var id = MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO_CAB = null;
            MOV_MANUTENCAO_CAB.id_MANUTENCAO = id_manu_nova;
            MOV_MANUTENCAO_CAB.data_CRIA = new Date();
            MOV_MANUTENCAO_CAB.utz_CRIA = this.user;
            MOV_MANUTENCAO_CAB.data_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.hora_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.obs_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.utz_EXECUCAO = null;
            MOV_MANUTENCAO_CAB.impresso = false;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_IMPRES = null;
            MOV_MANUTENCAO_CAB.data_ULT_MODIF = null;
            MOV_MANUTENCAO_CAB.utz_ULT_MODIF = null;
            this.criarmanucac(MOV_MANUTENCAO_CAB, id);

          }
          this.simular(this.inputgduplica);
          this.inicia(this.id);
          this.simular(this.waitingDialogclose);
          this.router.navigate(['manutencao/editar'], { queryParams: { id: this.id } });
        } else {
          this.simular(this.inputgduplica);
          this.inicia(this.id);
          this.simular(this.waitingDialogclose);
          this.router.navigate(['manutencao/editar'], { queryParams: { id: this.id } });
        }
      });
  }

  criarmanucac(MOV_MANUTENCAO_CAB, id) {
    this.ABMOVMANUTENCAOCABService.create(MOV_MANUTENCAO_CAB).subscribe(
      res => {
        this.criarmanu_lin(id, res.id_MANUTENCAO_CAB);

      }, error => {
        console.log(error);
      });
  }

  criarmanu_lin(id, id_manu_cab_novo) {

    this.ABMOVMANUTENCAOLINHAService.getbyID(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count > 0) {
          for (var x in response) {
            var MOV_MANUTENCAO_LINHA = new AB_MOV_MANUTENCAO_LINHA;
            MOV_MANUTENCAO_LINHA = response[x][0];
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_LIN = null;
            MOV_MANUTENCAO_LINHA.id_MANUTENCAO_CAB = id_manu_cab_novo;
            this.ABMOVMANUTENCAOLINHAService.create(MOV_MANUTENCAO_LINHA).subscribe(
              res => {
              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
          }

        }
      },
      error => {
        console.log(error); this.simular(this.inputerro);
      });

  }

  apagar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.confirm(id);
    }
  }

  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.ABMOVMANUTENCAOCABService.getbyID(id).subscribe(
          response => {
            for (var x in response) {
              var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
              MOV_MANUTENCAO_CAB = response[x][0];
              MOV_MANUTENCAO_CAB.data_ANULACAO = new Date();
              MOV_MANUTENCAO_CAB.utz_ANULACAO = this.user;
              MOV_MANUTENCAO_CAB.inativo = true;

              if (response[x][3] != null) {
                this.ADMOVREGPARAMOPERACAOService.getbyID(response[x][3]).subscribe(
                  resp => {
                    var MOV_REG_PARAM_OPERACAO = new AD_MOV_REG_PARAM_OPERACAO;
                    MOV_REG_PARAM_OPERACAO = resp[0][0];
                    MOV_REG_PARAM_OPERACAO.data_ANULACAO = new Date();
                    MOV_REG_PARAM_OPERACAO.utz_ANULACAO = this.user;
                    MOV_REG_PARAM_OPERACAO.inativo = true;

                    this.ADMOVREGPARAMOPERACAOService.update(MOV_REG_PARAM_OPERACAO).then(() => {
                    }, error => {
                      console.log(error); this.simular(this.inputerro);
                    });
                  }, error => {
                    console.log(error); this.simular(this.inputerro);
                  });
              }
              this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {

              }, error => {
                console.log(error); this.simular(this.inputerro);
              });
            }
            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.data_ANULACAO = new Date();
            MOV_MANUTENCAO.utz_ANULACAO = this.user;
            MOV_MANUTENCAO.inativo = true;
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              this.router.navigate(['manutencao']);
              this.simular(this.inputapagar);
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });
          },
          error => console.log(error));

      }
    });
  }

  preparar_linha(pos, id, id_manu) {
    this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
      response => {
        for (var x in response) {
          var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
          MOV_MANUTENCAO_CAB = response[x][0];
          MOV_MANUTENCAO_CAB.data_PREPARACAO = new Date();
          MOV_MANUTENCAO_CAB.utz_PREPARACAO = this.user;
          MOV_MANUTENCAO_CAB.hora_PREPARACAO = new Date().toLocaleTimeString().slice(0, 5);
          MOV_MANUTENCAO_CAB.obs_PREPARACAO = this.arrayForm.find(item => item.pos == pos).obs_prep;
          this.arrayForm.find(item => item.pos == pos).preparado = true;
          this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
            var tamanho = this.arrayForm.length;
            var count = 0;
            for (var x in this.arrayForm) {
              if (this.arrayForm[x].preparado) count++;
            }
            if (tamanho == count) {
              this.estado = "Preparado";
              this.preparado = false;
            } else {
              this.estado = "Em Preparação";
            }

            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.data_ULT_MODIF = new Date();
            MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              this.inicia(id_manu);
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });

          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
        }
      },
      error => console.log(error));
  }

  confirmar_linha(pos, id, id_manu) {
    this.ABMOVMANUTENCAOCABService.getbyID_cab(id).subscribe(
      response => {
        for (var x in response) {
          var MOV_MANUTENCAO_CAB = new AB_MOV_MANUTENCAO_CAB;
          MOV_MANUTENCAO_CAB = response[x][0];
          MOV_MANUTENCAO_CAB.data_EXECUCAO = new Date();
          MOV_MANUTENCAO_CAB.utz_EXECUCAO = this.user;
          MOV_MANUTENCAO_CAB.hora_EXECUCAO = new Date().toLocaleTimeString().slice(0, 5);
          MOV_MANUTENCAO_CAB.obs_EXECUCAO = this.arrayForm.find(item => item.pos == pos).obs_exec;
          this.arrayForm.find(item => item.pos == pos).executado = true
          this.ABMOVMANUTENCAOCABService.update(MOV_MANUTENCAO_CAB).then(() => {
            var tamanho = this.arrayForm.length;
            var count = 0;
            for (var x in this.arrayForm) {
              if (this.arrayForm[x].executado) count++;
            }
            if (tamanho == count) {
              this.estado = "Executado";
            } else {
              this.estado = "Em Execução";
            }

            var MOV_MANUTENCAO = new AB_MOV_MANUTENCAO;
            MOV_MANUTENCAO = this.manutencao_dados;
            MOV_MANUTENCAO.estado = this.estado;
            MOV_MANUTENCAO.data_ULT_MODIF = new Date();
            MOV_MANUTENCAO.utz_ULT_MODIF = this.user;
            this.ABMOVMANUTENCAOService.update(MOV_MANUTENCAO).then(() => {
              this.inicia(id_manu);
            }, error => {
              console.log(error); this.simular(this.inputerro);
            });

          }, error => {
            console.log(error); this.simular(this.inputerro);
          });
        }
      },
      error => console.log(error));
  }

  imprimir(relatorio, id) {
    this.router.navigate(['relatorio'], { queryParams: { id: id, relatorio: relatorio } });
  }


}
