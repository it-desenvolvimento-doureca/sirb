import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RC_DIC_TIPO_OCORRENCIA } from 'app/entidades/RC_DIC_TIPO_OCORRENCIA';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RCMOVRECLAMACAOTIPOOCORRENCIAService } from 'app/servicos/rc-mov-reclamacao-tipo-ocorrencia.service';


@Component({
  selector: 'app-tipoocorrencia',
  templateUrl: './tipoocorrencia.component.html',
  styleUrls: ['./tipoocorrencia.component.css']
})
export class TipoocorrenciaComponent implements OnInit {
  dados: any[];
  descricao: string;
  novo: boolean;
  cor_zona: string;
  nome_zona: string;
  id_selected: number;
  novazona: boolean;
  datacria;
  utz_cria;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  codigo: string;
  constructor(private globalVar: AppGlobals, private RCMOVRECLAMACAOTIPOOCORRENCIAService: RCMOVRECLAMACAOTIPOOCORRENCIAService, private renderer: Renderer) { }
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
    this.listar();
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_selected = 0;
    this.descricao = "";
    this.codigo = "";
    this.datacria = null;
    this.utz_cria = null;
    this.simular(this.dialog);
  }



  //gravar unidade de zona
  gravardados() {
    var TIPO_OCORRENCIA = new RC_DIC_TIPO_OCORRENCIA;
    TIPO_OCORRENCIA.descricao = this.descricao;
    TIPO_OCORRENCIA.codigo = this.codigo;
    TIPO_OCORRENCIA.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    TIPO_OCORRENCIA.data_MODIF = new Date();

    if (this.novo) {
      TIPO_OCORRENCIA.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      TIPO_OCORRENCIA.data_CRIA = new Date();
      this.RCMOVRECLAMACAOTIPOOCORRENCIAService.create(TIPO_OCORRENCIA).subscribe(response => {
        this.listar();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      TIPO_OCORRENCIA.id = this.id_selected;
      TIPO_OCORRENCIA.data_CRIA = this.datacria;
      TIPO_OCORRENCIA.utz_CRIA = this.utz_cria;
      this.RCMOVRECLAMACAOTIPOOCORRENCIAService.update(TIPO_OCORRENCIA).then(() => {
        this.listar();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RCMOVRECLAMACAOTIPOOCORRENCIAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({ id: response[x].id, codigo: response[x].codigo, descricao: response[x].descricao, data_CRIA: response[x].data_CRIA, utz_CRIA: response[x].utz_CRIA });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }



  //apagar 
  apagar() {
    var TIPO_OCORRENCIA = new RC_DIC_TIPO_OCORRENCIA;
    TIPO_OCORRENCIA.id = this.id_selected;

    this.RCMOVRECLAMACAOTIPOOCORRENCIAService.delete(TIPO_OCORRENCIA.id).then(() => {
      this.listar();
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.id_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.codigo = event.data.codigo;
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