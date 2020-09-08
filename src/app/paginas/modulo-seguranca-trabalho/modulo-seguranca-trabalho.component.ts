import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ATOCORRENCIASService } from 'app/servicos/at-ocorrencias.service';

@Component({
  selector: 'app-modulo-seguranca-trabalho',
  templateUrl: './modulo-seguranca-trabalho.component.html',
  styleUrls: ['./modulo-seguranca-trabalho.component.css']
})
export class ModuloSegurancaTrabalhoComponent implements OnInit {
  dados = [];
  constructor(private ATOCORRENCIASService: ATOCORRENCIASService, private renderer: Renderer, private router: Router, private globalVar: AppGlobals) { }

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
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23apagar"));

    this.carregarlista();
  }

  carregarlista() {
    this.dados = [];
    this.ATOCORRENCIASService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          for (var x in response) {
            this.dados.push({
              n_relatorio: response[x].id_OCORRENCIA,
              data_registo: (response[x].data_CRIA == null) ? "" : this.formatDate(response[x].data_CRIA),
              tipo: this.gettiposOcorrencia(response[x].tipo_RELATORIO, response[x].com_BAIXA),
              numero: response[x].numero_PESSOA,
              nome: response[x].nome_PESSOA,
              data_ocorrencia: (response[x].data_ACIDENTE == null) ? "" : this.formatDate(response[x].data_ACIDENTE) + " " + ((response[x].hora_ACIDENTE == null) ? null : response[x].hora_ACIDENTE.slice(0, 5)),
              local: response[x].local_ACIDENTE,
              estado: this.getestado(response[x].estado),
            });
          }

          this.dados = this.dados.slice();
        }
      }, error => { console.log(error); });

  }

  atualizar() {
    this.carregarlista();
  }


  gettipo(valor) {
    if (valor == "OP") {
      return "Ocorrência Perigosa";
    } else if (valor == "E") {
      return "Emergência/1ºs socorros";
    } else if (valor == "CB") {
      return "Com Baixa";
    } else if (valor == "SB") {
      return "Sem Baixa";
    }
  }

  getestado(valor) {
    if (valor == "E") {
      return "Aberta"
    } else if (valor == "F") {
      return "Fechadda"
    } else if (valor == "A") {
      return "Anulada"
    }
  }

  //clicar 2 vezes na tabela abre linha
  abrir(event) {
    this.router.navigate(['seguranca_trabalho/view'], { queryParams: { id: event.data.n_relatorio } });
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


  gettiposOcorrencia(tipo, baixa) {
    if (tipo == "OP") {
      return "Ocorrência Perigosa";
    } else if (tipo == "E") {
      return "Emergência/1ºs Socorros";
    } else if (tipo == "CB") {
      return "Acidente de Trabalho Com Baixa";
    } else if (tipo == "SB") {
      return "Acidente de Trabalho Sem Baixa";
    } else if (tipo == "AT" && baixa) {
      return "Acidente de Trabalho Com Baixa";
    } else if (tipo == "AT" && !baixa) {
      return "Acidente de Trabalho Sem Baixa";
    }
  }
}
