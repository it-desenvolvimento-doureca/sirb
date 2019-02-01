import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RelatoriosService } from "app/servicos/relatorios.service";
import { DomSanitizer } from "@angular/platform-browser";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { EMAIL } from "app/entidades/EMAIL";
import { EmailService } from "app/servicos/email.service";
import { ActivatedRoute } from "@angular/router";
import 'assets/js/demo.js'

@Component({
  selector: 'app-relatorio-viewer',
  templateUrl: './relatorio-viewer.component.html',
  styleUrls: ['./relatorio-viewer.component.css']
})
export class RelatorioViewerComponent implements OnInit {
  bt_disable: boolean;
  relatorio: any;
  id: any;
  email_mensagem: any;
  email_assunto: any;
  email_de: any;
  email_para: any;
  fileURL = null;
  filename;
  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  @ViewChild('inputenvio') inputenvio: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;


  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private EmailService: EmailService, private sanitizer: DomSanitizer, private RelatoriosService: RelatoriosService, private location: Location, private renderer: Renderer) { }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo.js";
    this.elementRef.nativeElement.appendChild(s);

    var sub = this.route
      .queryParams
      .subscribe(params => {
        this.id = params['id'] || 0;
        this.relatorio = params['relatorio'] || 0;
      });

    this.filename = new Date().toLocaleString().replace(/\D/g, '');
    this.RelatoriosService.downloadPDF("pdf", this.filename, this.id, this.relatorio).subscribe(
      (res) => {
        this.fileURL = URL.createObjectURL(res);
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);
      }
    );
  }

  exportexcel() {
    this.RelatoriosService.downloadPDF("xlsx", this.filename, this.id, this.relatorio).subscribe(
      (res) => {
        this.fileURL = URL.createObjectURL(res);
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);
        var myWindow = window.open(this.fileURL, "", "width=200,height=100");
        myWindow.close();
      }

    );
  }

  exportword() {
    this.RelatoriosService.downloadPDF("docx", this.filename, this.id, this.relatorio).subscribe(
      (res) => {
        this.fileURL = URL.createObjectURL(res);
        this.fileURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileURL);
        var myWindow = window.open(this.fileURL, "", "width=200,height=100");
        myWindow.close();
      }

    );
  }

  backClicked() {
    this.location.back();
  }
  sendmessage() {
    this.email_de;
    this.email_para = "";
    this.email_assunto = "";
    this.email_mensagem = "";
    this.simular(this.dialog);
  }

  enviar() {
    var email = new EMAIL();
    email.de = this.email_de;
    email.para = this.email_para;
    email.assunto = this.email_assunto;
    email.mensagem = this.email_mensagem;
    email.nome_FICHEIRO = this.filename;
    this.bt_disable = true;
    this.EmailService.enviarEmail(email).subscribe(
      res => {
        this.bt_disable = false;
        this.simular(this.inputenvio);
        this.simular(this.closedialog);
      }, error => {
        this.simular(this.inputerro);
        this.bt_disable = false;
      });
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

}
