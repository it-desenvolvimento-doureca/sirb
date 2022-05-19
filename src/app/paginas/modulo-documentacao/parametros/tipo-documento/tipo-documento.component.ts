import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent implements OnInit {

  nome = null;
  predefinido = false;
  alerta = false;
  cor = null;

  criar: boolean = true;
  editar: boolean = false;
  visualizar: boolean = false;


  acessoCriar;
  acessoEditar;
  novobt = true;
  editarbt = true;
  idParam;
  user;

  listaTipoDocumentos = [];


  constructor(private route: ActivatedRoute, private router: Router,
    private location: Location,
    //private tipoDocumento: TipoDocumentosService
  ) { }

  ngOnInit(): void {
    //obter o valor do url
    this.route
      .queryParams
      .subscribe(params => {
        this.idParam = params['id'] || null;
      });

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    //ver se é editar/novo/visualizar
    if (urlarray[1].match("editar")) {
      this.editar = true;
      this.criar = false;
      this.visualizar = false;
      this.novobt = true;
      this.editarbt = false;
    } else if (urlarray[1].match("novo")) {
      this.editar = false;
      this.criar = true;
      this.novobt = false
      this.visualizar = false;
      this.editarbt = false;
    } else if (urlarray[1].match("view")) {
      this.editar = false;
      this.criar = false;
      this.visualizar = true;
      this.novobt = true;
      this.editarbt = true;

    }

    /*this.tipoDocumento.getAll().subscribe((response) => {
      for (let y in response) {
        this.listaTipoDocumentos.push({ id: response[y].id_TipoDocumento, nome: response[y].nome, cor: response[y].cor, predefinido: response[y].is_Predefinido, alerta: response[y].is_Alerta })
      }
    });*/


    if (this.editar == true || this.visualizar == true) {
      /*this.tipoDocumento.getTipoDocumentoID(this.idParam).subscribe((response) => {
        if (response != null) {
          this.cor = response[0].cor;
          this.nome = response[0].nome;
          this.predefinido = response[0].is_Predefinido;
          this.alerta = response[0].is_Alerta;

        }
      });*/

    }
    if (this.criar == true) {
      this.cor = "#000000"
    }

    this.user = JSON.parse(sessionStorage.getItem('userapp'))["id"];
  }

  //função que vai registar a nova linha ou fazer update à linha existente
  gravar() {
    /* if (this.nome != null) {
       if (this.alerta == true && this.predefinido == true) {
         this.showMessage('warn', 'Aviso', 'O tipo de documento não pode ser predefinido e alerta simultaneamente!');
       } else {
 
         let tp = new TipoDocumento;
         tp.nome = this.nome;
         tp.cor = this.cor;
         tp.is_Alerta = this.alerta;
         tp.is_Predefinido = this.predefinido
 
 
         if (this.editar == true) {
           if (this.listaTipoDocumentos.find(item => item.predefinido == true) != undefined && this.predefinido == true && this.listaTipoDocumentos.find(item => item.predefinido == true).id != this.idParam) {
             this.showMessage('warn', 'Aviso', 'Já Existe um tipo de documento predefinido');
           } else {
             tp.id_TipoDocumento = Number(this.idParam)
             this.upd(tp);
           }
         }
         if (this.criar == true) {
           if (this.listaTipoDocumentos.find(item => item.predefinido == true) != undefined && this.predefinido == true) {
             this.showMessage('warn', 'Aviso', 'Já Existe um tipo de documento predefinido');
           } else {
 
             this.upd(tp);
           }
 
         }
       }
 
 
     } else {
       this.alertasPop();
     }*/
  }



  //função update linha
  upd(li) {
    /* this.tipoDocumento.update(li).then((res) => {
       this.showMessage('success', 'Sucesso', 'Inserido com sucesso!');
       if (this.criar == true) {
         this.limpar();
       } else if (this.editar == true) {
         this.limpar();
         this.router.navigate(['tipoDocumentos']);
       }
     }, error => {
 
       if (error.substring(0, 30) == "Error: Violation of UNIQUE KEY") {
         this.showMessage('error', 'Erro', 'Esse nome já existe no sistema');
       } else {
         this.showMessage('error', 'Erro', 'ERRO!! Registo não foi Gravado!');
       }
 
     });
 */

  }

  //mudar ecrãs
  cancelar() {
    this.router.navigate(['tipoDocumentos']);
  }

  anterior() {
    this.location.back();
  }

  backClicked() {
    this.location.back();
  }

  //limpar variáveis ao registar etc
  limpar() {
    this.nome = null;
    this.predefinido = false;
    this.alerta = false;
    this.cor = "#000000";
    this.listaTipoDocumentos = [];

  }

  edicao() {

    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.idParam = params['id'] || 0;
      });

    this.router.navigate(['tipoDocumentos/editar'], { queryParams: { id: this.idParam } });
  }

  novo() {
    this.router.navigate(['tipoDocumentos/novo']);
  }

}
