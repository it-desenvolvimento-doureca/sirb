import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { PA_DIC_AMBITOS } from 'app/entidades/PA_DIC_AMBITOS';
import { PADICAMBITOSService } from 'app/servicos/pa-dic-ambitos.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';

@Component({
  selector: 'app-ambitos',
  templateUrl: './ambitos.component.html',
  styleUrls: ['./ambitos.component.css']
})
export class AmbitosComponent implements OnInit {
  user: any;
  novo: boolean;
  id_depart_selected: number;
  descricao: string;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  ambito: PA_DIC_AMBITOS;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;
  dialogambito: boolean;

  constructor(private confirmationService: ConfirmationService, private PADICAMBITOSService: PADICAMBITOSService, private globalVar: AppGlobals,
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
    this.dialogambito = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new PA_DIC_AMBITOS;
    if (!this.novo) depart = this.ambito;
    depart.descricao = this.descricao;
    depart.editavel = true;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      this.PADICAMBITOSService.create(depart).subscribe(response => {
        this.listar_departs();
        //this.simular(this.closedialog);
        this.dialogambito = false;
      },
        error => console.log(error));
    } else {
      depart.id_AMBITO = this.id_depart_selected;
      this.PADICAMBITOSService.update(depart).then(() => {
        this.listar_departs();
        //this.simular(this.closedialog);
        this.dialogambito = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.PADICAMBITOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({ id: response[x].id_AMBITO, editavel: response[x].editavel, descricao: response[x].descricao, dados: response[x] });
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
        var depart = new PA_DIC_AMBITOS;
        depart = this.ambito;
        depart.descricao = this.descricao;

        this.PADICAMBITOSService.delete(depart.id_AMBITO).then(() => {
          this.listar_departs();
          //this.simular(this.closedialog);
          this.dialogambito = false;
        });

      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.ambito = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.modoedicao = event.data.editavel;
    this.novo = false;
    //this.simular(this.dialog);
    this.dialogambito = true;
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}