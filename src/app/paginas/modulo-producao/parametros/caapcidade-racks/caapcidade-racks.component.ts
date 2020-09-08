import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICCAPACIDADERACKSService } from 'app/servicos/pr-dic-capacidade-racks.service';
import { PR_DIC_CAPACIDADE_RACKS } from 'app/entidades/PR_DIC_CAPACIDADE_RACKS';

@Component({
  selector: 'app-caapcidade-racks',
  templateUrl: './caapcidade-racks.component.html',
  styleUrls: ['./caapcidade-racks.component.css']
})
export class CaapcidadeRacksComponent implements OnInit {
  ID: number;
  n_VOLTAS_DIA: number;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  acesso_editar: any;


  constructor(private router: Router, private globalVar: AppGlobals, private PRDICCAPACIDADERACKSService: PRDICCAPACIDADERACKSService, private renderer: Renderer) { }

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
    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9213editar");

    this.listar();
  }

  //listar os dados das unidades de dados na tabela
  listar() {

    this.PRDICCAPACIDADERACKSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.ID = response[x].id_CAPACIDADE_RACKS;
          this.n_VOLTAS_DIA = response[x].n_VOLTAS_DIA;

        }

      },
      error => console.log(error));
  }


  //gravar unidade de zona
  gravar() {
    var capacidade = new PR_DIC_CAPACIDADE_RACKS;
    capacidade.id_CAPACIDADE_RACKS = this.ID;
    capacidade.n_VOLTAS_DIA = this.n_VOLTAS_DIA;


    capacidade.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    capacidade.data_MODIF = new Date();

    this.PRDICCAPACIDADERACKSService.update(capacidade).subscribe(() => {
      this.simular(this.inputgravou);
    }, error => {
      console.log(error); this.simular(this.inputerro);
    });

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

}
