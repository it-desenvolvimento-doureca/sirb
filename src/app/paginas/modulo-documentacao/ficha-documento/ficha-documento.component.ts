import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { DOCFICHADOCUMENTOSService } from 'app/servicos/doc-ficha-documentos.service';
import { DOCDICTIPOSDOCUMENTOService } from 'app/servicos/doc-dic-tipos-documento.service';
import { ABDICCOMPONENTEService } from 'app/servicos/ab-dic-componente.service';
import { DOC_FICHA_DOCUMENTOS } from 'app/entidades/DOC_FICHA_DOCUMENTOS';
import { Message } from 'primeng/primeng';
import { UploadService } from 'app/servicos/upload.service';
import { DOCGESTAOPASTASService } from 'app/servicos/doc-gestao-pastas.service';

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


  iframeURL = null;
  inserirEditado = false;

  drop_sectores = [];
  referenciasList = [];
  maquinasList = []; selectedReferenciadescricao: any;
  drop_artigos: any[];
  btgravar: boolean;
  referencia_campo: { value: any; label: string; DESIGN: any; };


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
  msgs: Message[] = [];
  caminhoOriginal: string;
  ID_FICHEIRO: string;
  dados: DOC_FICHA_DOCUMENTOS;
  id_CAMINHO: any;
  drop_localizacoes: any;

  constructor(private renderer: Renderer,
    private route: ActivatedRoute, private router: Router,
    private location: Location,
    private RHSECTORESService: RHSECTORESService,
    private DOCFICHADOCUMENTOSService: DOCFICHADOCUMENTOSService,
    private DOCDICTIPOSDOCUMENTOService: DOCDICTIPOSDOCUMENTOService,
    private ABDICCOMPONENTEService: ABDICCOMPONENTEService,
    private DOCGESTAOPASTASService: DOCGESTAOPASTASService,
    private UploadService: UploadService,
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


    this.carregarDados();


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
    this.localizacoes_alfresco();
  }

  inicia(id) {
    this.DOCFICHADOCUMENTOSService.getbyid(id).subscribe((response) => {
      if (response != null) {
        //carregar campos do form
        this.dados = response[0];
        this.codigo = response[0].COD_DOCUMENTO;
        this.nomeAba = response[0].NOME_ABA;
        this.ordem = response[0].ORDEM;
        this.nome = response[0].NOME_DOCUMENTO;
        this.descricao = response[0].DESCRICAO;
        this.selectedMaquina = response[0].COD_MAQUINA;
        //let reff = response[0].id_Referencia;
        this.selectedTipo = response[0].TIPO_DOCUMENTO;
        this.selectedSector = (response[0].SECTOR == null) ? [] : response[0].SECTOR.split(',');
        this.ID_FICHEIRO = response[0].ID_FICHEIRO;
        this.caminhoOriginal = response[0].CAMINHO;
        if (response[0].REFERENCIA != null) this.referencia_campo = { value: response[0].REFERENCIA, label: response[0].REFERENCIA + " - " + response[0].DESC_REFERENCIA, DESIGN: response[0].DESC_REFERENCIA };
        //this.tipoOriginal = response[0].TIPO_DOCUMENTO;
        this.selectedReferencia = response[0].REFERENCIA;
        this.selectedReferenciadescricao = response[0].DESC_REFERENCIA;
        this.tipo_FICHEIRO = response[0].TIPO_FICHEIRO;
        this.id_CAMINHO = response[0].ID_CAMINHO;
        this.ficheiroOriginal = response[0].NOME_FICHEIRO;
        this.getFILEALFRESCO(response[0].ID_FICHEIRO);

      }
    });

  }

  getFILEALFRESCO(id) {
    this.DOCFICHADOCUMENTOSService.getFileAlfresco(id).subscribe((response) => {
      var linkFile = response;
      this.iframeURL = this.sanitizer.bypassSecurityTrustResourceUrl(
        linkFile
      );
      //this.ficheiro = linkFile;

      this.DOCFICHADOCUMENTOSService.getFile(linkFile).subscribe((response) => {
        this.ficheiro = this.blobToFile(response, this.ficheiroOriginal)
      }, error => {
        console.log(error);
      });
    }, error => {
      console.log(error);

    });
  }

  blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  //listar os dados sectores
  listarsectores() {
    this.drop_sectores = [];
    //this.drop_sectores.push({ value: '', label: 'Selecionar Sector' });
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
            predefinido: response[x].DOCUMENTO_PREDEFINIDO
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
            this.maquinasList.push({ value: response[x].ssecod, label: response[x].ssecod + ' - ' + response[x].SSEDES, descricao: response[x].SSEDES });
          }

          this.maquinasList = this.maquinasList.slice();


        }

      }, error => { console.log(error); });

  }

  localizacoes_alfresco() {
    this.DOCGESTAOPASTASService.getAll().subscribe(
      response => {
        this.drop_localizacoes = [];
        this.drop_localizacoes.push({ value: '', label: 'Selecionar Localização' });
        var count = Object.keys(response).length;
        if (count > 0) {

          for (var x in response) {
            this.drop_localizacoes.push({ value: response[x].ID, label: response[x].NOME + ' (' + response[x].CAMINHO + ')', caminho: response[x].CAMINHO });
          }

          this.drop_localizacoes = this.drop_localizacoes.slice();


        }

      }, error => { console.log(error); });

  }


  guardarDocumento() {
    this.btgravar = true;
    const bodyFormData = new FormData();
    var documento = new DOC_FICHA_DOCUMENTOS;

    if (this.editar) {
      documento = this.dados;
    }

    if (this.ordem == 0) {
      bodyFormData.append('ORDEM', '999');
      documento.ORDEM = 999;
    } else {
      bodyFormData.append('ORDEM', String(this.ordem));
      documento.ORDEM = this.ordem;
    }

    var descricaoMaquina = null;
    if (this.selectedMaquina != null && this.selectedMaquina != "") {
      descricaoMaquina = this.maquinasList.find(item => item.value == this.selectedMaquina).descricao
    }

    /*var descricaoSector = null;
    if (this.selectedSector != null && this.selectedSector != "") {
      descricaoSector = this.drop_sectores.find(item => item.value == this.selectedSector).label
    }*/

    var descricaoTipoDocumento = null;
    if (this.selectedTipo != null && this.selectedTipo != "") {
      descricaoTipoDocumento = this.tiposList.find(item => item.value == this.selectedTipo).label
    }


    documento.COD_DOCUMENTO = this.codigo;
    documento.DESCRICAO = this.descricao;
    documento.NOME_DOCUMENTO = this.nome;
    documento.SECTOR = (this.selectedSector == null || this.selectedSector.length == 0) ? null : this.selectedSector.toString();
    documento.COD_MAQUINA = this.selectedMaquina;
    documento.DESC_MAQUINA = descricaoMaquina;
    documento.TIPO_DOCUMENTO = this.selectedTipo;
    documento.REFERENCIA = this.selectedReferencia;
    documento.DESC_REFERENCIA = this.selectedReferenciadescricao;
    documento.NOME_ABA = this.nomeAba;
    documento.ID_CAMINHO = this.id_CAMINHO;
    documento.UTZ_MODIF = this.user;
    documento.DATA_MODIF = new Date();
    documento.INATIVO = false;

    bodyFormData.append('COD_DOCUMENTO', this.codigo);
    bodyFormData.append('DESCRICAO', this.descricao);
    bodyFormData.append('NOME_DOCUMENTO', this.nome);
    bodyFormData.append('SECTOR', (this.selectedSector == null || this.selectedSector.length == 0) ? null : this.selectedSector.toString());
    bodyFormData.append('COD_MAQUINA', this.selectedMaquina);
    bodyFormData.append('DESC_MAQUINA', descricaoMaquina);
    bodyFormData.append('TIPO_DOCUMENTO', this.selectedTipo);
    bodyFormData.append('REFERENCIA', this.selectedReferencia);
    bodyFormData.append('DESC_REFERENCIA', this.selectedReferenciadescricao);
    bodyFormData.append('UTZ', this.user);
    bodyFormData.append('NOME_ABA', this.nomeAba);
    bodyFormData.append('TIPO_FICHEIRO', this.tipo_FICHEIRO);
    bodyFormData.append('ID_CAMINHO', this.id_CAMINHO);

    // var caminho = 'Doureca/Produção/' + descricaoTipoDocumento;

    var caminho = this.drop_localizacoes.find(item => item.value == this.id_CAMINHO).caminho;
    caminho = caminho + '/' + descricaoTipoDocumento

    if (this.selectedReferencia != null && this.selectedReferencia != "") {
      caminho = (caminho == "") ? "" : caminho + '/';
      caminho += this.selectedReferencia;
    }

    if (this.selectedMaquina != null && this.selectedMaquina != "") {
      caminho = (caminho == "") ? "" : caminho + '/';
      caminho += this.selectedMaquina + ' - ' + descricaoMaquina;
    }

    /*if (this.selectedSector != null && this.selectedSector != "") {
      caminho = (caminho == "") ? "" : caminho + '/';
      caminho += descricaoSector;
    }*/

    bodyFormData.append('caminho', caminho);


    if (this.criar == true) {
      bodyFormData.append('ficheiro', this.ficheiro.name);
      bodyFormData.append('atual', String(Date.now()));
      bodyFormData.append('file', this.ficheiro);
      documento.UTZ_CRIA = this.user;
      documento.DATA_CRIA = new Date();
    }

    var novoficheiro = false;
    var novocaminho = false;

    if (this.editar == true) {
      bodyFormData.append('ID', this.idParam);
      if (this.ficheiroOriginal == this.ficheiro.name) {
        //caso seja usado o mesmo ficheiro na edição
        bodyFormData.append('atual', null);
        bodyFormData.append('ficheiro', this.ficheiro.name);
        bodyFormData.append('file', '');
      } else {
        //caso o ficheiro na edição seja diferente
        this.DOCFICHADOCUMENTOSService.deleteFile(this.ID_FICHEIRO).then((response) => {

        });
        novoficheiro = true;
        bodyFormData.append('atual', String(Date.now()));
        bodyFormData.append('ficheiro', this.ficheiro.name);
        bodyFormData.append('file', this.ficheiro);
      }

      if (this.caminhoOriginal != caminho) {
        novocaminho = true;
      }


    }
    if (this.criar == true) {
      let data = {};
      data = {
        SECTOR: (this.selectedSector == null || this.selectedSector.length == 0) ? null : this.selectedSector.toString(),
        MAQUINA: (this.selectedMaquina == '') ? null : this.selectedMaquina,
        REFERENCIA: (this.selectedReferencia == '') ? null : this.selectedReferencia,
        ID: (this.idParam == null) ? 0 : this.idParam,
        CODIGO: this.codigo,
      }
      //ver se existem ficheiros predefinidos para sector/máquina/referência selecionado
      this.DOCFICHADOCUMENTOSService.getTotalPredefinidos([data]).subscribe((response) => {
        if (response != null) {
          if (response[0] == 0) {
            this.upd(bodyFormData, documento, true, false, caminho);
          } else {

            if (this.tiposList.find(item => item.value == this.selectedTipo).predefinido == true) {
              this.btgravar = false;
              this.showMessage('warn', 'Aviso', 'Já existe um documento predefinido para sector/máquina/referência selecionado!');
            } else {
              this.upd(bodyFormData, documento, true, false, caminho);
            }

          }
        }
      });
    } else {

      let data = {};
      data = {
        SECTOR: (this.selectedSector == null || this.selectedSector.length == 0) ? null : this.selectedSector.toString(),
        MAQUINA: (this.selectedMaquina == '') ? null : this.selectedMaquina,
        REFERENCIA: (this.selectedReferencia == '') ? null : this.selectedReferencia,
        ID: this.idParam,
        CODIGO: this.codigo,
      }
      //ver se existem ficheiros predefinidos para linha/maquina/referencia
      this.DOCFICHADOCUMENTOSService.getTotalPredefinidos([data]).subscribe((response) => {
        if (response != null) {
          if (response[0] == 0) {
            this.upd(bodyFormData, documento, novoficheiro, novocaminho, caminho);
          } else {
            if (this.tiposList.find(item => item.value == this.selectedTipo).predefinido == true) {
              this.btgravar = false;
              this.showMessage('warn', 'Aviso', 'Já existe um documento predefinido para sector/máquina/referência selecionado!');
            } else {
              this.upd(bodyFormData, documento, novoficheiro, novocaminho, caminho);
            }
          }
        }
      });
    }
  }

  upd(documentoFile, documento, novoficheiro, novocaminho, caminho) {
    if (novoficheiro) {
      this.DOCFICHADOCUMENTOSService.insertFile(documentoFile).subscribe((res) => {
        this.showMessage('success', 'Sucesso', 'Inserido com sucesso!');

        this.limpar();
        this.router.navigate(['fichadocumento']);


      }, error => {
        this.showMessage('error', 'Erro', 'ERRO!! Registo não foi Gravado!');
        this.btgravar = false;
      });
    } else {
      if (novocaminho) {
        let data = {};
        data = {
          fileId: this.ID_FICHEIRO,
          caminho: caminho,
        }
        this.DOCFICHADOCUMENTOSService.moveNodeFolder(data).subscribe((response) => {
          console.log(response)
          if (response != null) {
            documento.CAMINHO = caminho;
            documento.ID_FICHEIRO = response.entry.id;
            documento.ID_PASTA = response.entry.parentId;
          }

          this.atualizaDOCUMENTO(documento);
        }, error => {
          this.showMessage('error', 'Erro', 'ERRO!! Registo não foi Gravado!');
          this.btgravar = false;
        });
      } else {
        this.atualizaDOCUMENTO(documento);
      }
    }

  }


  atualizaDOCUMENTO(documento) {
    this.DOCFICHADOCUMENTOSService.update(documento).subscribe((res) => {
      this.showMessage('success', 'Sucesso', 'Atualizado com sucesso!');

      this.limpar();
      this.router.navigate(['fichadocumento']);

    }, error => {
      this.showMessage('error', 'Erro', 'ERRO!! Registo não foi Gravado!');
      this.btgravar = false;
    });
  }

  limpar() {
    this.referencia_campo = null;
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
    this.caminhoOriginal = null;
    this.descricao = null;
    this.ordem = 0;
    this.nomeAba = null;
    this.iframeURL = "";
    this.uploadedFiles = [];
    this.selectedInstruçãoPredefinida = false;
  }

  //mudar de ecrãs
  cancelar() {
    this.router.navigate(['fichadocumento']);
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

    this.router.navigate(['fichadocumento/editar'], { queryParams: { id: this.idParam } });
  }
  //ao remover ficheiro
  onRemove() {
    this.ficheiro = null;
    this.iframeURL = null;
  }

  novo() {
    this.router.navigate(['fichadocumento/novo']);
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

    if ((this.criar == true || this.editar == true) && this.codigo != null && this.nome != null && this.selectedTipo && this.ficheiro != null && this.nomeAba != null) {
      let dataCheckCode = {};
      dataCheckCode = {
        SECTOR: (this.selectedSector == null || this.selectedSector.length == 0) ? null : this.selectedSector.toString(),
        MAQUINA: (this.selectedMaquina == '') ? null : this.selectedMaquina,
        REFERENCIA: (this.selectedReferencia == '') ? null : this.selectedReferencia,
        ID: (this.idParam == null) ? 0 : this.idParam,
        CODIGO: this.codigo,
      }
      //ver se o código de documento existe
      this.DOCFICHADOCUMENTOSService.checkIfCodeExist([dataCheckCode])
        .subscribe((response) => {
          var existeCodigo = response[0][0];
          if (existeCodigo == true) {
            this.showMessage('warn', 'Aviso', 'Já existe um documento com este código para sector/máquina/referência selecionado!');
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

    /*if (this.selectedSector == null)
      this.showMessage('error', 'Erro', 'É necessário especificar uma linha');*/

    if (this.selectedTipo == null)
      this.showMessage('error', 'Erro', 'É necessário especificar um tipo de documento');

    if (this.ficheiro == null)
      this.showMessage('error', 'Erro', 'É necessário inserir um documento');
  }

  showMessage(severity, summary, detail) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
    this.UploadService.addMessage(this.msgs);
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

