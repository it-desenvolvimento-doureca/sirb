import { Component, OnInit, ElementRef } from '@angular/core';
import { RelatoriosService } from "app/servicos/relatorios.service";
import { Message } from "primeng/primeng";
import { webUrl } from 'assets/config/webUrl';
import { GERFAVORITOSService } from 'app/servicos/ger-favoritos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mod_prod: any;
  data3 = null;
  data2 = null;
  data: any;
  data1: any;
  favoritos: any[];
  list = false;
  constructor(private elementRef: ElementRef, private GERFAVORITOSService: GERFAVORITOSService) {

    if (document.getElementById("script1")) document.getElementById("script1").remove();
    var script1 = document.createElement("script");
    script1.setAttribute("id", "script1");
    script1.setAttribute("src", "assets/js/jqbtk.js");
    document.body.appendChild(script1);
  }

  ngOnInit() {

    if (document.getElementById("script2")) document.getElementById("script2").remove();
    var script2 = document.createElement("script");
    script2.setAttribute("id", "script2");
    script2.setAttribute("src", "assets/js/initMenu.js");
    document.body.appendChild(script2);

    this.mod_prod = true;// webUrl.mod_pro;

    if (!this.mod_prod) this.carregagraficos();

    this.carregafavoritos();
  }

  carregafavoritos() {

    if (JSON.parse(localStorage.getItem('userapp'))) {
      var id = JSON.parse(localStorage.getItem('userapp'))["id"];
      this.GERFAVORITOSService.getbyid(id).subscribe(
        response => {
          this.favoritos = [];
          var lista = '';
          for (var x in response) {
            this.favoritos.push({ id_FAVORITO: response[x][0].id_FAVORITO, descricao: response[x][0].descricao, url: response[x][0].url })
            lista = response[x][1];
          }
          if (lista == "List") {
            this.list = true;
          } else {
            this.list = false;
          }
        },
        error => { console.log(error); });
    }
  }

  alterar_lista(val) {
    this.list = val;
    var lista = "Grid"
    if (val) lista = "List";
    var id = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.GERFAVORITOSService.getUPDATETIPO_LISTA(id, lista).subscribe(
      response => {
      },
      error => { console.log(error); });
  }

  carregagraficos() {
    this.data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          backgroundColor: '#9CCC65',
          borderColor: '#7CB342',
          data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };

    this.data1 = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: '#565656'
        }
      ]
    };

    this.data2 = {
      labels: ['A', 'B', 'C'],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
    };
    this.data3 = {
      datasets: [{
        data: [
          11,
          16,
          7,
          3,
          14
        ],
        backgroundColor: [
          "#FF6384",
          "#4BC0C0",
          "#FFCE56",
          "#E7E9ED",
          "#36A2EB"
        ],
        label: 'My dataset'
      }],
      labels: [
        "Red",
        "Green",
        "Yellow",
        "Grey",
        "Blue"
      ]
    };
  }

}
