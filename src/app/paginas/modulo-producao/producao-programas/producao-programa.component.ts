import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { GERDICPROGRAMAService } from 'app/servicos/ger-dic-programa.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GER_DIC_PROGRAMA } from 'app/entidades/GER_DIC_PROGRAMA';
import { GERDICVEICULOService } from 'app/servicos/ger-dic-veiculo.service';

@Component({
  selector: 'app-producao-programa',
  templateUrl: './producao-programa.component.html',
  styleUrls: ['./producao-programa.component.css']
})
export class ProducaoProgramaComponent implements OnInit {
  user: any;
  novo: boolean;
  id_selected: number;
  nome: string;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  tabela: GER_DIC_PROGRAMA;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;
  id_VEICULO: number;
  veiculos: any[];

  num_existe = false;
  class_numexiste = "";

  constructor(private confirmationService: ConfirmationService, private GERDICPROGRAMAService: GERDICPROGRAMAService, private globalVar: AppGlobals,
    private renderer: Renderer, private GERDICVEICULOService: GERDICVEICULOService) { }

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

    this.carregarVeiculos();
    this.listar_departs();
  }

  carregarVeiculos() {
    this.veiculos = [];
    this.veiculos.push({ value: "", label: "Selecionar Veículo" });
    this.GERDICVEICULOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.veiculos.push({
            value: response[x][0].id_VEICULO, label: response[x][0].nome
          });
        }
        this.veiculos = this.veiculos.slice();
      },
      error => console.log(error));

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.resetclass();
    this.novo = true;
    this.id_selected = 0;
    this.nome = "";
    this.id_VEICULO = null;
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    this.resetclass();
    var dados = new GER_DIC_PROGRAMA;
    if (!this.novo) dados = this.tabela;
    dados.nome = this.nome;
    dados.id_VEICULO = this.id_VEICULO;

    /*.utz_MODIF = this.user;
    dados.data_MODIF = new Date();*/

    this.GERDICPROGRAMAService.verifica(dados).subscribe(
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
    if (this.novo) {
      /*dados.utz_CRIA = this.user;
      dados.data_CRIA = new Date();*/
      this.GERDICPROGRAMAService.create(dados).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      dados.id_PROGRAMA = this.id_selected;
      this.GERDICPROGRAMAService.update(dados).then(() => {
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
    this.GERDICPROGRAMAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x][0].id_PROGRAMA, veiculo: response[x][1], oem: response[x][2],
            id_VEICULO: response[x][0].id_VEICULO, nome: response[x][0].nome, dados: response[x][0]
          });
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
        var dados = new GER_DIC_PROGRAMA;
        dados = this.tabela;
        this.GERDICPROGRAMAService.delete(dados.id_PROGRAMA).then(() => {
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
    this.id_VEICULO = event.data.id_VEICULO;
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
