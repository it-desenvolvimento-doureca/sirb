import { Component, OnInit, Renderer, ElementRef, ViewChild, ViewChildren, Input } from '@angular/core';
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { AB_DIC_LINHA } from "app/entidades/AB_DIC_LINHA";
import { AB_DIC_UNIDADE_MEDIDA } from "app/entidades/AB_DIC_UNIDADE_MEDIDA";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Location } from '@angular/common';
import { GERPERFILCABService } from "app/servicos/ger-perfil-cab.service";
import { GERMODULOService } from "app/servicos/ger-modulo.service";
import { GER_PERFIL_CAB } from "app/entidades/GER_PERFIL_CAB";
import { GER_PERFIL_LIN } from "app/entidades/GER_PERFIL_LIN";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { ConfirmationService } from "primeng/primeng";
import { DomSanitizer } from '@angular/platform-browser';
import { GERANALISESService } from 'app/servicos/ger-analises.service';

@Component({
  selector: 'app-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.css']
})
export class ConfiguracoesComponent implements OnInit {
  nodes = [];
  checkbox_values: any = [];
  nome_existe: boolean = false;
  class_numexiste: string = "";
  checkbox: any = [];
  id_modulo: number;
  nome_perfil: any;
  novo_perfil: boolean;
  perfis: any = [];
  modulos = [{ label: "Seleccione Módulo", value: null }];
  id_perfil = null;
  @ViewChildren('cbx') checkboxes1;
  @ViewChild('dialog') dialog;
  @ViewChild('closedialog') closedialog: ElementRef;
  @ViewChild('waitingDialog') waitingDialog;
  @ViewChild('waitingDialogclose') waitingDialogclose;
  @ViewChild('inputgravou') inputgravou: ElementRef;
  @ViewChild('inputerro') inputerro: ElementRef;

  public list = [];

  constructor(private GERANALISESService: GERANALISESService, private sanitizer: DomSanitizer, private confirmationService: ConfirmationService, private GERPERFILLINService: GERPERFILLINService, private GERMODULOService: GERMODULOService, private GERPERFILCABService: GERPERFILCABService, private elementRef: ElementRef, private renderer: Renderer, private location: Location) {
  }

