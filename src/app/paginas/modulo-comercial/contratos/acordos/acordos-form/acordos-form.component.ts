import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { COMACORDOSACTIVIDADESService } from 'app/servicos/com-acordos-actividades.service';
import { UploadService } from 'app/servicos/upload.service';
import { ConfirmationService, FileUpload } from 'primeng/primeng';

@Component({
  selector: 'app-acordos-form',
  templateUrl: './acordos-form.component.html',
  styleUrls: ['./acordos-form.component.css']
})
export class AcordosFormComponent implements OnInit {

  ativobt = '1';
  uploadedFiles = [];
  user: any;
  user_nome: any;
  adminuser: any;
  novo: boolean;
  apagarficheiros: any;
  modoedicao: boolean;
  srcelement: any;
  nomeficheiro: any;
  type: any;
  display: boolean;
  @ViewChild('fileInput') fileInput: FileUpload;
  @ViewChild('fileInputAnexos') fileInputAnexos: FileUpload;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;

  campo_x: any;
  filedescricao = [];

  tabela_precos = [];
  tabela_amortizacoes = [];
  tabela_lta = [];
  tabela_actividades = [];
  tabela_historico = [];
  dados: any;
  dialognovo: boolean;
  alerta_hora: string;
  alerta_data: Date;
  nome_utilizador: any;

  constructor(private elementRef: ElementRef, private confirmationService: ConfirmationService,
    private renderer: Renderer, private route: ActivatedRoute, private location: Location, private sanitizer: DomSanitizer,
    private COMACORDOSACTIVIDADESService: COMACORDOSACTIVIDADESService,
    private globalVar: AppGlobals, private router: Router, private UploadService: UploadService) { }

  ngOnInit() {
    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.user_nome = JSON.parse(localStorage.getItem('userapp'))["nome"];
    this.adminuser = JSON.parse(localStorage.getItem('userapp'))["admin"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");




    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      this.novo = false;

      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });
      this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852editar"));
      this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852criar"));
      this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852apagar"));
      this.globalVar.setdisDuplicar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852duplicar"));


      this.apagarficheiros = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15852apagarficheiros");

    }

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);
        this.globalVar.setduplicar(false);
        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();


      } else if (urlarray[1].match("view")) {
        this.globalVar.setdisDuplicar(false);
        this.globalVar.setcriar(true);
      }
    }

    if (!this.novo) this.inicia(id);
    this.carregaDados(id);

    /* this.uploadedFiles.push({
       data_CRIA: '2020-05-05', ficheiro: '',
       id_TAREFA: null, responsavel: null, utilizador: 'Admin', datacria: '2020-05-05', id_FICHEIRO: null,
       id: null, name: 'file.name', datatype: 'file.type', src: '', type: 'type', size: ' file.size', descricao: 'this.filedescricao[x]'
     });
 
     this.tabela_lista_componentes.push({ id: null, PROREF: 'AFSS', DESIGN: 'asdsda', quantidade: 15 });
 
     this.tabelaaccoes.push({ id: null, descricao: 'assa', id_ACCOES: 11, periociodade: 1, ultima_REALIZADA: '2020-05-05', proxima_REALIZAR: '2020-05-05', equipa: 1 });
 
     this.tabelacontratossuporte.push({ id: null, fornecedor: 'asdsdasd', contrato_suporte: true, periociodade: 1, data_INICIO: '2020-06-06', data_FIM: '2020-06-06', anexo: '' });
 
     this.tabeladadoscompra.push({ id: null, fornecedor: 'asdsdasd', anexo: '' });*/
  }

  carregaDados(id) {

  }

  inicia(id) {
  }



  abrir(event) {
    //console.log(event)
    this.dados = event.data.dados;

    if (event.data.ficheiro == null) {
      this.COMACORDOSACTIVIDADESService.getbyidFICHEIRO(event.data.id).subscribe(
        (res) => {
          if (res[0][0] != null) this.dados.ficheiro = res[0][0] + res[0][1];
        }, error => {
          this.simular(this.inputerroficheiro);
          console.log(error);
        }
      );
    } else {
      this.dados.ficheiro = event.data.ficheiro;
    }
    this.novo = false;


    this.dados.data_CRIA = new Date(event.data.dados.data_CRIA);
    this.nome_utilizador = event.data.utilizador;
    this.alerta_data = (event.data.gerar_ALERTA == null) ? null : new Date(event.data.gerar_ALERTA);
    this.alerta_hora = (event.data.gerar_ALERTA == null) ? null : new Date(event.data.gerar_ALERTA).toLocaleTimeString().slice(0, 5);

    this.dialognovo = true;
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
