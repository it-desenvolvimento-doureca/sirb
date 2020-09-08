import { Component, OnInit, Renderer } from '@angular/core';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { RHFUNCIONARIOSService } from 'app/servicos/rh-funcionarios.service';
import { RH_FUNCIONARIOS } from 'app/entidades/RH_FUNCIONARIOS';
import { RHESTADOSFUNCService } from 'app/servicos/rh-estados-func.service';
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { RHDICCACIFOSService } from 'app/servicos/rh-dic-cacifos.service';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit {
  tabelafuncionarios = [];
  sectores: any[];
  estados: any;
  loadingtabelafuncionarios: boolean;
  acesso_editar = true;
  mensagem: string;
  dialog: boolean;
  dados: any[];
  index: any;
  dialogCacifos: boolean;
  old_cacifo: any;


  constructor(private RHDICCACIFOSService: RHDICCACIFOSService, private RHSECTORESService: RHSECTORESService, private RHESTADOSFUNCService: RHESTADOSFUNCService, private globalVar: AppGlobals, private RHFUNCIONARIOSService: RHFUNCIONARIOSService, private renderer: Renderer) { }


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

    this.loadingtabelafuncionarios = true;
    this.listarSector();

    this.acesso_editar = !JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node724editar");

  }




  //gravar u
  gravardados(numero) {
    var index = this.tabelafuncionarios.findIndex(item => item.numero == numero);
    this.mensagem = "";
    if (this.tabelafuncionarios[index].sector == null || this.tabelafuncionarios[index].sector == "") {
      this.mensagem = "É necessário preencher Sector!";
      this.dialog = true;
      return false;
    } if (this.tabelafuncionarios[index].data_inicio_situacao == null || this.tabelafuncionarios[index].data_inicio_situacao == "") {
      this.mensagem = "É necessário preencher Data Início";
      this.dialog = true;
      return false;
    } if (this.tabelafuncionarios[index].estado == null || this.tabelafuncionarios[index].estado == "") {
      this.mensagem = "É necessário preencher Estado!";
      this.dialog = true;
      return false;
    } else {


      //console.log(this.tabelafuncionarios[index])


      var FUNC = new RH_FUNCIONARIOS;
      FUNC = this.tabelafuncionarios[index].dados;

      FUNC.cod_SECTOR = this.tabelafuncionarios[index].sector.cod_SECTOR;
      FUNC.num_CACIFO = this.tabelafuncionarios[index].numero_cacifo;
      FUNC.data_INICIO = this.tabelafuncionarios[index].data_inicio_situacao;
      FUNC.data_FIM = this.tabelafuncionarios[index].data_fim_situacao;
      FUNC.data_PREV_RET = this.tabelafuncionarios[index].data_prevista_retorno;
      FUNC.estado = this.tabelafuncionarios[index].estado;
      FUNC.regista_PONTO = this.tabelafuncionarios[index].regista_PONTO;

      FUNC.utz_ULT_MODIF = JSON.parse(localStorage.getItem('userapp'))["id"];
      FUNC.data_ULT_MODIF = new Date();
      //console.log(FUNC)
      this.RHFUNCIONARIOSService.update(FUNC).then(() => {
        //        this.listar();
        if (this.old_cacifo != null) this.atualizacaCacifo(null, this.old_cacifo);
        if (FUNC.num_CACIFO != null) this.atualizacaCacifo(FUNC.cod_FUNCIONARIO, FUNC.num_CACIFO);
        this.tabelafuncionarios[index].dados = FUNC;
        this.tabelafuncionarios[index].editar = false;
        this.tabelafuncionarios[index].estado_texto = (FUNC.estado != null) ? this.estados.find(item => item.value == FUNC.estado).label : "";
        this.tabelafuncionarios[index].sector_texto = (FUNC.cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == FUNC.cod_SECTOR).label : "";

        this.tabelafuncionarios[index].turno_texto = (FUNC.cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == FUNC.cod_SECTOR).turno : "";
        this.tabelafuncionarios[index].chefe_texto = (FUNC.cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == FUNC.cod_SECTOR).chefe : "";

      });
    }

  }

  atualizarlinha(numero) {
    var index = this.tabelafuncionarios.findIndex(item => item.numero == numero);
    //console.log(this.tabelafuncionarios[index])
    var FUNC = new RH_FUNCIONARIOS;
    FUNC = this.tabelafuncionarios[index].dados;
    this.tabelafuncionarios[index].sector = FUNC.cod_SECTOR;
    this.tabelafuncionarios[index].numero_cacifo = FUNC.num_CACIFO;
    this.tabelafuncionarios[index].data_inicio_situacao = (FUNC.data_INICIO != null) ? new Date(FUNC.data_INICIO) : null;
    this.tabelafuncionarios[index].data_fim_situacao = (FUNC.data_FIM != null) ? new Date(FUNC.data_FIM) : null;
    this.tabelafuncionarios[index].data_prevista_retorno = (FUNC.data_PREV_RET != null) ? new Date(FUNC.data_PREV_RET) : null;
    this.tabelafuncionarios[index].regista_PONTO = FUNC.regista_PONTO;
    this.tabelafuncionarios[index].estado = FUNC.estado;
    this.tabelafuncionarios[index].estado_texto = (FUNC.estado != null) ? this.estados.find(item => item.value == FUNC.estado).label : "";
    this.tabelafuncionarios[index].sector_texto = (FUNC.cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == FUNC.cod_SECTOR).label : "";
    this.tabelafuncionarios[index].turno_texto = (FUNC.cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == FUNC.cod_SECTOR).turno : "";
    this.tabelafuncionarios[index].chefe_texto = (FUNC.cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == FUNC.cod_SECTOR).chefe : "";
    this.tabelafuncionarios[index].cacifo = this.tabelafuncionarios[index].cacifo_old;
  }

  //listar os dados da tabela
  listar() {
    this.tabelafuncionarios = [];
    this.RHFUNCIONARIOSService.getAll().subscribe(
      response => {


        for (var x in response) {

          var numero_op = response[x][0].cod_FUNCIONARIO;
          var numero_op2 = "";
          if (Math.sign(response[x][0].cod_FUNCIONARIO) < 0) {
            numero_op = numero_op * -1;
          }
          if (numero_op < 100) {
            numero_op2 = ("00" + numero_op).slice(-3);
          } else {
            numero_op2 = numero_op + "";
          }

          this.tabelafuncionarios.push({
            dados: response[x][0],
            numero: response[x][0].cod_FUNC_ORIGEM,
            numero_op: numero_op2,
            nome: response[x][0].nome,
            empresa: response[x][0].empresa,
            data_admissao: (response[x][0].data_ADMISSAO != null) ? this.formatDate(response[x][0].data_ADMISSAO) : null,
            data_demissao: (response[x][0].data_DEMISSAO != null) ? this.formatDate(response[x][0].data_DEMISSAO) : null,
            ativo: (response[x][0].ativo) ? "Sim" : "Não",
            local: response[x][0].local,
            responsavel: response[x][0].responsavel,
            sector: (response[x][0].cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == response[x][0].cod_SECTOR).value : null,
            sector_texto: (response[x][0].cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == response[x][0].cod_SECTOR).label : "",
            turno: "",
            chefe: "",
            numero_cacifo: response[x][0].num_CACIFO,
            cacifo: response[x][1],
            cacifo_old: response[x][1],
            data_inicio_situacao: (response[x][0].data_INICIO != null) ? new Date(response[x][0].data_INICIO) : null,
            data_fim_situacao: (response[x][0].data_FIM != null) ? new Date(response[x][0].data_FIM) : null,
            estado: response[x][0].estado,
            estado_texto: (response[x][0].estado != null) ? this.estados.find(item => item.value == response[x][0].estado).label : "",
            data_prevista_retorno: (response[x][0].data_PREV_RET != null) ? this.formatDate(response[x][0].data_PREV_RET) : null,
            editar: false,
            turno_texto: (response[x][0].cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == response[x][0].cod_SECTOR).turno : "",
            chefe_texto: (response[x][0].cod_SECTOR != null) ? this.sectores.find(item => item.cod_SECTOR == response[x][0].cod_SECTOR).chefe : "",
            regista_PONTO: response[x][0].regista_PONTO
          });
        }
        this.tabelafuncionarios = this.tabelafuncionarios.slice();
        this.loadingtabelafuncionarios = false;

      },
      error => {
        console.log(error);
        this.loadingtabelafuncionarios = false;
      });
  }


  alterarEstado(numero, event) {
    var index = this.tabelafuncionarios.findIndex(item => item.numero == numero);
    this.tabelafuncionarios[index].estado_texto = this.estados.find(item => item.value == event.value).label;
  }

  alterarSector(numero, event) {
    //console.log(event)
    var index = this.tabelafuncionarios.findIndex(item => item.numero == numero);
    this.tabelafuncionarios[index].sector_texto = this.sectores.find(item => item.value == event.value).label;

    this.tabelafuncionarios[index].turno_texto = this.sectores.find(item => item.value == event.value).turno;
    this.tabelafuncionarios[index].chefe_texto = this.sectores.find(item => item.value == event.value).chefe;
    this.tabelafuncionarios[index].turno = event.value.cod_TURNO;
    this.tabelafuncionarios[index].chefe = event.value.chefe;
    this.tabelafuncionarios[index].sector = event.value;
  }


  listarSector() {
    this.sectores = [];
    this.RHSECTORESService.getAll().subscribe(
      response => {
        this.sectores.push({
          value: null,
          label: "Selecionar Sector"
        });
        for (var x in response) {
          this.sectores.push({
            value: { cod_SECTOR: response[x][0].cod_SECTOR, chefe: response[x][0].chefe1, cod_TURNO: response[x][0].cod_TURNO },
            label: response[x][0].cod_SECTOR + " - " + response[x][0].des_SECTOR,
            cod_SECTOR: response[x][0].cod_SECTOR, chefe: response[x][1], turno: response[x][3]
          });
        }
        this.sectores = this.sectores.slice();
        this.listarestados();
      },
      error => {
        this.listarestados();
        console.log(error);
      });
  }

  listarestados() {
    this.estados = [];
    this.RHESTADOSFUNCService.getAll().subscribe(
      response => {
        this.estados.push({
          value: null,
          label: "Selecionar Estados"
        });
        for (var x in response) {
          this.estados.push({ value: response[x].cod_ESTADO, label: response[x].designacao });
        }
        this.estados = this.estados.slice();
        this.listar();
      },
      error => {
        console.log(error);
        this.listar();
      });
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

  //listar os dados dos CACIFOS
  listarCACIFOS() {
    this.dados = [];
    this.RHDICCACIFOSService.getAlllivres().subscribe(
      response => {
        for (var x in response) {

          this.dados.push({
            dados_tabela: response[x][0],
            codigo: response[x][0].codigo,
            id: response[x][0].id,
            local: response[x][0].local,
            utilizador: response[x][0].utilizador,
            tipo_UTILIZADOR: response[x][0].tipo_UTILIZADOR,
            nome_UTILIZADOR: response[x][1],
            nome_LOCAL: response[x][2],

          });
        }
        this.dados = this.dados.slice();

      },
      error => console.log(error));
  }

  //ao escolher cacifo
  onRowSelectCacifo(event) {
    this.old_cacifo = this.tabelafuncionarios[this.index].numero_cacifo;
    this.tabelafuncionarios[this.index].cacifo = event.data.codigo;
    this.tabelafuncionarios[this.index].numero_cacifo = event.data.id;
    this.dialogCacifos = false;
  }

  removerCacifo(numero) {
    var index = this.tabelafuncionarios.findIndex(item => item.numero == numero);
    this.old_cacifo = this.tabelafuncionarios[this.index].numero_cacifo;
    this.tabelafuncionarios[this.index].cacifo = null;
    this.tabelafuncionarios[this.index].numero_cacifo = null;
  }

  adicionarCacifo(numero) {
    var index = this.tabelafuncionarios.findIndex(item => item.numero == numero);
    this.listarCACIFOS();
    this.index = index;
    this.dialogCacifos = true;
  }

  atualizacaCacifo(id, cacifo) {
    this.RHDICCACIFOSService.atualizacaCacifo(cacifo, id).subscribe(
      response => {
      },
      error => console.log(error));
  }

}
