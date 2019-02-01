import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ABDICTURNOService } from "app/servicos/ab-dic-turno.service";
import { AB_DIC_TURNO } from "app/entidades/AB_DIC_TURNO";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent implements OnInit {
  turnos: any[];
  valor_turno: string;
  novo: boolean;
  cor_turno: string;
  nome_turno: string;
  id_turno_selected: number;
  novaturno: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private ABDICTURNOService: ABDICTURNOService, private renderer: Renderer) { }
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
    this.globalVar.setcriar(false);
    this.listar_turnos();
  }

  //abre popup para adicionar turno
  showDialogToAdd() {
    this.novo = true;
    this.id_turno_selected = 0;
    this.valor_turno = "";
    this.simular(this.dialog);
  }



  //gravar unidade de turno
  gravarturnos() {
    var turno = new AB_DIC_TURNO;
    turno.nome_TURNO = this.valor_turno;
    turno.inativo = false;
    if (this.novo) {
      this.ABDICTURNOService.create(turno).subscribe(response => {
        this.listar_turnos();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      turno.id_TURNO = this.id_turno_selected;
      this.ABDICTURNOService.update(turno).then(() => {
        this.listar_turnos();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de turnos na tabela
  listar_turnos() {
    this.turnos = [];
    this.ABDICTURNOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.turnos.push({ id: response[x].id_TURNO, nome: response[x].nome_TURNO });
        }
        this.turnos = this.turnos.slice();
      },
      error => console.log(error));
  }



  //apagar turno
  apagarturnos() {
    var turno = new AB_DIC_TURNO;
    turno.nome_TURNO = this.valor_turno;
    turno.id_TURNO = this.id_turno_selected;
    turno.data_ANULACAO = new Date();
    turno.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
    turno.inativo = true;
    this.ABDICTURNOService.update(turno).then(() => {
      this.listar_turnos();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_turno_selected = event.data.id;
    this.valor_turno = event.data.nome;
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
