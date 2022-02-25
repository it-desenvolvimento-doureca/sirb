import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AB_DIC_DOSIFICACAO } from 'app/entidades/AB_DIC_DOSIFICACAO';
import { AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO } from 'app/entidades/AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { ABDICDOSIFICACAOHORARIOSVERIFICACAOService } from 'app/servicos/ab-dic-dosificacao-horarios-verificacao.service';
import { ABDICDOSIFICACAOService } from 'app/servicos/ab-dic-dosificacao.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-dosificacao',
  templateUrl: './dosificacao.component.html',
  styleUrls: ['./dosificacao.component.css']
})
export class DosificacaoComponent implements OnInit {
  ID: number;
  INTERVALO_AMPERES: number;
  HORA_MANUTENCAO_ARRANQUE;
  user: any;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  acesso_editar: any;
  horarios: any;


  constructor(private confirmationService: ConfirmationService, private router: Router, private globalVar: AppGlobals, private ABDICDOSIFICACAOService: ABDICDOSIFICACAOService,
    private ABDICDOSIFICACAOHORARIOSVERIFICACAOService: ABDICDOSIFICACAOHORARIOSVERIFICACAOService, private renderer: Renderer) { }

  ngOnInit() {
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
    this.globalVar.setduplicar(false);
    this.acesso_editar = true;
    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar();
  }

  //listar os dados das unidades de dados na tabela
  listar() {

    this.ABDICDOSIFICACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.ID = response[x].ID;
          this.INTERVALO_AMPERES = response[x].INTERVALO_AMPERES;
          this.HORA_MANUTENCAO_ARRANQUE = response[x].HORA_MANUTENCAO_ARRANQUE;
        }
        this.carregahorarios();
      },
      error => console.log(error));
  }
  carregahorarios() {
    this.horarios = [];
    this.ABDICDOSIFICACAOHORARIOSVERIFICACAOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.horarios.push({ id: response[x].ID, HORA: response[x].HORA, dados: response[x] });
        }
        this.horarios = this.horarios.slice();
      }, error => { console.log(error); });


  }

  //gravar unidade de zona
  gravar() {
    var dosificacao = new AB_DIC_DOSIFICACAO;
    dosificacao.ID = this.ID;
    dosificacao.INTERVALO_AMPERES = this.INTERVALO_AMPERES;
    dosificacao.HORA_MANUTENCAO_ARRANQUE = (this.HORA_MANUTENCAO_ARRANQUE + ":00").slice(0, 8);


    dosificacao.UTZ_ULT_MODIF = this.user;
    dosificacao.DATA_ULT_MODIF = new Date();

    this.ABDICDOSIFICACAOService.update(dosificacao).then(() => {
      this.gravarlinhas(this.ID);
      this.simular(this.inputgravou);
    }, error => {
      console.log(error); this.simular(this.inputerro);
    });

  }


  gravarlinhas(id) {
    for (var z in this.horarios) {
      var horario = new AB_DIC_DOSIFICACAO_HORARIOS_VERIFICACAO;
      if (this.horarios[z].id != null) {
        horario = this.horarios[z].dados;
      } else {
        horario.DATA_CRIA = new Date();
        horario.UTZ_CRIA = this.user
      }

      horario.DATA_ULT_MODIF = new Date();
      horario.UTZ_ULT_MODIF = this.user

      horario.HORA = (this.horarios[z].HORA + ":00").slice(0, 8);;
      this.gravarlinhas2(horario, z);
    }

  }

  gravarlinhas2(obj, z) {
    this.ABDICDOSIFICACAOHORARIOSVERIFICACAOService.update(obj).subscribe(
      res => {
        this.horarios[z].id = res.ID;
      },
      error => { console.log(error); })
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //bt cancelar
  backview() {
    //this.location.back();
    this.router.navigate(['parametros']);
  }

  eliminar(linha, index) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (linha.id != null) {
          this.ABDICDOSIFICACAOHORARIOSVERIFICACAOService.delete(linha.id).then(() => {
            this.horarios.splice(index, 1);
            this.horarios = this.horarios.slice();
          },
            error => { console.log(error); });
        } else {
          this.horarios.splice(index, 1);
          this.horarios = this.horarios.slice();
        }
      }
    });
  }

  adicionar_linha() {
    this.horarios.push({ id: null, HORA: null, dados: null });
    this.horarios = this.horarios.slice();
  }


}
