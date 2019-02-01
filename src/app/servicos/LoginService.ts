import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { AppGlobals } from "app/menu/sidebar.metadata";


@Injectable()
export class LoginService implements CanActivate {
    constructor(private GERPERFILLINService: GERPERFILLINService, private globalVar: AppGlobals, private router: Router) { }
    headers = new Headers({
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Expires': 'Sat, 01 Jan 2000 00:00:00 GMT'
    });
    private userIsAuthenticated: boolean;
    private user;
    private password;
    private nodes = {
        node000: "registo", node001: "manutencao", node002: "registopara", node003: "construcaobanhos", node004: "manutencaonaoprogramada", node005: "manutencaoreposicao",
        node010: "tinas", node011: "componentes", node012: "banhos", node013: "fornecedor", node020: "linhas", node021: "unidades", node022: "zonas", node023: "turnos",
        node024: "adicoes", node025: "manutencoes", node026: "operacoes", node027: "armazens", node10: "utilizadores", node11: "config", node12: "parametros",
        node13: "eventos", node14: "configjasper", node16: "eventosprogramados", node2: "analisesjasper", node31: "grid", node33: "cartelas", node040: "homegestaobanhos",
        node041: "listagem", node051: "analiseconsumos", node052: "analiseconsumosetiquetas", node060: "correcaoquantidades", node061: "analiseetiquetas", node062: "ficheirosmanutencoes",
        node500: "reclamacoesclientes", node501: "reclamacoesfornecedores", node520: "rejeicoes", node521: "tiposreclamacoes", node522: "grausimportancia", node523: "tiposdefeito", node6: "tarefas",
        node524: "ficheirosanalise", node525: "temposresposta", node526: "tiposocorrencia", node527: "tiposnaodetecao", node621: "dictarefas", node17: "departamentos", node18: "seccoes", node19: "grupos"
    };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('time_sgiid')) {
            var data_storage = new Date(JSON.parse(localStorage.getItem('time_sgiid'))["data"]).getTime();
            if ((data_storage + 7200000) <= new Date().getTime()) {
                localStorage.clear();
            } else {
                localStorage.setItem('time_sgiid', JSON.stringify({ data: new Date() }));
            }
        }

        var access = JSON.parse(localStorage.getItem('acessos'));

        if (!localStorage.getItem('userapp') || !localStorage.getItem('time_sgiid')) {
            // alert('Efetue o Login!');

            this.router.navigate(['./login'], { queryParams: { redirect_url: state.url } });
            return false;
        } else if (localStorage.getItem('acessos')) {
            var url = state.url;
            url = url.slice(1);
            var urlarray = url.split("/");
            for (var x in this.nodes) {
                if (this.nodes[x] == urlarray[0]) {
                    if (urlarray[1] != null) {
                        if (urlarray[1].match("editar")) {
                            if (x != 'node6' && !access.find(item => item.node == x + "editar")) {
                                this.router.navigate(['./home']);
                                return false;
                            }
                        } else if (urlarray[1].match("view")) {
                            if (!access.find(item => item.node == x)) {
                                this.router.navigate(['./home']);
                                return false;
                            }
                        } else if (urlarray[1].match("novo")) {
                            if (!access.find(item => item.node == x + "criar")) {
                                this.router.navigate(['./home']);
                                return false;
                            }
                        }
                    } else {
                        if (!access.find(item => item.node == x)) {
                            this.router.navigate(['./home']);
                            return false;
                        }
                    }
                }
                /*if(this.nodes[access[x].node]){
                    console.log(this.nodes[access[x].node])
                }*/
            }


            //alert('Acesso Negado!');
            //this.router.navigate(['./login']);
            //return false;
        }

        //carregar acessos
        this.GERPERFILLINService.getbyID_node(JSON.parse(localStorage.getItem('userapp'))["id"], "null").subscribe(
            response2 => {
                var count = Object.keys(response2).length;
                var array = [];
                if (count > 0) {
                    for (var x in response2) {
                        array.push({ node: response2[x].id_CAMPO });
                        //if (!(!JSON.parse(localStorage.getItem('userapp'))["admin"] && response2[x].id_CAMPO == "node1")) {
                        var elem = (<HTMLInputElement>document.getElementById(response2[x].id_CAMPO));
                        if (elem) elem.setAttribute("style", "pointer-events: auto; cursor: pointer; opacity: 1;");
                        //}
                    }
                }
                localStorage.setItem('acessos', JSON.stringify(array));
            }, error => { console.log(error); });

        return true;
    }

}

