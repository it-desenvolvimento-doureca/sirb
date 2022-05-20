import { Component, OnInit } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';

@Component({
  selector: 'app-postos-documentacao',
  templateUrl: './postos-documentacao.component.html',
  styleUrls: ['./postos-documentacao.component.css']
})
export class PostosDocumentacaoComponent implements OnInit {
  pos: any;
  postos = [];
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;

  user;
  sectores: any;
  constructor(private globalVar: AppGlobals, private RHSECTORESService: RHSECTORESService) { }

  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setcriar(false);

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11621editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11621apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node11621criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];
    this.listarsectores();
    this.listar_departs();
  }

  //atualizar tabela postos
  listar_departs() {
    /* this.GERPOSTOSService.getAll().subscribe(
       response => {
         this.postos = [];
         for (var x in response) {
           this.postos.push({
             id_POSTO: response[x].id_POSTO, descricao: response[x].descricao, ip_POSTO: response[x].ip_POSTO, impressora: response[x].impressora,
             ip_IMPRESSORA: response[x].ip_IMPRESSORA, nome_IMPRESSORA: response[x].nome_IMPRESSORA, nome_IMPRESSORA_SILVER: response[x].nome_IMPRESSORA_SILVER
           });
         }
         this.postos = this.postos.slice();
 
       },
       error => { console.log(error); });*/
  }

  //listar os dados sectores
  listarsectores() {
    this.sectores = [];
    this.sectores.push({ value: '', label: 'Selecionar Sector' });
    this.RHSECTORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.sectores.push({

            value: response[x][0].cod_SECTOR,
            label: response[x][0].des_SECTOR,


          });
        }
        this.sectores = this.sectores.slice();
      },
      error => console.log(error));
  }

  eliminar(posto) {
    /* this.confirmationService.confirm({
       message: 'Tem a certeza que pretende apagar?',
       header: 'Apagar Confirmação',
       icon: 'fa fa-trash',
       accept: () => {
         if (posto.id_POSTO.toString().substring(0, 1) != "P") {
           this.GERPOSTOSService.delete(posto.id_POSTO).then(() => {
             this.tabelaPostos();
           },
             error => { console.log(error); this.simular(this.inputerro); });
         } else {
           let index = -1;
           for (let i = 0; i < this.postos.length; i++) {
             if (this.postos[i].id_POSTO == posto.id_POSTO) {
               index = i;
               break;
             }
           }
           this.postos.splice(index, 1);
           this.postos = this.postos.slice();
         }
       }
     });*/
  }

  //adicionar linha aos postos
  adicionar_linha() {
    this.pos++;
    this.postos.push({ id_POSTO: "P" + this.pos, descricao: "", ip_POSTO: "" });
    this.postos = this.postos.slice();
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }
}
