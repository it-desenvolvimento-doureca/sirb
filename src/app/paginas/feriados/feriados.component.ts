import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { GER_FERIADOS } from 'app/entidades/GER_FERIADOS';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERFERIADOSService } from 'app/servicos/ger-feriados.service';

@Component({
  selector: 'app-feriados',
  templateUrl: './feriados.component.html',
  styleUrls: ['./feriados.component.css']
})
export class FeriadosComponent implements OnInit {
  departs: any[];
  novo: boolean;
  cor_depart: string;
  nome_depart: string;
  id_depart_selected: number;
  novadepart: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  descricao: string;
  data: Date;
  modoedicao: boolean;
  criar: boolean;
  apagar: boolean;
  departamento: GER_FERIADOS;
  user: any;
  ano: number = new Date().getFullYear();
  dialogfinssemana: boolean;
  conta_FATURACAO: any;

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private GERFERIADOSService: GERFERIADOSService, private renderer: Renderer) { }
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

    this.modoedicao = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1101editar");
    this.criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1101criar");
    this.apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1101apagar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.listar_departs();

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = "";
    this.conta_FATURACAO = false;
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    var depart = new GER_FERIADOS;
    if (!this.novo) depart = this.departamento;
    depart.descricao = this.descricao;
    depart.conta_FATURACAO = this.conta_FATURACAO;
    depart.data = this.data;

    if (this.novo) {

      this.GERFERIADOSService.create(depart).subscribe(response => {
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      depart.id_FERIADO = this.id_depart_selected;
      this.GERFERIADOSService.update(depart).then(() => {
        this.listar_departs();
        this.simular(this.closedialog);
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.GERFERIADOSService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.departs.push({
            id: response[x].id_FERIADO, ano: new Date(response[x].data).getFullYear(), conta_FATURACAO: response[x].conta_FATURACAO
            , data: this.formatDate(response[x].data), descricao: response[x].descricao, dados: response[x]
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }


  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


  //apagar depart
  apagardeparts() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {

        this.GERFERIADOSService.delete(this.id_depart_selected).then(() => {
          this.listar_departs();
          this.simular(this.closedialog);
        });

      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.departamento = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.conta_FATURACAO = event.data.conta_FATURACAO;
    this.data = event.data.data;

    this.novo = false;
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  ver_fim_de_semanas() {
    var toDate = new Date(this.ano, 11, 31);
    var fromDate = new Date(this.ano, 0, 1);

    var weekendDayCount = 0;
    var days = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    while (fromDate < toDate) {
      fromDate.setDate(fromDate.getDate() + 1);
      if (fromDate.getDay() === 0 || fromDate.getDay() == 6) {
        var depart = new GER_FERIADOS;
        depart.descricao = "Fim de Semana - " + days[fromDate.getDay()];
        depart.data = fromDate;
        depart.conta_FATURACAO = false;
        if (!this.departs.find(item => item.data == this.formatDate(fromDate))) this.gravarfinsdesemana(depart);
      }
    }
    this.dialogfinssemana = false;
    this.listar_departs();
  }


  //gravar unidade de depart
  gravarfinsdesemana(depart) {
    this.GERFERIADOSService.create(depart).subscribe(response => {

    },
      error => console.log(error));
  }

}