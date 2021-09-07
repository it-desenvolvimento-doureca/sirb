import { Component, OnInit } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { FICHEIROTNTService } from 'app/servicos/ficheiro-tnt.service';

@Component({
  selector: 'app-analise-envios',
  templateUrl: './analise-envios.component.html',
  styleUrls: ['./analise-envios.component.css']
})
export class AnaliseEnviosComponent implements OnInit {
  dados: any;
  mensagemtabela: string;
  cols = [];
  constructor(private globalVar: AppGlobals, private FICHEIROTNTService: FICHEIROTNTService) { }

  ngOnInit() {

    //this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.cols = [
      { field: 'consign_NO', header: 'Consignment number', width : '6%' },
      { field: 'account_KEY', header: 'Client country/Acc key', width : '6%'  },
      { field: 'customer_REF', header: 'Customer reference', width : '6%'  },
      { field: 'con_CREATE_DATE', header: 'Pickup Date', width : '6%'  },
      { field: 'con_DELIVERED_DATE', header: 'Delivered Date', width : '6%'  },
      { field: 'status_DESC', header: 'Status description', width : '210px'  },
      { field: 'summary_STAT', header: 'Summary Status', width : '6%'  },
      { field: 'status_CODE', header: 'Status Code', width : '6%'  },
      { field: 'signed_BY', header: 'Receipt status', width : '6%'  },
      { field: 'event_DATE_LOCAL', header: 'Event Date (local)', width : '6%'  },
      { field: 'event_TIME_LOCAL', header: 'Event Time (local)', width : '6%'  },
     /* { field: 'event_DATE_GMT', header: 'Event Date (GMT)' },
      { field: 'event_TIME_GMT', header: 'Event Time (GMT)' },*/
      { field: 'sernder_NAME', header: 'Sender Name', width : '6%'  },
      { field: 'receiver_NAME', header: 'Receiver Name', width : '210px' },
      { field: 'receiver_CITY', header: 'Receiver City', width : '6%'  },
      { field: 'receiver_POSTCODE', header: 'Receiver Post code', width : '6%'  },
      { field: 'receiver_CNTRYCDE', header: 'Receiver Country code', width : '6%'  }
    ];

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setatualizar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node162101apagar"));


    this.carregarlista();


  }
  carregarlista() {
    var count = 0;
    this.mensagemtabela = "A Carregar...";

    this.dados = [];
    this.FICHEIROTNTService.getAll().subscribe(
      response => {
        var count = Object.keys(response).length;
        if (count == 0) {
          this.mensagemtabela = "Nenhum Registo foi encontrado...";
        }
        for (var x in response) {

          this.dados.push({
            id: response[x].id,
            consign_NO: response[x].consign_NO,
            account_KEY: response[x].account_KEY,
            customer_REF: response[x].customer_REF,
            con_CREATE_DATE: (response[x].event_DATE_LOCAL == null) ? '' : this.formatDate(response[x].con_CREATE_DATE),
            con_DELIVERED_DATE: (response[x].con_DELIVERED_DATE == null) ? '' : this.formatDate(response[x].con_DELIVERED_DATE),
            status_DESC: response[x].status_DESC,
            summary_STAT: response[x].summary_STAT,
            status_CODE: response[x].status_CODE,
            signed_BY: response[x].signed_BY,
            event_DATE_LOCAL: (response[x].event_DATE_LOCAL == null) ? '' : this.formatDate(response[x].event_DATE_LOCAL),
            event_TIME_LOCAL: (response[x].event_TIME_LOCAL == null) ? '' : response[x].event_TIME_LOCAL.slice(0, 5),
            event_DATE_GMT: (response[x].event_DATE_GMT == null) ? '' : this.formatDate(response[x].event_DATE_GMT),
            event_TIME_GMT: (response[x].event_TIME_GMT == null) ? '' : response[x].event_TIME_GMT.slice(0, 5),
            sernder_NAME: response[x].sernder_NAME,
            receiver_NAME: response[x].receiver_NAME,
            receiver_CITY: response[x].receiver_CITY,
            receiver_POSTCODE: response[x].receiver_POSTCODE,
            receiver_CNTRYCDE: response[x].receiver_CNTRYCDE,
            data_CRIA: response[x].data_CRIA,
            data_MODIF: response[x].data_MODIF,
          });

        }
        this.dados = this.dados.slice();
      },
      error => { this.mensagemtabela = "Nenhum Registo foi encontrado..."; console.log(error); });

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

  atualizar() {
    this.carregarlista();
  }

}
