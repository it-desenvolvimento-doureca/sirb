import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment-timezone';
<<<<<<< HEAD
import { GTMOVTAREFASService } from 'app/servicos/gt-mov-tarefas.service';

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

<<<<<<< HEAD
  titulo_evento: any;
  calOptions: any;
  events: any[] = [];
  events2: any[] = [];
  anos = [];
  @ViewChild('abrirpopup') abrirpopup: ElementRef;
  @ViewChild('fecharpopup') fecharpopup: ElementRef;
  user: any;
  popOverTitle: string;
  origem: string;
  caminho_origem: string;
  tempo_gasto: any;
  descricao: any;
  percentagem_conclusao: any;
  observacoes: any;
  utz_encaminhado: any;
  id_RECLAMACAO: any;

  nome_tarefa: any;
  utz_origem: any;
  data_atribuicao: string;
  encaminhado: any;
  data_encaminhado: string;
  prazo_conclusao: string;
  prioridade: any;
  estado: any;

  cliente: any;
  referencia: string;
  caminho_tarefa: string;
  feriado: any;
  modoedicao = false;
  atribuido: any;
  constructor(private renderer: Renderer, private GTMOVTAREFASService: GTMOVTAREFASService) { }

  ngOnInit() {
    this.calOptions = {

      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listWeek'
      },
      viewRender: (view, element) => {

        var ano = new Date(view.calendar.currentDate).getFullYear();
        if (!this.anos.find(item => item == ano)) {
          this.anos.push(ano)
          this.getFeriados(ano);
          this.getFeriadosMunicipal(ano);
        }
      },
      timezone: "Europe/Lisbon"
    };

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    var data = [{
      utilizador: this.user, tipo_utilizador: 'u', estado: null, utilizador_grupo: null,
      datacria1: null, datacria2: null, datafim1: null, datafim2: null,
      accao: null
    }];



    this.GTMOVTAREFASService.getbyFiltros(data).subscribe(resp => {

      for (var x in resp) {

        var estados = "";

        switch (resp[x][8]) {
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
            estados = "Concluída";
            break;
          case 'A':
            estados = "Cancelada";
            break;
          case 'R':
            estados = "Rejeitada";
            break;
          default:
            estados = "Pendente";
        }


        var atribuido = "";
        if (resp[x][16] != null) {
          atribuido = resp[x][16];
        } else {
          atribuido = resp[x][3];
        }


        this.events2.push({
          title: resp[x][0],
          utz_origem: resp[x][1],
          dep_origem: "",
          "start": (resp[x][2] != null) ? this.formatDate(this.formatData(resp[x][2]) + " " + new Date(resp[x][2]).toLocaleTimeString()) : null,
          atribuido: atribuido,
          encaminhado: resp[x][4],
          data_encaminhado: (resp[x][5] != null) ? this.formatDate(resp[x][5]) : null,
          "end": (resp[x][6] != null) ? this.formatDate(this.formatData(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString()) : null,
          prazo_conclusao: (resp[x][6] != null) ? this.formatDate(this.formatData(resp[x][6]) + " " + new Date(resp[x][6]).toLocaleTimeString()) : null,
          prioridade: resp[x][7],
          estado: estados,
          cliente: resp[x][9],
          referencia: resp[x][10] + "" + resp[x][11],
          data_conclusao: (resp[x][12] != null) ? this.formatDate(resp[x][12]) : null,
          utz_concluiu: resp[x][13],
          "id": resp[x][14],
          "color": (resp[x][8] == 'C') ? '#257e4a' : 'red',
          feriado: false,
          step: resp[x][27],
          origem: resp[x][15],
          descricao: resp[x][18],
          tempo_gasto: resp[x][19],
          percentagem_conclusao: resp[x][17],
          observacoes: resp[x][21]
        });
      }

      //this.events = this.events2;
      //var data2 = this.formatDate("2019-03-19 10:15");
      this.events = this.events2.slice();
      var ano = new Date().getFullYear();
      if (!this.anos.find(item => item == ano)) {
        this.anos.push(ano)
        this.getFeriados(ano);
        this.getFeriadosMunicipal(ano);
      }


    }, error => {
      console.log(error);
      var ano = new Date().getFullYear();
      this.getFeriados(ano);
      this.getFeriadosMunicipal(ano);
    });

  }


  getFeriados(ano) {
    var arrayferiado = this.events;

    this.GTMOVTAREFASService.getFeriados('http://services.sapo.pt/Holiday/GetNationalHolidays?year=' + ano).subscribe(resp2 => {

      var array = resp2.GetNationalHolidaysResponse.GetNationalHolidaysResult[0].Holiday;

      for (var y in array) {

        this.events.push({
          title: array[y].Name[0],
          description: array[y].Description[0],
          utz_origem: null,
          dep_origem: "",
          "start": new Date(array[y].Date[0]),
          atribuido: null,
          encaminhado: null,
          data_encaminhado: null,
          "end": null,
          prioridade: null,
          estado: null,
          cliente: null,
          referencia: null,
          data_conclusao: null,
          utz_concluiu: null,
          "id": null,
          "color": 'yellow',
          "allDay": true,
          textColor: 'black',
          feriado: true,
          step: null,
          origem: null,
          descricao: null,
          tempo_gasto: null,
          percentagem_conclusao: null,
          observacoes: null,
          prazo_conclusao: null

        });
      }

    });

  }





  getFeriadosMunicipal(ano) {
    var arrayferiado = this.events;

    this.GTMOVTAREFASService.getFeriados('http://services.sapo.pt/Holiday/GetHolidaysByMunicipalityId?year=' + ano + '&municipalityId=1605').subscribe(resp2 => {

      var array = resp2.GetHolidaysByMunicipalityIdResponse.GetHolidaysByMunicipalityIdResult[0].Holiday;

      for (var y in array) {

        this.events.push({
          title: array[y].Name[0] + ' ' + array[y].Description[0],
          description: array[y].Description[0],
          utz_origem: null,
          dep_origem: "",
          "start": new Date(array[y].Date[0]),
          atribuido: null,
          encaminhado: null,
          data_encaminhado: null,
          "end": null,
          prioridade: null,
          estado: null,
          cliente: null,
          referencia: null,
          data_conclusao: null,
          utz_concluiu: null,
          "id": null,
          "color": 'orange',
          "allDay": true,
          textColor: 'black',
          feriado: true,
          step: null,
          origem: null,
          descricao: null,
          tempo_gasto: null,
          percentagem_conclusao: null,
          observacoes: null,
          prazo_conclusao: null

        });
      }

    });

  }

  eventrender2(op) {
   /* op.hide();*/
  }

  eventrender(event, op) {

    /*if (event.calEvent.source.calendar.view.name == "month") {
      this.popOverTitle = event.calEvent.title;
      if (this.popOverTitle != "" && this.popOverTitle != null) op.toggle(event, event.jsEvent.target);
    }*/
  }

  formatData(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  formatDate(date) {
    var d = new Date(moment(date).tz("Europe/lisbon")),
=======
  hora_fim: any;
  hora_inicio: any;
  data_fim: any;
  data_inicio: any;
  titulo_evento: any;
  header: any;
  events: any[];
  @ViewChild('abrirpopup') abrirpopup: ElementRef;
  @ViewChild('fecharpopup') fecharpopup: ElementRef;

  constructor(private renderer: Renderer) { }

  ngOnInit() {
    this.header = {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay,listWeek'
    };

    var data = this.formatDate("2018-04-19 10:15");
    this.events = [
      {
        "id": 1,
        "title": "All Day Event",
        "start": data,
        "color": '#257e4a'
      },
      {
        "title": "Long Event",
        "start": this.formatDate("2018-04-07 00:00:00"),
        "end": this.formatDate("2018-04-10 00:00:00")
      },
      {
        "title": "Repeating Event 1 ",
        "start": this.formatDate("2018-04-09 16:00:00")
      },
      {
        "title": "Repeating Event 2",
        "start": this.formatDate("2018-04-16 16:00:00")
      },
      {
        "title": "Conference",
        "start": this.formatDate("2018-04-11 00:00:00"),
        "end": this.formatDate("2018-04-13 00:00:00")
      }
    ];
  }

  formatDate(date) {
    var d = new Date(date),
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      h = d.toLocaleTimeString(),
      hora = "";

    if (h != "00:00:00") { hora = " " + h }
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var dath = [year, month, day].join('-');
    return dath + hora;
  }

  teste(fc) {
    // console.log(fc.events);
    this.events = fc.events;
  }

  atualizar() {
    //console.log(this.events);
  }

  adiciona(evento) {
    var data = new Date(evento.date._d);

    var allday = false;

    if (evento.date._ambigTime) {
      allday = true;
    }
    this.events.push({
      "title": "Evento",
      "start": data.toISOString(),
      "allDay": allday
    });
  }

  ver_evento(evento) {
<<<<<<< HEAD
    // console.log(evento);
    /*if (evento.calEvent.allDay) {
=======
    this.data_fim = "";
    this.data_inicio = "";
    this.hora_inicio = "";
    this.hora_fim = "";

    // console.log(evento);
    if (evento.calEvent.allDay) {
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
      this.titulo_evento = evento.calEvent.title;
      this.data_inicio = new Date(moment(evento.calEvent.start._i).tz("Europe/lisbon"));
      if (evento.calEvent.end != null) {
        this.data_fim = new Date(moment(evento.calEvent.end._i).tz("Europe/lisbon"));

      }
    } else {
      this.titulo_evento = evento.calEvent.title;
      this.data_inicio = new Date(moment(evento.calEvent.start._d).tz("Europe/lisbon"));
      this.hora_inicio = new Date(moment(evento.calEvent.start._i).tz("Europe/lisbon")).toLocaleTimeString();
      if (evento.calEvent.end != null) {
        this.data_fim = new Date(moment(evento.calEvent.end._d).tz("Europe/lisbon"));
        this.hora_fim = new Date(moment(evento.calEvent.end._i).tz("Europe/lisbon")).toLocaleTimeString();
      }
<<<<<<< HEAD
    }*/

    this.titulo_evento = evento.calEvent.title;
    this.feriado = evento.calEvent.feriado;
    if (!evento.calEvent.feriado) {
      this.nome_tarefa = evento.calEvent.title;
      this.utz_origem = evento.calEvent.utz_origem;
      //this.dep_origem = "";
      this.data_atribuicao = (evento.calEvent.start != null) ? this.formatDate(evento.calEvent.start) : null;
      this.atribuido = evento.calEvent.atribuido;
      this.encaminhado = evento.calEvent.encaminhado;
      this.data_encaminhado = (evento.calEvent.data_conclusao != null) ? this.formatDate(evento.calEvent.data_conclusao) : null;
      this.prazo_conclusao = (evento.calEvent.prazo_conclusao != null) ? this.formatDate(evento.calEvent.prazo_conclusao) : null;
      this.prioridade = evento.calEvent.prioridade;
      this.estado = evento.calEvent.estado;

      this.cliente = evento.calEvent.cliente;
      this.referencia = evento.calEvent.referencia;
      var step = "";
      var nome_step = "";
      switch (evento.calEvent.step) {
        case 'I':
          step = "step-3";
          nome_step = " (STEP 3 - ACÇÕES CORRETIVAS IMEDIATAS)";
          break;
        case 'C':
          step = "step-4";
          nome_step = " (STEP 5 - AÇÕES CORRETIVAS)";
          break;
        case 'E':
          step = "step-5";
          nome_step = " (STEP 6 - COMPROVAÇÃO DA EFICÁCIA DAS AÇÕES CORRETIVAS)";
          break;
        case 'P':
          step = "step-6";
          nome_step = " (STEP 7 - MEDIDAS PREVENTIVAS CONTRA REINCIDÊNCIA)";
          break;
        default:
      }
      this.origem = "Reclamações de Clientes : " + evento.calEvent.origem + nome_step;
      this.caminho_origem = "#/reclamacoesclientes/view?id=" + evento.calEvent.origem + "&step=" + step + "&redirect=calendario";
      this.caminho_tarefa = "#/tarefas/view?id=" + evento.calEvent.id + "&redirect=calendario";
      this.tempo_gasto = evento.calEvent.tempo_gasto;
      this.descricao = evento.calEvent.descricao;
      this.percentagem_conclusao = evento.calEvent.percentagem_conclusao;
      this.observacoes = evento.calEvent.observacoes;

      //this.data_conclusao = (resp[x][12] != null) ? this.formatDate(resp[x][12]) + " " + new Date(resp[x][12]).toLocaleTimeString() : null,
      //this.utz_concluiu = resp[x][13],

    } else {
      this.data_atribuicao = this.formatDate(evento.calEvent.start);
      this.descricao = evento.calEvent.description;
    }

=======
    }


>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    let elem3 = document.getElementById("mainpagecontent");
    let h = elem3.getBoundingClientRect().height;

    //document.getElementById("modalcalendario").style.height = Math.abs(h + 300) + 'px';

    let elm2 = document.getElementById("modalcalendariocontent");
    let coords = document.getElementById("toptexttop").offsetTop;
    elm2.style.top = Math.abs(coords - 10) + 'px';

    elm2.style.bottom = 'none';
    this.simular(this.abrirpopup);
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


}
