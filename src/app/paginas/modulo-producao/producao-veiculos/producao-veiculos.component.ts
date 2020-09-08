import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GER_DIC_VEICULO } from 'app/entidades/GER_DIC_VEICULO';
import { ConfirmationService } from 'primeng/primeng';
import { GERDICVEICULOService } from 'app/servicos/ger-dic-veiculo.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERDICOEMService } from 'app/servicos/ger-dic-oem.service';

@Component({
  selector: 'app-producao-veiculos',
  templateUrl: './producao-veiculos.component.html',
  styleUrls: ['./producao-veiculos.component.css']
})
export class ProducaoVeiculosComponent implements OnInit {
  user: any;
  novo: boolean;
  id_selected: number;
  nome: string;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  tabela: GER_DIC_VEICULO;
  departs: any[];
  modoedicao: boolean;
  apagar: boolean;
  criar: boolean;
  id_OEM: number;
  oems: any[];

  num_existe = false;
  class_numexiste = "";

  constructor(private confirmationService: ConfirmationService, private GERDICVEICULOService: GERDICVEICULOService, private globalVar: AppGlobals,
    private renderer: Renderer, private GERDICOEMService: GERDICOEMService) { }

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

    this.carregarOEM();
    this.listar_departs();
  }

  carregarOEM() {
    this.oems = [];
    this.oems.push({ value: "", label: "Selecioanr OEM" });
    this.GERDICOEMService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.oems.push({
            value: response[x].id_OEM, label: response[x].nome
          });
        }
        this.oems = this.oems.slice();
      },
      error => console.log(error));

  }


  //abre popup para adicionar depart
  showDialogToAdd() {
    this.resetclass();
    this.novo = true;
    this.id_selected = 0;
    this.nome = "";
    this.id_OEM = null;
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    this.resetclass();
    var dados = new GER_DIC_VEICULO;
    if (!this.novo) dados = this.tabela;
    dados.nome = this.nome;
    dados.id_OEM = this.id_OEM;
    this.GERDICVEICULOService.verifica(dados).subscribe(
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
      this.GERDICVEICULOService.create(dados).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      dados.id_VEICULO = this.id_selected;
      this.GERDICVEICULOService.update(dados).then(() => {
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
    this.GERDICVEICULOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x][0].id_VEICULO, oem: response[x][1],
            id_OEM: response[x][0].id_OEM, nome: response[x][0].nome, dados: response[x][0]
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
        var dados = new GER_DIC_VEICULO;
        dados = this.tabela;
        this.GERDICVEICULOService.delete(dados.id_VEICULO).then(() => {
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
    this.id_OEM = event.data.id_OEM;
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
