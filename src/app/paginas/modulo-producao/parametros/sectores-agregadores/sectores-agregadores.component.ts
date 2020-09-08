import { Component, OnInit, Renderer } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { PRDICSECTORESAGREGADORESLINHAService } from 'app/servicos/pr-dic-sectores-agregadores-linha.service';
import { PRDICSECTORESAGREGADORESService } from 'app/servicos/pr-dic-sectores-agregadores.service';
import { PR_DIC_SECTORES_AGREGADORES_LINHA } from 'app/entidades/PR_DIC_SECTORES_AGREGADORES_LINHA';
import { PR_DIC_SECTORES_AGREGADORES } from 'app/entidades/PR_DIC_SECTORES_AGREGADORES';

@Component({
  selector: 'app-sectores-agregadores',
  templateUrl: './sectores-agregadores.component.html',
  styleUrls: ['./sectores-agregadores.component.css']
})
export class SectoresAgregadoresComponent implements OnInit {

  user: any;
  sectores: any[];
  novo: boolean;
  id_depart_selected: number;

  departs: any[];
  modoedicao: boolean;

  criar: boolean;
  dialognovo: boolean;
  acesso_editar: any;
  acesso_apagar: any;
  acesso_criar: any;
  targetSectores_linha2: any[];
  sourceSectores_linha1: any[];
  targetSectores_linha1: any[];
  sourceSectores_linha2: any[];
  sourceSectores_geral: any[];
  targetSectores_geral: any[];
  nome: any;
  operacao: any;
  sector_agregador: any;

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private PRDICSECTORESAGREGADORESLINHAService: PRDICSECTORESAGREGADORESLINHAService,
    private PRDICSECTORESAGREGADORESService: PRDICSECTORESAGREGADORESService,
    private renderer: Renderer) { }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9215editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9215apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node9215criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.nome = null;
    this.operacao = null;

    this.preencheListas_linha1(this.id_depart_selected, 1);
    this.preencheListas_linha2(this.id_depart_selected, 2);
    this.preencheListas_geral(this.id_depart_selected, 0);

    this.dialognovo = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new PR_DIC_SECTORES_AGREGADORES;
    if (!this.novo) depart = this.sector_agregador;
    depart.operacao = this.operacao;
    depart.nome = this.nome;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      depart.ativo = true;
      this.PRDICSECTORESAGREGADORESService.create(depart).subscribe(response => {
        this.gravarlinhas(response.id_SECTOR_AGREGADOR);
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.id_SECTOR_AGREGADOR = this.id_depart_selected;
      this.PRDICSECTORESAGREGADORESService.update(depart).subscribe(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.PRDICSECTORESAGREGADORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].id_SECTOR_AGREGADOR, operacao: response[x].operacao, nome: response[x].nome, dados: response[x]
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }


  apagar() {
    this.dialognovo = false;
    setTimeout(() => { this.apagardados() }, 100);
  }

  //apagar zona
  apagardados() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        var depart = new PR_DIC_SECTORES_AGREGADORES;
        depart = this.sector_agregador;
        depart.ativo = false;
        depart.data_ANULA = new Date();
        depart.utz_ANULA = this.user;

        this.PRDICSECTORESAGREGADORESService.update(depart).subscribe(() => {
          this.listar_departs();
          this.dialognovo = false;
        });

      }, reject: () => {
        this.dialognovo = true;
      }
    });

  }



  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.sector_agregador = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.nome = event.data.nome;
    this.operacao = event.data.operacao;

    this.preencheListas_linha1(this.id_depart_selected, 1);
    this.preencheListas_linha2(this.id_depart_selected, 2);
    this.preencheListas_geral(this.id_depart_selected, 0);

    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  //ao inserir nos sectores do departamento
  onMoveToTarget_linha1(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        var perf = new PR_DIC_SECTORES_AGREGADORES_LINHA;
        perf.cod_SECTOR = e.items[x].cod_SECTOR;
        perf.linha = 1;
        perf.id_SECTOR_AGREGADOR = this.id_depart_selected;
        this.PRDICSECTORESAGREGADORESLINHAService.create(perf).subscribe(
          res => {
            if (x == e.items.length) {
              this.preencheListas_linha1(this.id_depart_selected, 1);
            }
          },
          error => { console.log(error); });
      }
    }

  }
  //ao mover para sectores 
  onMoveToSource_linha1(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        this.PRDICSECTORESAGREGADORESLINHAService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            this.preencheListas_linha1(this.id_depart_selected, 1);
          }
        });
      }
    }
  }

  //ao inserir nos sectores do departamento
  onMoveToTarget_linha2(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        var perf = new PR_DIC_SECTORES_AGREGADORES_LINHA;
        perf.cod_SECTOR = e.items[x].cod_SECTOR;
        perf.linha = 2;
        perf.id_SECTOR_AGREGADOR = this.id_depart_selected;
        this.PRDICSECTORESAGREGADORESLINHAService.create(perf).subscribe(
          res => {
            if (x == e.items.length) {
              this.preencheListas_linha2(this.id_depart_selected, 2);
            }
          },
          error => { console.log(error); });
      }
    }

  }
  //ao mover para sectores 
  onMoveToSource_linha2(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        this.PRDICSECTORESAGREGADORESLINHAService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            this.preencheListas_linha2(this.id_depart_selected, 2);
          }
        });
      }
    }
  }

  onMoveToTarget_geral(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        var perf = new PR_DIC_SECTORES_AGREGADORES_LINHA;
        perf.cod_SECTOR = e.items[x].cod_SECTOR;
        perf.linha = 0;
        perf.id_SECTOR_AGREGADOR = this.id_depart_selected;
        this.PRDICSECTORESAGREGADORESLINHAService.create(perf).subscribe(
          res => {
            if (x == e.items.length) {
              this.preencheListas_geral(this.id_depart_selected, 0);
            }
          },
          error => { console.log(error); });
      }
    }

  }
  //ao mover para sectores 
  onMoveToSource_geral(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        this.PRDICSECTORESAGREGADORESLINHAService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            this.preencheListas_geral(this.id_depart_selected, 0);
          }
        });
      }
    }
  }


  preencheListas_linha1(id, linha) {
    this.sourceSectores_linha1 = [];
    this.targetSectores_linha1 = [];
    this.PRDICSECTORESAGREGADORESLINHAService.getSectoresAll(id, linha).subscribe(
      response => {
        for (var x in response) {
          this.sourceSectores_linha1.push({ id: null, nome: response[x][1], cod_SECTOR: response[x][0] });
        }
        this.sourceSectores_linha1 = this.sourceSectores_linha1.slice();
      }, error => { console.log(error); });

    this.PRDICSECTORESAGREGADORESLINHAService.getSectoresAgregadores(id, linha).subscribe(
      response => {
        for (var x in response) {
          this.targetSectores_linha1.push({ id: response[x][0], nome: response[x][2], cod_SECTOR: response[x][1] });
        }
        this.targetSectores_linha1 = this.targetSectores_linha1.slice();
      }, error => { console.log(error); });

  }

  preencheListas_linha2(id, linha) {
    this.sourceSectores_linha2 = [];
    this.targetSectores_linha2 = [];
    this.PRDICSECTORESAGREGADORESLINHAService.getSectoresAll(id, linha).subscribe(
      response => {
        for (var x in response) {
          this.sourceSectores_linha2.push({ id: null, nome: response[x][1], cod_SECTOR: response[x][0] });
        }
        this.sourceSectores_linha2 = this.sourceSectores_linha2.slice();
      }, error => { console.log(error); });

    this.PRDICSECTORESAGREGADORESLINHAService.getSectoresAgregadores(id, linha).subscribe(
      response => {
        for (var x in response) {
          this.targetSectores_linha2.push({ id: response[x][0], nome: response[x][2], cod_SECTOR: response[x][1] });
        }
        this.targetSectores_linha2 = this.targetSectores_linha2.slice();
      }, error => { console.log(error); });

  }

  preencheListas_geral(id, linha) {
    this.sourceSectores_geral = [];
    this.targetSectores_geral = [];
    this.PRDICSECTORESAGREGADORESLINHAService.getSectoresAll(id, linha).subscribe(
      response => {
        for (var x in response) {
          this.sourceSectores_geral.push({ id: null, nome: response[x][1], cod_SECTOR: response[x][0] });
        }
        this.sourceSectores_geral = this.sourceSectores_geral.slice();
      }, error => { console.log(error); });

    this.PRDICSECTORESAGREGADORESLINHAService.getSectoresAgregadores(id, linha).subscribe(
      response => {
        for (var x in response) {
          this.targetSectores_geral.push({ id: response[x][0], nome: response[x][2], cod_SECTOR: response[x][1] });
        }
        this.targetSectores_geral = this.targetSectores_geral.slice();
      }, error => { console.log(error); });

  }

  gravarlinhas(id) {
    for (var x in this.targetSectores_linha1) {
      var perf = new PR_DIC_SECTORES_AGREGADORES_LINHA;
      perf.cod_SECTOR = this.targetSectores_linha1[x].cod_SECTOR;
      perf.id_SECTOR_AGREGADOR = id;
      perf.linha = 1;
      this.PRDICSECTORESAGREGADORESLINHAService.create(perf).subscribe(
        res => {
        },
        error => { console.log(error); })
    }

    for (var y in this.targetSectores_linha2) {
      var perf = new PR_DIC_SECTORES_AGREGADORES_LINHA;
      perf.cod_SECTOR = this.targetSectores_linha2[y].cod_SECTOR;
      perf.id_SECTOR_AGREGADOR = id;
      perf.linha = 2;
      this.PRDICSECTORESAGREGADORESLINHAService.create(perf).subscribe(
        res => {
        },
        error => { console.log(error); })
    }

    for (var z in this.targetSectores_geral) {
      var perf = new PR_DIC_SECTORES_AGREGADORES_LINHA;
      perf.cod_SECTOR = this.targetSectores_geral[z].cod_SECTOR;
      perf.id_SECTOR_AGREGADOR = id;
      perf.linha = 0;
      this.PRDICSECTORESAGREGADORESLINHAService.create(perf).subscribe(
        res => {
        },
        error => { console.log(error); })
    }
  }
}