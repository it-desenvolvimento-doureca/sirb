import { Component, ElementRef, OnInit, Renderer, ViewChild } from '@angular/core';
import { DOC_DIC_POSTOS } from 'app/entidades/DOC_DIC_POSTOS';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { DOCDICPOSTOSService } from 'app/servicos/doc-dic-postos.service';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-postos-documentacao',
  templateUrl: './postos-documentacao.component.html',
  styleUrls: ['./postos-documentacao.component.css']
})
export class PostosDocumentacaoComponent implements OnInit {

  postos = [];
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;

  user;
  sectores: any;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputerro2') inputerro2: ElementRef;
  @ViewChild('inputerroficheiro') inputerroficheiro: ElementRef;
  @ViewChild('escondebt') escondebt: ElementRef;

  constructor(private renderer: Renderer, private confirmationService: ConfirmationService, private globalVar: AppGlobals, private RHSECTORESService: RHSECTORESService, private DOCDICPOSTOSService: DOCDICPOSTOSService) { }

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
    this.DOCDICPOSTOSService.getAll().subscribe(
      response => {
        this.postos = [];
        for (var x in response) {
          this.postos.push({
            id_POSTO: response[x].ID, descricao: response[x].NOME, ip_POSTO: response[x].IP_POSTO, sector: (response[x].SECTOR == null) ? null : response[x].SECTOR.split(','),
            dados: response[x]
          });
        }
        this.postos = this.postos.slice();

      },
      error => { console.log(error); });
  }

  //listar os dados sectores
  listarsectores() {
    this.sectores = [];
    //this.sectores.push({ value: '', label: 'Selecionar Sector' });
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

  eliminar(posto, index) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (posto.id_POSTO != null) {
          this.DOCDICPOSTOSService.delete(posto.id_POSTO).then(response => {
            this.postos.splice(index, 1);
            this.postos = this.postos.slice();
          },
            error => { console.log(error); this.simular(this.inputerro); });
        } else {
          this.postos.splice(index, 1);
          this.postos = this.postos.slice();
        }
      }
    });
  }


  gravar(posto) {
    var depart = new DOC_DIC_POSTOS;
    if (posto.id_POSTO != null) depart = posto.dados;
    depart.NOME = posto.descricao;
    depart.IP_POSTO = posto.ip_POSTO;
    depart.SECTOR = (posto.sector == null || posto.sector.length == 0) ? null : posto.sector.toString();


    depart.UTZ_MODIF = this.user;
    depart.DATA_MODIF = new Date();

    if (posto.id_POSTO == null) {
      depart.UTZ_CRIA = this.user;
      depart.DATA_CRIA = new Date();
      this.DOCDICPOSTOSService.create(depart).subscribe(response => {
        posto.id_POSTO = response.ID;
        this.simular(this.inputnotifi);
        //this.listar_departs();
      },
        error => { console.log(error); this.simular(this.inputerro); });
    } else {
      depart.ID = posto.id_POSTO;
      this.DOCDICPOSTOSService.update(depart).subscribe(() => {
        //this.listar_departs();
        this.simular(this.inputgravou);
      },
        error => { console.log(error); this.simular(this.inputerro); });

    }
  }

  //adicionar linha aos postos
  adicionar_linha() {
    this.postos.push({ id: null, descricao: "", ip_POSTO: "", sector: null });
    this.postos = this.postos.slice();
  }

  //ver cookies
  getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}
