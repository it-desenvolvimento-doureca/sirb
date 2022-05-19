import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ficha-documento',
  templateUrl: './ficha-documento.component.html',
  styleUrls: ['./ficha-documento.component.css']
})
export class FichaDocumentoComponent implements OnInit {


  uploadedFiles: any[] = [];
  selectedLinha = null;
  selectedMaquina = null;
  selectedReferencia = null;
  selectedTipo = null;
  codigo = null;
  ordem = 0;
  nomeAba = null;
  nome = null;


  descricao = null;
  file = null;
  ficheiro = null;
  ficheiroOriginal = null;
  path = null;

  iframeURL = null;
  inserirEditado = false;

  linhasList = [];
  referenciasList = [];
  maquinasList = [];
  maquinasListCheck = [];
  linhasListCheck = [];

  criar: boolean = true;
  editar: boolean = false;
  visualizar: boolean = false;



  acessoCriar;
  acessoEditar;
  novobt = true;
  editarbt = true;
  idParam;
  user;
  pdfResult = null;
  element: HTMLImageElement
  selectedInstruçãoPredefinida = false;



  tiposList = []
  tipo_FICHEIRO: string;
  constructor(
    private route: ActivatedRoute, private router: Router,
    private location: Location,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //obter o valor do url
    this.route
      .queryParams
      .subscribe(params => {
        this.idParam = params['id'] || null;
      });

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    //ver se é editar/novo/visualizar
    if (urlarray[1].match("editar")) {
      this.editar = true;
      this.criar = false;
      this.visualizar = false;
      this.novobt = true;
      this.editarbt = false;
    } else if (urlarray[1].match("novo")) {
      this.editar = false;
      this.criar = true;
      this.novobt = false
      this.visualizar = false;
      this.editarbt = false;
    } else if (urlarray[1].match("view")) {
      this.editar = false;
      this.criar = false;
      this.visualizar = true;
      this.novobt = true;
      this.editarbt = true;

    }

    if (this.criar == true) {
      this.carregarDados();
    }

    //obter i id do utilizador atual
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

  }


  carregarDados() {

  }


  guardarDocumento() {

  }





  limpar() {
    this.selectedLinha = null;
    this.codigo = null;
    this.nome = null;
    this.selectedMaquina = null;
    this.selectedReferencia = null;
    this.selectedTipo = null;
    this.maquinasList = [];
    this.file = null;
    this.ficheiro = null;
    this.ficheiroOriginal = null;
    this.descricao = null;
    this.ordem = 0;
    this.nomeAba = null;
    document.getElementById('iframe-pdf').setAttribute('src', '');
    this.uploadedFiles = [];
    this.selectedInstruçãoPredefinida = false;
  }

  //mudar de ecrãs
  cancelar() {
    this.router.navigate(['documentos']);
  }

  anterior() {
    this.location.back();
  }

  backClicked() {
    this.location.back();
  }

  edicao() {

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.idParam = params['id'] || 0;
      });

    this.router.navigate(['documentos/editar'], { queryParams: { id: this.idParam } });
  }
  //ao remover ficheiro
  onRemove() {
    this.ficheiro = null;
    this.iframeURL = null;
  }

  novo() {
    this.router.navigate(['documentos/novo']);
  }


  //função para por ordem dinamica
  mudarOrdem(event) {

    if (this.tiposList.find(item => item.id == event.value).predefinido == true) {
      this.ordem = 1;
      this.selectedInstruçãoPredefinida = true;

    } else {
      this.selectedInstruçãoPredefinida = false;

    }
  }

  readFile(event) {

    this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(event.target.result)
    );
    document.getElementById('iframe-pdf').setAttribute('src', String(event.target.result));
  }

  //ao dar upload de um ficheiro
  uploadHandler(event) {
    var ficheiro = event.files[0];
    var type = "img";
    var str = ficheiro.type;
    var tipo = ficheiro.name.split(".");

    if (str.toLowerCase().indexOf("pdf") >= 0) {
      type = "pdf";
    } else if (str.toLowerCase().indexOf("audio") >= 0) {
      type = "audio";
    } else if (str.toLowerCase().indexOf("video") >= 0) {
      type = "video";
    } else if (str.toLowerCase().indexOf("excel") >= 0 || str.toLowerCase().indexOf("sheet") >= 0) {
      type = "excel";
    } else if (str.toLowerCase().indexOf("word") >= 0) {
      type = "word";
    } else if (str.toLowerCase().indexOf("text") >= 0) {
      type = "txt";
    } else if (tipo[1] == "msg") {
      type = "msg";
    }

    this.tipo_FICHEIRO = type;
    this.ficheiro = event.files[0];
    this.inserirEditado = true;

    this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      URL.createObjectURL(event.files[0])
    );


  }



}

