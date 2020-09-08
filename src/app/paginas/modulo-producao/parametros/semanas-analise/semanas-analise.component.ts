import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICSEMANASANALISEService } from 'app/servicos/pr-dic-semanas-analise.service';
import { PR_DIC_SEMANAS_ANALISE } from 'app/entidades/PR_DIC_SEMANAS_ANALISE';

@Component({
  selector: 'app-semanas-analise',
  templateUrl: './semanas-analise.component.html',
  styleUrls: ['./semanas-analise.component.css']
})
export class SemanasAnaliseComponent implements OnInit {
  user: any;
  n_SEMANAS: any[];

  dados: any[] = [];
  pos: number;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;

  constructor(private PRDICSEMANASANALISEService: PRDICSEMANASANALISEService, private confirmationService: ConfirmationService, private globalVar: AppGlobals, private renderer: Renderer) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.globalVar.setapagar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setvoltar(false);
    this.globalVar.seteditar(false);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setcriar(false);

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9214editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9214apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9214criar");

    this.listar();
  }


  listar() {
    this.dados = [];
    this.PRDICSEMANASANALISEService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            pos: parseInt(x), dados: response[x],
            id: response[x].id_SEMANAS_ANALISE, por_DEFEITO: response[x].por_DEFEITO, n_SEMANAS: response[x].n_SEMANAS
          });

          this.pos = parseInt(x);
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }

  adicionar() {
    this.pos = this.pos + 1;
    this.dados.push({ id: null, pos: this.pos, n_SEMANAS: 0, por_DEFEITO: null });
    this.dados = this.dados.slice();
  }

  verifica_porDEFEITO(event, index) {

    var encontrou = false;
    for (var x in this.dados) {
      if (this.dados[x].por_DEFEITO && index != x) {
        encontrou = true;
      }

    }

    if (encontrou) this.dados[index].por_DEFEITO = false;
  }

  gravarlinhas() {
    if (this.dados.length > 0) {
      for (var x in this.dados) {

        var semana = new PR_DIC_SEMANAS_ANALISE;
        if (this.dados[x].id != null) {
          semana = this.dados[x].dados;
          semana.id_SEMANAS_ANALISE = this.dados[x].id;
        }
        semana.n_SEMANAS = this.dados[x].n_SEMANAS;
        semana.por_DEFEITO = this.dados[x].por_DEFEITO;
        semana.data_MODIF = new Date();
        semana.utz_MODIF = this.user;


        if (this.dados[x].id == null) {
          semana.data_CRIA = new Date();
          semana.utz_CRIA = this.user;
          semana.ativo = true;
          this.gravar(semana, this.dados.length, parseInt(x) + 1);
        } else {

          this.atualizar(semana, this.dados.length, parseInt(x) + 1);
        }
      }


    }

  }

  eliminar(semana) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (semana.id != null) {
          var semana_d = new PR_DIC_SEMANAS_ANALISE;
          semana_d = semana.dados;
          semana_d.utz_ANULA = this.user;
          semana_d.data_ANULA = new Date();
          semana_d.ativo = false;
          this.PRDICSEMANASANALISEService.update(semana_d).subscribe(() => {
            this.listar();
          },
            error => { console.log(error); /*this.simular(this.inputerro);*/ });
        } else {
          let index = -1;
          for (let i = 0; i < this.dados.length; i++) {
            if (this.dados[i].pos == semana.pos) {
              index = i;
              break;
            }
          }
          this.dados.splice(index, 1);
          this.dados = this.dados.slice();
        }
      }
    });
  }


  gravar(semana, total, count) {
    //if (capacidade.data != null && capacidade.valor != null) {

    this.PRDICSEMANASANALISEService.create(semana).subscribe(response => {
      if (total == count) { this.simular(this.inputgravou); this.listar(); }
    },
      error => console.log(error));
    //}
  }

  atualizar(semana, total, count) {
    //if (capacidade.data != null && capacidade.valor != null) {
    this.PRDICSEMANASANALISEService.update(semana).subscribe(() => {
      if (total == count) { this.simular(this.inputgravou); this.listar(); }
    });
    //}
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
