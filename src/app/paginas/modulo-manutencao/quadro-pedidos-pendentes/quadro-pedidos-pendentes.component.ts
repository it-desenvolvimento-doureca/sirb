import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { webUrl } from 'assets/config/webUrl';

@Component({
  selector: 'app-quadro-pedidos-pendentes',
  templateUrl: './quadro-pedidos-pendentes.component.html',
  styleUrls: ['./quadro-pedidos-pendentes.component.css']
})
export class QuadroPedidosPendentesComponent implements OnInit {

  fileURL = null;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    var cod_UTZ = JSON.parse(localStorage.getItem('userapp'))["cod_UTZ"];
    var link = webUrl.host_manutencao;
    this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(link + "?login=" + encodeURIComponent(cod_UTZ));

  }

}
