import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { DataTable } from 'primeng/primeng';
import { PAMOVCABService } from 'app/servicos/pa-mov-cab.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';

@Component({
  selector: 'app-listaacoes',
  templateUrl: './listaacoes.component.html',
  styleUrls: ['./listaacoes.component.css']
})
export class ListaacoesComponent implements OnInit {
  dados: any[];

  yearTimeout: any;
  @ViewChild(DataTable) dataTableComponent: DataTable;
  estados = [{ label: "Sel. Estado", value: null }, { label: "Pendente", value: "Pendente" }, { label: "Lida", value: "Lida" }, { label: "Em Curso", value: "Em Curso" }, { label: "Planeado", value: "Planeado" },
  { label: "Desenvolvida/Realizada", value: "Desenvolvida/ Realizada" }, { label: "Controlada/Verificada", value: "Controlada/ Verificada" },
  { label: "Aprovada", value: "Aprovada" }, { value: "Não Respondida", label: "Não Respondida" }, { value: "Rejeitada", label: "Rejeitada" }, { value: "Cancelada", label: "Cancelada" }];
  tipo: any;
  caminho: string;
  estado_filtro = [];

  FastResponse = false;
  acoes_em_ATRASO = false;

  constructor(private PAMOVCABService: PAMOVCABService, private route: ActivatedRoute,
    private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

  ngOnInit() {

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(true);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);


    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    var node = "node155";
    this.tipo = "T";
    this.caminho = urlarray[0];


    //if (this.tipo != "T") {
    this.estado_filtro = ["Pendente", "Lida", "Em Curso","Planeado"];
    this.filtrar(this.estado_filtro, "estado", true, "in");
    // }

    if (this.tipo == 'T') {
      this.globalVar.setcriar(false);
    }
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == node + "apagar"));



    this.carregarlista(this.tipo);
  }

  carregarlista(tipo) {
    this.dados = [];
    //acoes_em_ATRASO
    var filtros = [{ FASTRESPONSE: this.FastResponse, EM_ATRASO: this.acoes_em_ATRASO }];
    this.PAMOVCABService.getPA_MOV_CABbyTIPOaccoes(tipo, filtros).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {

            var cor = "";

            var cor_letra = "";

            var data = this.formatDate(new Date());


            if (new Date(response[x][8]).getTime() < new Date(data).getTime()) {
              cor = "red";
              cor_letra = "white";
            } else if (new Date(response[x][8]).getTime() == new Date(data).getTime()) {
              cor = "yellow";
            }



            if ((response[x][18] != "P" && response[x][18] != "L" && response[x][18] != "E") || response[x][18] == null) { cor = ""; cor_letra = ""; }

            this.dados.push({
              id: response[x][0], cor: cor, cor_letra: cor_letra,
              data_objetivo: (response[x][2] == null) ? "" : this.formatDate(response[x][2]),
              utilizador: response[x][5],

              data_acao: response[x][8],
              utilizador_acao: response[x][9],
              departamento: response[x][19],
              acao: response[x][10],
              tipo_acao: response[x][16],
              descricao: response[x][11],
              ambito: response[x][15],
              origem: response[x][4],
              estado: this.geEstadoTarefa(response[x][18]),
              id_tarefa: response[x][17]
            });
          }

          this.dados = this.dados.slice();

        }
      }, error => { console.log(error); });

  }



  atualizar() {
    this.carregarlista(this.tipo);
  }


  getestado(valor) {
    if (valor == "E") {
      return "Em Elaboração"
    } if (valor == "P") {
      return "Planeado"
    } else if (valor == "I") {
      return "Desenvolvido/ Realizado"
    } else if (valor == "C") {
      return "Controlado/ Verificado"
    } else if (valor == "V") {
      return "Aprovado/ Finalizado"
    } else if (valor == "R") {
      return "Rejeitado"
    } else if (valor == "A") {
      //return "Anulado"
    } else if (valor == "D") {
      return "Cancelado"
    }
  }

  geEstadoTarefa(estado) {
    var estados = "";
    switch (estado) {
      case 'P':
        estados = "Pendente";
        break;
      case 'L':
        estados = "Lida";
        break;
      case 'E':
        estados = "Em Curso";
        break;
      case 'C':
        estados = "Desenvolvida/ Realizada";
        break;
      case 'A':
        estados = "Cancelada";
        break;
      case 'R':
        estados = "Rejeitada";
        break;
      case 'N':
        estados = "Não Respondida";
        break;
      case 'F':
        estados = "Aprovada";
        break;
      case 'V':
        estados = "Controlada/ Verificada";
        break;
      default:
        estados = "Pendente";
    }
    return estados;
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate([this.caminho + '/view'], { queryParams: { id: event.data.id } });
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

  //filtro coluna linha
  filtrar(value, coluna, fil = false, filtro = "contains") {
    if (this.yearTimeout) {
      clearTimeout(this.yearTimeout);
    }

    this.yearTimeout = setTimeout(() => {
      if (value == 0 && fil) {
        value = "";
      }
      if (value != null) {
        value = value.toString();
      }

      this.dataTableComponent.filter(value, coluna, filtro);


    }, 250);
  }

  IrParaTarefa(id) {
    this.router.navigateByUrl('tarefas/view?listar=true&id=' + id + "&redirect=listaacoes");
  }

  IrParaPlano(id) {
    this.router.navigateByUrl('planosacao/view?id=' + id + "&redirect=listaacoes");
  }



}
