import { Component, OnInit, Renderer } from '@angular/core';
import { MAN_DIC_EDIFICIOS } from 'app/entidades/MAN_DIC_EDIFICIOS';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERLOCAISService } from 'app/servicos/ger-locais.service';
import { MANDICEDIFICIOSService } from 'app/servicos/man-dic-edificios.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-edificios',
  templateUrl: './edificios.component.html',
  styleUrls: ['./edificios.component.css']
})
export class EdificiosComponent implements OnInit {

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


  dados: any;
  descricao: any;
  id: any;
  unidade: number;
  locais: any[];
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private renderer: Renderer,
    private GERLOCAISService: GERLOCAISService,
    private MANDICEDIFICIOSService: MANDICEDIFICIOSService) { }

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

    this.listalocais();

    //preenche combobox linhas

  }

  //listar Locais
  listalocais() {
    this.locais = [];
    this.GERLOCAISService.getAll().subscribe(
      response => {
        this.locais.push({ value: "", label: "Selecionar Local" });
        for (var x in response) {
          this.locais.push({ value: response[x].id, label: response[x].descricao });
        }
        this.locais = this.locais.slice();
        this.listar_departs();
      },
      error => { this.listar_departs(); console.log(error); });
  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.id = null;
    this.descricao = null;
    this.dialognovo = true;
  }


  //gravar unidade de depart
  gravar() {
    var depart = new MAN_DIC_EDIFICIOS;
    if (!this.novo) depart = this.dados;
    depart.ID = this.id;
    depart.DESCRICAO = this.descricao;
    depart.UNIDADE = this.unidade;


    depart.UTZ_ULT_MODIF = this.user;
    depart.DATA_ULT_MODIF = new Date();

    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      depart.ATIVO = true;
      this.MANDICEDIFICIOSService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.MANDICEDIFICIOSService.update(depart).then(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.MANDICEDIFICIOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          var unidade = "";
          if (this.locais.find(item => item.value == response[x].UNIDADE)) {
            unidade = this.locais.find(item => item.value == response[x].UNIDADE).label;
          }
          this.departs.push({
            id: response[x].ID, dados: response[x], descricao: response[x].DESCRICAO,
            unidade: unidade
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


  apagardados() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        var depart = new MAN_DIC_EDIFICIOS;
        depart = this.dados;
        depart.ATIVO = false;
        depart.DATA_ULT_MODIF = new Date();
        depart.UTZ_ULT_MODIF = this.user;

        this.MANDICEDIFICIOSService.update(depart).then(() => {
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
    this.id = event.data.id;
    this.descricao = event.data.descricao;
    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }





}
