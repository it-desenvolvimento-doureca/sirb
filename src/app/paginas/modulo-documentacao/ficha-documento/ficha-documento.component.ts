import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { DOCFICHADOCUMENTOSService } from 'app/servicos/doc-ficha-documentos.service';
import { DOCDICTIPOSDOCUMENTOService } from 'app/servicos/doc-dic-tipos-documento.service';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';

@Component({
  selector: 'app-ficha-documento',
  templateUrl: './ficha-documento.component.html',
  styleUrls: ['./ficha-documento.component.css']
})
export class FichaDocumentoComponent implements OnInit {


  uploadedFiles: any[] = [];
  selectedSector = null;
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

  drop_sectores = [];
  referenciasList = [];
  maquinasList = []; selectedReferenciadescricao: any;
  drop_artigos: any[];
  btgravar: boolean;
  referencia_campo: { value: any; label: string; DESIGN: any; };
  ;

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
    private RHSECTORESService: RHSECTORESService,
    private DOCFICHADOCUMENTOSService: DOCFICHADOCUMENTOSService,
    private DOCDICTIPOSDOCUMENTOService: DOCDICTIPOSDOCUMENTOService,
    private ABDICCOMPONENTEService: ABDICCOMPONENTEService,
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

    if (this.editar == true || this.visualizar == true) {
      this.inicia(this.idParam);
    }
    //obter i id do utilizador atual
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

  }

  carregarDados() {
    this.listarsectores();
    this.listarTiposDocumento();
    this.artigos();
    this.maquinas();
  }

  inicia(id) {
    this.DOCFICHADOCUMENTOSService.getbyid(id).subscribe(async (response) => {
      if (response != null) {
        //carregar campos do form
        this.codigo = response[0].COD_DOCUMENTO;
        this.nomeAba = response[0].NOME_ABA;
        this.ordem = response[0].ORDEM;
        this.nome = response[0].NOME_DOCUMENTO;
        this.descricao = response[0].DESCRICAO;
        this.selectedMaquina = response[0].COD_MAQUINA;
        //let reff = response[0].id_Referencia;
        this.selectedTipo = response[0].TIPO_DOCUMENTO;
        this.selectedSector = response[0].SECTOR;


        if (response[0].REFERENCIA != null) this.referencia_campo = { value: response[0].REFERENCIA, label: response[0].REFERENCIA + " - " + response[0].DESC_REFERENCIA, DESIGN: response[0].DESC_REFERENCIA };
        //this.tipoOriginal = response[0].TIPO_DOCUMENTO;

        // this.ficheiroOriginal = response[0].ficheiro;


        //this.carregarDados2(response[0].id_Linha, response[0].id_TipoDocumento);
        //obter o ficheiro para carregar no iframe
        /* this.documento.getFile(this.idParam).subscribe((response) => {
           this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
             URL.createObjectURL(response)
           );
           this.ficheiro = this.blobToFile(response, this.ficheiroOriginal)
         }, error => {
           console.log(error);
           if (error == 'Not Found') {
             this.showMessage('warn', 'Aviso', 'Ficheiro associado ao documento não existe');
           }
         });*/

      }
    });

  }

  //listar os dados sectores
  listarsectores() {
    this.drop_sectores = [];
    this.drop_sectores.push({ value: '', label: 'Selecionar Sector' });
    this.RHSECTORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.drop_sectores.push({

            value: response[x][0].cod_SECTOR,
            label: response[x][0].des_SECTOR,


          });
        }
        this.drop_sectores = this.drop_sectores.slice();
      },
      error => console.log(error));
  }

  //listar os dados tipos de documento
  listarTiposDocumento() {
    this.tiposList = [];
    this.tiposList.push({ value: '', label: 'Selecionar Tipo de Documento' });
    this.DOCDICTIPOSDOCUMENTOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.tiposList.push({

            value: response[x].ID,
            label: response[x].NOME,


          });
        }
        this.tiposList = this.tiposList.slice();
      },
      error => console.log(error));
  }


  artigos() {
    this.ABDICCOMPONENTEService.getReferencias().subscribe(
      response => {
        this.drop_artigos = [];
        var count = Object.keys(response).length;
        if (count > 0) {

          for (var x in response) {
            this.drop_artigos.push({ value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, descricao: response[x].PRODES1 });
          }

          this.drop_artigos = this.drop_artigos.slice();


        }

      }, error => { console.log(error); });

  }

  maquinas() {
    this.ABDICCOMPONENTEService.getMaquinas().subscribe(
      response => {
        this.drop_artigos = [];
        this.maquinasList.push({ value: '', label: 'Selecionar Máquina' });
        var count = Object.keys(response).length;
        if (count > 0) {

          for (var x in response) {
            this.maquinasList.push({ value: response[x].ssecod, label: response[x].SSEDES });
          }

          this.maquinasList = this.maquinasList.slice();


        }

      }, error => { console.log(error); });

  }


  guardarDocumento() {
    this.btgravar = true;
    const bodyFormData = new FormData();
    if (this.ordem == 0) {
      bodyFormData.append('ordem', '999');
    } else {
      bodyFormData.append('ordem', String(this.ordem));
    }

    bodyFormData.append('codigo', this.codigo);
    bodyFormData.append('descricao', this.descricao);
    bodyFormData.append('nome', this.nome);
    bodyFormData.append('id_Linha', this.selectedSector);
    bodyFormData.append('id_Maquina', this.selectedMaquina);
    bodyFormData.append('id_TipoDocumento', this.selectedTipo);
    bodyFormData.append('id_Referencia', this.selectedReferencia);
    bodyFormData.append('id_User', this.user);
    bodyFormData.append('nome_aba', this.nomeAba);
    bodyFormData.append('path', this.path);


    if (this.criar == true) {

      bodyFormData.append('ficheiro', this.ficheiro.name);
      bodyFormData.append('atual', String(Date.now()));
      bodyFormData.append('file', this.ficheiro);
    }

    if (this.editar == true) {
      bodyFormData.append('id_Documento', this.idParam);
      if (this.ficheiroOriginal == this.ficheiro.name) {
        //caso seja usado o mesmo ficheiro na edição
        bodyFormData.append('atual', null);
        bodyFormData.append('ficheiro', this.ficheiro.name);
        bodyFormData.append('file', '');
      } else {
        //caso o ficheiro na edição seja diferente
        /*this.DOCFICHADOCUMENTOSService.deleteFile(this.idParam).then((response) => {

        });*/

        bodyFormData.append('atual', String(Date.now()));
        bodyFormData.append('ficheiro', this.ficheiro.name);
        bodyFormData.append('file', this.ficheiro);
      }

    }
    if (this.criar == true) {
      let data = {};
      data = {
        id_Linha: this.selectedSector,
        id_Maquina: this.selectedMaquina,
        id_Referencia: this.selectedReferencia,
      }
      //ver se existem ficheiros predefinidos para linha/maquina/referencia
      this.DOCFICHADOCUMENTOSService.getTotalPredefinidos(data).subscribe((response) => {
        if (response != null) {
          if (response[0].total == 0) {
            this.upd(bodyFormData);
          } else {
            if (this.selectedInstruçãoPredefinida == true) {
              this.btgravar = false;
              this.showMessage('warn', 'Aviso', 'Já existe um documento predefinido para a linha/máquina/referência!');
            } else {
              this.upd(bodyFormData);
            }
          }
        }
      });
    } else {

      let data = {};
      data = {
        id_Linha: this.selectedSector,
        id_Maquina: this.selectedMaquina,
        id_Referencia: this.selectedReferencia,
      }
      //ver se existem ficheiros predefinidos para linha/maquina/referencia
      this.DOCFICHADOCUMENTOSService.getTotalPredefinidos(data).subscribe((response) => {
        if (response != null) {
          if (response[0].total == 0) {
            this.upd(bodyFormData);
          } else {
            this.showMessage('warn', 'Aviso', 'Já existe um documento predefinido para a linha/máquina/referência!');
            this.btgravar = false;
          }
        }
      });
    }
  }

  upd(documento) {
    this.DOCFICHADOCUMENTOSService.update(documento).subscribe((res) => {
      this.showMessage('success', 'Sucesso', 'Inserido com sucesso!');

      this.limpar();
      this.router.navigate(['fichadocumento']);


    }, error => {
      this.showMessage('error', 'Erro', 'ERRO!! Registo não foi Gravado!');
      this.btgravar = false;
    });
  }


  limpar() {
    this.selectedSector = null;
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


  gravar() {

    if ((this.criar == true || this.editar == true) && this.codigo != null && this.nome != null && this.selectedSector != null && this.selectedTipo && this.ficheiro != null && this.nomeAba != null) {
      let dataCheckCode = {};
      dataCheckCode = {
        id_Linha: this.selectedSector,
        id_Documento: this.idParam,
        codigo: this.codigo,
      }
      //ver se o código de documento exsite para a linha
      this.DOCFICHADOCUMENTOSService.checkIfCodeExist(dataCheckCode)
        .subscribe((response) => {
          var existeCodigo = response[0];
          if (existeCodigo == true) {
            this.showMessage('warn', 'Aviso', 'Já existe um documento com este código para a linha selecionada!');
            existeCodigo = false;
          } else {
            this.guardarDocumento();
          }
        });

    } else {
      this.alertasPop();
    }


  }

  alertasPop() {
    if (this.codigo == null)
      this.showMessage('error', 'Erro', 'É necessário especificar um código');

    if (this.nome == null)
      this.showMessage('error', 'Erro', 'É necessário especificar nome');

    if (this.selectedSector == null)
      this.showMessage('error', 'Erro', 'É necessário especificar uma linha');

    if (this.selectedTipo == null)
      this.showMessage('error', 'Erro', 'É necessário especificar um tipo de documento');

    if (this.ficheiro == null)
      this.showMessage('error', 'Erro', 'É necessário inserir um documento');
  }

  showMessage(severity, summary, detail) {
    // this.messageService.add({ key: 'myKey1', severity: severity, summary: summary, detail: detail });
  }


  filterRef(event) {

    this.referenciasList = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.drop_artigos) {
      let ref = this.drop_artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        result.push(this.drop_artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect(event) {
    //this.numero_PESSOA = event.value;
    //this.nome_PESSOA = event.nome;
    this.selectedReferencia = null
    this.selectedReferenciadescricao = null;
  }

  filterSelect(event) {
    //this.referencia_campo = event.label;
    this.selectedReferencia = event.value;
    this.selectedReferenciadescricao = event.descricao;
  }
}

