import { Component, OnInit, Renderer } from '@angular/core';
import { Router } from '@angular/router';
import { GER_CONF_CONSUMOS_SILVER } from 'app/entidades/GER_CONF_CONSUMOS_SILVER';
import { GER_CONF_CONSUMOS_SILVER_OF } from 'app/entidades/GER_CONF_CONSUMOS_SILVER_OF';
import { AppGlobals } from 'app/menu/sidebar.metadata';
import { GERCONFCONSUMOSSILVEROFService } from 'app/servicos/ger-conf-consumos-silver-of.service';
import { GERCONFCONSUMOSSILVERService } from 'app/servicos/ger-conf-consumos-silver.service';
import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'app-conf-consumos-silver',
  templateUrl: './conf-consumos-silver.component.html',
  styleUrls: ['./conf-consumos-silver.component.css']
})
export class ConfConsumosSilverComponent implements OnInit {


  encontrou: boolean;
  seccao_MANUTENCAO: any;
  subseccao_MANUTENCAO: any;
  ref_COMPOSTO_MANUTENCAO: any;
  tempof: any;
  ofs_MANUTECAO: any;
  id_CONF: number;
  modoedicao: boolean;

  constructor(private GERCONFCONSUMOSSILVEROFService: GERCONFCONSUMOSSILVEROFService, private confirmationService: ConfirmationService,
    private router: Router,
    private globalVar: AppGlobals, private GERCONFCONSUMOSSILVERService: GERCONFCONSUMOSSILVERService, private renderer: Renderer) { }

  ngOnInit() {
    this.globalVar.setapagar(false);
    this.globalVar.seteditar(true);
    this.globalVar.setvoltar(true);
    this.globalVar.setseguinte(false);
    this.globalVar.setanterior(false);
    this.globalVar.setatualizar(false);
    this.globalVar.sethistorico(false);
    this.globalVar.setcriarmanutencao(false);
    this.globalVar.setdisCriarmanutencao(true);
    this.globalVar.setcriar(false);

    this.globalVar.setdisEditar(!JSON.parse(localStorage.getItem('acessos')).find(item => item.node == "node20editar"));

    var url = this.router.routerState.snapshot.url;
    url = url.slice(1);
    var urlarray = url.split("/");

    if (urlarray[1] != null) {
      if (urlarray[1].match("editar")) {
        this.modoedicao = true;
        this.globalVar.setvoltar(true);
      }
    }

    this.listar();
  }




  verifica(of, count) {
    this.GERCONFCONSUMOSSILVERService.verificaOF(of).subscribe(
      response => {
        var total = Object.keys(response).length;
        if (total == 0) {
          this.encontrou = false;
          this.tempof.push(of);
        }
        if (parseInt(count) + 1 == this.ofs_MANUTECAO.length) {
          //aviso ofs não existem
          if (!this.encontrou) {
            this.confirmationService.confirm({
              message: 'Existem Linhas onde o Número da OF não Existe <b>' + this.tempof.toString() + '</b>, deseja continuar?',
              header: 'AVISO',
              icon: 'fa fa-info-circle',
              accept: () => {
                this.gravar();
              }
            });
          } else {
            this.gravar();
          }
        }
      },
      error => console.log(error));
  }

  //gravar linhas de linha
  gravardados() {
    this.encontrou = true;
    this.tempof = [];
    this.GERCONFCONSUMOSSILVERService.verificaREF(this.ref_COMPOSTO_MANUTENCAO).subscribe(
      response => {
        var total = Object.keys(response).length;
        if (total == 0) {
          //aviso ref composto
          this.confirmationService.confirm({
            message: 'A Referência Composto não existe, deseja continuar?',
            header: 'AVISO',
            icon: 'fa fa-info-circle',
            accept: () => {
              if (this.ofs_MANUTECAO.length > 0) {
                for (var x in this.ofs_MANUTECAO) {
                  this.verifica(this.ofs_MANUTECAO[x].of_NUM, x);
                }
              } else {
                this.gravar();
              }
            }
          });
        } else {
          if (this.ofs_MANUTECAO.length > 0) {
            for (var x in this.ofs_MANUTECAO) {
              this.verifica(this.ofs_MANUTECAO[x].of_NUM, x);
            }
          } else {
            this.gravar();
          }
        }

      },
      error => console.log(error));
  }

