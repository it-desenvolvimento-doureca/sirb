import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadService } from 'app/servicos/upload.service';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { Location } from '@angular/common';

@Component({
  selector: 'app-parametros-raks',
  templateUrl: './parametros-raks.component.html',
  styleUrls: ['./parametros-raks.component.css']
})
export class ParametrosRaksComponent implements OnInit {
  disabled: boolean = true;
  ficheiro: any;
  user: any;
  modoedicao: boolean;
  loading_import = false;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('files_input_upload') files_input_upload: ElementRef;


  constructor(private confirmationService: ConfirmationService, private UploadService: UploadService, private renderer: Renderer, private route: ActivatedRoute, private router: Router, private location: Location, private globalVar: AppGlobals) { }

  ngOnInit() {

    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setapagar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setcriar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    // this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node013editar"));
    this.globalVar.setdisEditar(false);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.modoedicao = true;
        this.globalVar.setvoltar(true);
      }
    }

    this.inicia();
  }

  inicia() {
    this.modoedicao = true;
  }



  gravar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende Importar o Ficheiro?',
      header: 'Importar Ficheiro',
      icon: 'fa fa-upload',
      accept: () => {
        let fi = this.files_input_upload.nativeElement;
        if (fi.files && fi.files[0]) {
          let fileToUpload = fi.files[0];
          this.loading_import = true;
          this.UploadService.importarFicheiroRAK(fileToUpload).subscribe(
            response => {
              this.loading_import = false;
              this.simular(this.inputgravou);
            },
            error => {
              this.loading_import = false;
              console.log(error);
              this.simular(this.inputerro);
            });
        }
      }});
    }


  onBasicUpload($event) {

      }
  AbrirFicheiro() {
        this.simular(this.files_input_upload);
      }
  carregaFicheiro(e) {

        let fi = this.files_input_upload.nativeElement;
        if(fi.files && fi.files[0]) {
          let fileToUpload = fi.files[0];
          this.ficheiro = fileToUpload.name;
          if (this.ficheiro != "" && this.ficheiro != null) {
            this.disabled = false;
          } else {
            this.disabled = true;
          }
        }
      }


  //bt cancelar
  backview() {
        this.location.back();
      }

  //simular click para mostrar mensagem
  simular(element) {
        let event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(
          element.nativeElement, 'dispatchEvent', [event]);
      }

}
