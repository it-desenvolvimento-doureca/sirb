import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ABDICLINHAService } from 'app/servicos/ab-dic-linha.service';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { PRDICVALIDACAOBASTIDORService } from 'app/servicos/pr-dic-validacao-bastidor.service';
import { PRGESTAOBARRASREFERENCIASService } from 'app/servicos/pr-gestao-barras-referencias.service';
import { PRGESTAOBARRASService } from 'app/servicos/pr-gestao-barras.service';
import { PR_GESTAO_BARRAS } from 'app/entidades/PR_GESTAO_BARRAS';
import { PR_GESTAO_BARRAS_REFERENCIAS } from 'app/entidades/PR_GESTAO_BARRAS_REFERENCIAS';

@Component({
  selector: 'app-gestao-barras',
  templateUrl: './gestao-barras.component.html',
  styleUrls: ['./gestao-barras.component.css']
})
export class GestaoBarrasComponent implements OnInit {
  user: any;
  disEditar: any;
  acesso_apagar: any;
  acesso_criar: any;
  acesso_duplicar: any;
  btcriar: boolean;
  modoedicao: boolean;
  btGravar: boolean;
  btCancelar: boolean;
  btApagar: boolean;
  btDuplicar: boolean = false;
  btAdicionarlinha = false;
  caminho: any;
  datamodif: string;
  horamodif: string;
  barras: any[] = [];
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputarsemalteracoes') inputarsemalteracoes: ElementRef;
  linhas: any;
  estados: any[];
  btvoltar: boolean = true;
  bteditar: boolean = true;
  displayLoading;
  disGravar;
  disCancelar;
  selected_barra;
  artigos: any = [];
  filteredItems: any;
  dados_barras: any = [];
  linhas_atualizar: any = [];
  disCriar: boolean;
  user_modif: any;
  loadingData: boolean;

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService,
    private renderer: Renderer, private router: Router, private location: Location, private route: ActivatedRoute,
    private PRDICVALIDACAOBASTIDORService: PRDICVALIDACAOBASTIDORService, private PRGESTAOBARRASREFERENCIASService: PRGESTAOBARRASREFERENCIASService,
    private PRGESTAOBARRASService: PRGESTAOBARRASService,
    private ABDICCOMPONENTEService: ABDICCOMPONENTEService) { }

  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setcriar(false);

    this.disEditar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node911editar");
    this.acesso_apagar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node911apagar");
    this.disCriar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node911criar");
    this.acesso_duplicar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node911duplicar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    this.caminho = (urlarray[0]) ? urlarray[0] : urlarray;


    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.btcriar = true;
        this.modoedicao = true;
        this.btGravar = true;
        this.btCancelar = true;
        this.btApagar = true;
        this.btDuplicar = false;
        this.bteditar = true;
        //this.btFechar = true;

      } else if (urlarray[1].match("novo")) {

      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.btcriar = false;
        this.btApagar = false;
        this.bteditar = true;
        //this.btFechar = true;
      }

    }



    this.carregaEstados();
    this.preenchelinhas();
    this.listar();
  }

  carregaEstados() {
    this.estados = [];
    this.PRDICVALIDACAOBASTIDORService.getAll().subscribe(
      response => {
        this.estados.push({
          value: null, cor: '', label: ' - ', descricao: ''
        });
        for (var x in response) {
          this.estados.push({
            value: response[x].id_VALIDACAO_BASTIDOR, cor: response[x].cor, label: response[x].simbolo, descricao: response[x].descricao
          });
        }
        this.estados = this.estados.slice();
      },
      error => console.log(error));
  }

  getDescricao(value) {
    return this.estados.find(item => item.value == value).descricao;
  }

  preenchelinhas() {
    //preenche combobox linhas
    this.ABDICLINHAService.getAll().subscribe(
      response => {
        this.linhas = [];
        this.linhas.push({ label: "--", value: null });
        for (var x in response) {
          this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA, cor: response[x].cor });
        }

        this.linhas = this.linhas.slice();
        this.inicia();
      },
      error => { console.log(error); this.inicia(); });
  }

  listar() {

    this.ABDICCOMPONENTEService.getComponentesProducao().subscribe(
      response => {
        this.artigos = [];
        //this.artigos.push({ value: null, label: 'Selecionar Artigo' });

        for (var x in response) {
          this.artigos.push({
            value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, DESIGN: response[x].PRODES1
          });
        }
        this.artigos = this.artigos.slice();
        //this.carregatabela()
      },
      error => { console.log(error); /*this.carregatabela()*/ });


  }


  inicia() {


    this.barras = [];
    this.dados_barras = [];
    this.loadingData = true;
    this.PRGESTAOBARRASService.GET_GESTAO_BARRAS([]).subscribe(
      response => {
        // console.log(response)
        for (var x in response) {
          this.datamodif = this.formatDate(response[x][21]);
          this.horamodif = new Date(response[x][21]).toTimeString().slice(0, 8);
          this.user_modif = response[x][22];

          this.inserelinha(response, x)
        }

        //this.assignCopy();
        this.barras = this.dados_barras.slice();
        this.atualizar_filtro_ref();
        this.loadingData = false;
      },
      error => { console.log(error); this.loadingData = false; });

  }

  inserelinha(response, x) {
    var referencia_campo = { value: response[x][16], label: response[x][16] + " - " + response[x][17], DESIGN: response[x][17] };
    if (!this.dados_barras.find(item => item.id == response[x][0])) {

      this.dados_barras.push({
        id: response[x][0],
        //cor_fundo: (this.isOdd(parseInt(x))) ? '#FFE699' : '#BDD7EE',
        ref_BASTIDOR: response[x][1],
        ref_BASTIDOR_id: response[x][1] + '_' + ('00000000000000' + response[x][0]).substring(('00000000000000' + response[x][0]).length - 10),
        id_linha: response[x][2],
        nome_linha: (this.linhas.find(item => item.value == response[x][2])) ? 'Linha ' + response[x][2] : this.linhas.find(item => item.value == response[x][2]).label,
        cor_linha: '',//this.linhas.find(item => item.value == 1).cor,
        plano_BASTIDOR: response[x][3],
        quant_TOTAL_BAST: response[x][4],
        quant_BAST_MONTADOS: response[x][5],
        quant_BAST_DESMONTADOS: response[x][6],
        data_CRIA: response[x][7],
        id_ORIGEM: response[x][23],
        referencias: [{
          id: response[x][10],
          n_PECAS_BASTIDOR: response[x][11],
          n_PECAS_RACK: response[x][12],
          rouba_CORRENTES: response[x][13],
          bastidor_LINHA_NOVA: response[x][14],
          peca_TIPO: response[x][15],
          referencia: response[x][16],
          design_REFERENCIA: response[x][17],
          observacoes: response[x][18],
          validacao_BASTIDOR: response[x][19],
          cor_estado: response[x][20],
          referencia_campo: (response[x][16] != null) ? referencia_campo : null,
          existe_REF: response[x][24],
          filteredreferencias: []
        }]
      });
    } else {
      var linha = this.dados_barras.find(item => item.id == response[x][0]);
      linha.referencias.push({
        id: response[x][10],
        n_PECAS_BASTIDOR: response[x][11],
        n_PECAS_RACK: response[x][12],
        rouba_CORRENTES: response[x][13],
        bastidor_LINHA_NOVA: response[x][14],
        peca_TIPO: response[x][15],
        referencia: response[x][16],
        design_REFERENCIA: response[x][17],
        observacoes: response[x][18],
        validacao_BASTIDOR: response[x][19],
        cor_estado: response[x][20],
        existe_REF: response[x][24],
        referencia_campo: (response[x][16] != null) ? referencia_campo : null,
        filteredreferencias: []
      });
    }
  }

  isOdd(num) { return num % 2; }

  alteracorlinha(event, index) {
    if (event.value.id != null) {
      // this.barras[index].cor_linha = this.linhas.find(item => item.value == event.value).cor;
    }
  }

  alteracorestado(event, id, index_ref) {
    var index_barra = this.barras.findIndex(item => item.id == id);
    if (event.value != null) {
      this.barras[index_barra].referencias[index_ref].cor_estado = this.estados.find(item => item.value == event.value).cor;
    } else {
      this.barras[index_barra].referencias[index_ref].cor_estado = '';
    }
  }

  linhas_update(id) {
    if (!this.linhas_atualizar.find(item => item == id)) {
      this.linhas_atualizar.push(id);
    }
  }

  gravar() {
    //console.log(this.dados_barras)
    if (this.linhas_atualizar.length > 0) {
      for (var x in this.linhas_atualizar) {
        var linha = this.dados_barras.find(item => item.id == this.linhas_atualizar[x])
        //console.log(linha)

        var depart = new PR_GESTAO_BARRAS;
        depart.ref_BASTIDOR = linha.ref_BASTIDOR;
        depart.data_CRIA = new Date(linha.data_CRIA);
        depart.id_GESTAO_BARRAS = linha.id;
        depart.id_LINHA = linha.id_linha;
        depart.plano_BASTIDOR = linha.plano_BASTIDOR;
        depart.quant_BAST_DESMONTADOS = linha.quant_BAST_DESMONTADOS;
        depart.quant_BAST_MONTADOS = linha.quant_BAST_MONTADOS;
        depart.quant_TOTAL_BAST = linha.quant_TOTAL_BAST;
        depart.id_ORIGEM = linha.id_ORIGEM;


        depart.utz_MODIF = this.user;
        depart.data_MODIF = new Date();
        this.gravar_cab(depart);

        for (var y in linha.referencias) {
          var referencias = new PR_GESTAO_BARRAS_REFERENCIAS;
          referencias.bastidor_LINHA_NOVA = linha.referencias[y].bastidor_LINHA_NOVA;
          referencias.design_REFERENCIA = linha.referencias[y].design_REFERENCIA;
          referencias.id_GESTAO_BARRAS = linha.id;

          referencias.n_PECAS_BASTIDOR = linha.referencias[y].n_PECAS_BASTIDOR;
          referencias.n_PECAS_RACK = linha.referencias[y].n_PECAS_RACK;
          referencias.observacoes = linha.referencias[y].observacoes;
          referencias.peca_TIPO = linha.referencias[y].peca_TIPO;
          referencias.referencia = linha.referencias[y].referencia;
          referencias.rouba_CORRENTES = linha.referencias[y].rouba_CORRENTES;
          referencias.validacao_BASTIDOR = linha.referencias[y].validacao_BASTIDOR;
          if (linha.referencias[y].id == null) {
            this.create_linha(referencias, parseInt(y) + 1, linha.referencias.length);
          } else {
            referencias.id_GESTAO_BARRAS_REFERENCIAS = linha.referencias[y].id;
            this.update_linha(referencias, parseInt(y) + 1, linha.referencias.length);
          }
        }
      }
    } else {
      this.simular(this.inputarsemalteracoes)
    }
  }

  gravar_cab(depart) {
    this.PRGESTAOBARRASService.update(depart).then(() => {

    }, error => {
      console.log(error);
      this.router.navigate([this.caminho]);

    });
  }

  create_linha(referencias, row, total) {
    this.PRGESTAOBARRASREFERENCIASService.create(referencias).subscribe(response => {
      if (row == total) {
        this.simular(this.inputgravou);
        this.router.navigate([this.caminho]);
      }
    },
      error => {
        console.log(error);
        if (row == total) {
          this.simular(this.inputerro);
          this.router.navigate([this.caminho]);
        }
      });
  }

  update_linha(referencias, row, total) {
    this.PRGESTAOBARRASREFERENCIASService.update(referencias).then(() => {
      if (row == total) {
        this.simular(this.inputgravou);
        this.router.navigate([this.caminho]);
      }
    },
      error => {
        console.log(error);
        if (row == total) {
          this.simular(this.inputerro);
          this.router.navigate([this.caminho]);
        }
      });
  }

  selectlinha() {
    this.btDuplicar = true;
    this.btAdicionarlinha = true;
  }

  onRowSelect(event) {
    if (this.modoedicao) {
      this.btDuplicar = true;
      this.btAdicionarlinha = true;
    }
  }

  onRowUnselect(event) {
    this.btDuplicar = false;
    this.btAdicionarlinha = false;
  }

  duplicar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende duplicar?',
      header: 'Duplicar Registo',
      icon: 'fa fa-files-o',
      accept: () => {


        this.PRGESTAOBARRASService.DUPLICAR_GESTAO_BARRAS([{ ID: this.selected_barra.id, ID_USER: this.user }]).subscribe(
          response => {
            //console.log(response)
            this.btDuplicar = false;
            this.btAdicionarlinha = false;
            this.selected_barra = null;
            for (var x in response) {
              this.datamodif = this.formatDate(response[x][21]);
              this.horamodif = new Date(response[x][21]).toTimeString().slice(0, 8);
              this.user_modif = response[x][22];

              this.inserelinha(response, x)
            }
            this.barras = this.dados_barras.slice();
            this.atualizar_filtro_ref();
            this.ordernar(this.barras);
          },
          error => {
            console.log(error);
            this.btDuplicar = false;
            this.btAdicionarlinha = false;
            this.selected_barra = null;
            this.simular(this.inputerro);
          });
      }
    });
  }

  ordernar(array) {
    array.sort((n1, n2) => {
      if (n1.ref_BASTIDOR_id > n2.ref_BASTIDOR_id) {
        return 1;
      }

      if (n1.ref_BASTIDOR_id < n2.ref_BASTIDOR_id) {
        return -1;
      }

      return 0;
    });
  }

  removerlinha(id, index_ref) {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Apagar?',
      header: 'Apagar Registo',
      icon: 'fa fa-trash',
      accept: () => {
        var index_barra = this.barras.findIndex(item => item.id == id);

        if (this.barras[index_barra].referencias[index_ref].id != null) {
          this.PRGESTAOBARRASREFERENCIASService.delete(this.barras[index_barra].referencias[index_ref].id).then(() => {
            this.barras[index_barra].referencias.splice(index_ref, 1);
            if (this.barras[index_barra].referencias.length == 0) {
              //this.adicionarlinha(index_barra);
            }
            this.atualizar_filtro_ref();
          }, error => {
            console.log(error);
            this.router.navigate([this.caminho]);
          }
          );
        } else {
          this.barras[index_barra].referencias.splice(index_ref, 1);
          if (this.barras[index_barra].referencias.length == 0) {
            //this.adicionarlinha(index_barra);
          }
          this.atualizar_filtro_ref();
        }
      }
    });

  }

  removerlinha_rack(id, id_ORIGEM) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Apagar Linha?',
      header: 'Apagar Registo',
      icon: 'fa fa-trash',
      accept: () => {
        var index_linha = this.barras.findIndex(item => item.id == id);
        if (id_ORIGEM != null) {
          this.PRGESTAOBARRASService.delete(id).then(() => {
            this.barras.splice(index_linha, 1);
            this.barras = this.barras.slice();
            this.atualizar_filtro_ref();
          }, error => {
            console.log(error);
            this.router.navigate([this.caminho]);
          }
          );

        }
      }
    });
  }


  adicionarlinha(index) {
    //var index = this.barras.findIndex(item => item.id == id);
    if (index == null) {
      //index = this.selected_barra;
      index = this.barras.findIndex(item => item.id == this.selected_barra.id);
    }

    this.barras[index].referencias.push({
      id: null,
      n_PECAS_BASTIDOR: null,
      n_PECAS_RACK: null,
      rouba_CORRENTES: false,
      bastidor_LINHA_NOVA: false,
      peca_TIPO: false,
      referencia: null,
      design_REFERENCIA: null,
      observacoes: null,
      validacao_BASTIDOR: null,
      cor_estado: null, referencia_campo: null,
      filteredreferencias: []
    })
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


  Cancelar() {
    this.location.back();
  }

  backClicked() {
    //this.location.back();
    this.router.navigate([this.caminho]);
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  edita() {

    var back;
    var sub2 = this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        back = params['redirect'] || 0;
      });

    if (!this.disEditar) {
      if (back != 0) {
        this.router.navigate([this.caminho + '/editar'], { queryParams: { redirect: back } });
      } else {
        this.router.navigate([this.caminho + '/editar']);
      }

    }
  }


  filterRef(event, id, index_ref) {
    var index = this.barras.findIndex(item => item.id == id);
    this.barras[index].referencias[index_ref].existe_REF = false;
    this.barras[index].referencias[index_ref].filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect(event, id, index_ref) {
    var index = this.barras.findIndex(item => item.id == id);
    this.barras[index].referencias[index_ref].design_REFERENCIA = "";
    this.barras[index].referencias[index_ref].referencia = null;
  }

  filterSelect(event, id, index_ref) {
    var index = this.barras.findIndex(item => item.id == id);
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.barras[index].referencias[index_ref].referencia = event.value;
      this.barras[index].referencias[index_ref].design_REFERENCIA = tab.DESIGN;
    } else {
      this.barras[index].referencias[index_ref].design_REFERENCIA = "";
      this.barras[index].referencias[index_ref].referencia = null;
    }
    this.barras = this.barras.slice();
    this.atualizar_filtro_ref();
  }

  atualizar_filtro_ref() {
    for (var x in this.barras) {
      this.barras[x].filtro_refs = "";
      for (var y in this.barras[x].referencias) {
        this.barras[x].filtro_refs += ", " + this.barras[x].referencias[y].referencia + " - " + this.barras[x].referencias[y].design_REFERENCIA;
      }
    }
  }

  filterItem(value) {
    if (!value) {
      this.assignCopy();

    } else {

    }
    this.filteredItems = Object.assign([], this.dados_barras).filter(
      item => item.ref_BASTIDOR.toLowerCase().indexOf(value.toLowerCase()) > -1
    );

    this.barras = this.filteredItems;
  }

  assignCopy() {
    this.filteredItems = Object.assign([], this.dados_barras);
    this.barras = this.filteredItems;

  }

}
