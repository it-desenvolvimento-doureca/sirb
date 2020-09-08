import { Component, OnInit, Renderer } from '@angular/core';
import { RH_SECTORES } from 'app/entidades/RH_SECTORES';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { RHTURNOSService } from 'app/servicos/rh-turnos.service';
import { RHFUNCIONARIOSService } from 'app/servicos/rh-funcionarios.service';
import { ConfirmationService } from 'primeng/primeng';
import { GERLOCAISService } from 'app/servicos/ger-locais.service';

@Component({
  selector: 'app-sectores',
  templateUrl: './sectores.component.html',
  styleUrls: ['./sectores.component.css']
})
export class SectoresComponent implements OnInit {
  novo: boolean;
  dialognovo: boolean;


  cod_SECTOR: number;
  des_SECTOR: string;
  cod_TURNO: number;
  local: string;
  chefe1;
  chefe2;
  data_INICIO: Date;
  data_FIM: Date;
  estado: boolean;
  racio_MIN: number;
  racio_MAX: number;
  datacria;
  utz_cria;
  dados: any[];
  turnos: any[];
  chefes: any[];
  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;
  cod_local: string;
  locais: any[];

  constructor(private GERLOCAISService: GERLOCAISService, private confirmationService: ConfirmationService, private RHFUNCIONARIOSService: RHFUNCIONARIOSService, private RHTURNOSService: RHTURNOSService, private globalVar: AppGlobals, private RHSECTORESService: RHSECTORESService, private renderer: Renderer) { }

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
    this.globalVar.setduplicar(false);
    this.globalVar.setcriar(false);
    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node722editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node722apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node722criar");

