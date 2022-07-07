import { Component, OnInit, Renderer } from '@angular/core';
import { DOC_GESTAO_PASTAS } from 'app/entidades/DOC_GESTAO_PASTAS';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { DOCFICHADOCUMENTOSService } from 'app/servicos/doc-ficha-documentos.service';
import { DOCGESTAOPASTASService } from 'app/servicos/doc-gestao-pastas.service';
import { UploadService } from 'app/servicos/upload.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-localizacoes-alfresco',
  templateUrl: './localizacoes-alfresco.component.html',
  styleUrls: ['./localizacoes-alfresco.component.css']
})
export class LocalizacoesAlfrescoComponent implements OnInit {


  user: any;
  utilizadores: any[];
  novo: boolean;
  id_depart_selected: number;

  departs: any[];
  modoedicao: boolean;

  criar: boolean;
  dialognovo: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;

  nome: any;
  caminho: any;

  dados: any;


  items = [];
  caminho_antigo: any;
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private DOCGESTAOPASTASService: DOCGESTAOPASTASService,
    private UploadService: UploadService,
    private DOCFICHADOCUMENTOSService: DOCFICHADOCUMENTOSService,
    private renderer: Renderer) { }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11623editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11623apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11623criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.nome = null;
    this.caminho = null;
    this.caminho_antigo = null;

    this.dialognovo = true;
  }


  //gravar  
  gravar() {
    this.DOCGESTAOPASTASService.verificaCAMINHO(this.id_depart_selected, this.caminho).subscribe(response => {
      var count = Object.keys(response).length;
      if (count > 0) {
        this.showMessage('warn', 'Aviso', 'Já existe uma Localização com o mesmo caminho!');
      } else {
        if (this.novo || this.caminho != this.caminho_antigo) {
          this.criar_altera_pasta_alfresco(this.novo, this.id_depart_selected);
        } else {
          this.gravar2(null);
        }
      }
    },
      error => {
        console.log(error);
        if (this.novo || this.caminho != this.caminho_antigo) {
          this.criar_altera_pasta_alfresco(this.novo, this.id_depart_selected);
        } else {
          this.gravar2(null);
        }
      });
  }

  gravar2(id_pasta) {
    var depart = new DOC_GESTAO_PASTAS;
    if (!this.novo) depart = this.dados;
    depart.NOME = this.nome;
    depart.CAMINHO = this.caminho;
    if (id_pasta != null) depart.ID_PASTA = id_pasta;


    depart.UTZ_MODIF = this.user;
    depart.DATA_MODIF = new Date();
    delete depart['_$visited'];
    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      //depart.INATIVO = false;
      this.DOCGESTAOPASTASService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.DOCGESTAOPASTASService.update(depart).subscribe(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }

  criar_altera_pasta_alfresco(novo, id) {
    let data = {};
    data = {
      caminho: this.caminho,
      novo: novo,
      id: id
    }
    this.DOCFICHADOCUMENTOSService.createNodeFolder(data).subscribe((res) => {
      this.gravar2(res);
    }, error => {
      this.showMessage('error', 'Erro', 'ERRO!! Registo não foi Gravado!');

    });
  }

  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.DOCGESTAOPASTASService.getAll().subscribe(
      response => {
        for (var x in response) {
          var items = [];
          if (response[x].CAMINHO != null && response[x].CAMINHO != '') {
            var item = response[x].CAMINHO.split('/')
            for (var y in item) {
              items.push({ label: item[y] });
            }
          }
          this.departs.push({
            id: response[x].ID, dados: response[x], nome: response[x].NOME,
            caminho: response[x].CAMINHO, items: items
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }

  apagar() {
    this.dialognovo = false;
    setTimeout(() => { this.apagardados() }, 100);
  }

  //apagar zona
  apagardados() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        /* var depart = new DOC_GESTAO_PASTAS;
         depart = this.dados;
         depart.INATIVO = true;
         depart.DATA_ANULA = new Date();
         depart.UTZ_ANULA = this.user;
         delete depart['_$visited'];
         this.DOCGESTAOPASTASService.update(depart).subscribe(() => {
           this.listar_departs();
           this.dialognovo = false;
         });*/
        this.DOCGESTAOPASTASService.delete(this.id_depart_selected).then(() => {
          this.listar_departs();
          this.dialognovo = false;
        });
      }, reject: () => {
        this.dialognovo = true;
      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.dados = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.nome = event.data.nome;
    this.caminho = event.data.caminho;
    this.caminho_antigo = event.data.caminho;
    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  atualizaItems(caminho) {
    this.items = [];
    if (caminho != null && caminho != '') {
      var items = caminho.split('/')
      for (var x in items) {
        this.items.push({ label: items[x] });
      }
    }
  }

  showMessage(severity, summary, detail) {
    var msgs = [];
    msgs.push({ severity: severity, summary: summary, detail: detail });
    this.UploadService.addMessage(msgs);
  }


}
