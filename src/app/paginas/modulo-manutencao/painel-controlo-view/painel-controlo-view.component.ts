import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { webUrl } from 'assets/config/webUrl';
@Component({
  selector: 'app-painel-controlo-view',
  templateUrl: './painel-controlo-view.component.html',
  styleUrls: ['./painel-controlo-view.component.css']
})
export class PainelControloViewComponent implements OnInit {

  
  fileURL = null;
  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    var cod_UTZ = JSON.parse(localStorage.getItem('userapp'))["cod_UTZ"];
    var link = webUrl.host_manutencao2;
    this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(link + "?login=" + encodeURIComponent(cod_UTZ));

  }
}
