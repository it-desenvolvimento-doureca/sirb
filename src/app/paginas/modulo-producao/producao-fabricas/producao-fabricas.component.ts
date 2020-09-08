import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERDICFABRICAService } from 'app/servicos/ger-dic-fabrica.service';
import { GER_DIC_FABRICA } from 'app/entidades/GER_DIC_FABRICA';
@Component({
  selector: 'app-producao-fabricas',
  templateUrl: './producao-fabricas.component.html',
  styleUrls: ['./producao-fabricas.component.css']
})
export class ProducaoFabricasComponent implements OnInit {
  user: any;
  novo: boolean;
  id_selected: number;
  nome: string;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  tabela: GER_DIC_FABRICA;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;

  num_existe = false;
  class_numexiste = "";

  constructor(private confirmationService: ConfirmationService, private GERDICFABRICAService: GERDICFABRICAService, private globalVar: AppGlobals,
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

    this.modoedicao = true;
    this.criar = true;
    this.apagar = true;



    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.resetclass();
    this.novo = true;
    this.id_selected = 0;
    this.nome = "";
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    this.resetclass();
    var dados = new GER_DIC_FABRICA;
    if (!this.novo) dados = this.tabela;
    dados.nome = this.nome;
    this.GERDICFABRICAService.verifica(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.num_existe = true;
          this.class_numexiste = "num_existe";
        } else {
          this.gravar_dados(dados);
        }
      },
      error => console.log(error));
  }

  gravar_dados(dados) {
    /*.utz_MODIF = this.user;
    dados.data_MODIF = new Date();*/

    if (this.novo) {
      /*dados.utz_CRIA = this.user;
      dados.data_CRIA = new Date();*/
      this.GERDICFABRICAService.create(dados).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      dados.id_FABRICA = this.id_selected;
      this.GERDICFABRICAService.update(dados).then(() => {
        this.listar_departs();
        this.simular(this.closedialog);
      });

    }
  }


  resetclass() {
    this.num_existe = false;
    this.class_numexiste = "";
  }

  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.GERDICFABRICAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({ id: response[x].id_FABRICA, nome: response[x].nome, dados: response[x] });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }



  //apagar depart
  apagardeparts() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var dados = new GER_DIC_FABRICA;
        dados = this.tabela;
        this.GERDICFABRICAService.delete(dados.id_FABRICA).then(() => {
          this.listar_departs();
          this.simular(this.closedialog);
        });

      }
    });

  }

  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.resetclass();
    this.tabela = event.data.dados;
    this.id_selected = event.data.id;
    this.nome = event.data.nome;
    this.novo = false;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}