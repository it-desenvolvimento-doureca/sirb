import { Component, OnInit, Renderer, ElementRef, ViewChild } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { Router } from "@angular/router";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AppGlobals } from "app/menu/sidebar.metadata";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { UploadService } from 'app/servicos/upload.service';
import { FileUpload, Message } from 'primeng/primeng';
import { RCDICGRAUIMPORTANCIAService } from './servicos/rc-dic-grau-importancia.service';
import { PEDIDOS_APP } from './entidades/PEDIDOS_APP';
import { PEDIDOSAPPService } from './servicos/pedidos-app.service';
import { FICHEIROS_PAGINAS } from './entidades/FICHEIROS_PAGINAS';
import { FICHEIROSPAGINASService } from './servicos/ficheiros-paginas.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    myDate: Date;
    btdisabled: boolean;
    listfile;
    uploadedFiles = []; semInternet: boolean;
    email_assunto: string;
    email_mensagem: string;
    nome: any;
    linha = 0;
    linhas: any[];
    location: Location;
    versao = "";
    modulo = "";
    mensagem = "";
    @ViewChild('fileInput') fileInput: FileUpload;
    @ViewChild('closedialog') closedialog: ElementRef;
    @ViewChild('closedialog2') closedialog2: ElementRef;
    email_CONTACTO: string;
    prioridades: any[];
    prioridade: any;
    uploadedFilessave: any;
    telefone_CONTACTO: string;
    dialog_suporte: boolean;
    dialog_sugestoes: boolean;
    msgs: Message[] = [];

    constructor(private FICHEIROSPAGINASService: FICHEIROSPAGINASService,
        private PEDIDOSAPPService: PEDIDOSAPPService,
        private RCDICGRAUIMPORTANCIAService: RCDICGRAUIMPORTANCIAService,
        private UploadService: UploadService, private GERPERFILLINService: GERPERFILLINService, private globalVar: AppGlobals, private ABDICLINHAService: ABDICLINHAService, private renderer: Renderer, location: Location, private router: Router) {
        //this.myDate = new Date();
        var vers = this.getCookie("app_sgiid_versao");
        this.versao = "versão " + ((vers != null) ? vers.replace(",", "") : "1.1.1");
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

        this.UploadService.messageSubject$.subscribe((message) => {
            this.msgs = message;
        });
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
        //localStorage.clear();
        localStorage.removeItem('acessos');
        localStorage.removeItem('userapp');
        localStorage.removeItem('time_sgiid');

        this.router.navigate(['login']);
        /*setTimeout(() => {
            location.reload(true);
        }, 50);*/
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
    /*enviar() {
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

    }*/

    /*sendemail() {
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
    }*/

    sendemail(tipo) {
        var mensagem = (this.email_mensagem != null) ? this.email_mensagem : "";
        var prioridade = "";
        if (this.prioridades.find(item => item.value == this.prioridade)) prioridade = this.prioridades.find(item => item.value == this.prioridade).label;
        var dados = "{mensagem::" + mensagem + "\n/prioridade::" + prioridade + "\n/utilizador::" + this.isnome() + "\n/assunto::" + this.email_assunto + "\n/email_contacto::" + this.email_CONTACTO + "\n/telefone_contacto::" + this.telefone_CONTACTO + "}";

        var MOMENTO = "Enviar Sugestões de Melhoria";
        if (tipo == "A") MOMENTO = "Enviar Pedido Ajuda";

        var data = [{ MODULO: 1, MOMENTO: MOMENTO, PAGINA: "INTERNO", FICHEIROS: this.listfile, ESTADO: true, DADOS: dados }];



        this.UploadService.verficaEventos(data).subscribe(result => {

            var pedido = new PEDIDOS_APP;
            pedido.assunto = this.email_assunto;
            pedido.descricao = this.email_mensagem;
            pedido.utz_PEDIDO = JSON.parse(localStorage.getItem('userapp'))["id"];
            pedido.prioridade = this.prioridade;
            pedido.email_CONTACTO = this.email_CONTACTO;
            pedido.telefone_CONTACTO = this.telefone_CONTACTO;
            pedido.tipo_PEDIDO = tipo;
            pedido.estado = "P";
            pedido.data_HORA_PEDIDO = new Date();
            this.gravar(pedido, MOMENTO);
            this.dialog_suporte = false;
            this.dialog_sugestoes = false;
            this.email_assunto = "";
            this.email_mensagem = "";
            this.email_CONTACTO = "";
            this.telefone_CONTACTO = "";
            this.prioridade = null;
            this.fileInput.files = [];
            this.btdisabled = false;
        }, error => {
            console.log(error);
            this.btdisabled = false;
        });
    }

    gravar(pedido, MOMENTO) {
        this.PEDIDOSAPPService.create(pedido).subscribe(
            res => {
                for (var x in this.uploadedFilessave) {
                    var ficheiros = new FICHEIROS_PAGINAS;
                    ficheiros = this.uploadedFilessave[x].ficheiros;
                    ficheiros.id_FICHEIRO = 0;
                    ficheiros.pagina = MOMENTO;
                    ficheiros.id_PAGINA = res.id_PEDIDO;
                    this.gravarTabelaFicheiros(ficheiros);
                }
            },
            error => {
                console.log(error);
            });
    }

    readThis(inputValue: any, count, total, tipo): void {
        var file: File = inputValue;
        var myReader: FileReader = new FileReader();

        myReader.onloadend = (e) => {
            this.listfile += file.name + "<//>" + myReader.result + "<:>";

            this.fileupoad(file, myReader.result);
            if (count == total) this.sendemail(tipo);
        }
        myReader.readAsDataURL(file);
    }

    fileupoad(file, ficheiro) {

        /* this.UploadService.fileChange(file, nome).subscribe(result => {*/
        var tipo = file.name.split(".");
        var data = new Date();

        var ficheiros = new FICHEIROS_PAGINAS;
        ficheiros.data_CRIA = data;
        ficheiros.id_UTZ_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
        //ficheiros.id_PAGINA = id;
        //ficheiros.caminho = nome + '.' + tipo[1];
        ficheiros.nome = file.name;
        ficheiros.datatype = file.type;
        ficheiros.tamanho = file.size;
        ficheiros.ficheiro = ficheiro.substr(ficheiro, ficheiro.length / 2);
        ficheiros.ficheiro_2 = ficheiro.substr(ficheiro.length / 2, ficheiro.length);
        ficheiros.descricao = null;
        //ficheiros.pagina = "DEVOLUCAO";

        this.uploadedFilessave.push({
            ficheiros
        });



    }

    public abreAjuda() {
        this.carrega_prioridades();
        this.email_assunto = "";
        this.email_mensagem = "";
        this.email_CONTACTO = "";
        this.telefone_CONTACTO = "";
        this.prioridade = null;
        this.uploadedFilessave = []
        this.dialog_suporte = true;

        //this.simular(this.dialog2);
    }

    public abreSugestoes() {
        this.carrega_prioridades();
        this.email_assunto = "";
        this.email_mensagem = "";
        this.email_CONTACTO = "";
        this.telefone_CONTACTO = "";
        this.prioridade = null;
        this.uploadedFilessave = []
        this.dialog_sugestoes = true;
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
                this.readThis(files[x], count, total, "A");
            }
        } else {
            this.sendemail("A");
        }

    }


    //verificar eventos
    enviarSugestao() {
        this.btdisabled = true;
        let files = this.fileInput.files;
        //let files = [];
        this.listfile = null;
        var total = files.length;
        var count = 0;
        // console.log(total)
        if (total > 0) {
            this.listfile = "";
            for (var x in files) {
                count++;
                // console.log
                // this.getBase64(files[x], count);
                this.readThis(files[x], count, total, "S");
            }
        } else {
            this.sendemail("S");
        }

    }

    carrega_prioridades() {
        this.prioridades = [];
        this.RCDICGRAUIMPORTANCIAService.getAll().subscribe(
            response => {
                this.prioridades.push({ value: "", label: "Seleccionar Prioridade" });
                for (var x in response) {
                    this.prioridades.push({ value: response[x].id, label: response[x].descricao });
                }
                this.prioridades = this.prioridades.slice();

            },
            error => {
                console.log(error);
            });
    }

    gravarTabelaFicheiros(ficheiros) {
        this.FICHEIROSPAGINASService.update(ficheiros).subscribe(
            res => {

            },
            error => { console.log(error); });
    }


    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return null;
    }

    goToHome() {
        this.router.navigate(['/']);
    }


}
