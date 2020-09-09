import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { GER_DEPARTAMENTO } from '../../../entidades/GER_DEPARTAMENTO';
import { AppGlobals } from '../../../menu/sidebar.metadata';
import { GERDEPARTAMENTOService } from '../../../servicos/ger-departamento.service';
import { GERUTILIZADORESService } from '../../../servicos/ger-utilizadores.service';
import { ConfirmationService } from 'primeng/primeng';
<<<<<<< HEAD
import { RHSECTORESService } from 'app/servicos/rh-sectores.service';
import { GERDEPARTAMENTOSSECTORESService } from 'app/servicos/ger-departamentos-sectores.service';
import { GER_DEPARTAMENTOS_SECTORES } from 'app/entidades/GER_DEPARTAMENTOS_SECTORES';
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea

@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit {
  utilizadores_id: any;
  utilizadores: any[];
  departs: any[];
  novo: boolean;
  cor_depart: string;
  nome_depart: string;
  id_depart_selected: number;
  novadepart: boolean;

  @ViewChild('dialog') dialog: ElementRef;
  @ViewChild('closedialog') closedialog: ElementRef;
  descricao: string;
<<<<<<< HEAD
  local: number;
  modulo: string;
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
  modoedicao: boolean;
  criar: boolean;
  apagar: boolean;
  departamento: GER_DEPARTAMENTO;
  user: any;
<<<<<<< HEAD
  locais = [{ label: "Selecionar Local", value: null }, { value: 1, label: "Formariz" }, { value: 2, label: "São Bento" }, { value: 3, label: "Todas" }];
  modulos = [{ label: "Selecionar Módulo", value: null }, { value: 'EP', label: "Engª Processos" },
  { value: 'M', label: "Manutenção" }, { value: 'Q', label: "Qualidade" }, { value: 'I', label: "Injeção" },
  { value: 'P', label: "Produção" }, { value: 'L', label: "Logística" }, { value: 'C', label: "Comercial" }, { value: 'PR', label: "Projetos" }
    , { value: 'F', label: "Financeira" }];
  sourcePerfil: any[];
  targetPerfil: any[];

  constructor(private GERDEPARTAMENTOSSECTORESService: GERDEPARTAMENTOSSECTORESService, private RHSECTORESService: RHSECTORESService, private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService, private globalVar: AppGlobals, private GERDEPARTAMENTOService: GERDEPARTAMENTOService, private renderer: Renderer) { }
=======

  constructor(private confirmationService: ConfirmationService, private GERUTILIZADORESService: GERUTILIZADORESService, private globalVar: AppGlobals, private GERDEPARTAMENTOService: GERDEPARTAMENTOService, private renderer: Renderer) { }
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
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

    this.modoedicao = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node17editar");
    this.criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node17criar");
    this.apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node17apagar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    //preenche combobox utilizadores
    this.GERUTILIZADORESService.getAll().subscribe(
      response => {
        this.utilizadores = [];
        this.utilizadores.push({ label: "Sel. Utilizador", value: "" });
        for (var x in response) {
          this.utilizadores.push({ label: response[x].nome_UTILIZADOR, value: response[x].id_UTILIZADOR });
        }
        this.utilizadores = this.utilizadores.slice();
        this.listar_departs();
      },
      error => console.log(error));
  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = "";
<<<<<<< HEAD
    this.modulo = "";
    this.local = null;
    this.utilizadores_id = null;
    this.preencheListas(0);
=======
    this.utilizadores_id = null;
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    this.simular(this.dialog);
  }



  //gravar unidade de depart
  gravar() {
    var depart = new GER_DEPARTAMENTO;
    if (!this.novo) depart = this.departamento;
    depart.descricao = this.descricao;
<<<<<<< HEAD
    depart.modulo = this.modulo;
    depart.local = this.local;
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    depart.id_UTZ = this.utilizadores_id;
    depart.inativo = false;
    depart.utz_ULT_MODIF = this.user;
    depart.data_ULT_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      this.GERDEPARTAMENTOService.create(depart).subscribe(response => {
<<<<<<< HEAD

        for (var x in this.targetPerfil) {
          var perf = new GER_DEPARTAMENTOS_SECTORES;
          perf.cod_SECTOR = this.targetPerfil[x].cod_SECTOR;
          perf.id_DEPARTAMENTO = response.id;
          this.gravarlinhas(perf);
        }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        this.listar_departs();
        this.simular(this.closedialog);
      },
        error => console.log(error));
    } else {
      depart.id = this.id_depart_selected;
      this.GERDEPARTAMENTOService.update(depart).then(() => {
        this.listar_departs();
        this.simular(this.closedialog);
      });

    }
  }


