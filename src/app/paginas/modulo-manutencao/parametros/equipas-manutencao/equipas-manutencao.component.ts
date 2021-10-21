import { Component, OnInit, Renderer } from '@angular/core';
import { MAN_DIC_EQUIPAS } from 'app/entidades/MAN_DIC_EQUIPAS';
import { MAN_DIC_EQUIPAS_UTILIZADORES } from 'app/entidades/MAN_DIC_EQUIPAS_UTILIZADORES';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERUTILIZADORESService } from 'app/servicos/ger-utilizadores.service';
import { MANDICEQUIPASUTILIZADORESService } from 'app/servicos/man-dic-equipas-utilizadores.service';
import { MANDICEQUIPASService } from 'app/servicos/man-dic-equipas.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-equipas-manutencao',
  templateUrl: './equipas-manutencao.component.html',
  styleUrls: ['./equipas-manutencao.component.css']
})
export class EquipasManutencaoComponent implements OnInit {

  user: any;
  utilizadores: any[];
  novo: boolean;
  id_depart_selected: number;

  departs: any[];
  modoedicao: boolean;

  criar: boolean;
  dialognovo: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;
  sourceUtilizadores: any[];
  targetUtilizadores: any[];
  nome: any;
  id_responsavel: any;
  responsaveis = [];
  dados: any;
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private renderer: Renderer, private GERUTILIZADORESService: GERUTILIZADORESService,
    private MANDICEQUIPASService: MANDICEQUIPASService, private MANDICEQUIPASUTILIZADORESService: MANDICEQUIPASUTILIZADORESService) { }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1162101criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    this.listar_responsaveis();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.nome = null;
    this.id_responsavel = null;

    this.preencheListaFunc(this.id_depart_selected);

    this.dialognovo = true;
  }


  //gravar unidade de depart
  gravar() {
    var depart = new MAN_DIC_EQUIPAS;
    if (!this.novo) depart = this.dados;
    depart.ID_RESPONSAVEL = this.id_responsavel;
    depart.NOME_EQUIPA = this.nome;


    depart.UTZ_ULT_MODIF = this.user;
    depart.DATA_ULT_MODIF = new Date();

    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      depart.ATIVO = true;
      this.MANDICEQUIPASService.create(depart).subscribe(response => {
        this.gravarlinhas(response.ID);
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.MANDICEQUIPASService.update(depart).then(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.MANDICEQUIPASService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].ID, dados: response[x], id_responsavel: response[x].ID_RESPONSAVEL, nome: response[x].NOME_EQUIPA
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }

  apagar() {
    this.dialognovo = false;
    setTimeout(() => { this.apagardados() }, 100);
  }

  //apagar zona
  apagardados() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        var depart = new MAN_DIC_EQUIPAS;
        depart = this.dados;
        depart.ATIVO = false;
        depart.DATA_ULT_MODIF = new Date();
        depart.UTZ_ULT_MODIF = this.user;

        this.MANDICEQUIPASService.update(depart).then(() => {
          this.listar_departs();
          this.dialognovo = false;
        });

      }, reject: () => {
        this.dialognovo = true;
      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.dados = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.nome = event.data.nome;
    this.id_responsavel = event.data.id_responsavel;

    this.preencheListaFunc(this.id_depart_selected);

    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  onMoveToTarget(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        var perf = new MAN_DIC_EQUIPAS_UTILIZADORES;
        perf.ID_UTILIZADOR = e.items[x].id_UTZ;
        perf.ID_EQUIPA = this.id_depart_selected;
        this.MANDICEQUIPASUTILIZADORESService.create(perf).subscribe(
          res => {
            if (x == e.items.length) {
              this.preencheListaFunc(this.id_depart_selected);
            }
          },
          error => { console.log(error); });
      }
    }

  }
  //ao mover para utilizadores 
  onMoveToSource(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        this.MANDICEQUIPASUTILIZADORESService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            this.preencheListaFunc(this.id_depart_selected);
          }
        });
      }
    }
  }


  getutilizadores() {
    this.sourceUtilizadores = [];

    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.sourceUtilizadores.push({ nome: response[x].nome_UTILIZADOR, id: response[x].id_UTILIZADOR });

        }
        this.sourceUtilizadores = this.sourceUtilizadores.slice();

      },
      error => console.log(error));
  }

  preencheListaFunc(id) {
    //carrega lista funcionários
    this.sourceUtilizadores = [];
    this.targetUtilizadores = [];
    this.MANDICEQUIPASUTILIZADORESService.getUtilizadores(id).subscribe(
      response => {
        for (var x in response) {
          this.sourceUtilizadores.push({ nome: response[x].nome_UTILIZADOR, id_UTZ: response[x].id_UTILIZADOR });
        }
        this.sourceUtilizadores = this.sourceUtilizadores.slice();
      }, error => { console.log(error); });

    this.MANDICEQUIPASUTILIZADORESService.getbyidequipa(id).subscribe(
      response => {
        for (var x in response) {

          this.targetUtilizadores.push({ id: response[x][0].id, nome: response[x][1], id_UTZ: response[x][2] });

        }
        this.targetUtilizadores = this.targetUtilizadores.slice();
      },
      error => console.log(error));

  }



  gravarlinhas(id) {
    for (var z in this.targetUtilizadores) {
      var perf = new MAN_DIC_EQUIPAS_UTILIZADORES;
      perf.ID_UTILIZADOR = this.targetUtilizadores[z].id_UTZ;
      perf.ID_EQUIPA = id;
      this.MANDICEQUIPASUTILIZADORESService.create(perf).subscribe(
        res => {
        },
        error => { console.log(error); })
    }
  }

  //listar os dados na tabela
  listar_responsaveis() {
    this.responsaveis = [];
    this.responsaveis.push({
      value: '', label: 'Selecionar Responsável'
    });
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.responsaveis.push({
            value: response[x].id_UTILIZADOR, label: response[x].nome_UTILIZADOR
          });
        }
        this.responsaveis = this.responsaveis.slice();
      },
      error => console.log(error));
  }

}
