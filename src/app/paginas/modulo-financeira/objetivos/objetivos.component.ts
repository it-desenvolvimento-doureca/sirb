import { Component, OnInit, Renderer } from '@angular/core';
import { FINDICOBJETIVOSService } from 'app/servicos/fin-dic-objetivos.service';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { FIN_DIC_OBJETIVOS } from 'app/entidades/FIN_DIC_OBJETIVOS';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  novo: boolean;
  dialognovo: boolean;

  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;
  ano;
  mes;
  valor_OBJETIVO;
  hora_INICIO;
  n_DIAS_UTEIS;

  dados: any[];
  anos = [];
  meses = [];
  id_OBJETIVO: number;

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private FINDICOBJETIVOSService: FINDICOBJETIVOSService, private renderer: Renderer) { }


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


    this.anos.push({ label: 'Selecionar Ano', value: '' });
    this.meses.push({ label: 'Selecionar Mês', value: '' });
    this.meses.push({ label: 'Janeiro', value: 1 });
    this.meses.push({ label: 'Fevereiro', value: 2 });
    this.meses.push({ label: 'Março', value: 3 });
    this.meses.push({ label: 'Abril', value: 4 });
    this.meses.push({ label: 'Maio', value: 5 });
    this.meses.push({ label: 'Junho', value: 6 });
    this.meses.push({ label: 'Julho', value: 7 });
    this.meses.push({ label: 'Agosto', value: 8 });
    this.meses.push({ label: 'Setembro', value: 9 });
    this.meses.push({ label: 'Outubro', value: 10 });
    this.meses.push({ label: 'Novembro', value: 11 });
    this.meses.push({ label: 'Dezembro', value: 12 });
    for (var x = 2000; x <= 2100; x++) {
      this.anos.push({ label: x, value: x });
    }

    this.listar();
  }




  //gravar unidade de zona
  gravardados() {
    var OBJE = new FIN_DIC_OBJETIVOS;
    OBJE.ano = this.ano;
    OBJE.mes = this.mes;
    OBJE.valor_OBJETIVO = this.valor_OBJETIVO;
    OBJE.n_DIAS_UTEIS = this.n_DIAS_UTEIS;

    if (this.novo) {
      this.FINDICOBJETIVOSService.create(OBJE).subscribe(response => {
        this.listar();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      OBJE.id_OBJETIVO = this.id_OBJETIVO;

      this.FINDICOBJETIVOSService.update(OBJE).then(() => {
        this.listar();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    var month = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    this.FINDICOBJETIVOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            id_OBJETIVO: response[x].id_OBJETIVO,
            ano: response[x].ano,
            mes: response[x].mes,
            mes_nome: month[response[x].mes - 1],
            valor_OBJETIVO: response[x].valor_OBJETIVO,
            n_DIAS_UTEIS: response[x].n_DIAS_UTEIS,
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

        this.FINDICOBJETIVOSService.delete(this.id_OBJETIVO).then(() => {
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
      this.id_OBJETIVO = event.data.id_OBJETIVO;
      this.ano = event.data.ano;
      this.mes = event.data.mes;
      this.valor_OBJETIVO = event.data.valor_OBJETIVO;
      this.n_DIAS_UTEIS = event.data.n_DIAS_UTEIS;

      this.novo = false;
      this.dialognovo = true;
    }
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.id_OBJETIVO = null;
    this.ano = new Date().getFullYear();
    this.mes = null;
    this.valor_OBJETIVO = null;
    this.n_DIAS_UTEIS = null;
    this.dialognovo = true;
  }

}

