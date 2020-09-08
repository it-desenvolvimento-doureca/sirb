import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERDICPROJCABService } from 'app/servicos/ger-dic-proj-cab.service';
import { GERDICPROJFABService } from 'app/servicos/ger-dic-proj-fab.service';
import { GERDICPROJREFService } from 'app/servicos/ger-dic-proj-ref.service';
import { GER_DIC_PROJ_CAB } from 'app/entidades/GER_DIC_PROJ_CAB';
import { GER_DIC_PROJ_REF } from 'app/entidades/GER_DIC_PROJ_REF';
import { GER_DIC_PROJ_FAB } from 'app/entidades/GER_DIC_PROJ_FAB';
import { GERDICPROGRAMAService } from 'app/servicos/ger-dic-programa.service';
import { GERDICFABRICAService } from 'app/servicos/ger-dic-fabrica.service';
import { ConfirmationService } from 'primeng/primeng';
import { importExpr } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-producao-Projetos',
  templateUrl: './producao-Projetos.component.html',
  styleUrls: ['./producao-Projetos.component.css']
})
export class ProducaoProjetosComponent implements OnInit {

  tabela_referencias = [];
  tabela_fabricas = [];
  artigos: any = [];
  user: any;

  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;
  @ViewChild('inputapagar') inputapagar: ElementRef;
  linhas: any[];
  id_PROGRAMA: number;
  id_PROJ_CAB: number;
  novo: any;
  modoedicao: boolean;
  programas: any[];
  fabricas: any[];
  mensagem: string;
  dialog: boolean;
  veiculo: string;
  oem: string;

  constructor(private GERDICPROJCABService: GERDICPROJCABService, private router: Router, private globalVar: AppGlobals,
    private GERDICPROJFABService: GERDICPROJFABService, private route: ActivatedRoute, private GERDICPROGRAMAService: GERDICPROGRAMAService,
    private GERDICFABRICAService: GERDICFABRICAService, private confirmationService: ConfirmationService,
    private GERDICPROJREFService: GERDICPROJREFService, private renderer: Renderer) { }

