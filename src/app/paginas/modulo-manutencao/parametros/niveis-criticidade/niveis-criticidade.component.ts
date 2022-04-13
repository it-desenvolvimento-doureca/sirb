import { Component, OnInit, Renderer } from '@angular/core';
import { MAN_DIC_NIVEIS_CRITICIDADE } from 'app/entidades/MAN_DIC_NIVEIS_CRITICIDADE';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { MANDICNIVEISCRITICIDADEService } from 'app/servicos/man-dic-niveis-criticidade.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-niveis-criticidade',
  templateUrl: './niveis-criticidade.component.html',
  styleUrls: ['./niveis-criticidade.component.css']
})
export class NiveisCriticidadeComponent implements OnInit {
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
  nivel: number;
  num_existe: boolean;
  class_numexiste: string;
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private renderer: Renderer,
    private MANDICNIVEISCRITICIDADEService: MANDICNIVEISCRITICIDADEService) { }

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

  }



  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.id = null;
    this.descricao = null;
    this.num_existe = false;
    this.class_numexiste = "";
    this.dialognovo = true;
  }


  //gravar nivel de depart
  gravar() {
    this.MANDICNIVEISCRITICIDADEService.getbyNIVEL(this.nivel).subscribe(
      response => {
        var encontrou = false;
        for (var x in response) {

          if (this.novo) {
            encontrou = true;
          } else if (this.id != response[x].ID) {
            encontrou = true;
          }

        }

        if (encontrou) {
          this.num_existe = true;
          this.class_numexiste = "num_existe";
        } else {
          this.gravar2();
        }
      },
      error => console.log(error));

  }


  gravar2() {
    var depart = new MAN_DIC_NIVEIS_CRITICIDADE;
    if (!this.novo) depart = this.dados;
    depart.ID = this.id;
    depart.DESCRICAO = this.descricao;
    depart.NIVEL = this.nivel;


    depart.UTZ_ULT_MODIF = this.user;
    depart.DATA_ULT_MODIF = new Date();
    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      depart.ATIVO = true;
      this.MANDICNIVEISCRITICIDADEService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.MANDICNIVEISCRITICIDADEService.update(depart).then(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.MANDICNIVEISCRITICIDADEService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.departs.push({
            id: response[x].ID, dados: response[x], descricao: response[x].DESCRICAO,
            nivel: response[x].NIVEL
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
        var depart = new MAN_DIC_NIVEIS_CRITICIDADE;
        depart = this.dados;
        depart.ATIVO = false;
        depart.DATA_ULT_MODIF = new Date();
        depart.UTZ_ULT_MODIF = this.user;

        this.MANDICNIVEISCRITICIDADEService.update(depart).then(() => {
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
    this.nivel = event.data.nivel;
    this.novo = false;    
    this.num_existe = false;
    this.class_numexiste = "";
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }





}
