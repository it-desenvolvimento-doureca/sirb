import { Component, OnInit, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICVALIDACAOBASTIDORService } from 'app/servicos/pr-dic-validacao-bastidor.service';
import { PR_DIC_VALIDACAO_BASTIDOR } from 'app/entidades/PR_DIC_VALIDACAO_BASTIDOR';

@Component({
  selector: 'app-validacoes-bastidores',
  templateUrl: './validacoes-bastidores.component.html',
  styleUrls: ['./validacoes-bastidores.component.css']
})
export class ValidacoesBastidoresComponent implements OnInit {
  user: any;
  sectores: any[];
  novo: boolean;
  id_depart_selected: number;

  departs: any[];
  modoedicao: boolean;

  criar: boolean;
  dialognovo: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;
  targetSectores_linha2: any[];
  sourceSectores_linha1: any[];
  targetSectores_linha1: any[];
  sourceSectores_linha2: any[];
  sourceSectores_geral: any[];
  targetSectores_geral: any[];
  descricao: any;
  simbolo: any;
  validacao_bastidor: any;
  cor: any;

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private PRDICVALIDACAOBASTIDORService: PRDICVALIDACAOBASTIDORService,
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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9216editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9216apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9216criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = null;
    this.cor = '#ffffff';
    this.simbolo = null;

    this.dialognovo = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new PR_DIC_VALIDACAO_BASTIDOR;
    if (!this.novo) depart = this.validacao_bastidor;
    depart.simbolo = this.simbolo;
    depart.cor = "#" + this.cor.replace("#", "");
    depart.descricao = this.descricao;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      depart.ativo = true;
      this.PRDICVALIDACAOBASTIDORService.create(depart).subscribe(response => {
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.id_VALIDACAO_BASTIDOR = this.id_depart_selected;
      this.PRDICVALIDACAOBASTIDORService.update(depart).then(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.PRDICVALIDACAOBASTIDORService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].id_VALIDACAO_BASTIDOR, cor: response[x].cor, simbolo: response[x].simbolo, descricao: response[x].descricao, dados: response[x]
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
        var depart = new PR_DIC_VALIDACAO_BASTIDOR;
        depart = this.validacao_bastidor;
        depart.ativo = false;
        depart.data_ANULA = new Date();
        depart.utz_ANULA = this.user;

        this.PRDICVALIDACAOBASTIDORService.update(depart).then(() => {
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
    this.validacao_bastidor = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.simbolo = event.data.simbolo;
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


}