  ngOnInit() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "assets/js/demo2.js";
    this.elementRef.nativeElement.appendChild(s);
    //carregar modulos
    this.GERMODULOService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.modulos.push({ label: response[x].nome_MODULO, value: response[x].id_MODULO });
        }
        this.modulos = this.modulos.slice();
      },
      error => console.log(error));

  }
  //ao alterar combo modulo
  atualizaperfil() {
    this.id_perfil = null;
    var modulo = this.id_modulo;
    if(this.id_modulo == null) modulo =0;
    this.GERPERFILCABService.getAllbymodulo(modulo).subscribe(
      response => {
        this.perfis = [];
        for (var x in response) {
          this.perfis.push({ id: response[x][0].id_PERFIL_CAB, nome: response[x][0].nome_PERFIL });
        }
        this.perfis = this.perfis.slice();
      },
      error => console.log(error));
  }

  //atualiza tree
  atualizacheckbox(id) {
    this.class_numexiste = "";
    this.nome_existe = false;
    this.checkbox = [];
    this.checkbox_values = [];
    this.GERPERFILLINService.getbyID(id).subscribe(
      response => {
        for (var x in response) {
          this.checkbox[response[x].id_CAMPO] = true;
          this.checkbox_values[response[x].id_CAMPO] = true;
        }
      },
      error => console.log(error));
  }

  //ao seleccionar o perlfil atualiza acessos
  onRowSelect(event) {
    this.id_perfil = event.data.id;
    this.checkbox = [];
    this.checkbox_values = [];
    var dirtyFormID = 'formArranque';
    var resetForm = <HTMLFormElement>document.getElementById(dirtyFormID);
    resetForm.reset();
    this.atualizacheckbox(event.data.id);
    this.id_perfil = event.data.id;
    this.nome_perfil = event.data.nome;
    this.novo_perfil = false;
    this.tree_nodes(this.id_modulo);
  }

  //bt gravar
  gravar() {
    var encontrou = false;
    for (var x in this.perfis) {
      if (this.perfis[x].nome == this.nome_perfil) {
        if (this.perfis[x].id != this.id_perfil) {
          encontrou = true;
        }
      }
    }
    if (encontrou) {
      this.class_numexiste = "num_existe";
      this.nome_existe = true;
    } else {
      this.simular(this.waitingDialog);
      if (Object.keys(this.checkbox_values).length > 0) {
        this.GERPERFILLINService.delete(this.id_perfil).then(() => {
          this.insereacessos();
        });
      } else {
        this.insereacessos();
      }

    }
  }

  insereacessos() {
    var count = 0;
    var count2 = 0;
    for (var y in this.checkboxes1.toArray().map(x => x.nativeElement)) {
      if (this.checkboxes1.toArray().map(x => x.nativeElement)[y].checked == true) {
        count2++;
      }

    }
    if (count2 > 0) {
      for (var y in this.checkboxes1.toArray().map(x => x.nativeElement)) {
        if (this.checkboxes1.toArray().map(x => x.nativeElement)[y].checked == true) {
          count++;
          var acessos = new GER_PERFIL_LIN;
          acessos.id_CAMPO = this.checkboxes1.toArray().map(x => x.nativeElement)[y].id;
          acessos.id_PERFIL_CAB = this.id_perfil;
          this.insere(acessos, count, count2);
        }
      }
    } else {
      this.simular(this.waitingDialogclose);
      this.simular(this.inputgravou);
    }
    this.gravarperfil();
    //this.atualizacheckbox(this.id_perfil);
  }

  insere(acessos, count, count2) {
    this.GERPERFILLINService.create(acessos).subscribe(response => {
      if (count2 == count) {
        this.simular(this.waitingDialogclose);
        this.simular(this.inputgravou);
      }
    },
      error => {
        console.log(error)
      }
    );
  }

  //bt cancelar
  backview() {
    this.location.back();
  }

  //abre popup para adicionar linha
  showDialogToAdd() {
    this.class_numexiste = "";
    this.nome_existe = false;
    this.novo_perfil = true;
    this.id_perfil = null;
    this.nome_perfil = "";
    this.simular(this.dialog);
  }

  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //ao clicar na tabela abrir popup para editar
  editar_perfil(id, nome) {
    this.id_perfil = id;
    this.nome_perfil = nome;
    this.novo_perfil = false;
    this.simular(this.dialog);
  }

  gravarperfil() {
    this.class_numexiste = "";
    this.nome_existe = false;

    var perfil = new GER_PERFIL_CAB;
    perfil.id_MODULO = this.id_modulo;
    perfil.nome_PERFIL = this.nome_perfil
    perfil.inativo = false;

    if (this.novo_perfil) {
      if (!this.perfis.find(item => item.nome == this.nome_perfil)) {
        this.GERPERFILCABService.create(perfil).subscribe(response => {
          this.atualizaperfil();
          this.simular(this.closedialog);
        },
          error => console.log(error));
      } else {
        this.class_numexiste = "num_existe";
        this.nome_existe = true;
      }

    } else {
      perfil.id_PERFIL_CAB = this.id_perfil;
      this.GERPERFILCABService.update(perfil).then(() => {
        this.atualizaperfil();
        this.simular(this.closedialog);
      });
    }
  }


  apagarperfil() {

    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Perfil',
      icon: 'fa fa-trash',
      accept: () => {
        var perfil = new GER_PERFIL_CAB;
        perfil.id_MODULO = this.id_modulo;
        perfil.nome_PERFIL = this.nome_perfil
        perfil.inativo = true;
        perfil.id_PERFIL_CAB = this.id_perfil;
        this.GERPERFILCABService.update(perfil).then(() => {
          this.atualizaperfil();
          this.simular(this.closedialog);
          this.id_perfil = null;
        });

      }
    });

  }

  //criar array arvore analises
  tree_nodes(id) {
    this.nodes= [];
    var array = [{ id: 0, parent: null, name: 'Análises', link: null, ativo: true }];

    this.GERANALISESService.getbyidmodulo(id).subscribe(result => {
      for (var x in result) {
        array.push({ id: result[x].id, parent: result[x].id_PAI, name: result[x].descricao, link: result[x].link, ativo: result[x].ativo })
      }

      for (var x in array) {
        if (array[x].parent == null) {
          this.nodes.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo });

          this.getFilhos(array, array[x].id, this.nodes.find(item => item.id == array[x].id));
        }
      }

      this.list = this.nodes;

    }, error => { console.log(error); });
  }

  //ver filhos arvore
  getFilhos(array, id_pai, arr) {
    for (var x in array) {
      if (array[x].parent == id_pai) {

        arr.children.push({ id: array[x].id, parent: array[x].parent, name: array[x].name, link: array[x].link, children: [], ativo: array[x].ativo });
        this.getFilhos(array, array[x].id, arr.children.find(item => item.id == array[x].id));
      }
    }
  }


}
