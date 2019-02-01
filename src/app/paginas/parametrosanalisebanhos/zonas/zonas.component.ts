import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { AB_DIC_ZONA } from "app/entidades/AB_DIC_ZONA";
import { ABDICZONAService } from "app/servicos/ab-dic-zona.service";
import { AppGlobals } from "app/menu/sidebar.metadata";

@Component({
  selector: 'app-zonas',
  templateUrl: './zonas.component.html',
  styleUrls: ['./zonas.component.css']
})
export class ZonasComponent implements OnInit {
  zonas: any[];
  valor_zona: string;
  novo: boolean;
  cor_zona: string;
  nome_zona: string;
  id_zona_selected: number;
  novazona: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private ABDICZONAService: ABDICZONAService, private renderer: Renderer) { }
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
    this.listar_zonas();
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_zona_selected = 0;
    this.valor_zona = "";
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravarzonas() {
    var UNIDADE_zona = new AB_DIC_ZONA;
    UNIDADE_zona.nome_ZONA = this.valor_zona;
    UNIDADE_zona.inativo = false;
    if (this.novo) {
      this.ABDICZONAService.create(UNIDADE_zona).subscribe(response => {
        this.listar_zonas();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      UNIDADE_zona.id_ZONA = this.id_zona_selected;
      this.ABDICZONAService.update(UNIDADE_zona).then(() => {
        this.listar_zonas();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de zonas na tabela
  listar_zonas() {
    this.zonas = [];
    this.ABDICZONAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.zonas.push({ id: response[x].id_ZONA, nome: response[x].nome_ZONA });
        }
        this.zonas = this.zonas.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagarzonas() {
    var UNIDADE_zona = new AB_DIC_ZONA;
    UNIDADE_zona.nome_ZONA = this.valor_zona;
    UNIDADE_zona.id_ZONA = this.id_zona_selected;
    UNIDADE_zona.inativo = true;
    UNIDADE_zona.utz_ANULACAO = JSON.parse(localStorage.getItem('userapp'))["id"];
    UNIDADE_zona.data_ANULACAO = new Date();

    this.ABDICZONAService.update(UNIDADE_zona).then(() => {
      this.listar_zonas();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_zona_selected = event.data.id;
    this.valor_zona = event.data.nome;
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
