import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GT_DIC_TIPO_ACAO } from 'app/entidades/GT_DIC_TIPO_ACAO';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GTDICTIPOACAOService } from 'app/servicos/gt-dic-tipo-acao.service';

@Component({
  selector: 'app-tipo-acao',
  templateUrl: './tipo-acao.component.html',
  styleUrls: ['./tipo-acao.component.css']
})
export class TipoAcaoComponent implements OnInit {

  user: any;
  novo: boolean;
  id_depart_selected: number;
  descricao: string;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  ambito: GT_DIC_TIPO_ACAO;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;
  dialogtiposacao: boolean;

  constructor(private confirmationService: ConfirmationService, private GTDICTIPOACAOService: GTDICTIPOACAOService, private globalVar: AppGlobals,
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

    this.modoedicao = true;
    this.criar = true;
    this.apagar = true;



    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = "";
    this.modoedicao = true;
    //this.simular(this.dialog);
    this.dialogtiposacao = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new GT_DIC_TIPO_ACAO;
    if (!this.novo) depart = this.ambito;
    depart.descricao = this.descricao;


    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      this.GTDICTIPOACAOService.create(depart).subscribe(response => {
        this.listar_departs();
        //this.simular(this.closedialog);
        this.dialogtiposacao = false;
      },
        error => console.log(error));
    } else {
      depart.id_TIPO_ACAO = this.id_depart_selected;
      this.GTDICTIPOACAOService.update(depart).then(() => {
        this.listar_departs();
        //this.simular(this.closedialog);
        this.dialogtiposacao = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.GTDICTIPOACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({ id: response[x].id_TIPO_ACAO, descricao: response[x].descricao, dados: response[x] });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }



  //apagar depart
  apagardeparts() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var depart = new GT_DIC_TIPO_ACAO;
        depart = this.ambito;
        depart.descricao = this.descricao;

        this.GTDICTIPOACAOService.delete(depart.id_TIPO_ACAO).then(() => {
          this.listar_departs();
          //this.simular(this.closedialog);
          this.dialogtiposacao = false;
        });

      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.ambito = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.novo = false;
    //this.simular(this.dialog);
    this.dialogtiposacao = true;
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}