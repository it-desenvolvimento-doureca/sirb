import { Component, OnInit, Renderer } from '@angular/core';
import { RH_DIC_SECTORES_ABSENTISMO } from 'app/entidades/RH_DIC_SECTORES_ABSENTISMO';
import { RH_DIC_SECTORES_ABSENTISMO_LINHA } from 'app/entidades/RH_DIC_SECTORES_ABSENTISMO_LINHA';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHDICSECTORESABSENTISMOLINHAService } from 'app/servicos/rh-dic-sectores-absentismo-linha.service';
import { RHDICSECTORESABSENTISMOService } from 'app/servicos/rh-dic-sectores-absentismo.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-sectores-absentismo',
  templateUrl: './sectores-absentismo.component.html',
  styleUrls: ['./sectores-absentismo.component.css']
})
export class SectoresAbsentismoComponent implements OnInit {

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
  sourceSectores: any[];
  targetSectores: any[];
  nome: any;
  local: any;
  posicao: any;
  sector_absentismo: any;
  locais = [{ label: "Selecionar Local", value: null }, { value: 1, label: "Formariz" }, { value: 2, label: "São Bento" }];
  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private RHDICSECTORESABSENTISMOLINHAService: RHDICSECTORESABSENTISMOLINHAService,
    private RHDICSECTORESABSENTISMOService: RHDICSECTORESABSENTISMOService,
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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1612editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1612apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node1612criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.nome = null;
    this.local = null;
    this.posicao = null;

    this.preencheListas(this.id_depart_selected);

    this.dialognovo = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new RH_DIC_SECTORES_ABSENTISMO;
    if (!this.novo) depart = this.sector_absentismo;
    depart.local = this.local;
    depart.posicao = this.posicao;
    depart.nome = this.nome;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      depart.ativo = true;
      this.RHDICSECTORESABSENTISMOService.create(depart).subscribe(response => {
        this.gravarlinhas(response.id_SECTOR_ABSENTISMO);
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.id_SECTOR_ABSENTISMO = this.id_depart_selected;
      this.RHDICSECTORESABSENTISMOService.update(depart).subscribe(() => {
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.RHDICSECTORESABSENTISMOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].id_SECTOR_ABSENTISMO, local_texto: this.getlocal(response[x].local), local: response[x].local,
            nome: response[x].nome, dados: response[x], posicao: response[x].posicao
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }

  getlocal(valor) {
    if (valor == 1) {
      return "Formariz"
    } else if (valor == 2) {
      return "São Bento"
    } else {
      return ""
    }
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
        var depart = new RH_DIC_SECTORES_ABSENTISMO;
        depart = this.sector_absentismo;
        depart.ativo = false;
        depart.data_ANULA = new Date();
        depart.utz_ANULA = this.user;

        this.RHDICSECTORESABSENTISMOService.update(depart).subscribe(() => {
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
    this.sector_absentismo = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.nome = event.data.nome;
    this.posicao = event.data.posicao;
    this.local = event.data.local;

    this.preencheListas(this.id_depart_selected);

    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


  onMoveToTarget(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        var perf = new RH_DIC_SECTORES_ABSENTISMO_LINHA;
        perf.cod_SECTOR = e.items[x].cod_SECTOR;
        perf.id_SECTOR_ABSENTISMO = this.id_depart_selected;
        this.RHDICSECTORESABSENTISMOLINHAService.create(perf).subscribe(
          res => {
            if (x == e.items.length) {
              this.preencheListas(this.id_depart_selected);
            }
          },
          error => { console.log(error); });
      }
    }

  }
  //ao mover para sectores 
  onMoveToSource(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        this.RHDICSECTORESABSENTISMOLINHAService.delete(e.items[x].id).then(() => {
          if (x == (e.items.length - 1)) {
            this.preencheListas(this.id_depart_selected);
          }
        });
      }
    }
  }





  preencheListas(id) {
    this.sourceSectores = [];
    this.targetSectores = [];

    this.RHDICSECTORESABSENTISMOLINHAService.getSectoresAll(id).subscribe(
      response => {
        for (var x in response) {
          this.sourceSectores.push({ id: null, nome: response[x][1], cod_SECTOR: response[x][0] });
        }
        this.sourceSectores = this.sourceSectores.slice();
      }, error => { console.log(error); });

    this.RHDICSECTORESABSENTISMOLINHAService.getSectoresAbsentismo(id).subscribe(
      response => {
        for (var x in response) {
          this.targetSectores.push({ id: response[x][0], nome: response[x][2], cod_SECTOR: response[x][1] });
        }
        this.targetSectores = this.targetSectores.slice();
      }, error => { console.log(error); });


  }

  gravarlinhas(id) {
    for (var z in this.targetSectores) {
      var perf = new RH_DIC_SECTORES_ABSENTISMO_LINHA;
      perf.cod_SECTOR = this.targetSectores[z].cod_SECTOR;
      perf.id_SECTOR_ABSENTISMO = id;
      this.RHDICSECTORESABSENTISMOLINHAService.create(perf).subscribe(
        res => {
        },
        error => { console.log(error); })
    }
  }
}