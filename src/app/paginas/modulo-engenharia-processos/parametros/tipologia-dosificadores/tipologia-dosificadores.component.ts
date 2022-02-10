import { Component, OnInit, Renderer } from '@angular/core';
import { AB_DIC_TIPO_TIPOLOGIA_DOSIFICADORES } from 'app/entidades/AB_DIC_TIPO_TIPOLOGIA_DOSIFICADORES';
import { AB_DIC_TIPO_TIPOLOGIA_DOSIFICADORES_OBJETIVOS } from 'app/entidades/AB_DIC_TIPO_TIPOLOGIA_DOSIFICADORES_OBJETIVOS';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService } from 'app/servicos/ab-dic-tipo-tipologia-dosificadores-objetivos.service';
import { ABDICTIPOTIPOLOGIADOSIFICADORESService } from 'app/servicos/ab-dic-tipo-tipologia-dosificadores.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-tipologia-dosificadores',
  templateUrl: './tipologia-dosificadores.component.html',
  styleUrls: ['./tipologia-dosificadores.component.css']
})
export class TipologiaDosificadoresComponent implements OnInit {

  user: any;
  novo: boolean;
  id_depart_selected: number;

  modoedicao: boolean;

  criar: boolean;
  dialognovo: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;
  objetivos = [];

  nome: any;
  dados: any;
  departs: any[];

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private ABDICTIPOTIPOLOGIADOSIFICADORESService: ABDICTIPOTIPOLOGIADOSIFICADORESService,
    private ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService: ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService,
    private renderer: Renderer) { }

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

    this.acesso_editar = true;
    this.acesso_apagar = true;
    this.acesso_criar = true;


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.nome = null;
    this.objetivos = [];
    this.dialognovo = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new AB_DIC_TIPO_TIPOLOGIA_DOSIFICADORES;
    if (!this.novo) depart = this.dados;

    depart.NOME = this.nome;

    depart.UTZ_ULT_MODIF = this.user;
    depart.DATA_ULT_MODIF = new Date();

    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      depart.ATIVO = true;
      this.ABDICTIPOTIPOLOGIADOSIFICADORESService.create(depart).subscribe(response => {
        this.gravarlinhas(response.ID);
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.ABDICTIPOTIPOLOGIADOSIFICADORESService.update(depart).then(() => {
        this.gravarlinhas(depart.ID);
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.ABDICTIPOTIPOLOGIADOSIFICADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].ID, nome: response[x].NOME, dados: response[x],
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
        var depart = new AB_DIC_TIPO_TIPOLOGIA_DOSIFICADORES;
        depart = this.dados;
        depart.ATIVO = false;
        depart.DATA_ANULA = new Date();
        depart.UTZ_ANULA = this.user;

        this.ABDICTIPOTIPOLOGIADOSIFICADORESService.update(depart).then(() => {
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
    this.nome = event.data.nome

    this.preencheListas(this.id_depart_selected);

    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }




  preencheListas(id) {
    this.objetivos = [];
    this.ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService.getbyID(id).subscribe(
      response => {
        for (var x in response) {
          this.objetivos.push({ id: response[x].ID, COR: response[x].COR, VALOR_MAXIMO: response[x].VALOR_MAXIMO, VALOR_MINIMO: response[x].VALOR_MINIMO, dados: response[x] });
        }
        this.objetivos = this.objetivos.slice();
      }, error => { console.log(error); });
  }

  gravarlinhas(id) {
    for (var z in this.objetivos) {
      var obj = new AB_DIC_TIPO_TIPOLOGIA_DOSIFICADORES_OBJETIVOS;
      if (this.objetivos[z].ID != null) {
        obj = this.objetivos[z].dados;
      } else {
        obj.DATA_CRIA = new Date();
        obj.UTZ_CRIA = this.user
      }

      obj.DATA_ULT_MODIF = new Date();
      obj.UTZ_ULT_MODIF = this.user

      obj.ID_TIPO_TIPOLOGIA_DOSIFICADORES = id;
      obj.VALOR_MAXIMO = this.objetivos[z].VALOR_MAXIMO;
      obj.VALOR_MINIMO = this.objetivos[z].VALOR_MINIMO;
      obj.COR = this.objetivos[z].COR;

      this.gravarlinhas2(obj);
    }
  }

  gravarlinhas2(obj) {
    this.ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService.update(obj).then(
      res => {
      },
      error => { console.log(error); })
  }

  eliminar(linha, index) {
    /*this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {*/
    if (linha.id != null) {
      this.ABDICTIPOTIPOLOGIADOSIFICADORESOBJETIVOSService.delete(linha.id).then(() => {
        this.objetivos.splice(index, 1);
        this.objetivos = this.objetivos.slice();
      },
        error => { console.log(error); });
    } else {
      this.objetivos.splice(index, 1);
      this.objetivos = this.objetivos.slice();
    }
    /* }
   });*/
  }

  adicionar_linha() {
    this.objetivos.push({ id: null, COR: '#ffffff', VALOR_MAXIMO: null, VALOR_MINIMO: null, dados: null });
    this.objetivos = this.objetivos.slice();
  }
}