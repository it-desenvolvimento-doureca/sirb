import { Component, OnInit, Renderer } from '@angular/core';
import { MAN_DIC_TIPOLOGIA_AVARIA } from 'app/entidades/MAN_DIC_TIPOLOGIA_AVARIA';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { MANDICTIPOLOGIAAVARIAService } from 'app/servicos/man-dic-tipologia-avaria.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-tipologia-avaria',
  templateUrl: './tipologia-avaria.component.html',
  styleUrls: ['./tipologia-avaria.component.css']
})
export class TipologiaAvariaComponent implements OnInit {

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
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private renderer: Renderer,
    private MANDICTIPOLOGIAAVARIAService: MANDICTIPOLOGIAAVARIAService) { }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1167102editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1167102apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1167102criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();

  }



  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.id = null;
    this.descricao = null;
    this.dialognovo = true;
  }



  gravar() {
    var depart = new MAN_DIC_TIPOLOGIA_AVARIA;
    if (!this.novo) depart = this.dados;
    depart.ID = this.id;
    depart.DESCRICAO = this.descricao;


    depart.UTZ_ULT_MODIF = this.user;
    depart.DATA_ULT_MODIF = new Date();
    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      depart.ATIVO = true;
      this.MANDICTIPOLOGIAAVARIAService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.MANDICTIPOLOGIAAVARIAService.update(depart).then(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.MANDICTIPOLOGIAAVARIAService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.departs.push({
            id: response[x].ID, dados: response[x], descricao: response[x].DESCRICAO
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
        var depart = new MAN_DIC_TIPOLOGIA_AVARIA;
        depart = this.dados;
        depart.ATIVO = false;
        depart.DATA_ULT_MODIF = new Date();
        depart.UTZ_ULT_MODIF = this.user;

        this.MANDICTIPOLOGIAAVARIAService.update(depart).then(() => {
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
