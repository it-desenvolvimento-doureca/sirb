import { Component, OnInit, ElementRef, ViewChild, Renderer } from '@angular/core';
import { GER_LOCAIS } from 'app/entidades/GER_LOCAIS';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERLOCAISService } from 'app/servicos/ger-locais.service';

@Component({
  selector: 'app-locais',
  templateUrl: './locais.component.html',
  styleUrls: ['./locais.component.css']
})
export class LocaisComponent implements OnInit {
  departs: any[];
  novo: boolean;
  cor_depart: string;
  nome_depart: string;
  id_depart_selected: number;
  novadepart: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  descricao: string;
  morada: string;
  modoedicao: boolean;
  criar: boolean;
  apagar: boolean;
  departamento: GER_LOCAIS;
  user: any;

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private GERLOCAISService: GERLOCAISService, private renderer: Renderer) { }
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

    this.modoedicao = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node191editar");
    this.criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node191criar");
    this.apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node191apagar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.listar_departs();

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = "";
    this.morada = "";
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    var depart = new GER_LOCAIS;
    if (!this.novo) depart = this.departamento;
    depart.descricao = this.descricao;
    depart.morada = this.morada;
    depart.inativo = false;
    depart.utz_ULT_MODIF = this.user;
    depart.data_ULT_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      this.GERLOCAISService.create(depart).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      depart.id = this.id_depart_selected;
      this.GERLOCAISService.update(depart).then(() => {
        this.listar_departs();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.GERLOCAISService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.departs.push({ id: response[x].id, morada: response[x].morada, descricao: response[x].descricao, dados: response[x] });
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
        var depart = new GER_LOCAIS;
        depart = this.departamento;
        depart.descricao = this.descricao;
        depart.morada = this.morada;
        depart.inativo = true;
        depart.utz_APAGA = this.user;
        depart.data_APAGA = new Date();
        this.GERLOCAISService.update(depart).then(() => {
          this.listar_departs();
          this.simular(this.closedialog);
        });

      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.departamento = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.morada = event.data.morada;

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