import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GER_DEPARTAMENTO } from '../../../entidades/GER_DEPARTAMENTO';
import { AppGlobals } from '../../../menu/sidebar.metadata';
import { GERDEPARTAMENTOService } from '../../../servicos/ger-departamento.service';
import { GERUTILIZADORESService } from '../../../servicos/ger-utilizadores.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  utilizadores_id: any;
  utilizadores: any[];
  departs: any[];
  novo: boolean;
  cor_depart: string;
  nome_depart: string;
  id_depart_selected: number;
  novadepart: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  descricao: string;
  modoedicao: boolean;
  criar: boolean;
  apagar: boolean;
  departamento: GER_DEPARTAMENTO;
  user: any;

  constructor(private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService, private globalVar: AppGlobals, private GERDEPARTAMENTOService: GERDEPARTAMENTOService, private renderer: Renderer) { }
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

    this.modoedicao = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node17editar");
    this.criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node17criar");
    this.apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node17apagar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    //preenche combobox utilizadores
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.utilizadores = [];
        this.utilizadores.push({ label: "Sel. Utilizador", value: "" });
        for (var x in response) {
          this.utilizadores.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR });
        }
        this.utilizadores = this.utilizadores.slice();
        this.listar_departs();
      },
      error => console.log(error));
  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = "";
    this.utilizadores_id = null;
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    var depart = new GER_DEPARTAMENTO;
    if (!this.novo) depart = this.departamento;
    depart.descricao = this.descricao;
    depart.id_UTZ = this.utilizadores_id;
    depart.inativo = false;
    depart.utz_ULT_MODIF = this.user;
    depart.data_ULT_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      this.GERDEPARTAMENTOService.create(depart).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      depart.id = this.id_depart_selected;
      this.GERDEPARTAMENTOService.update(depart).then(() => {
        this.listar_departs();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.GERDEPARTAMENTOService.getAll().subscribe(
      response => {
        for (var x in response) {
          var nome_op = "";

          if (response[x].id_UTZ != null) nome_op = this.utilizadores.find(item => item.value == response[x].id_UTZ).label;

          this.departs.push({ id: response[x].id, id_UTZ: response[x].id_UTZ, descricao: response[x].descricao, nome_op: nome_op, dados: response[x] });
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
        var depart = new GER_DEPARTAMENTO;
        depart = this.departamento;
        depart.descricao = this.descricao;
        depart.id_UTZ = this.utilizadores_id;
        depart.inativo = true;
        depart.utz_APAGA = this.user;
        depart.data_APAGA = new Date();
        this.GERDEPARTAMENTOService.update(depart).then(() => {
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
    this.utilizadores_id = event.data.id_UTZ;
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