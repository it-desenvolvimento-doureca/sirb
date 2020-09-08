import { Component, OnInit, Renderer } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHTURNOSService } from 'app/servicos/rh-turnos.service';
import { RH_TURNOS } from 'app/entidades/RH_TURNOS';
import { RHESTADOSFUNCService } from 'app/servicos/rh-estados-func.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-turnosrecursos',
  templateUrl: './turnosrecursos.component.html',
  styleUrls: ['./turnosrecursos.component.css']
})
export class TurnosrecursosComponent implements OnInit {
  novo: boolean;
  datacria: any;
  utz_cria: any;
  dialognovo: boolean;

  acesso_criar = false;
  acesso_apagar = false;
  acesso_editar = false;
  cod_TURNO: number;
  des_TURNO: string;
  data_INICIO: Date;
  hora_INICIO: string;
  data_FIM: Date;
  hora_FIM: string;
  TURNO_CONTINUO;
  estado;

  dados: any[];
  estados = [];

  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals, private RHTURNOSService: RHTURNOSService, private renderer: Renderer) { }


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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node723editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node723apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node723criar");

    this.listar();
  }




  //gravar unidade de zona
  gravardados() {
    var ESTADOS_FUNC = new RH_TURNOS;
    ESTADOS_FUNC.des_TURNO = this.des_TURNO;
    ESTADOS_FUNC.data_INICIO = this.data_INICIO;
    ESTADOS_FUNC.hora_INICIO = (this.hora_INICIO + ":00").slice(0, 8);
    ESTADOS_FUNC.data_FIM = this.data_FIM;
    ESTADOS_FUNC.hora_FIM = (this.hora_FIM + ":00").slice(0, 8);
    ESTADOS_FUNC.estado = false;//this.estado;
    ESTADOS_FUNC.turno_CONTINUO = this.TURNO_CONTINUO;

    ESTADOS_FUNC.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
    ESTADOS_FUNC.data_ULT_MODIF = new Date();

    if (this.novo) {
      ESTADOS_FUNC.utz_CRIA = JSON.parse(localStorage.getItem('userapp'))["id"];
      ESTADOS_FUNC.data_CRIA = new Date();

      this.RHTURNOSService.create(ESTADOS_FUNC).subscribe(response => {
        this.listar();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      ESTADOS_FUNC.cod_TURNO = this.cod_TURNO;
      ESTADOS_FUNC.data_CRIA = this.datacria;
      ESTADOS_FUNC.utz_CRIA = this.utz_cria;
      this.RHTURNOSService.update(ESTADOS_FUNC).then(() => {
        this.listar();
        this.dialognovo = false;
      });

    }
  }


  //listar os dados das unidades de dados na tabela
  listar() {
    this.dados = [];
    this.RHTURNOSService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.dados.push({
            cod_TURNO: response[x].cod_TURNO,
            des_TURNO: response[x].des_TURNO,
            data_INICIO: (response[x].data_INICIO != null) ? new Date(response[x].data_INICIO).toLocaleDateString() : null,
            hora_INICIO: response[x].hora_INICIO,
            data_FIM: (response[x].data_FIM != null) ? new Date(response[x].data_FIM).toLocaleDateString() : null,
            hora_FIM: response[x].hora_FIM,
            estado: (response[x].estado) ? "Ativo" : "Inativo",
            data_CRIA: response[x].data_CRIA,
            TURNO_CONTINUO: response[x].turno_CONTINUO,
            utz_CRIA: response[x].utz_CRIA
          });
        }
        this.dados = this.dados.slice();
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
        var ESTADOS_FUNC = new RH_TURNOS;
        ESTADOS_FUNC.des_TURNO = this.des_TURNO;
        ESTADOS_FUNC.des_TURNO = this.des_TURNO;
        ESTADOS_FUNC.data_INICIO = this.data_INICIO;
        ESTADOS_FUNC.hora_INICIO = this.hora_INICIO;
        ESTADOS_FUNC.data_FIM = this.data_FIM;
        ESTADOS_FUNC.hora_FIM = this.hora_FIM;
        ESTADOS_FUNC.estado = this.estado;
        ESTADOS_FUNC.turno_CONTINUO = this.TURNO_CONTINUO;
        ESTADOS_FUNC.cod_TURNO = this.cod_TURNO;


        this.RHTURNOSService.delete(ESTADOS_FUNC.cod_TURNO).then(() => {
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
      this.des_TURNO = event.data.des_TURNO;

      this.data_INICIO = (event.data.data_INICIO != null) ? new Date(event.data.data_INICIO) : null;
      this.hora_INICIO = event.data.hora_INICIO;
      this.data_FIM = (event.data.data_FIM != null) ? new Date(event.data.data_FIM) : null;
      this.hora_FIM = event.data.hora_FIM;
      this.estado = event.data.estado;
      this.TURNO_CONTINUO = event.data.TURNO_CONTINUO;

      this.novo = false;
      this.datacria = event.data.data_CRIA;
      this.utz_cria = event.data.utz_CRIA;
      this.dialognovo = true;
    }
  }

  //abre popup para adicionar zona
  showDialogToAdd() {
    this.novo = true;
    this.cod_TURNO = 0;
    this.des_TURNO = "";
    this.data_INICIO = null;
    this.hora_INICIO = null;
    this.data_FIM = null;
    this.hora_FIM = null;
    this.estado = false;
    this.datacria = null;
    this.utz_cria = null;
    this.dialognovo = true;
    this.TURNO_CONTINUO = false;
  }

}

