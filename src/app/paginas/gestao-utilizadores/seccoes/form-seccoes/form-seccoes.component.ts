import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { GERUTILIZADORESService } from '../../../../servicos/ger-utilizadores.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from '../../../../menu/sidebar.metadata';
import { ConfirmationService } from 'primeng/primeng';
import { GERSECCAOService } from '../../../../servicos/ger-seccao.service';
import { GERSECCAOUTZService } from '../../../../servicos/ger-seccao-utz.service';
import { GER_SECCAO } from '../../../../entidades/GER_SECCAO';
import { GER_SECCAO_UTZ } from '../../../../entidades/GER_SECCAO_UTZ';
import { GERSECCAOCHEFESService } from '../../../../servicos/ger-seccao-chefes.service';
import { GERDEPARTAMENTOService } from '../../../../servicos/ger-departamento.service';
import { GER_SECCAO_CHEFES } from '../../../../entidades/GER_SECCAO_CHEFES';

@Component({
  selector: 'app-form-seccoes',
  templateUrl: './form-seccoes.component.html',
  styleUrls: ['./form-seccoes.component.css']
})
export class FormSeccoesComponent implements OnInit {
  novo: boolean;
  modoedicao: boolean;
  sourceUtilizadores: any[];
  targetUtilizadores = [];
  sourceUtilizadores2: any[];
  targetUtilizadores2 = [];
  user: any;
  id_seccao: number;
  descricao: string;


  @ViewChild('inputnotifi') inputnotifi: ElementRef;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  i: any;
  seccoes: any = [];
  departs: any[];
  id_DEPARTAMENTO: number;
  responsavel: string;
  seccao: GER_SECCAO;

  constructor(private GERDEPARTAMENTOService: GERDEPARTAMENTOService, private GERSECCAOCHEFESService: GERSECCAOCHEFESService, private confirmationService: ConfirmationService, private GERSECCAOService: GERSECCAOService, private GERSECCAOUTZService: GERSECCAOUTZService, private GERUTILIZADORESService: GERUTILIZADORESService, private router: Router, private renderer: Renderer, private route: ActivatedRoute, private location: Location, private globalVar: AppGlobals) { }

  ngOnInit() {

    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setapagar(true);
    this.globalVar.setseguinte(true);
    this.globalVar.setanterior(true);
    this.globalVar.setcriar(true);
    this.globalVar.setduplicar(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node19apagar"));

    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });


    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");


