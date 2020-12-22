import { Component, OnInit, Renderer } from '@angular/core';
import { QUA_DIC_TIPOS_AUDITORIA } from 'app/entidades/QUA_DIC_TIPOS_AUDITORIA';
import { QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA } from 'app/entidades/QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { QUADICTIPOSAUDITORIAQTDPREVISTAService } from 'app/servicos/qua-dic-tipos-auditoria-qtd-prevista.service';
import { QUADICTIPOSAUDITORIAService } from 'app/servicos/qua-dic-tipos-auditoria.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-tipo-auditoria',
  templateUrl: './tipo-auditoria.component.html',
  styleUrls: ['./tipo-auditoria.component.css']
})
export class TipoAuditoriaComponent implements OnInit {
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
  descricao: any;
  tipo_auditoria: any;
  tipos_quantidades: any;
  ano: number;
  anos = [];


  constructor(private confirmationService: ConfirmationService, private globalVar: AppGlobals,
    private QUADICTIPOSAUDITORIAQTDPREVISTAService: QUADICTIPOSAUDITORIAQTDPREVISTAService,
    private QUADICTIPOSAUDITORIAService: QUADICTIPOSAUDITORIAService,
    private renderer: Renderer) { }

  ngOnInit() {

    for (var x = 2005; x <= 2075; x++) {
      this.anos.push({ value: x, label: x })
    }

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

    this.acesso_editar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23104editar");
    this.acesso_apagar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23104apagar");
    this.acesso_criar = JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node23104criar");


    this.user = JSON.parse(localStorage.getItem('userapp'))["id"];

    this.listar_departs();
    //preenche combobox linhas

  }

  //abre popup para adicionar depart
  showDialogToAdd() {
    this.novo = true;
    this.id_depart_selected = 0;
    this.descricao = null;
    this.ano = new Date().getUTCFullYear();
    this.listar_quantidades(null, this.ano);
    this.dialognovo = true;
  }



  //gravar unidade de depart
  gravar() {
    var depart = new QUA_DIC_TIPOS_AUDITORIA;
    if (!this.novo) depart = this.tipo_auditoria;
    depart.descricao = this.descricao;

    depart.utz_MODIF = this.user;
    depart.data_MODIF = new Date();

    if (this.novo) {
      depart.utz_CRIA = this.user;
      depart.data_CRIA = new Date();
      depart.ativo = true;
      this.QUADICTIPOSAUDITORIAService.create(depart).subscribe(response => {
        this.gravar_quantidades(response.id_TIPO_AUDITORIA);
        this.listar_departs();
        this.dialognovo = false;
      },
        error => console.log(error));
    } else {
      depart.id_TIPO_AUDITORIA = this.id_depart_selected;
      this.QUADICTIPOSAUDITORIAService.update(depart).subscribe(() => {
        this.gravar_quantidades(depart.id_TIPO_AUDITORIA);
        this.listar_departs();
        this.dialognovo = false;
      });

    }
  }


  gravar_quantidades(id) {
    var qtds = new QUA_DIC_TIPOS_AUDITORIA_QTD_PREVISTA;
    for (var x in this.tipos_quantidades) {
      qtds.ano = this.tipos_quantidades[x].ano;
      qtds.id = this.tipos_quantidades[x].id;
      qtds.id_TIPO_AUDITORIA = id;
      qtds.quantidade_MES_1 = this.tipos_quantidades[x].quantidade_MES_1;
      qtds.quantidade_MES_2 = this.tipos_quantidades[x].quantidade_MES_2;
      qtds.quantidade_MES_3 = this.tipos_quantidades[x].quantidade_MES_3;
      qtds.quantidade_MES_4 = this.tipos_quantidades[x].quantidade_MES_4;
      qtds.quantidade_MES_5 = this.tipos_quantidades[x].quantidade_MES_5;
      qtds.quantidade_MES_6 = this.tipos_quantidades[x].quantidade_MES_6;
      qtds.quantidade_MES_7 = this.tipos_quantidades[x].quantidade_MES_7;
      qtds.quantidade_MES_8 = this.tipos_quantidades[x].quantidade_MES_8;
      qtds.quantidade_MES_9 = this.tipos_quantidades[x].quantidade_MES_9;
      qtds.quantidade_MES_10 = this.tipos_quantidades[x].quantidade_MES_10;
      qtds.quantidade_MES_11 = this.tipos_quantidades[x].quantidade_MES_11;
      qtds.quantidade_MES_12 = this.tipos_quantidades[x].quantidade_MES_12;
      this.gravar_quantidades_save(qtds);
    }
  }

