import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { RH_DIC_EPI } from 'app/entidades/RH_DIC_EPI';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHDICEPIService } from 'app/servicos/rh-dic-epi.service';

@Component({
  selector: 'app-epis',
  templateUrl: './epis.component.html',
  styleUrls: ['./epis.component.css']
})
export class EpisComponent implements OnInit {

  dados: any[];
  descricao: string;
  novo: boolean;
  cor_zona: string;
  id_selected: number;
  novazona: boolean;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  constructor(private globalVar: AppGlobals, private RHDICEPIService: RHDICEPIService, private renderer: Renderer) { }
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
    this.listar();
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_selected = 0;
    this.descricao = "";
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var EPI = new RH_DIC_EPI;
    EPI.descricao = this.descricao;
    EPI.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    EPI.data_MODIF = new Date();

    if (this.novo) {
      EPI.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      EPI.data_CRIA = new Date();
      this.RHDICEPIService.create(EPI).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      EPI.id_EPI = this.id_selected;
      EPI.data_CRIA = this.datacria;
      EPI.utz_CRIA = this.utz_cria;
      this.RHDICEPIService.update(EPI).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RHDICEPIService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id_EPI, nome: response[x].descricao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar zona
  apagar() {
    var EPI = new RH_DIC_EPI;
    EPI.descricao = this.descricao;
    EPI.id_EPI = this.id_selected;

    this.RHDICEPIService.delete(EPI.id_EPI).then(() => {
      this.listar();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_selected = event.data.id;
    this.descricao = event.data.nome;
    this.novo = false;
    this.datacria = event.data.data_CRIA;
    this.utz_cria = event.data.utz_CRIA;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
