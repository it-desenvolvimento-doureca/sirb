import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router } from "@angular/router";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { UploadService } from 'app/servicos/upload.service';
import { FileUpload } from 'primeng/primeng';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    myDate: Date;
    btdisabled: boolean;
    listfile;
    uploadedFiles = [];semInternet: boolean;
;
    email_assunto: string;
    email_mensagem: string;
    nome: any;
    linha = 0;
    linhas: any[];
    location: Location;
    versao = "versão 1.0.1";
    modulo = "Gestão de Banhos Químicos";
    mensagem = "";
    @ViewChild('fileInput') fileInput: FileUpload;
    @ViewChild('closedialog') closedialog: ElementRef;
    @ViewChild('closedialog2') closedialog2: ElementRef;
    constructor(private UploadService: UploadService, private GERPERFILLINService: GERPERFILLINService, private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer, location: Location, private router: Router) {
        //this.myDate = new Date();
        this.semInternet = false; 
        setInterval(() => {         //replaced function() by ()=>
            this.myDate = new Date();
            if (navigator.onLine) {
                this.semInternet = false;
              } else {
                this.semInternet = true;
              }
        }, 1000);
        this.location = location;
        //preenche combobox linhas
        this.ABDICLINHAService.getAll().subscribe(
            response => {
                this.linhas = [];
                this.linhas.push({ label: "Sel. Linha", value: 0 });
                for (var x in response) {
                    this.linhas.push({ label: response[x].nome_LINHA, value: response[x].id_LINHA });
                }
                this.linha = 0;
                this.linhas = this.linhas.slice();
            },
            error => console.log(error));
        if (localStorage.getItem('userapp') && JSON.parse(localStorage.getItem('userapp')) != null) {

            /* if (true) {
                 var elem = (<HTMLInputElement>document.getElementById('node1'));
                 if (elem) elem.setAttribute("style", "pointer-events: auto; cursor: pointer; opacity: 1;");
             }*/

            //carregar acessos
            this.GERPERFILLINService.getbyID_node(JSON.parse(localStorage.getItem('userapp'))["id"], "null").subscribe(
                response2 => {
                    var count = Object.keys(response2).length;
                    var array = [];
                    if (count > 0) {
                        for (var x in response2) {
                            array.push({ node: response2[x].id_CAMPO });
                            if (JSON.parse(localStorage.getItem('userapp')) != null) {
                                if (!(!JSON.parse(localStorage.getItem('userapp'))["admin"] && response2[x].id_CAMPO == "node1")) {
                                    var elem = (<HTMLInputElement>document.getElementById(response2[x].id_CAMPO));
                                    if (elem) elem.setAttribute("style", "pointer-events: auto; cursor: pointer; opacity: 1;");
                                }
                            }

                        }
                    }
                    localStorage.setItem('acessos', JSON.stringify(array));
                }, error => { console.log(error); });
        }
    }

    isnome() {
        if (localStorage.getItem("userapp")) {
            return JSON.parse(localStorage.getItem('userapp'))["nome"];
        } else {
            return "";
        }
    }

    public teste() {
        return this.globalVar.getMensagem();
    }
    public isMaps(path) {

        var titlee = this.router.routerState.snapshot.url;
        titlee = titlee.slice(1);
        var urlarray = titlee.split("/");

        titlee = urlarray[0];
        if (titlee.match('login')) {
            this.linha = 0;
        }
        if (titlee.match(path)) {
            return false;
        }
        else {
            return true;
        }
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['login']);
    }

    confirmar() {
        this.globalVar.setlinha(this.linha);
        this.simular(this.closedialog);
    }

    //simular click para mostrar mensagem
    simular(element) {
        let event = new MouseEvent('click', { bubbles: true });
        this.renderer.invokeElementMethod(
            element.nativeElement, 'dispatchEvent', [event]);
    }

    //verificar eventos
    enviar() {
        this.btdisabled = true;
        let files = this.fileInput.files;
        //let files = [];
        this.listfile = null;
        var total = files.length;
        var count = 0;
        if (total > 0) {
            this.listfile = "";
            for (var x in files) {
                count++;
                // console.log
                // this.getBase64(files[x], count);
                this.readThis(files[x], count, total);
            }
        } else {
            this.sendemail();
        }

    }

    sendemail() {
        var mensagem = (this.email_mensagem != null) ? this.email_mensagem : "";
        var dados = "{mensagem::" + mensagem + "\n/utilizador::" + this.isnome() + "\n/assunto::" + this.email_assunto + "}";

        var data = [{ MODULO: 1, MOMENTO: "Enviar Pedido Ajuda", PAGINA: "Interno", FICHEIROS: this.listfile, ESTADO: true, DADOS: dados }];
        this.UploadService.verficaEventos(data).subscribe(result => {
            this.simular(this.closedialog2);
            this.email_assunto = "";
            this.email_mensagem = "";
            this.fileInput.files = [];
            this.btdisabled = false;
        }, error => {
            console.log(error);
            this.btdisabled = false;
        });
    }

    readThis(inputValue: any, count, total): void {
        var file: File = inputValue;
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.listfile += file.name + "<//>" + myReader.result + "<:>";
            if (count == total) this.sendemail();
        }
        myReader.readAsDataURL(file);
    }


}