    this.listar();
    this.listaturnos();
    this.listalocais();
    this.listafunc();
  }

  //gravar unidade de zona
  gravardados() {
    var ESTADOS_FUNC = new RH_SECTORES;
    ESTADOS_FUNC.chefe1 = this.chefe1;
    ESTADOS_FUNC.chefe2 = this.chefe2;
    ESTADOS_FUNC.des_SECTOR = this.des_SECTOR;
    ESTADOS_FUNC.data_INICIO = this.data_INICIO;
    ESTADOS_FUNC.cod_TURNO = this.cod_TURNO;
    ESTADOS_FUNC.data_FIM = this.data_FIM;
    ESTADOS_FUNC.local = this.cod_local;
    ESTADOS_FUNC.estado = true;//this.estado;
    ESTADOS_FUNC.racio_MIN = this.racio_MIN;
    ESTADOS_FUNC.racio_MAX = this.racio_MAX;



    ESTADOS_FUNC.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    ESTADOS_FUNC.data_ULT_MODIF = new Date();

    if (this.novo) {
      ESTADOS_FUNC.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      ESTADOS_FUNC.data_CRIA = new Date();
      this.RHSECTORESService.create(ESTADOS_FUNC).subscribe(response => {
        this.listar();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      ESTADOS_FUNC.cod_SECTOR = this.cod_SECTOR;
      ESTADOS_FUNC.data_CRIA = this.datacria;
      ESTADOS_FUNC.utz_CRIA = this.utz_cria;
      this.RHSECTORESService.update(ESTADOS_FUNC).then(() => {
        this.listar();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados
  listar() {
    this.dados = [];
    this.RHSECTORESService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            cod_TURNO: response[x][0].cod_TURNO,
            cod_SECTOR: response[x][0].cod_SECTOR,
            data_INICIO: (response[x][0].data_INICIO != null) ? this.formatDate(response[x][0].data_INICIO) : null,
            data_FIM: (response[x][0].data_FIM != null) ? this.formatDate(response[x][0].data_FIM) : null,
            estado: (response[x][0].estado) ? "Ativo" : "Inativo",
            chefe1: response[x][0].chefe1,
            chefe2: response[x][0].chefe2,
            local: response[x][4],
            cod_local: response[x][0].local,
            racio_MIN: response[x][0].racio_MIN,
            racio_MAX: response[x][0].racio_MAX,
            des_SECTOR: response[x][0].des_SECTOR,
            data_CRIA: response[x][0].data_CRIA,
            utz_CRIA: response[x][0].utz_CRIA,
            desc_Turno: response[x][3],
            nome_chefe1: response[x][1],
            nome_chefe2: response[x][2]

          });
        }
        this.dados = this.dados.slice();
      },
      error => console.log(error));
  }

  //formatar a data para yyyy-mm-dd
  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }


  //apagar sector
  apagar() {
    this.dialognovo = false;
    setTimeout(() => { this.apagardados() }, 100);
  }

  apagardados() {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      key: 'conf001',
      accept: () => {
        var ESTADOS_FUNC = new RH_SECTORES;
        ESTADOS_FUNC.chefe1 = this.chefe1;
        ESTADOS_FUNC.chefe2 = this.chefe2;
        ESTADOS_FUNC.des_SECTOR = this.des_SECTOR;
        ESTADOS_FUNC.data_INICIO = this.data_INICIO;
        ESTADOS_FUNC.cod_TURNO = this.cod_TURNO;
        ESTADOS_FUNC.data_FIM = this.data_FIM;
        ESTADOS_FUNC.local = this.cod_local;
        ESTADOS_FUNC.estado = this.estado;
        ESTADOS_FUNC.racio_MIN = this.racio_MIN;
        ESTADOS_FUNC.racio_MAX = this.racio_MAX;


        this.RHSECTORESService.delete(ESTADOS_FUNC.cod_TURNO).then(() => {
          this.listar();
        });
      }, reject: () => {
        this.dialognovo = true;
      }
    });
  }


  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    if (this.acesso_editar) {
      this.cod_TURNO = event.data.cod_TURNO;
      this.cod_local = event.data.cod_local;
      this.cod_SECTOR = event.data.cod_SECTOR;
      this.des_SECTOR = event.data.des_SECTOR;
      this.local = event.data.local;
      this.chefe1 = event.data.chefe1;
      this.chefe2 = event.data.chefe2;
      this.data_INICIO = (event.data.data_INICIO != null) ? new Date(event.data.data_INICIO) : null;
      this.data_FIM = (event.data.data_FIM != null) ? new Date(event.data.data_FIM) : null;
      this.estado = event.data.estado;
      this.racio_MIN = event.data.racio_MIN;
      this.racio_MAX = event.data.racio_MAX;



      this.novo = false;
      this.datacria = event.data.data_CRIA;
      this.utz_cria = event.data.utz_CRIA;
      this.dialognovo = true;
    }
  }

  listafunc() {
    this.chefes = [];
    this.RHFUNCIONARIOSService.getAll().subscribe(
      response => {
        this.chefes.push({ value: "", label: "Selecionar Chefe" });
        for (var x in response) {
          if (response[x][0].ativo)
            this.chefes.push({ value: response[x][0].cod_FUNCIONARIO, label: response[x][0].cod_FUNCIONARIO + " - " + response[x][0].nome });
        }
        this.chefes = this.chefes.slice();
      },
      error => console.log(error));
  }


  //listar Turnos
  listaturnos() {
    this.turnos = [];
    this.RHTURNOSService.getAll().subscribe(
      response => {
        this.turnos.push({ value: "", label: "Selecionar Turno" });
        for (var x in response) {
          this.turnos.push({ value: response[x].cod_TURNO, label: response[x].des_TURNO });
        }
        this.turnos = this.turnos.slice();
      },
      error => console.log(error));
  }

  //listar Locais
  listalocais() {
    this.locais = [];
    this.GERLOCAISService.getAll().subscribe(
      response => {
        this.locais.push({ value: "", label: "Selecionar Local" });
        for (var x in response) {
          this.locais.push({ value: response[x].id, label: response[x].descricao });
        }
        this.locais = this.locais.slice();
      },
      error => console.log(error));
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.cod_TURNO = null;
    this.des_SECTOR = "";
    this.local = "";
    this.chefe1 = null;
    this.chefe2 = null;
    this.data_INICIO = null;
    this.data_FIM = null;
    this.estado = false;
    this.racio_MIN = 0;
    this.racio_MAX = 0;
    this.datacria = null;
    this.utz_cria = null;
    this.dialognovo = true;
  }
}
