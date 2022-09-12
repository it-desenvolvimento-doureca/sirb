import { Component, OnInit, Renderer } from '@angular/core';
import { PR_DIC_ALERTAS_DESCARGA } from 'app/entidades/PR_DIC_ALERTAS_DESCARGA';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICALERTASDESCARGAService } from 'app/servicos/pr-dic-alertas-descarga.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-alertas-descarga',
  templateUrl: './alertas-descarga.component.html',
  styleUrls: ['./alertas-descarga.component.css']
})
export class AlertasDescargaComponent implements OnInit {

  user: any;
  novo: boolean;
  id_depart_selected: number;
  descricao: string;
  tipoAlertaDescarga: PR_DIC_ALERTAS_DESCARGA;
  departs: any[];
  dialogtipoAlertaDescarga: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;

  constructor(private confirmationService: ConfirmationService, private PRDICALERTASDESCARGAService: PRDICALERTASDESCARGAService, private globalVar: AppGlobals,
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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9217editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9217apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9217criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = "";
    //this.simular(this.dialog);
    this.dialogtipoAlertaDescarga = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new PR_DIC_ALERTAS_DESCARGA;
    if (!this.novo) depart = this.tipoAlertaDescarga;
    depart.DESCRICAO = this.descricao;


    depart.UTZ_MODIF = this.user;
    depart.DATA_MODIF = new Date();

    if (this.novo) {
      depart.ATIVO = true;
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      this.PRDICALERTASDESCARGAService.create(depart).subscribe(response => {
        this.listar_departs();
        //this.simular(this.closedialog);
        this.dialogtipoAlertaDescarga = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.PRDICALERTASDESCARGAService.update(depart).subscribe(() => {
        this.listar_departs();
        //this.simular(this.closedialog);
        this.dialogtipoAlertaDescarga = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.PRDICALERTASDESCARGAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({ id: response[x].ID, descricao: response[x].DESCRICAO, dados: response[x] });
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
        var depart = new PR_DIC_ALERTAS_DESCARGA;
        depart = this.tipoAlertaDescarga;

        depart.ATIVO = false;
        depart.UTZ_ANULA = this.user;
        depart.DATA_ANULA = new Date();
        this.PRDICALERTASDESCARGAService.update(depart).subscribe(() => {
          this.listar_departs();
          //this.simular(this.closedialog);
          this.dialogtipoAlertaDescarga = false;
        });



      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.tipoAlertaDescarga = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.novo = false;
    //this.simular(this.dialog);
    this.dialogtipoAlertaDescarga = true;
  }


}