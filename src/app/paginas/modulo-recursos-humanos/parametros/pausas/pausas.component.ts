import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RH_PAUSAS } from 'app/entidades/RH_PAUSAS';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHPAUSASService } from 'app/servicos/rh-pausas.service';
import { RHTIPOSPAUSAService } from 'app/servicos/rh-tipos-pausa.service';

@Component({
  selector: 'app-pausas',
  templateUrl: './pausas.component.html',
  styleUrls: ['./pausas.component.css']
})
export class PausasComponent implements OnInit {

  dados: any[];
  novo: boolean;
  id_selected: number;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;
  tipo_PAUSA;
  descricao: string;
  pausas_SILVER: any[];
  tipos_PAUSA: any;
  id_PAUSA: string;

  constructor(private RHPAUSASService: RHPAUSASService, private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private renderer: Renderer, private RHTIPOSPAUSAService: RHTIPOSPAUSAService) { }

  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setduplicar(false);
    this.globalVar.setcriar(false);

    this.listar_PAUSAS_SILVER();
    this.listar_tipospausa();

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node727editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node727apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node727criar");

  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_selected = 0;
    this.id_PAUSA = null;
    this.tipo_PAUSA = null;
    this.descricao = "";
    this.simular(this.dialog);
  }



  listar_tipospausa() {
    this.tipos_PAUSA = [];
    this.RHTIPOSPAUSAService.getAll().subscribe(
      response => {
        this.tipos_PAUSA.push({ value: "", label: "Selecionar Tipo Pausa" });
        for (var x in response) {
          this.tipos_PAUSA.push({ value: response[x].id, label: response[x].descricao });
        }
        this.tipos_PAUSA = this.tipos_PAUSA.slice();
        this.listar();
      },
      error => {
        console.log(error);
        this.listar();
      });

  }


  listar_PAUSAS_SILVER() {
    this.pausas_SILVER = [];
    this.RHTIPOSPAUSAService.getAllPAUSASSILVER().subscribe(
      response => {
        this.pausas_SILVER.push({ value: "", label: "Selecionar Pausa" });
        for (var x in response) {
          this.pausas_SILVER.push({ value: response[x].ARRCOD, label: response[x].arrlib });
        }
        this.pausas_SILVER = this.pausas_SILVER.slice();
      },
      error => console.log(error));

  }

  //gravar unidade de zona
  gravardados() {
    var pausa = new RH_PAUSAS;

    pausa.id_PAUSA_SILVER = this.id_PAUSA;
    pausa.descricao_PAUSA = this.descricao;
    pausa.id_TIPO_PAUSA = this.tipo_PAUSA;



    if (this.novo) {

      this.RHPAUSASService.create(pausa).subscribe(response => {

        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      pausa.id = this.id_selected;
      this.RHPAUSASService.update(pausa).then(() => {
        this.listar();
        this.simular(this.closedialog);

      });

    }
  }




  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RHPAUSASService.getAll().subscribe(
      response => {
        for (var x in response) {
          var descr = "";
          if (this.tipos_PAUSA.find(item => item.value == response[x].id_TIPO_PAUSA)) descr = this.tipos_PAUSA.find(item => item.value == response[x].id_TIPO_PAUSA).label;
          this.dados.push({
            descricao: response[x].descricao_PAUSA,
            id: response[x].id,
            descricaoTipo: descr,
            tipo_PAUSA: response[x].id_TIPO_PAUSA,
            id_PAUSA: response[x].id_PAUSA_SILVER

          });
        }
        this.dados = this.dados.slice();

      },
      error => console.log(error));
  }

  alterarpausa(event) {
    this.descricao = this.pausas_SILVER.find(item => item.value == event.value).label;
  }


  //apagar zona
  apagar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        this.RHPAUSASService.delete(this.id_selected).then(() => {
          this.listar();
        });
      }

    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    if (this.acesso_editar) {

      this.id_selected = event.data.id;
      this.tipo_PAUSA = event.data.tipo_PAUSA;
      this.id_PAUSA = event.data.id_PAUSA;
      this.novo = false;
      this.descricao = event.data.descricao;
      this.simular(this.dialog);
    }
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
