import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from "primeng/primeng";
import { Router, ActivatedRoute } from "@angular/router";
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { AB_DIC_BANHO } from "app/entidades/AB_DIC_BANHO";
import { Location } from '@angular/common';
import { ABDICTINAService } from "app/servicos/ab-dic-tina.service";
import { ABDICBANHOCOMPONENTEService } from "app/servicos/ab-dic-banho-componente.service";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AB_DIC_BANHO_COMPONENTE } from "app/entidades/AB_DIC_BANHO_COMPONENTE";
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { ABDICBANHOADITIVOService } from "app/servicos/ab-dic-banho-aditivo.service";
import { AB_DIC_BANHO_ADITIVO } from "app/entidades/AB_DIC_BANHO_ADITIVO";
import { ABDICZONAService } from "app/servicos/ab-dic-zona.service";
import { GERFORNECEDORService } from "app/servicos/ger-fornecedor.service";

@Component({
  selector: 'app-banhosform',
  templateUrl: './banhosform.component.html',
  styleUrls: ['./banhosform.component.css']
})
export class BanhosformComponent implements OnInit {
  estados;
  estado_comp = 1;
  fornecedores: any[];
  zonas: any[];
  pos2: any = 0;
  medidas: any;
  cor_linha: any;
  linha;
  zona;
  linhas: any[];
  tinas_valor = 0;
  nome = "";
  estado: any = false;
  componentes: any[];
  banhos_comp: any[] = [];
  aditivos: any[];
  banhos_aditivos: any[] = [];
  tinas: any = [];
  i: any;
  banho: any = [];
  banhos_dados: AB_DIC_BANHO;
  modoedicao = false;
  capacidade_tina;
  obs_tina;
  novo = false;
  codigo;
  data = null;
  obs = "";
  user;
  pos = 0;
  display: boolean = true;

  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('dialogavisodata') dialogavisodata: ElementRef;
  @ViewChild('dialogavisodatafim') dialogavisodatafim: ElementRef;

  constructor(private GERFORNECEDORService: GERFORNECEDORService, private ABDICZONAService: ABDICZONAService, private ABDICBANHOADITIVOService: ABDICBANHOADITIVOService, private ABUNIDADADEMEDIDAService: ABUNIDADADEMEDIDAService, private ABDICLINHAService: ABDICLINHAService, private ABDICCOMPONENTEService: ABDICCOMPONENTEService, private ABDICBANHOCOMPONENTEService: ABDICBANHOCOMPONENTEService, private ABDICTINAService: ABDICTINAService, private confirmationService: ConfirmationService, private router: Router, private ABDICBANHOService: ABDICBANHOService, private renderer: Renderer, private route: ActivatedRoute, private globalVar: AppGlobals, private location: Location) { }


  ngOnInit() {
    //this.banhos_comp = [{ pos: 0, id_BANHO_COMP: null, id_componente: null, data_ini: null, data_fim: null }];

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setpesquisar(true);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;
      this.codigo = 0;
      this.data = 0;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      //preenche array para navegar nos banhoes 
      this.ABDICBANHOService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.banho.push(response[x].id_BANHO);
          }

          this.i = this.banho.indexOf(+id);
          this.inicia(this.banho[this.i]);

