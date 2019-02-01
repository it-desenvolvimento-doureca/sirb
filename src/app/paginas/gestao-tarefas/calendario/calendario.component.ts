import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

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
    this.data_fim = "";
    this.data_inicio = "";
    this.hora_inicio = "";
    this.hora_fim = "";

    // console.log(evento);
    if (evento.calEvent.allDay) {
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
    }


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
