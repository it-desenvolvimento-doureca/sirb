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
        node000: "registo", node006: "manutencao", node001: "manutencao", node002: "registopara", node003: "construcaobanhos", node004: "manutencaonaoprogramada", node005: "manutencaoreposicao",
        node010: "tinas", node011: "componentes", node012: "banhos", node013: "fornecedor", node020: "linhas", node021: "unidades", node022: "zonas", node023: "turnos",
        node024: "adicoes", node025: "manutencoes", node026: "operacoes", node027: "armazens", node10: "utilizadores", node11: "config", node12: "parametros",
        node13: "eventos", node14: "configjasper", node16: "eventosprogramados", node2: "analisesjasper", node31: "grid", node33: "cartelas", node040: "homegestaobanhos",
        node041: "listagem", node051: "analiseconsumos", node052: "analiseconsumosetiquetas", node060: "correcaoquantidades", node061: "analiseetiquetas", node062: "ficheirosmanutencoes",
        node500: "reclamacoesclientes", node501: "reclamacoesfornecedores", node520: "rejeicoes", node521: "tiposreclamacoes", node522: "grausimportancia", node523: "tiposdefeito", node6: "tarefas",
        node524: "ficheirosanalise", node525: "temposresposta", node526: "tiposocorrencia", node527: "tiposnaodetecao", node528: 'classificacao', node529: "tipologia"
        , node622: "dictiposacao", node621: "dictarefas", node17: "departamentos", node18: "seccoes", node19: "grupos",
        node7_18: "controloassiduidade_financeira", node7_10: "controloassiduidade_producao", node721: "estadosfuncionarios", node722: "sectores", node723: "turnosrecursos", node724: "funcionarios", node191: "locais", node725: "cacifos", node726: "tiposcacifos"
        , node727: "pausas", node8: 'stocks', node81: "pedidosdaproducao", node9: "producao", node91: "analise_rejeicoes", node23: 'seguranca_trabalho',
        node92: 'producao/planeamento', node921: 'planeamento_barras_analise'
        , node23101: 'tipos_ocorrencia', node92101: 'capacidade_linha', node1101: 'feriados', node92102: 'objetivos_planos', node92103: 'sectores_analise', node93: 'producao/amostras'
        , node94: 'producao/barras_alerta', node95: 'producao/revisoes_prioritarias', node96: 'producao/producoes_prioritarias'
        , node92104: 'tipologia_ensaio', node10101: 'objetivos_cumprimento_fornecedor', node15511: 'planosacao', node15512: 'listaacoes'
        , node07: 'planosacaoengenaria', node97: 'planosacaoproducao', node1011: 'planosacaologistica', node1561: 'planosacaomanutencao'
        , node1571: 'planosacaoinjecao', node54: 'planosacaoqualidade', node155101: 'ambitos', node08: 'alertasePrioridades', node98: 'analiseencomendas_p', node1582: 'analiseencomendas',
        node92108: 'producao_programas', node92107: 'producao_fabricas', node92106: 'producao_programa', node92105: 'producao_veiculos', node92109: 'producao_oem',
        node921010: 'limites_encomendas', node1581: 'planosacaoComercial', node1591: 'planosacaoProjetos', node1601: 'planosacaoFinanceira',
        node0251: "analise_rejeicoes_engenharia", node56: "analise_rejeicoes_qualidade",
        node721_10: "estadosfuncionarios_p", node722_10: "sectores_p", node723_10: "turnosrecursos_p", node724_10: "funcionarios_p", node191_10: "locais_p",
        node725_10: "cacifos_p", node726_10: "tiposcacifos_p",
        node15830: 'comercial_oem', node15831: 'comercial_veiculos', node15832: 'comercial_programas', node15833: 'comercial_fabricas', node15834: 'comercial_projetos',
        node15835: 'comercial_limites_encomendas', node828: 'objetivos_faturacao', node1609: 'seguimento_faturacao', node1603: 'analise_dividas', node829: 'tipos_documento',
        node9211: 'dias_producao', node9212: 'capacidade_acabamento', node9213: 'capacidade_racks', node9214: 'semanas_analise', node99: 'planeamento_producao',
        node23103: 'causas_acidente', node23102: 'epis', node55: 'auditorias', node561: 'derrogacoes', node23104: 'tipo_auditoria',
        node1612_10: 'sectores_absentismo', node1612: 'sectores_absentismo_financeira', node1584: 'analise_clientes', node16211: 'runioes', node162101: 'ambitos_reunioes',
        node11111: 'analiseenvios', node1162101: 'equipasmanutencao', node1163101: 'edificios', node1164101: 'pisos', node1165101: 'divisoes', node1166101: 'niveis_criticidade',
        node11581: 'ficha_manutencao', node11591: 'equipamentos_manutencao', node11582: 'lista_pedidos', node1604: 'evolucao_dividas',
        node15850: 'comercial_contratos', node15851: 'comercial_referencias', node15852: 'comercial_acordos', node1586: 'analise_acordos', node09: 'business_analytics',
        node028: "tipologia_dosificadores", node029: "dosificacao", node0261: 'dosificadores', node170: 'planosestrategicos',
        node1611: 'planosestrategicosengenaria', node1631: 'planosestrategicosproducao', node1641: 'planosestrategicoslogistica', node1651: 'planosestrategicosmanutencao', node1671: 'planosestrategicosComercial', node1681: 'planosestrategicosProjetos',
        node1691: 'planosestrategicosFinanceira', node1661: 'planosestrategicosinjecao', node1621: 'planosestrategicosqualidade', node17012: 'analise_planosestrategicos'
        , node22: 'analisesdashboard', node11592: 'quadro_pedidos_pendentes', node11593: 'painel_controlo_manutencao', node11583: 'pedidos_melhoria', node11584: 'lista_pedidos_melhoria', node1167101: 'ambitosmanutencao', node11623: 'gestao_pastas', node11585: 'lista_preventivas'
        , node1161: 'fichadocumento', node11621: 'tipos_documentacao', node11622: 'postos_documento', node11594: 'mapa_preventivas',
        node9217: 'tipos_alerta_descarga', node11595: 'equipamentos_criticos_manutencao', node1162201: 'registo_controlo_manutencoes', node1162202: 'indicadores_mttr_mtbf', node1167102: 'tipologias_avaria',
        node20: 'conf_consumos_silver'
    };

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        if (localStorage.getItem('time_sgiid')) {
            var data_storage = new Date(JSON.parse(localStorage.getItem('time_sgiid'))["data"]).getTime();
            if ((data_storage + 28800000) <= new Date().getTime()) {
                //localStorage.clear();
                localStorage.removeItem('acessos');
                localStorage.removeItem('userapp');
                localStorage.removeItem('time_sgiid');
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

            if (urlarray[0] != 'login') {
                if (!document.getElementById("script2")) { //document.getElementById("script2").remove();
                    var script2 = document.createElement("script");
                    script2.setAttribute("id", "script2");
                    script2.setAttribute("src", "assets/js/initMenu.js");
                    document.body.appendChild(script2);
                }
            } else if (urlarray[0] == 'login') {
                if (document.getElementById("script2")) document.getElementById("script2").remove();
            }

            if (urlarray[0] == 'manutencao') {

                var valida = this.valida2(urlarray, 'node001', access);
                var valida2 = this.valida2(urlarray, 'node006', access);

                if (!valida && !valida2) {
                    this.router.navigate(['./home']);
                    return false;
                }

            } else {
                for (var x in this.nodes) {
                    this.valida1(urlarray, x, access);
                }
            }
            /*if(this.nodes[access[x].node]){
                console.log(this.nodes[access[x].node])
            }*/



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


    valida1(urlarray, x, access) {

        var link = "";
        if (urlarray[1] != null) link = urlarray[0] + '/' + urlarray[1];

        if (this.nodes[x] == urlarray[0] || this.nodes[x] == link) {
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
                } else if (urlarray[0] + '/' + urlarray[1] == this.nodes[x]) {
                    if (urlarray[2] != null) {
                        this.verifica(urlarray[2], access, x);
                    } else {
                        if (!access.find(item => item.node == x)) {
                            this.router.navigate(['./home']);
                            return false;
                        }
                    }
                }
            } else {
                if (!access.find(item => item.node == x)) {
                    this.router.navigate(['./home']);
                    return false;
                }
            }
        }
    }

    valida2(urlarray, x, access) {
        var link = "";
        if (urlarray[1] != null) link = urlarray[0] + '/' + urlarray[1];

        if (this.nodes[x] == urlarray[0] || this.nodes[x] == link) {
            if (urlarray[1] != null) {
                if (urlarray[1].match("editar")) {
                    if (x != 'node6' && !access.find(item => item.node == x + "editar")) {
                        // this.router.navigate(['./home']);
                        return false;
                    }
                } else if (urlarray[1].match("view")) {
                    if (!access.find(item => item.node == x)) {
                        //this.router.navigate(['./home']);
                        return false;
                    }
                } else if (urlarray[1].match("novo")) {
                    if (!access.find(item => item.node == x + "criar")) {
                        //this.router.navigate(['./home']);
                        return false;
                    }
                } else if (urlarray[0] + '/' + urlarray[1] == this.nodes[x]) {
                    if (urlarray[2] != null) {
                        this.verifica(urlarray[2], access, x);
                    } else {
                        if (!access.find(item => item.node == x)) {
                            //this.router.navigate(['./home']);
                            return false;
                        }
                    }
                }
            } else {
                if (!access.find(item => item.node == x)) {
                    //this.router.navigate(['./home']);
                    return false;
                }
            }
        }
        return true
    }
    verifica(urlarray, access, x) {
        if (urlarray.match("editar")) {
            if (x != 'node6' && !access.find(item => item.node == x + "editar")) {
                this.router.navigate(['./home']);
                return false;
            }
        } else if (urlarray.match("view")) {
            if (!access.find(item => item.node == x)) {
                this.router.navigate(['./home']);
                return false;
            }
        } else if (urlarray.match("novo")) {
            if (!access.find(item => item.node == x + "criar")) {
                this.router.navigate(['./home']);
                return false;
            }
        }
    }

}

