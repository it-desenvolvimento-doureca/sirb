import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { PRDICTIPOLOGIAENSAIOService } from 'app/servicos/pr-dic-tipologia-ensaio.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PR_DIC_TIPOLOGIA_ENSAIO } from 'app/entidades/PR_DIC_TIPOLOGIA_ENSAIO';

@Component({
  selector: 'app-tipologia-ensaio',
  templateUrl: './tipologia-ensaio.component.html',
  styleUrls: ['./tipologia-ensaio.component.css']
})
export class TipologiaEnsaioComponent implements OnInit {
  user: any;
  novo: boolean;
  id_depart_selected: number;
  descricao: string;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  tipologia: PR_DIC_TIPOLOGIA_ENSAIO;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;

  constructor(private confirmationService: ConfirmationService, private PRDICTIPOLOGIAENSAIOService: PRDICTIPOLOGIAENSAIOService, private globalVar: AppGlobals,
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
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    var depart = new PR_DIC_TIPOLOGIA_ENSAIO;
    if (!this.novo) depart = this.tipologia;
    depart.descricao = this.descricao;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      this.PRDICTIPOLOGIAENSAIOService.create(depart).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      depart.id_TIPOLOGIA_ENSAIO = this.id_depart_selected;
      this.PRDICTIPOLOGIAENSAIOService.update(depart).then(() => {
        this.listar_departs();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.PRDICTIPOLOGIAENSAIOService.getAll().subscribe(
      response => {
        for (var x in response) {


          this.departs.push({ id: response[x].id_TIPOLOGIA_ENSAIO, descricao: response[x].descricao, dados: response[x] });
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
        var depart = new PR_DIC_TIPOLOGIA_ENSAIO;
        depart = this.tipologia;
        depart.descricao = this.descricao;

        this.PRDICTIPOLOGIAENSAIOService.delete(depart.id_TIPOLOGIA_ENSAIO).then(() => {
          this.listar_departs();
          this.simular(this.closedialog);
        });

      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.tipologia = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.novo = false;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}