  gravar_quantidades_save(qtds) {
    this.QUADICTIPOSAUDITORIAQTDPREVISTAService.update(qtds).subscribe(() => {
    });
  }

  //listar os dados na tabela
  listar_departs() {
    this.departs = [];
    this.QUADICTIPOSAUDITORIAService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.departs.push({
            id: response[x].id_TIPO_AUDITORIA, descricao: response[x].descricao, dados: response[x]
          });
        }
        this.departs = this.departs.slice();
      },
      error => console.log(error));
  }

  alteraAno(event) {
    this.listar_quantidades(this.id_depart_selected, this.ano)
  }
  
  listar_quantidades(id, ano) {
    this.tipos_quantidades = [];
    if (id != null && id != 0) {
      this.QUADICTIPOSAUDITORIAQTDPREVISTAService.getById_ano(id, ano).subscribe(
        response => {
          this.tipos_quantidades = [];
          var count = Object.keys(response).length;
          //se existir banho Componente
          if (count > 0) {
            for (var x in response) {
              this.tipos_quantidades.push({
                id: response[x].id, ano: response[x].ano, id_TIPO_AUDITORIA: response[x].id_TIPO_AUDITORIA,
                quantidade_MES_1: response[x].quantidade_MES_1,
                quantidade_MES_2: response[x].quantidade_MES_2,
                quantidade_MES_3: response[x].quantidade_MES_3,
                quantidade_MES_4: response[x].quantidade_MES_4,
                quantidade_MES_5: response[x].quantidade_MES_5,
                quantidade_MES_6: response[x].quantidade_MES_6,
                quantidade_MES_7: response[x].quantidade_MES_7,
                quantidade_MES_8: response[x].quantidade_MES_8,
                quantidade_MES_9: response[x].quantidade_MES_9,
                quantidade_MES_10: response[x].quantidade_MES_10,
                quantidade_MES_11: response[x].quantidade_MES_11,
                quantidade_MES_12: response[x].quantidade_MES_12,
              });
            }
          } else {
            this.lista_novas_quantidades(ano);
          }
          this.tipos_quantidades = this.tipos_quantidades.slice();
        },
        error => console.log(error));
    } else {
      this.lista_novas_quantidades(ano);
    }
  }

  lista_novas_quantidades(ano) {
    this.tipos_quantidades.push({
      id: null, ano: ano, id_TIPO_AUDITORIA: null,
      quantidade_MES_1: 0,
      quantidade_MES_2: 0,
      quantidade_MES_3: 0,
      quantidade_MES_4: 0,
      quantidade_MES_5: 0,
      quantidade_MES_6: 0,
      quantidade_MES_7: 0,
      quantidade_MES_8: 0,
      quantidade_MES_9: 0,
      quantidade_MES_10: 0,
      quantidade_MES_11: 0,
      quantidade_MES_12: 0
    });
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
        var depart = new QUA_DIC_TIPOS_AUDITORIA;
        depart = this.tipo_auditoria;
        depart.ativo = false;
        depart.data_ANULA = new Date();
        depart.utz_ANULA = this.user;

        this.QUADICTIPOSAUDITORIAService.update(depart).subscribe(() => {
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
    this.tipo_auditoria = event.data.dados;
    this.id_depart_selected = event.data.id;
    this.descricao = event.data.descricao;
    this.ano = new Date().getUTCFullYear();

    this.listar_quantidades(this.id_depart_selected, this.ano);
    this.novo = false;
    this.dialognovo = true;
  }


  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }


}