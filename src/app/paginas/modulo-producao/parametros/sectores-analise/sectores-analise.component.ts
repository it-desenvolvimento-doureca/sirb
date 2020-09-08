import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { PRDICSECTORESANALISEService } from 'app/servicos/pr-dic-sectores-analise.service';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PR_DIC_SECTORES_ANALISE } from 'app/entidades/PR_DIC_SECTORES_ANALISE';

@Component({
  selector: 'app-sectores-analise',
  templateUrl: './sectores-analise.component.html',
  styleUrls: ['./sectores-analise.component.css']
})
export class SectoresAnaliseComponent implements OnInit {
  user: any;
  sectores: any[];
  novo: boolean;
  id_depart_selected: number;
  descricao: string;
  cod_SECTOR: any;
  localizacao;
  localizacoes = [{ value: '', label: 'Selecionar Localização' }, { value: 1, label: 'Formariz' }, { value: 2, label: 'São Bento' }];
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  sector_analise: PR_DIC_SECTORES_ANALISE;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;

  constructor(private confirmationService: ConfirmationService, private RHSECTORESService: RHSECTORESService, private globalVar: AppGlobals,
    private PRDICSECTORESANALISEService: PRDICSECTORESANALISEService, private renderer: Renderer) { }

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

    //preenche combobox utilizadores
    this.RHSECTORESService.getAll().subscribe(
      response => {
        this.sectores = [];
        this.sectores.push({ label: "Sel. Sector", value: "" });
        for (var x in response) {
          this.sectores.push({ label: response[x][0].des_SECTOR, value: response[x][0].cod_SECTOR });
        }
        this.sectores = this.sectores.slice();
        this.listar_departs();
      },
      error => console.log(error));
  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = "";
    this.cod_SECTOR = null;
    this.localizacao = null;
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    var depart = new PR_DIC_SECTORES_ANALISE;
    if (!this.novo) depart = this.sector_analise;
    depart.descricao = this.descricao;
    depart.cod_SECTOR = this.cod_SECTOR;
    depart.localizacao = this.localizacao;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      this.PRDICSECTORESANALISEService.create(depart).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      depart.id_SECTOR_ANALISE = this.id_depart_selected;
      this.PRDICSECTORESANALISEService.update(depart).then(() => {
        this.listar_departs();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.PRDICSECTORESANALISEService.getAll().subscribe(
      response => {
        for (var x in response) {
          var des_SECTOR = "";
          var des_localizacao = "";

          if (response[x].cod_SECTOR != null) des_SECTOR = this.sectores.find(item => item.value == response[x].cod_SECTOR).label;
          if (response[x].localizacao != null) des_localizacao = this.localizacoes.find(item => item.value == response[x].localizacao).label;

          this.departs.push({
            id: response[x].id_SECTOR_ANALISE, cod_SECTOR: response[x].cod_SECTOR, localizacao: response[x].localizacao,
            descricao: response[x].descricao, sector: des_SECTOR, dados: response[x], local: des_localizacao
          });
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
        var depart = new PR_DIC_SECTORES_ANALISE;
        depart = this.sector_analise;
        depart.descricao = this.descricao;
        depart.cod_SECTOR = this.cod_SECTOR;

        this.PRDICSECTORESANALISEService.delete(depart.id_SECTOR_ANALISE).then(() => {
          this.listar_departs();
          this.simular(this.closedialog);
        });

      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.sector_analise = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.cod_SECTOR = event.data.cod_SECTOR;
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