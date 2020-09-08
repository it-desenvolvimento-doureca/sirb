import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { LGDICOBJETIVOSService } from 'app/servicos/lg-dic-objetivos.service';
import { LG_DIC_OBJETIVOS } from 'app/entidades/LG_DIC_OBJETIVOS';

@Component({
  selector: 'app-objetivos-cumprimento-cliente',
  templateUrl: './objetivos-cumprimento-cliente.component.html',
  styleUrls: ['./objetivos-cumprimento-cliente.component.css']
})
export class ObjetivosCumprimentoClienteComponent implements OnInit {
  ID: number;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  objetivo;
  constructor(private router: Router, private globalVar: AppGlobals, private LGDICOBJETIVOSService: LGDICOBJETIVOSService, private renderer: Renderer) { }

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

    this.listar();
  }

  //listar os dados das unidades de dados na tabela
  listar() {

    this.LGDICOBJETIVOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.ID = response[x].id;
          this.objetivo = response[x].objetivo_CLIENTES;
        }

      },
      error => console.log(error));
  }


  //gravar unidade de zona
  gravar() {

    var OBJETIVO = new LG_DIC_OBJETIVOS;
    OBJETIVO.id = this.ID;
    OBJETIVO.objetivo_CLIENTES = this.objetivo;

    OBJETIVO.utz_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    OBJETIVO.data_MODIF = new Date();

    this.LGDICOBJETIVOSService.update(OBJETIVO).then(() => {
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