  ngOnInit() {

    this.globalVar.setapagar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.seteditar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.setduplicar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);

    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });


    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(true);
        this.modoedicao = true;

      } else if (urlarray[1].match("novo")) {
        this.globalVar.setseguinte(false);
        this.globalVar.setanterior(false);
        this.globalVar.setapagar(false);
        this.globalVar.setcriar(false);

        this.novo = true;
        this.globalVar.seteditar(false);
        this.modoedicao = true;
        /*var dirtyFormID = 'formReclama';
        var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
        resetForm.reset();*/

      } else if (urlarray[1].match("view")) {

        this.globalVar.setcriar(true);
      }
    }


    /*this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108editar"));
    this.globalVar.setdisCriar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108criar"));
    this.globalVar.setdisApagar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108apagar"));*/
    var editar1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108editar")
    var editar2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15834editar")
    var criar1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108criar")
    var criar2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15834criar")
    var apagar1 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node92108apagar")
    var apagar2 = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node15834apagar")
    if (editar1 || editar2) this.globalVar.setdisEditar(false);
    if (criar1 || criar2) this.globalVar.setdisCriar(false);
    if (apagar1 || apagar2) this.globalVar.setdisApagar(false);


    this.listar_refs();
    this.listar_programas();
    this.listar_fabricas();
    if (!this.novo) this.carregadados(id)

  }

  carregadados(id) {
    this.GERDICPROJCABService.getbyid2(id).subscribe(
      response => {
        this.artigos = [];
        //this.artigos.push({ value: null, label: 'Selecionar Artigo' });

        for (var x in response) {
          this.id_PROGRAMA = response[x][1];
          this.id_PROJ_CAB = response[x][0];
          this.veiculo = response[x][2];
          this.oem = response[x][3];
        }


        this.carregatabela_referencias(id);
        this.carregatabela_fabricas(id);
      },
      error => { console.log(error); });
  }

  atualizacampos(event) {
    if (event.value != "") {
      var array = this.programas.find(item => item.value == event.value);
      this.veiculo = array.veiculo;
      this.oem = array.oem;
    } else {
      this.veiculo = "";
      this.oem = "";
    }
  }

  listar_refs() {

    this.GERDICPROJCABService.getComponentes().subscribe(
      response => {
        this.artigos = [];
        //this.artigos.push({ value: null, label: 'Selecionar Artigo' });

        for (var x in response) {
          this.artigos.push({
            value: response[x].PROREF, label: response[x].PROREF + ' - ' + response[x].PRODES1, desc_REF: response[x].PRODES1
          });
        }
        this.artigos = this.artigos.slice();

      },
      error => { console.log(error); });
  }


  listar_programas() {
    this.programas = [];
    this.programas.push({ value: "", label: "Selecionar Programa" });
    this.GERDICPROGRAMAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.programas.push({
            value: response[x][0].id_PROGRAMA, label: response[x][0].nome,
            veiculo: response[x][1], oem: response[x][2],
          });
        }
        this.programas = this.programas.slice();
      },
      error => console.log(error));
  }

  listar_fabricas() {
    this.fabricas = [];
    this.fabricas.push({ value: "", label: "Selecionar Fábrica" });
    this.GERDICFABRICAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.fabricas.push({
            value: response[x].id_FABRICA, label: response[x].nome
          });
        }
        this.fabricas = this.fabricas.slice();
      },
      error => console.log(error));
  }

  carregatabela_referencias(id) {
    this.GERDICPROJREFService.getbyid(id).subscribe(
      response2 => {
        this.tabela_referencias = [];

        for (var y in response2) {

          //var referencia_campo = { value: response2[y].id_REF, label: response2[y].id_REF + " - " + response2[y].desc_REF, desc_REF: response2[y].desc_REF };
          var referencia_campo = { value: response2[y].id_REF, label: response2[y].id_REF, desc_REF: response2[y].desc_REF };

          this.tabela_referencias.push({
            filteredreferencias: [], referencia_campo: referencia_campo,
            data: response2[y], id_PROJ_REF: response2[y].id_PROJ_REF,
            id_REF: response2[y].id_REF, desc_REF: response2[y].desc_REF, pv: response2[y].pv
          });
        }
        this.tabela_referencias = this.tabela_referencias.slice();

      },
      error => { console.log(error); });
  }



  carregatabela_fabricas(id) {
    this.GERDICPROJFABService.getbyid(id).subscribe(
      response2 => {
        this.tabela_fabricas = [];

        for (var y in response2) {
          this.tabela_fabricas.push({
            data: response2[y], id_PROJ_FAB: response2[y].id_PROJ_FAB, id_FABRICA: response2[y].id_FABRICA, percentagem: response2[y].percentagem
          });
        }
        this.tabela_fabricas = this.tabela_fabricas.slice();

      },
      error => { console.log(error); });
  }



  gravar() {


    var dados = new GER_DIC_PROJ_CAB;
    dados.id_PROGRAMA = this.id_PROGRAMA;
    if (!this.novo) dados.id_PROJ_CAB = this.id_PROJ_CAB;
    this.GERDICPROJCABService.verifica(dados).subscribe(
      response => {
        var count = Object.keys(response).length;
        //se existir banhos com o id
        if (count > 0) {
          this.mensagem = "Já Existe um Projeto para este Programa!";
          this.dialog = true;
        } else {
          this.gravar_dados(dados);
        }
      },
      error => console.log(error));
  }


  gravar_dados(dados) {
    if (this.novo) {
      this.GERDICPROJCABService.create(dados).subscribe(result => {
        if (this.tabela_referencias.length > 0) {
          this.gravarref(result.id_PROJ_CAB);
        } else if (this.tabela_fabricas.length > 0) {
          this.gravarfabricas(result.id_PROJ_CAB);
        } else {
          if (this.novo) {
            this.router.navigate(['producao_projetos/editar'], { queryParams: { id: result.id_PROJ_CABd } });
          } else {
            this.router.navigate(['producao_projetos/view'], { queryParams: { id: result.id_PROJ_CAB } });
          }
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);

      });
    } else {
      dados.id_PROJ_CAB = this.id_PROJ_CAB;
      this.GERDICPROJCABService.update(dados).subscribe(result => {
        if (this.tabela_referencias.length > 0) {
          this.gravarref(result.id_PROJ_CAB);
        } else if (this.tabela_fabricas.length > 0) {
          this.gravarfabricas(result.id_PROJ_CAB);
        } else {
          if (this.novo) {
            this.router.navigate(['producao_projetos/editar'], { queryParams: { id: result.id_PROJ_CAB } });
          } else {
            this.router.navigate(['producao_projetos/view'], { queryParams: { id: result.id_PROJ_CAB } });
          }
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);

      });

    }
  }
  gravarref(id) {
    for (var x in this.tabela_referencias) {
      if (this.tabela_referencias[x].id_PROJ_REF == null) {
        this.cria_tabelaref(this.tabela_referencias[x], this.tabela_referencias.length, parseInt(x) + 1, id);
      } else {
        this.atualiza_tabelaref(this.tabela_referencias[x], this.tabela_referencias.length, parseInt(x) + 1, id);
      }
    }
  }

  cria_tabelaref(data, total, index, id) {
    if (data.id_REF != null && data.id_REF != "") {
      var dados = new GER_DIC_PROJ_REF;
      dados.id_REF = data.id_REF;
      dados.id_PROJ_CAB = id;
      dados.pv = data.pv;
      dados.desc_REF = data.desc_REF;

      this.GERDICPROJREFService.create(dados).subscribe(result => {
        if (total == index) {
          if (this.tabela_fabricas.length > 0) {
            this.gravarfabricas(result.id_PROJ_CAB);
          } else {
            if (this.novo) {
              this.router.navigate(['producao_projetos/editar'], { queryParams: { id: id } });
            } else {
              this.router.navigate(['producao_projetos/view'], { queryParams: { id: id } });
            }
          }
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);
        if (total == index) {
          if (this.tabela_fabricas.length > 0) {
            this.gravarfabricas(id);
          } else {
            if (this.novo) {
              this.router.navigate(['producao_projetos/editar'], { queryParams: { id: id } });
            } else {
              this.router.navigate(['producao_projetos/view'], { queryParams: { id: id } });
            }
          }
        }
      });

    }
  }

  atualiza_tabelaref(data, total, index, id) {
    if (data.id_REF != null && data.id_REF != "") {
      var dados = new GER_DIC_PROJ_REF;
      dados.id_REF = data.id_REF;
      dados.id_PROJ_CAB = id;
      dados.id_PROJ_REF = data.id_PROJ_REF;
      dados.desc_REF = data.desc_REF;
      dados.pv = data.pv;
      this.GERDICPROJREFService.update(dados).subscribe(result => {
        if (total == index) {
          this.gravarfabricas(id);
        }
      }, error => {
        console.log(error); this.simular(this.inputerro);
        this.gravarfabricas(id);
      });
    }
  }


  gravarfabricas(id) {
    for (var x in this.tabela_fabricas) {
      if (this.tabela_fabricas[x].id_FABRICA == null) {
        this.cria_tabelafabrica(this.tabela_fabricas[x], this.tabela_fabricas.length, parseInt(x) + 1, id);
      } else {
        this.atualiza_tabelafabrica(this.tabela_fabricas[x], this.tabela_fabricas.length, parseInt(x) + 1, id);
      }
    }
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  cria_tabelafabrica(data, total, index, id) {
    if (data.id_FABRICA != null && data.id_FABRICA != "") {
      var dados = new GER_DIC_PROJ_FAB;
      dados.id_FABRICA = data.id_FABRICA;
      dados.percentagem = data.percentagem;
      dados.id_PROJ_CAB = id;

      this.GERDICPROJFABService.create(dados).subscribe(result => {
        if (total == index) {
          this.simular(this.inputgravou)
          if (this.novo) {
            this.router.navigate(['producao_projetos/editar'], { queryParams: { id: id } });
          } else {
            this.router.navigate(['producao_projetos/view'], { queryParams: { id: id } });
          }
        }
      }, error => {
        console.log(error);
        if (total == index) {
          this.simular(this.inputerro);
        }
      });

    }
  }

  atualiza_tabelafabrica(data, total, index, id) {
    if (data.id_FABRICA != null && data.id_FABRICA != "") {
      var dados = new GER_DIC_PROJ_FAB;
      dados.id_PROJ_FAB = data.id_PROJ_FAB;
      dados.id_FABRICA = data.id_FABRICA;
      dados.percentagem = data.percentagem;
      dados.id_PROJ_CAB = id;

      this.GERDICPROJFABService.update(dados).subscribe(result => {
        if (total == index) {
          this.simular(this.inputgravou)
          if (this.novo) {
            this.router.navigate(['producao_projetos/editar'], { queryParams: { id: id } });
          } else {
            this.router.navigate(['producao_projetos/view'], { queryParams: { id: id } });
          }
        }
      }, error => {
        console.log(error);
        if (total == index) {
          this.simular(this.inputerro);
        }
      });
    }
  }
  //adicionar linha às tabelas
  adicionar_linha_ref() {
    this.tabela_referencias.push({
      filteredreferencias: [], referencia_campo: null, id_PROJ_REF: null
      , id_REF: null, desc_REF: null, pv: false
    });
    this.tabela_referencias = this.tabela_referencias.slice();
  }

  adicionar_linha_fabrica() {
    this.tabela_fabricas.push({ id_PROJ_FAB: null, id_FABRICA: null, percentagem: 0 });
    this.tabela_fabricas = this.tabela_fabricas.slice();
  }


  apagar_linha_ref(index) {
    var tab = this.tabela_referencias[index];
    if (tab.id_PROJ_REF == null) {
      this.tabela_referencias = this.tabela_referencias.slice(0, index).concat(this.tabela_referencias.slice(index + 1));
    } else {
      this.GERDICPROJREFService.delete(tab.id_PROJ_REF).then(
        res => {
          this.tabela_referencias = this.tabela_referencias.slice(0, index).concat(this.tabela_referencias.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }

  apagar_linha_fabrica(index) {
    var tab = this.tabela_fabricas[index];
    if (tab.id_PROJ_FAB == null) {
      this.tabela_fabricas = this.tabela_fabricas.slice(0, index).concat(this.tabela_fabricas.slice(index + 1));
    } else {
      this.GERDICPROJFABService.delete(tab.id_PROJ_FAB).then(
        res => {
          this.tabela_fabricas = this.tabela_fabricas.slice(0, index).concat(this.tabela_fabricas.slice(index + 1));
        },
        error => { console.log(error); this.simular(this.inputerro); });
    }
  }



  backview() {
    //this.location.back();
    this.router.navigate(['producao_projetos']);
  }



  filterRef(event, index) {
    this.tabela_referencias[index].desc_REF = "";
    this.tabela_referencias[index].id_REF = null;

    this.tabela_referencias[index].filteredreferencias = this.pesquisa(event.query);
  }


  pesquisa(text) {
    var result = [];
    for (var x in this.artigos) {
      let ref = this.artigos[x];
      if (ref.label.toLowerCase().includes(text.toLowerCase())) {
        if (!this.tabela_referencias.find(item => item.id_REF == ref.value)) result.push(this.artigos[x]);
      }
    }
    return result;
  }

  filteronUnselect(event, index) {
    this.tabela_referencias[index].desc_REF = "";
    this.tabela_referencias[index].id_REF = null;
  }

  filterSelect(event, index) {
    var tab = this.artigos.find(item => item.value == event.value)
    if (tab) {
      this.tabela_referencias[index].id_REF = event.value;
      this.tabela_referencias[index].desc_REF = tab.desc_REF;
      var referencia_campo = { value: event.value, label: event.value, desc_REF: tab.desc_REF };
      this.tabela_referencias[index].referencia_campo = referencia_campo;
    } else {
      this.tabela_referencias[index].desc_REF = "";
      this.tabela_referencias[index].id_REF = null;
    }

    this.tabela_referencias = this.tabela_referencias.slice();
  }


  apagar() {
    var id;
    var sub = this.route
      .queryParams
      .subscribe(params => {
        id = params['id'] || 0;
      });
    if (id != 0) {
      this.confirm(id);
    }

  }


  //popup apagar
  confirm(id) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        this.GERDICPROJCABService.delete(id).then(
          res => {
            this.simular(this.inputapagar);
            this.router.navigate(['producao_projetos']);
          },
          error => { console.log(error); this.simular(this.inputerro); });
      }
    });
  }
}