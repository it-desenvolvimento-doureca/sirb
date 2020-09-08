import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { TIPOSOCORRENCIAService } from 'app/servicos/tipos-ocorrencia.service';
import { TIPOS_OCORRENCIA } from 'app/entidades/TIPOS_OCORRENCIA';

@Component({
  selector: 'app-tipos-ocorrencia',
  templateUrl: './tipos-ocorrencia.component.html',
  styleUrls: ['./tipos-ocorrencia.component.css']
})
export class TiposOcorrenciaComponent implements OnInit {
  novalinha: boolean;
  id_linha_selected: number;
  nome_tipo: string;
  cor_linha: string;
  grau;
  tipos: any[];

  @ViewChild('dialoglinhas') dialoglinhas: ElementRef;
  @ViewChild('closedialoglinha') closedialoglinha: ElementRef;
  user: any;
  codigo: string;

  constructor(private TIPOSOCORRENCIAService: TIPOSOCORRENCIAService, private confirmationService: ConfirmationService, private globalVar: AppGlobals, private renderer: Renderer) { }

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
    this.listar_linhas();
  }



  //listar os dados 
  listar_linhas() {
    this.tipos = [];
    this.TIPOSOCORRENCIAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.tipos.push({
            id: response[x].id_TIPO, nome: response[x].descricao, cor: response[x].cor, grau: response[x].grau, codigo: response[x].codigo
          });
        }
        this.tipos = this.tipos.slice();
      },
      error => console.log(error));
  }


  //abre popup para adicionar linha
  showDialogToAddlinhas() {
    this.novalinha = true;
    this.id_linha_selected = 0;
    this.nome_tipo = "";

    this.cor_linha = '#ffffff';
    this.grau = "";
    this.codigo = "";

    this.simular(this.dialoglinhas);
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //adicionar linha aos postos
  adicionar_linha() {
    /*this.pos++;
    this.linhasof.push({ id_LINHA_OF: "P" + this.pos, data: new Date(), of_NUM: "", id_LINHA: this.id_linha_selected });
    this.linhasof = this.linhasof.slice();*/
  }


  //ao clicar na tabela abrir popup para editar
  onRowSelectlinha(event) {
    this.id_linha_selected = event.data.id;
    this.nome_tipo = event.data.nome;
    this.cor_linha = event.data.cor;
    this.novalinha = false;
    this.grau = event.data.grau;
    this.codigo = event.data.codigo;
    this.simular(this.dialoglinhas);
  }


  gravarlinhas() {

    var tipo = new TIPOS_OCORRENCIA;
    tipo.descricao = this.nome_tipo;
    tipo.grau = this.grau;
    tipo.cor = "#" + this.cor_linha.replace("#", "");
    tipo.data_MODIF = new Date();
    tipo.utz_MODIF = this.user;
    tipo.codigo = this.codigo;


    if (this.novalinha) {
      this.TIPOSOCORRENCIAService.create(tipo).subscribe(response => {
        this.listar_linhas();
        this.simular(this.closedialoglinha);
      },
        error => console.log(error));
    } else {
      tipo.id_TIPO = this.id_linha_selected;
      this.TIPOSOCORRENCIAService.update(tipo).then(() => {
        this.listar_linhas();
        this.simular(this.closedialoglinha);
      });

    }
  }


}