<<<<<<< HEAD
  gravarlinhas(perf) {

    this.GERDEPARTAMENTOSSECTORESService.create(perf).subscribe(
      res => {
      },
      error => { console.log(error); });
  }

=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.GERDEPARTAMENTOService.getAll().subscribe(
      response => {
        for (var x in response) {
          var nome_op = "";

<<<<<<< HEAD
          if (response[x].id_UTZ != null && this.utilizadores.find(item => item.value == response[x].id_UTZ)) nome_op = this.utilizadores.find(item => item.value == response[x].id_UTZ).label;

          var modulo_text = "";
          var local_text = "";
          if (response[x].local != null && this.locais.find(item => item.value == response[x].local)) local_text = this.locais.find(item => item.value == response[x].local).label;
          if (response[x].modulo != null && this.modulos.find(item => item.value == response[x].modulo)) modulo_text = this.modulos.find(item => item.value == response[x].modulo).label;

          this.departs.push({ modulo_text: modulo_text, local_text: local_text, id: response[x].id, id_UTZ: response[x].id_UTZ, local: response[x].local, modulo: response[x].modulo, descricao: response[x].descricao, nome_op: nome_op, dados: response[x] });
=======
          if (response[x].id_UTZ != null) nome_op = this.utilizadores.find(item => item.value == response[x].id_UTZ).label;

          this.departs.push({ id: response[x].id, id_UTZ: response[x].id_UTZ, descricao: response[x].descricao, nome_op: nome_op, dados: response[x] });
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }



  //apagar depart
  apagardeparts() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        var depart = new GER_DEPARTAMENTO;
        depart = this.departamento;
        depart.descricao = this.descricao;
<<<<<<< HEAD
        depart.local = this.local;
        depart.modulo = this.modulo;
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
        depart.id_UTZ = this.utilizadores_id;
        depart.inativo = true;
        depart.utz_APAGA = this.user;
        depart.data_APAGA = new Date();
        this.GERDEPARTAMENTOService.update(depart).then(() => {
          this.listar_departs();
          this.simular(this.closedialog);
        });

      }
    });

  }

<<<<<<< HEAD
  //ao inserir nos sectores do departamento
  onMoveToTarget(e) {
    var x;
    for (x in e.items) {
      if (!this.novo) {
        var perf = new GER_DEPARTAMENTOS_SECTORES;
        perf.cod_SECTOR = e.items[x].cod_SECTOR;
        perf.id_DEPARTAMENTO = this.id_depart_selected;
        this.GERDEPARTAMENTOSSECTORESService.create(perf).subscribe(
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
      this.GERDEPARTAMENTOSSECTORESService.delete(e.items[x].id).then(() => {
        if (x == (e.items.length - 1)) {
          this.preencheListas(this.id_depart_selected);
        }
      });
    }
  }

  preencheListas(id) {
    this.sourcePerfil = [];
    this.targetPerfil = [];
    this.GERDEPARTAMENTOSSECTORESService.getAllbyidnotdepartamento(id).subscribe(
      response => {
        for (var x in response) {
          this.sourcePerfil.push({ id: null, nome: response[x][1], cod_SECTOR: response[x][0] });
        }
        this.sourcePerfil = this.sourcePerfil.slice();
      }, error => { console.log(error); });

    this.GERDEPARTAMENTOSSECTORESService.getAllbyiddepartamento(id).subscribe(
      response => {
        for (var x in response) {
          this.targetPerfil.push({ id: response[x][0], nome: response[x][2], cod_SECTOR: response[x][1] });
        }
        this.targetPerfil = this.targetPerfil.slice();
      }, error => { console.log(error); });

  }
=======
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea


  //ao clicar na tabela abrir popup para editar
  onRowSelect(event) {
    this.departamento = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
<<<<<<< HEAD
    this.modulo = event.data.modulo;
    this.local = event.data.local;
    this.utilizadores_id = event.data.id_UTZ;
    this.novo = false;
    this.preencheListas(event.data.id);
=======
    this.utilizadores_id = event.data.id_UTZ;
    this.novo = false;
>>>>>>> aa167a7d63b9fa01b26efb1fceaeb7aed3e4b2ea
    this.simular(this.dialog);
  }



  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }
}