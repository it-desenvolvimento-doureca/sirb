import { Component, OnInit, Renderer } from '@angular/core';
import { DOC_DIC_TIPOS_DOCUMENTO } from 'app/entidades/DOC_DIC_TIPOS_DOCUMENTO';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { DOCDICTIPOSDOCUMENTOService } from 'app/servicos/doc-dic-tipos-documento.service';
import { ConfirmationService } from 'primeng/primeng';



@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {


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

  dados: any;
  predefinido: boolean;
  alerta: boolean;
  cor: string;
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private DOCDICTIPOSDOCUMENTOService: DOCDICTIPOSDOCUMENTOService,
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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11621editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11621apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11621criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.nome = null;
    this.predefinido = false;
    this.alerta = false;
    this.cor = "#ffffff";

    this.dialognovo = true;
  }


  //gravar unidade de depart
  gravar() {
    var depart = new DOC_DIC_TIPOS_DOCUMENTO;
    if (!this.novo) depart = this.dados;
    depart.NOME = this.nome;
    depart.DOCUMENTO_PREDEFINIDO = this.predefinido;
    depart.ALERTA = this.alerta;
    depart.COR_ABA = "#" + this.cor.replace("#", "");


    depart.UTZ_MODIF = this.user;
    depart.DATA_MODIF = new Date();
    delete depart['_$visited'];
    if (this.novo) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      depart.INATIVO = false;
      this.DOCDICTIPOSDOCUMENTOService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.ID = this.id_depart_selected;
      this.DOCDICTIPOSDOCUMENTOService.update(depart).subscribe(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.DOCDICTIPOSDOCUMENTOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].ID, dados: response[x], nome: response[x].NOME,
            cor: response[x].COR_ABA,
            alerta: response[x].ALERTA,
            predefinido: response[x].DOCUMENTO_PREDEFINIDO

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
        var depart = new DOC_DIC_TIPOS_DOCUMENTO;
        depart = this.dados;
        depart.INATIVO = true;
        depart.DATA_ANULA = new Date();
        depart.UTZ_ANULA = this.user;
        delete depart['_$visited'];
        this.DOCDICTIPOSDOCUMENTOService.update(depart).subscribe(() => {
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
    this.predefinido = event.data.predefinido;
    this.alerta = event.data.alerta;
    this.cor = event.data.cor;

    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  ordernar(array) {
    array.sort((n1, n2) => {
      if (n1.nome > n2.nome) {
        return 1;
      }

      if (n1.nome < n2.nome) {
        return -1;
      }

      return 0;
    });
  }

}