  gravar() {

    var CONF = new GER_CONF_CONSUMOS_SILVER;

    CONF.seccao_MANUTENCAO = this.seccao_MANUTENCAO;
    CONF.subseccao_MANUTENCAO = this.subseccao_MANUTENCAO;
    CONF.ref_COMPOSTO_MANUTENCAO = this.ref_COMPOSTO_MANUTENCAO;

    CONF.id_CONF = this.id_CONF;

    this.GERCONFCONSUMOSSILVERService.update(CONF).then(() => {
      this.router.navigate(['conf_consumos_silver']);
    });
    for (var x in this.ofs_MANUTECAO) {
      if (this.ofs_MANUTECAO[x].id_CONF_OF == null) {
        this.gravarOF(this.ofs_MANUTECAO[x]);
      } else {
        this.atualizar(this.ofs_MANUTECAO[x]);
      }
    }

  }

  //bt cancelar
  backview() {
    //this.location.back();
    this.router.navigate(['conf_consumos_silver']);
  }


  gravarOF(ofconf: GER_CONF_CONSUMOS_SILVER_OF, id_CONF_OF = null) {
    if (ofconf.of_NUM != "" && ofconf.of_NUM != null) {
      var LINHASOF = new GER_CONF_CONSUMOS_SILVER_OF;
      if (id_CONF_OF != null) ofconf.id_CONF_OF = id_CONF_OF;
      LINHASOF.data = ofconf.data;
      LINHASOF.id_CONF = ofconf.id_CONF;
      LINHASOF.of_NUM = ofconf.of_NUM;
      LINHASOF.tipo = "M";
      this.GERCONFCONSUMOSSILVEROFService.create(LINHASOF).subscribe(response => {
      },
        error => console.log(error));
    }
  }

  atualizar(ofconf) {
    if (ofconf.of_NUM != "" && ofconf.of_NUM != null) {
      this.GERCONFCONSUMOSSILVEROFService.update(ofconf).then(() => {
      });
    }
  }

  //listar os dados das Linhas
  listar() {

    this.GERCONFCONSUMOSSILVERService.getAll().subscribe(
      response => {
        for (var x in response) {
          this.id_CONF = response[x].id_CONF;
          this.seccao_MANUTENCAO = response[x].seccao_MANUTENCAO;
          this.subseccao_MANUTENCAO = response[x].subseccao_MANUTENCAO;
          this.ref_COMPOSTO_MANUTENCAO = response[x].ref_COMPOSTO_MANUTENCAO;
        }


        this.carregaTabela(this.id_CONF);

      },
      error => console.log(error));
  }




  //simular click para mostrar mensagem
  simular(element) {
    let event = new MouseEvent('click', { bubbles: true });
    this.renderer.invokeElementMethod(
      element.nativeElement, 'dispatchEvent', [event]);
  }

  //adicionar linha aos postos
  adicionar_linha() {

    this.ofs_MANUTECAO.push({ id_CONF_OF: null, data: new Date(), of_NUM: "", id_CONF: this.id_CONF });
    this.ofs_MANUTECAO = this.ofs_MANUTECAO.slice();
  }


  eliminar(linhaof, index) {
    this.confirmationService.confirm({
      message: 'Tem a certeza que pretende apagar?',
      header: 'Apagar Confirmação',
      icon: 'fa fa-trash',
      accept: () => {
        if (linhaof.id_CONF_OF != null) {
          this.GERCONFCONSUMOSSILVEROFService.delete(linhaof.id_CONF_OF).then(() => {
            this.ofs_MANUTECAO.splice(index, 1);
          },
            error => { console.log(error); });
        } else {
          this.ofs_MANUTECAO.splice(index, 1);

        }
        this.ofs_MANUTECAO = this.ofs_MANUTECAO.slice();
      }
    });
  }

  carregaTabela(linha) {
    this.ofs_MANUTECAO = [];
    this.GERCONFCONSUMOSSILVEROFService.getby(linha).subscribe(
      response => {
        for (var x in response) {
          var data = null;
          if (response[x].data != null) data = new Date(response[x].data);
          this.ofs_MANUTECAO.push({ id_CONF_OF: response[x].id_CONF_OF, id_CONF: response[x].id_CONF, tipo: response[x].tipo, of_NUM: response[x].of_NUM, data: data });
        }
        this.ofs_MANUTECAO = this.ofs_MANUTECAO.slice();
      },
      error => console.log(error));
  }

  verificadatas(data) {

  }

}