          //this.banhosComp(this.banho[this.i]);
          //this.banhosaditivos(this.banho[this.i]);

        }, error => { console.log(error); });
    }

    //preenche combobox tinas
    this.ABDICTINAService.getAll().subscribe(
      response => {

        this.tinas = [];

        this.tinas.push({ label: 'Seleccione Tina', value: "" });
        for (var x in response) {
          this.tinas.push({ label: response[x].cod_TINA, value: { id: response[x].id_TINA, capacidade: response[x].capacidade, cod: response[x].cod_TINA, obs: response[x].obs } });
        }
        this.tinas = this.tinas.slice();
      },
      error => console.log(error));

    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {

        this.linhas = [];
        this.linhas.push({ label: 'Seleccione Linha', value: "" });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
        }
        this.linha = this.globalVar.getlinha();
        this.linhas = this.linhas.slice();
      },
      error => console.log(error));


    //preenche combobox componentes

    this.ABDICCOMPONENTEService.getAll("C").subscribe(
      response => {
        this.componentes = [];
        this.componentes.push({ label: 'Seleccione Componente', value: "" });
        for (var x in response) {
          this.componentes.push({ label: response[x].nome_COMPONENTE, value: { id: response[x].id_COMPONENTE, id_unidade: response[x].id_UNIDADE_COMPONENTE, id_FORNECEDOR: response[x].id_FORNECEDOR } });
        }
        this.componentes = this.componentes.slice();
      },
      error => console.log(error));

    //preenche combobox aditivos

    this.ABDICCOMPONENTEService.getAll("A").subscribe(
      response => {
        this.aditivos = [];
        this.aditivos.push({ label: 'Seleccione Aditivo', value: "" });
        for (var x in response) {
          this.aditivos.push({ label: response[x].nome_COMPONENTE, value: response[x].id_COMPONENTE });
        }
        this.aditivos = this.aditivos.slice();
      },
      error => console.log(error));

    //preenche combobox zonas
    this.zonas = [];
    this.zonas.push({ label: 'Seleccione Zona', value: "" });
    this.ABDICZONAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.zonas.push({ value: response[x].id_ZONA, label: response[x].nome_ZONA });
        }
        this.zonas = this.zonas.slice();
      },
      error => console.log(error));

    //preenche combobox estados
    this.estados = [{ label: "Ativos", value: 1 }, { label: "Inativos", value: 2 }, { label: "Todos", value: 3 }];


    //preenche combobox UNIDADES MEDIDAS
    this.ABUNIDADADEMEDIDAService.getAll().subscribe(
      response => {
        this.medidas = [];
        this.medidas.push({ label: 'Seleccione Medida', value: "" });
        for (var x in response) {
          this.medidas.push({ label: response[x].medida, value: response[x].id_MEDIDA });
        }
        this.medidas = this.medidas.slice();
      },
      error => console.log(error));

    //preenche combobox fornecedores

    this.GERFORNECEDORService.getAll().subscribe(
      response => {
        this.fornecedores = [];
        this.fornecedores.push({ label: 'Sel. Fornecedor', value: "" });
        for (var x in response) {
          this.fornecedores.push({ label: response[x].nome_FORNECEDOR, value: response[x].id_FORNECEDOR });
        }
        this.fornecedores = this.fornecedores.slice();
      },
      error => console.log(error));

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formBanho';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();

      } else if (urlarray[1].match("view")) {
        this.globalVar.setcriar(true);
      }
    }
  }

  //ao alterar combobox aditivos preenche as unidades por defeito
  preenche_unidades(pos, id) {
    this.ABDICCOMPONENTEService.getbyID(id).subscribe(
      response => {
        for (var x in response) {
          this.banhos_aditivos.find(item => item.pos == pos).ID_UNIDADE1 = response[x].id_UNIDADE_ADITIVO;
          this.banhos_aditivos.find(item => item.pos == pos).ID_UNIDADE2 = response[x].id_UNIDADE_ADITIVO;
        }
        this.banhos_aditivos = this.banhos_aditivos.slice();
      },
      error => console.log(error));
  }

  banhosComp(id) {
    //preenche tabela banho Componente

    this.ABDICBANHOCOMPONENTEService.getbyid_banho(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banho Componente
        if (count > 0) {
          this.banhos_comp = [];
          for (var x in response) {
            var data_i = null;
            var data_f = null;
            if (response[x][0].data_INICIO != null) data_i = new Date(response[x][0].data_INICIO);
            if (response[x][0].data_FIM != null) data_f = new Date(response[x][0].data_FIM);
            var id_comp = null;
            if (this.componentes.find(item => item.value.id === response[x][0].id_COMPONENTE)) id_comp = this.componentes.find(item => item.value.id === response[x][0].id_COMPONENTE).value;
            if (this.estado_comp == 1 && data_f== null) {
              this.banhos_comp.push({
                pos: this.pos, id_banho_comp: response[x][0].id_BANHO_COMP, id_banho: response[x][0].id_BANHO, nome_comp: response[x][1].nome_COMPONENTE, id_componente: id_comp, data_ini: data_i, data_fim: data_f,
                id_FORNECEDOR: response[x][0].id_FORNECEDOR, limite_AMARELO_INF: response[x][0].limite_AMARELO_INF, limite_AMARELO_SUP: response[x][0].limite_AMARELO_SUP, id_unidade: response[x][0].id_UNIDADE_COMPONENTE, nome_unidade: response[x][3],
                limite_VERDE_INF: response[x][0].limite_VERDE_INF, limite_VERDE_SUP: response[x][0].limite_VERDE_SUP, nome_FORNECEDOR: response[x][2], obs: response[x][0].obs, qtd: response[x][0].quantidade
              });
            } else if (this.estado_comp == 2 && data_f != null) {
              this.banhos_comp.push({
                pos: this.pos, id_banho_comp: response[x][0].id_BANHO_COMP, id_banho: response[x][0].id_BANHO, nome_comp: response[x][1].nome_COMPONENTE, id_componente: id_comp, data_ini: data_i, data_fim: data_f,
                id_FORNECEDOR: response[x][0].id_FORNECEDOR, limite_AMARELO_INF: response[x][0].limite_AMARELO_INF, limite_AMARELO_SUP: response[x][0].limite_AMARELO_SUP, id_unidade: response[x][0].id_UNIDADE_COMPONENTE, nome_unidade: response[x][3],
                limite_VERDE_INF: response[x][0].limite_VERDE_INF, limite_VERDE_SUP: response[x][0].limite_VERDE_SUP, nome_FORNECEDOR: response[x][2], obs: response[x][0].obs, qtd: response[x][0].quantidade
              });
            } else if (this.estado_comp == 3) {
              this.banhos_comp.push({
                pos: this.pos, id_banho_comp: response[x][0].id_BANHO_COMP, id_banho: response[x][0].id_BANHO, nome_comp: response[x][1].nome_COMPONENTE, id_componente: id_comp, data_ini: data_i, data_fim: data_f,
                id_FORNECEDOR: response[x][0].id_FORNECEDOR, limite_AMARELO_INF: response[x][0].limite_AMARELO_INF, limite_AMARELO_SUP: response[x][0].limite_AMARELO_SUP, id_unidade: response[x][0].id_UNIDADE_COMPONENTE, nome_unidade: response[x][3],
                limite_VERDE_INF: response[x][0].limite_VERDE_INF, limite_VERDE_SUP: response[x][0].limite_VERDE_SUP, nome_FORNECEDOR: response[x][2], obs: response[x][0].obs, qtd: response[x][0].quantidade
              });
            }

            this.banhos_comp = this.banhos_comp.slice();
            this.pos++;
          }
        }

      },
      error => console.log(error));
  }

  banhosaditivos(id) {
    //preenche tabela banho aditivos

    this.ABDICBANHOADITIVOService.getbyID_banho(id).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banho Componente
        if (count > 0) {
          this.banhos_aditivos = [];
          for (var x in response) {
            this.banhos_aditivos.push({ id_banho: response[x][0].id_BANHO, pos: this.pos2, ID_BANHO_ADITIVO: response[x][0].id_BANHO_ADITIVO, nome_aditivo: response[x][1].nome_COMPONENTE, ID_ADITIVO: response[x][0].id_ADITIVO, medida1: response[x][2], medida2: response[x][3], ID_UNIDADE1: response[x][0].id_UNIDADE1, ID_UNIDADE2: response[x][0].id_UNIDADE2 });
            this.pos2++;
          }
          this.banhos_aditivos = this.banhos_aditivos.slice();
        }

      },
      error => console.log(error));
  }


  //preenche dados com o id
  inicia(id) {
    if (id != 0 && id != "undefined") {
      this.ABDICBANHOService.getbyID(id).subscribe(
        response => {
          var count = Object.keys(response).length;
          //se existir banhos com o id
          if (count > 0) {
            this.banhos_dados = response[0][0];
            for (var x in response) {

              this.codigo = response[x][0].id_BANHO;
              this.data = new Date(response[x][0].data_ULT_MODIF).toLocaleDateString();
              this.estado = response[x][0].estado;
              this.nome = response[x][0].nome_BANHO;
              this.linha = response[x][0].id_LINHA;
              this.zona = response[x][0].id_ZONA;
              this.tinas_valor = this.tinas.find(item => item.value.id === response[x][0].id_TINA).value;
              this.capacidade_tina = this.tinas.find(item => item.value.id === response[x][0].id_TINA).value.capacidade;
              this.obs_tina = this.tinas.find(item => item.value.id === response[x][0].id_TINA).value.obs;
              this.cor_linha = response[x][1].cor;
              this.obs = response[x][0].obs;
            }
            this.banhosComp(id);
            this.banhosaditivos(id);
          } else {
            this.router.navigate(['banhos']);
          }
        },
        error => { console.log(error); });
    } else {
      this.router.navigate(['banhos']);
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  //bt gravar
  gravar() {
    var banho = new AB_DIC_BANHO;

    if (this.novo) {
      banho.obs = this.obs;
      banho.data_ULT_MODIF = new Date();
      banho.utz_CRIA = this.user;
      banho.data_CRIA = new Date();
      banho.estado = this.estado;
      banho.id_TINA = this.tinas_valor['id'];
      banho.nome_BANHO = this.nome;
      banho.id_LINHA = this.linha;
      banho.id_ZONA = this.zona;
      banho.inativo = false;

      this.ABDICBANHOService.create(banho).subscribe(
        res => {

          this.inserir_linhas(res.id_BANHO);

        },
        error => { console.log(error); this.simular(this.inputerro); });

    } else {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      banho = this.banhos_dados;
      banho.obs = this.obs;
      banho.id_TINA = this.tinas_valor['id'];
      banho.estado = this.estado;
      banho.nome_BANHO = this.nome;
      banho.id_LINHA = this.linha;
      banho.id_ZONA = this.zona;
      banho.data_ULT_MODIF = new Date();
      banho.utz_ULT_MODIF = this.user;

      this.ABDICBANHOService.update(banho).then(() => {
        this.inserir_linhas(id);
      });

    }
  }

  //adicionar nova linha Componentes do Banho
  novalinha() {
    //console.log(this.banhos_comp[this.banhos_comp.length - 1].data_fim)
    if (this.banhos_comp.length > 0) {
      if (this.banhos_comp[this.banhos_comp.length - 1].data_fim == null) {
        this.simular(this.dialog);
      } else {
        this.banhos_comp.push({
          pos: this.pos, id_BANHO_COMP: "", nome_comp: "", id_componente: "", data_ini: null, data_fim: null,
          id_FORNECEDOR: null, limite_AMARELO_INF: null, limite_AMARELO_SUP: null, limite_VERDE_INF: null, limite_VERDE_SUP: null, nome_FORNECEDOR: null, obs: null, qtd: null, id_unidade: null
        });
        this.banhos_comp = this.banhos_comp.slice();
        this.pos++;
      }
    } else {
      this.banhos_comp.push({
        pos: this.pos, id_BANHO_COMP: "", nome_comp: "", id_componente: "", data_ini: null, data_fim: null,
        id_FORNECEDOR: null, limite_AMARELO_INF: null, limite_AMARELO_SUP: null, limite_VERDE_INF: null, limite_VERDE_SUP: null, nome_FORNECEDOR: null, obs: null, qtd: null, id_unidade: null
      });
      this.banhos_comp = this.banhos_comp.slice();
      this.pos++;
    }

  }

  //adicionar nova linha aditivos do Banho
  novalinha_aditivo() {
    this.banhos_aditivos.push({ pos: this.pos2, ID_BANHO_ADITIVO: "", nome_aditivo: "", ID_ADITIVO: "", medida1: "", medida2: "", ID_UNIDADE1: null, ID_UNIDADE2: null });
    this.banhos_aditivos = this.banhos_aditivos.slice();
    this.pos2++;
  }

  //inserir linhas na BD
  inserir_linhas(id) {
    if (this.banhos_aditivos.length > 0) {
      for (var x in this.banhos_aditivos) {
        var banhos_aditivos = new AB_DIC_BANHO_ADITIVO;

        if (this.banhos_aditivos[x].ID_ADITIVO != "" && this.banhos_aditivos[x].ID_ADITIVO != null) {

          if (this.banhos_aditivos[x].ID_BANHO_ADITIVO == null || this.banhos_aditivos[x].ID_BANHO_ADITIVO == "") {

            banhos_aditivos.id_BANHO = id;
            banhos_aditivos.id_ADITIVO = this.banhos_aditivos[x].ID_ADITIVO;
            banhos_aditivos.id_UNIDADE1 = this.banhos_aditivos[x].ID_UNIDADE1;
            banhos_aditivos.id_UNIDADE2 = this.banhos_aditivos[x].ID_UNIDADE2;

            banhos_aditivos.utz_CRIA = this.user;
            banhos_aditivos.data_CRIA = new Date();
            banhos_aditivos.data_ULT_MODIF = new Date();
            this.ABDICBANHOADITIVOService.create(banhos_aditivos).subscribe(
              res => {
                this.banhosaditivos(id);
              },
              error => { console.log(error); this.simular(this.inputerro); });
          } else {

            this.updateaditivos(id, x);

          }
        }
      }
    }
    if (this.banhos_comp.length > 0) {
      for (var x in this.banhos_comp) {
        var banho_comp = new AB_DIC_BANHO_COMPONENTE;

        if (this.banhos_comp[x].id_componente != "" && this.banhos_comp[x].data_ini != "" && this.banhos_comp[x].id_componente != null && this.banhos_comp[x].data_ini != null) {

          if (this.banhos_comp[x].id_banho_comp == null || this.banhos_comp[x].id_banho_comp == "") {
            banho_comp.id_BANHO = id;
            banho_comp.id_COMPONENTE = this.banhos_comp[x].id_componente['id'];
            banho_comp.data_INICIO = this.banhos_comp[x].data_ini;
            banho_comp.data_FIM = this.banhos_comp[x].data_fim;
            banho_comp.utz_CRIA = this.user;
            banho_comp.data_CRIA = new Date();
            banho_comp.data_ULT_MODIF = new Date();
            banho_comp.id_FORNECEDOR = this.banhos_comp[x].id_FORNECEDOR;
            banho_comp.limite_AMARELO_INF = this.banhos_comp[x].limite_AMARELO_INF;
            banho_comp.limite_AMARELO_SUP = this.banhos_comp[x].limite_AMARELO_SUP;
            banho_comp.limite_VERDE_INF = this.banhos_comp[x].limite_VERDE_INF;
            banho_comp.limite_VERDE_SUP = this.banhos_comp[x].limite_VERDE_SUP;
            banho_comp.obs = this.banhos_comp[x].obs;
            banho_comp.id_UNIDADE_COMPONENTE = this.banhos_comp[x].id_unidade;
            banho_comp.quantidade = this.banhos_comp[x].qtd;
            banho_comp.inativo = false;
            this.ABDICBANHOCOMPONENTEService.create(banho_comp).subscribe(
              res => {
                this.banhosComp(id);
              },
              error => { console.log(error); this.simular(this.inputerro); });
          } else {

            this.update(id, x);

          }
        }
      }
    }
    if (this.novo) {
      this.simular(this.inputnotifi);
    } else {
      this.simular(this.inputgravou);
    }
    this.router.navigate(['banhos/view'], { queryParams: { id: id } });

  }

  update(id, x) {
    this.ABDICBANHOCOMPONENTEService.getbyid_banho_comp(this.banhos_comp[x].id_banho_comp).subscribe(
      res => {
        var banho_comp = new AB_DIC_BANHO_COMPONENTE;
        banho_comp = res[0];
        banho_comp.id_BANHO = id;
        banho_comp.id_COMPONENTE = this.banhos_comp[x].id_componente['id'];
        banho_comp.data_INICIO = this.banhos_comp[x].data_ini;
        banho_comp.data_FIM = new Date(this.banhos_comp[x].data_fim);
        if(this.banhos_comp[x].data_fim == null || this.banhos_comp[x].data_fim =="") banho_comp.data_FIM = null;        
        banho_comp.utz_ULT_MODIF = this.user;
        banho_comp.data_ULT_MODIF = new Date();
        banho_comp.id_FORNECEDOR = this.banhos_comp[x].id_FORNECEDOR;
        banho_comp.limite_AMARELO_INF = this.banhos_comp[x].limite_AMARELO_INF;
        banho_comp.limite_AMARELO_SUP = this.banhos_comp[x].limite_AMARELO_SUP;
        banho_comp.limite_VERDE_INF = this.banhos_comp[x].limite_VERDE_INF;
        banho_comp.limite_VERDE_SUP = this.banhos_comp[x].limite_VERDE_SUP;
        banho_comp.obs = this.banhos_comp[x].obs;
        banho_comp.id_UNIDADE_COMPONENTE = this.banhos_comp[x].id_unidade;
        banho_comp.quantidade = this.banhos_comp[x].qtd;
        this.ABDICBANHOCOMPONENTEService.update(banho_comp).then(() => {
          this.banhosComp(id);
        });
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }

  updateaditivos(id, x) {
    this.ABDICBANHOADITIVOService.getbyID(this.banhos_aditivos[x].ID_BANHO_ADITIVO).subscribe(
      res => {
        var banhos_aditivos = new AB_DIC_BANHO_ADITIVO;
        banhos_aditivos = res[0];
        banhos_aditivos.id_BANHO = id;
        banhos_aditivos.id_UNIDADE1 = this.banhos_aditivos[x].ID_UNIDADE1;
        banhos_aditivos.id_UNIDADE2 = this.banhos_aditivos[x].ID_UNIDADE2;
        banhos_aditivos.utz_ULT_MODIF = this.user;
        banhos_aditivos.data_ULT_MODIF = new Date();
        this.ABDICBANHOADITIVOService.update(banhos_aditivos).then(() => {
          this.banhosaditivos(id);
        });
      },
      error => { console.log(error); this.simular(this.inputerro); });
  }


  //apagar linha
  apagarlinha(pos, id, id_banho) {
    this.confirmapagarlinha(pos, id, id_banho);
  }


  apagarlinha_aditivo(pos, id, id_banho) {
    this.confirmapagarlinha_aditivo(pos, id, id_banho);
  }

  //ao alterar cod_Tina
  num_tina(event) {
    this.capacidade_tina = event.value.capacidade;
    this.obs_tina = event.value.obs;
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


  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.banho.length;
    if (this.banho.length > 0) {
      this.inicia(this.banho[this.i]);
      this.router.navigate(['banhos/view'], { queryParams: { id: this.banho[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.banho.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['banhos/view'], { queryParams: { id: this.banho[this.i] } });
    if (this.banho.length > 0) {
      this.inicia(this.banho[this.i]);
    }
  }
  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var banho = new AB_DIC_BANHO;
        banho = this.banhos_dados;
        banho.inativo = true;
        banho.utz_ANULACAO = this.user;
        banho.data_ANULACAO = new Date();

        this.ABDICBANHOService.update(banho).then(() => {
          this.simular(this.inputapagar);
          this.router.navigate(['banhos']);
        });
      }
    });
  }

  //popup apagarlinha
  confirmapagarlinha_aditivo(pos, id, id_banho) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (id != null && id != "") {
          this.ABDICBANHOADITIVOService.delete(id).then(() => {
            this.simular(this.inputapagar);
            this.banhosaditivos(id_banho);
          });
        } else {
          var index = this.banhos_aditivos.findIndex(item => item.pos2 === pos);
          this.banhos_aditivos.splice(index, 1);
          this.banhos_aditivos = this.banhos_aditivos.slice();
        }

      }
    });
  }

  //popup apagarlinha
  confirmapagarlinha(pos, id, id_banho) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (id != null && id != "") {
          this.ABDICBANHOCOMPONENTEService.delete(id).then(() => {
            this.simular(this.inputapagar);
            this.banhosComp(id_banho);
          });
        } else {
          var index = this.banhos_comp.findIndex(item => item.pos === pos);
          this.banhos_comp.splice(index, 1);
          this.banhos_comp = this.banhos_comp.slice();
        }

      }
    });
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //ao inserir data inicio verifica se existe uma data fim superior
  verificadatas(event, pos) {
    var existdata = false;
    if (event != null && this.banhos_comp.length > 1) {
      for (var x in this.banhos_comp) {
        if (new Date(this.banhos_comp[x].data_fim).getTime() >= new Date(event).getTime() && this.banhos_comp[x].pos != pos) {
          existdata = true;
        }
      }
      if (existdata) this.simular(this.dialogavisodata);
    }
  }

  //ao inserir data fim verifica se existe a data inicio é infiro
  verificadatafim(event, date) {
    if (event != null) {
      if (new Date(date).getTime() > new Date(event).getTime()) {
        this.simular(this.dialogavisodatafim);
      }
    }
  }

  //ao alterar componente atualiza fornecedor e unidade por defeito
  atualizardados(pos, event) {
    this.banhos_comp.find(item => item.pos == pos).id_unidade = event.value.id_unidade;
    this.banhos_comp.find(item => item.pos == pos).id_FORNECEDOR = event.value.id_FORNECEDOR;
    this.banhos_comp = this.banhos_comp.slice();
  }

  //ao alterar estado atualiza componentes
  atualizarcomp(event) {
    this.estado_comp = event.value;
    this.banhosComp(this.banho[this.i]);
  }

}