    if (urlarray[1].match("editar") || urlarray[1].match("view")) {
      var id;
      var sub = this.route
        .queryParams
        .subscribe(params => {
          id = params['id'] || 0;
        });

      this.novo = false;

      if (id == 0) {
        this.router.navigate(['seccoes']);
      }

    }
    if (urlarray[1].match("editar")) {
      this.modoedicao = true;
      this.globalVar.setseguinte(false);
      this.globalVar.setanterior(false);
    } else if (urlarray[1].match("novo")) {
      this.globalVar.setseguinte(false);
      this.globalVar.setanterior(false);
      this.globalVar.setapagar(false);
      this.globalVar.setcriar(true);
      this.novo = true;
      this.globalVar.seteditar(false);
      this.modoedicao = true;
    }

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];


    if (this.novo) {
      this.getutilizadores();
      this.carregarDepartamentos();
    } else {

      //preenche array para navegar nos utilizadores 
      this.GERSECCAOService.getAll().subscribe(
        response => {
          for (var x in response) {
            this.seccoes.push(response[x].id);
          }

          this.i = this.seccoes.indexOf(+id);
          this.inicia(this.seccoes[this.i]);

        }, error => { console.log(error); this.inicia(id); });

    }

  }

  inicia(id) {
    this.GERSECCAOService.getByid(id).subscribe(
      response => {
        for (var x in response) {
          this.seccao = response[x];
          this.descricao = response[x].descricao;
          this.id_seccao = response[x].id;
          this.id_DEPARTAMENTO = response[x].id_DEPARTAMENTO;
          this.preencheListaFunc(this.id_seccao);
          this.preencheListaChefes(this.id_seccao);
        }
        this.carregarDepartamentos();
      },
      error => console.log(error));

  }

  carregarDepartamentos() {
    this.departs = [];
    this.GERDEPARTAMENTOService.getAll2().subscribe(
      response => {
        this.departs.push({ value: "", label: "Seleccionar Departamento" });
        for (var x in response) {

          if (!this.novo && this.id_DEPARTAMENTO == response[x][0].id) this.responsavel = response[x][1].nome_UTILIZADOR;

          this.departs.push({ value: response[x][0].id, label: response[x][0].descricao, nome: response[x][1].nome_UTILIZADOR });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }

  //ao alterar departamento
  getResponsavel(event) {
    this.responsavel = event.selectedOption.nome;
  }

  gravar() {
    var seccao = new GER_SECCAO;
    if (!this.novo) seccao = this.seccao;
    seccao.descricao = this.descricao;
    seccao.id_DEPARTAMENTO = this.id_DEPARTAMENTO;
    seccao.inativo = false;
    seccao.utz_ULT_MODIF = this.user;
    seccao.data_ULT_MODIF = new Date();

    if (this.novo) {

      seccao.utz_CRIA = this.user;
      seccao.data_CRIA = new Date();

      this.GERSECCAOService.create(seccao).subscribe(
        res => {
          for (var x in this.targetUtilizadores) {
            var perf = new GER_SECCAO_UTZ;
            perf.id_UTZ = this.targetUtilizadores[x].id;
            perf.id_SECCAO = res.id;
            this.inserirtarget(x, perf, res.id);
          }

        },
        error => {
          this.simular(this.inputerro);
          console.log(error);
        });

    } else {
      seccao.id = this.id_seccao
      this.GERSECCAOService.update(seccao).then(
        res => {
          this.router.navigate(['seccoes/view'], { queryParams: { id: this.id_seccao } });
          this.simular(this.inputgravou);
        },
        error => {
          this.simular(this.inputerro);
          console.log(error);
        });
    }
  }

  seguinte() {
    this.i = this.i + 1;
    this.i = this.i % this.seccoes.length;
    if (this.seccoes.length > 0) {
      this.inicia(this.seccoes[this.i]);
      this.router.navigate(['seccoes/view'], { queryParams: { id: this.seccoes[this.i] } });
    }
  }

  anterior() {
    if (this.i === 0) {
      this.i = this.seccoes.length;
    }
    this.i = this.i - 1;
    this.router.navigate(['seccoes/view'], { queryParams: { id: this.seccoes[this.i] } });
    if (this.seccoes.length > 0) {
      this.inicia(this.seccoes[this.i]);
    }
  }

  apagar() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var grupo = new GER_SECCAO;
        grupo = this.seccao;
        grupo.descricao = this.descricao;
        grupo.inativo = true;
        grupo.id = this.id_seccao
        grupo.utz_APAGA = this.user;
        grupo.data_APAGA = new Date();
        this.GERSECCAOService.update(grupo).then(
          res => {
            this.simular(this.inputapagar);
            this.router.navigate(['seccoes']);
          },
          error => {
            this.simular(this.inputerro);
            console.log(error);
          });

      }
    });
  }

  //inserir Funcionários
  inserirtarget(x, perf, id) {
    this.GERSECCAOUTZService.create(perf).subscribe(
      res => {
        if (x == (this.targetUtilizadores.length - 1)) {
          this.inserirtarget2(id)
        }
      },
      error => {
        if (x == (this.targetUtilizadores.length - 1)) {
          this.inserirtarget2(id);
        }
        console.log(error);
      });
  }


  //inserir Chefes
  inserirtarget2(id) {
    for (var y in this.targetUtilizadores2) {
      var chefe = new GER_SECCAO_CHEFES;
      chefe.id_UTZ = this.targetUtilizadores[y].id;
      chefe.id_SECCAO = id;
      this.insereChefe(chefe, y, id);
    }
  }

  insereChefe(chefe, x, id) {
    this.GERSECCAOCHEFESService.create(chefe).subscribe(
      res => {
        if (x == (this.targetUtilizadores2.length - 1)) {
          this.simular(this.inputnotifi);
          this.router.navigate(['seccoes/view'], { queryParams: { id: id } });
        }
      },
      error => {
        if (x == (this.targetUtilizadores2.length - 1)) {
          this.simular(this.inputnotifi);
          this.router.navigate(['seccoes/view'], { queryParams: { id: id } });
        }
        console.log(error);
      });
  }

  getutilizadores() {
    this.sourceUtilizadores = [];
    this.sourceUtilizadores2 = [];
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        for (var x in response) {

          this.sourceUtilizadores.push({ nome: response[x].nome_UTILIZADOR, id: response[x].id_UTILIZADOR });
          this.sourceUtilizadores2.push({ nome: response[x].nome_UTILIZADOR, id: response[x].id_UTILIZADOR });

        }
        this.sourceUtilizadores = this.sourceUtilizadores.slice();
        this.sourceUtilizadores2 = this.sourceUtilizadores.slice();
      },
      error => console.log(error));
  }

  //ao inserir nos chefes de utilizador
  onMoveToTarget(e) {
    var x;
    if (!this.novo) {
      for (x in e.items) {
        var perf = new GER_SECCAO_UTZ;
        perf.id_UTZ = e.items[x].id_UTZ;
        perf.id_SECCAO = this.id_seccao;
        this.GERSECCAOCHEFESService.create(perf).subscribe(
          res => {
            if (x == (e.items.length - 1)) {
              if (!this.novo) this.preencheListaChefes(this.id_seccao);
            }
          },
          error => { console.log(error); });
      }
    }

  }

  //ao retirar dos chefes
  onMoveToSource(e) {
    var x;
    if (!this.novo) {
      for (x in e.items) {
        this.GERSECCAOCHEFESService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            if (!this.novo) this.preencheListaChefes(this.id_seccao);
          }
        });
      }
    }
  }

  //ao inserir nos utilizadores
  onMoveToTarget2(e) {
    var x;
    if (!this.novo) {
      for (x in e.items) {
        var perf = new GER_SECCAO_UTZ;
        perf.id_UTZ = e.items[x].id_UTZ;
        perf.id_SECCAO = this.id_seccao;
        this.GERSECCAOUTZService.create(perf).subscribe(
          res => {
            if (x == (e.items.length - 1)) {
              if (!this.novo) this.preencheListaFunc(this.id_seccao);
            }
          },
          error => { console.log(error); });
      }
    }

  }

  //ao retirar dos utilizadores
  onMoveToSource2(e) {
    var x;
    if (!this.novo) {
      for (x in e.items) {
        this.GERSECCAOUTZService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            if (!this.novo) this.preencheListaFunc(this.id_seccao);
          }
        });
      }
    }
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  preencheListaFunc(id) {
    //carrega lista funcionários
    this.sourceUtilizadores2 = [];
    this.targetUtilizadores2 = [];
    this.GERSECCAOUTZService.getUtilizadores(this.id_seccao).subscribe(
      response => {
        for (var x in response) {
          this.sourceUtilizadores2.push({ nome: response[x].nome_UTILIZADOR, id_UTZ: response[x].id_UTILIZADOR });
        }
        this.sourceUtilizadores2 = this.sourceUtilizadores2.slice();
      }, error => { console.log(error); });

    this.GERSECCAOUTZService.getbyidgrupo(id).subscribe(
      response => {
        for (var x in response) {

          this.targetUtilizadores2.push({ id: response[x][0].id, nome: response[x][1].nome_UTILIZADOR, id_UTZ: response[x][0].id_UTILIZADOR });

        }
        this.targetUtilizadores2 = this.targetUtilizadores2.slice();
      },
      error => console.log(error));

  }


  preencheListaChefes(id) {
    //carrega lista chefes
    this.sourceUtilizadores = [];
    this.targetUtilizadores = [];
    this.GERSECCAOCHEFESService.getUtilizadores(this.id_seccao).subscribe(
      response => {
        for (var x in response) {
          this.sourceUtilizadores.push({ nome: response[x].nome_UTILIZADOR, id_UTZ: response[x].id_UTILIZADOR });
        }
        this.sourceUtilizadores = this.sourceUtilizadores.slice();
      }, error => { console.log(error); });

    this.GERSECCAOCHEFESService.getbyidgrupo(id).subscribe(
      response => {
        for (var x in response) {

          this.targetUtilizadores.push({ id: response[x][0].id, nome: response[x][1].nome_UTILIZADOR, id_UTZ: response[x][0].id_UTILIZADOR });

        }
        this.targetUtilizadores = this.targetUtilizadores.slice();
      },
      error => console.log(error));
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

}
