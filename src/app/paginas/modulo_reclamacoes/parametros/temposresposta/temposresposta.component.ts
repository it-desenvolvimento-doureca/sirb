import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { RCDICTEMPORESPOSTAService } from '../../../../servicos/rc-dic-tempo-resposta.service';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { RC_DIC_TEMPO_RESPOSTA } from '../../../../entidades/RC_DIC_TEMPO_RESPOSTA';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temposresposta',
  templateUrl: './temposresposta.component.html',
  styleUrls: ['./temposresposta.component.css']
})
export class TemposrespostaComponent implements OnInit {
  tempo_RESPOSTA_STEP1: number;
  tempo_RESPOSTA_STEP2: number;
  tempo_RESPOSTA_STEP3: number;
  tempo_RESPOSTA_STEP4: number;
  tempo_RESPOSTA_STEP5: number;
  tempo_RESPOSTA_STEP6: number;
  tempo_RESPOSTA_STEP7: number;
  tempo_RESPOSTA_STEP8: number;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  tempo_ID: number;
  tempo_REVISAO: any;

  constructor(private router: Router, private globalVar: AppGlobals, private RCDICTEMPORESPOSTAService: RCDICTEMPORESPOSTAService, private renderer: Renderer) { }

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

    this.RCDICTEMPORESPOSTAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.tempo_ID = response[x].id;
          this.tempo_RESPOSTA_STEP1 = response[x].tempo_RESPOSTA_STEP1;
          this.tempo_RESPOSTA_STEP2 = response[x].tempo_RESPOSTA_STEP2;
          this.tempo_RESPOSTA_STEP3 = response[x].tempo_RESPOSTA_STEP3;
          this.tempo_RESPOSTA_STEP4 = response[x].tempo_RESPOSTA_STEP4;
          this.tempo_RESPOSTA_STEP5 = response[x].tempo_RESPOSTA_STEP5;
          this.tempo_RESPOSTA_STEP6 = response[x].tempo_RESPOSTA_STEP6;
          this.tempo_RESPOSTA_STEP7 = response[x].tempo_RESPOSTA_STEP7;
          this.tempo_RESPOSTA_STEP8 = response[x].tempo_RESPOSTA_STEP8;
          this.tempo_REVISAO = response[x].tempo_REVISAO;

        }

      },
      error => console.log(error));
  }


  //gravar unidade de zona
  gravar() {
    var TEMPO_RESPOSTA = new RC_DIC_TEMPO_RESPOSTA;
    TEMPO_RESPOSTA.id = this.tempo_ID;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP1 = this.tempo_RESPOSTA_STEP1;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP2 = this.tempo_RESPOSTA_STEP2;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP3 = this.tempo_RESPOSTA_STEP3;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP4 = this.tempo_RESPOSTA_STEP4;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP5 = this.tempo_RESPOSTA_STEP5;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP6 = this.tempo_RESPOSTA_STEP6;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP7 = this.tempo_RESPOSTA_STEP7;
    TEMPO_RESPOSTA.tempo_RESPOSTA_STEP8 = this.tempo_RESPOSTA_STEP8;
    TEMPO_RESPOSTA.tempo_REVISAO = this.tempo_REVISAO;


    TEMPO_RESPOSTA.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    TEMPO_RESPOSTA.data_ULT_MODIF = new Date();

    this.RCDICTEMPORESPOSTAService.update(TEMPO_RESPOSTA).then(() => {
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
