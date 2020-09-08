import { Component, OnInit, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { FINDICTIPODOCService } from 'app/servicos/fin-dic-tipo-doc.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { FIN_DIC_TIPO_DOC } from 'app/entidades/FIN_DIC_TIPO_DOC';

@Component({
  selector: 'app-tipos-documento',
  templateUrl: './tipos-documento.component.html',
  styleUrls: ['./tipos-documento.component.css']
})
export class TiposDocumentoComponent implements OnInit {
  novo: boolean;
  dialognovo: boolean;

  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;

  dados: any[];

  tipos = [];
  id_TIPO: number;
  nome_DOCUMENTO;
  tipo_DOCUMENTO

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private FINDICTIPODOCService: FINDICTIPODOCService, private renderer: Renderer) { }


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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node828editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node828apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node828criar");


    this.tipos.push({ label: 'Selecionar Tipo', value: '' });
    this.tipos.push({ label: 'Crédito', value: 'C' });
    this.tipos.push({ label: 'Débito', value: 'D' });


    this.listar();
  }




  //gravar unidade de zona
  gravardados() {
    var tipo = new FIN_DIC_TIPO_DOC;
    tipo.tipo_DOCUMENTO = this.tipo_DOCUMENTO;
    tipo.nome_DOCUMENTO = this.nome_DOCUMENTO;

    if (this.novo) {
      this.FINDICTIPODOCService.create(tipo).subscribe(response => {
        this.listar();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      tipo.id = this.id_TIPO;

      this.FINDICTIPODOCService.update(tipo).then(() => {
        this.listar();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];

    this.FINDICTIPODOCService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            id_TIPO: response[x].id,
            nome_DOCUMENTO: response[x].nome_DOCUMENTO,
            tipo_DOCUMENTO: response[x].tipo_DOCUMENTO,
            descricao: (response[x].tipo_DOCUMENTO == 'C') ? 'Crédito' : 'Débito'
          });
        }
        this.dados = this.dados.slice();
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

        this.FINDICTIPODOCService.delete(this.id_TIPO).then(() => {
          this.listar();
        });
      }, reject: () => {
        this.dialognovo = true;
      }
    });
  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    if (this.acesso_editar) {
      this.id_TIPO = event.data.id_TIPO;
      this.nome_DOCUMENTO = event.data.nome_DOCUMENTO;
      this.tipo_DOCUMENTO = event.data.tipo_DOCUMENTO;
      this.novo = false;
      this.dialognovo = true;
    }
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_TIPO = null;
    this.nome_DOCUMENTO = null;
    this.tipo_DOCUMENTO = null;
    this.dialognovo = true;
  }

}

