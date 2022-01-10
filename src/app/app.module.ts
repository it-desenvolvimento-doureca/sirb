import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './paginas/login/login.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CabecalhoComponent } from './cabecalho/cabecalho.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './paginas/home/home.component';
import { RouterComponent } from "app/router.component";
import { FornecedoresComponent } from './paginas/fornecedores/fornecedores.component';
import { TinasComponent } from './paginas/tinas/tinas.component';
import { DataTableModule, SharedModule, ConfirmDialogModule, ConfirmationService, DropdownModule, CalendarModule, DialogModule, ColorPickerModule, RadioButtonModule, TreeNode, ChartModule, PickListModule, MultiSelectModule, EditorModule, AutoCompleteModule, ProgressBarModule, FileUploadModule, ToggleButtonModule, ListboxModule, ScheduleModule, OrderListModule, PanelModule, SelectButtonModule, OverlayPanelModule, TriStateCheckboxModule, TooltipModule, TabViewModule } from 'primeng/primeng';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { FormComponent } from './paginas/fornecedores/form/form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LoginService } from "app/servicos/LoginService";
import { TinasformComponent } from './paginas/tinas/tinasform/tinasform.component';
import { ComponentesComponent } from './paginas/componentes/componentes.component';
import { CompformComponent } from './paginas/componentes/compform/compform.component';
import { UtilizadoresComponent } from './paginas/utilizadores/utilizadores.component';
import { UtlformComponent } from './paginas/utilizadores/utlform/utlform.component';
import { BanhosComponent } from './paginas/banhos/banhos.component';
import { BanhosformComponent } from './paginas/banhos/banhosform/banhosform.component';
import { GERFORNECEDORService } from "app/servicos/ger-fornecedor.service";
import { HttpModule } from "@angular/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GERUTILIZADORESService } from "app/servicos/ger-utilizadores.service";
import { ABDICTINAService } from "app/servicos/ab-dic-tina.service";
import { ControlosComponent } from './cabecalho/controlos/controlos.component';
import { ABDICBANHOService } from "app/servicos/ab-dic-banho.service";
import { ABDICBANHOCOMPONENTEService } from "app/servicos/ab-dic-banho-componente.service";
import { ABDICCOMPONENTEService } from "app/servicos/ab-dic-componente.service";
import { Ng2MaskModule } from 'ng2-mask'
import { ABDICLINHAService } from "app/servicos/ab-dic-linha.service";
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { ABUNIDADADEMEDIDAService } from "app/servicos/ab-unidade-medida.service";
import { ConfiguracoesComponent } from './paginas/configuracoes/configuracoes.component';
import { RegistoanalisesComponent } from './paginas/registoanalises/registoanalises.component';
import { RegistoformComponent } from './paginas/registoanalises/registoform/registoform.component';
import { ABMOVANALISEService } from "app/servicos/ab-mov-analise.service";
import { ABMOVANALISELINHAService } from "app/servicos/ab-mov-analise-linha.service";
import { ManutencaoComponent } from './paginas/manutencao/manutencao.component';
import { ManutencaoformComponent } from './paginas/manutencao/manutencaoform/manutencaoform.component';
import { ABDICBANHOADITIVOService } from "app/servicos/ab-dic-banho-aditivo.service";
import { ABDICTIPOMANUTENCAOService } from "app/servicos/ab-dic-tipo-manutencao.service";
import { ABDICTURNOService } from "app/servicos/ab-dic-turno.service";
import { ABMOVMANUTENCAOService } from "app/servicos/ab-mov-manutencao.service";
import { ABDICTIPOADICAOService } from "app/servicos/ab-dic-tipo-adicao.service";
import { ABDICTIPOOPERACAOService } from "app/servicos/ab-dic-tipo-operacao.service";
import { ABMOVMANUTENCAOCABService } from "app/servicos/ab-mov-manutencao-cab.service";
import { ABMOVMANUTENCAOLINHAService } from "app/servicos/ab-mov-manutencao-linha.service";
import { LinhasComponent } from './paginas/parametrosanalisebanhos/linhas/linhas.component';
import { UnidadesmedidaComponent } from './paginas/parametrosanalisebanhos/unidadesmedida/unidadesmedida.component';
import { ZonasComponent } from './paginas/parametrosanalisebanhos/zonas/zonas.component';
import { TurnosComponent } from './paginas/parametrosanalisebanhos/turnos/turnos.component';
import { TipoadicaoComponent } from './paginas/parametrosanalisebanhos/tipoadicao/tipoadicao.component';
import { TipomanutenacaoComponent } from './paginas/parametrosanalisebanhos/tipomanutenacao/tipomanutenacao.component';
import { TipooperacaoComponent } from './paginas/parametrosanalisebanhos/tipooperacao/tipooperacao.component';
import { ABDICZONAService } from "app/servicos/ab-dic-zona.service";
import { RegistoparametrosComponent } from './paginas/registoparametros/registoparametros.component';
import { RegistoparaformComponent } from './paginas/registoparametros/registoparaform/registoparaform.component';
import { ADMOVREGPARAMOPERACAOService } from "app/servicos/ad-mov-reg-param-operacao.service";
import { RelatoriosService } from "app/servicos/relatorios.service";
import { RelatorioViewerComponent } from './paginas/relatorio-viewer/relatorio-viewer.component';
import { EmailService } from "app/servicos/email.service";
import { GERPERFILCABService } from "app/servicos/ger-perfil-cab.service";
import { GERMODULOService } from "app/servicos/ger-modulo.service";
import { GERPERFILLINService } from "app/servicos/ger-perfil-lin.service";
import { GERUTZPERFILService } from "app/servicos/ger-utz-perfil.service";
import { CheckboxModule } from "primeng/components/checkbox/checkbox";
import { ArmazensComponent } from 'app/paginas/parametrosanalisebanhos/armazens/armazens.component';
import { GERARMAZEMService } from 'app/servicos/ger-armazem.service';
import { GestaoeventosComponent } from './paginas/gestaoeventos/gestaoeventos.component';
import { DragDropModule } from 'primeng/components/dragdrop/dragdrop';
import { EventoslistaComponent } from './paginas/eventoslista/eventoslista.component';
import { GEREVENTOSCONFService } from 'app/servicos/ger-eventos-conf.service';
import { HistoricoAnalisesComponent } from './paginas/historico-analises/historico-analises.component';
import { ListaComponent } from './paginas/analises-jasper/lista/lista.component';
import { ConfComponent } from './paginas/analises-jasper/conf/conf.component';
import { ViewerComponent } from './paginas/analises-jasper/viewer/viewer.component';
import { TreeModule } from 'angular-tree-component';
import { GERANALISESService } from 'app/servicos/ger-analises.service';
import { AgGridModule } from 'ag-grid-angular';
import { HeaderComponent } from 'app/paginas/header-componente/header.component';
import { HeaderGroupComponent } from 'app/paginas/header-group-componente/header-group.component';
import { HistoricoManutencoesComponent } from './paginas/historico-manutencoes/historico-manutencoes.component';
import { ParametrosComponent } from './paginas/parametros/parametros.component';
import { GERPARAMETROSService } from 'app/servicos/ger-parametros.service';
import { GestaoTarefasComponent } from './paginas/gestao-tarefas/gestao-tarefas.component';
import { FormTarefasComponent } from './paginas/gestao-tarefas/form-tarefas/form-tarefas.component';
import { UploadService } from 'app/servicos/upload.service';
import { RegistoProducao } from 'app/servicos/registoproducao.service';
import { GERVISTASService } from 'app/servicos/ger-vistas.service';
import { GERCAMPOSDISPService } from 'app/servicos/ger-campos-disp.service';
import { ConstrucaoBanhosComponent } from './paginas/construcao-banhos/construcao-banhos.component';
import { ConstbanhosformComponent } from './paginas/construcao-banhos/constbanhosform/constbanhosform.component';
import { GERPOSTOSService } from 'app/servicos/ger-postos.service';
import { GestaoBanhosComponent } from './paginas/home-modulo/gestao-banhos/gestao-banhos.component';
import { ManutencaoReposicaoComponent } from './paginas/manutencao-reposicao/manutencao-reposicao.component';
import { ManutecaoReposicaoformComponent } from './paginas/manutencao-reposicao/manutecao-reposicaoform/manutecao-reposicaoform.component';
import { ManutencaoNaoProgramadaComponent } from './paginas/manutencao-nao-programada/manutencao-nao-programada.component';
import { MantencaoNaoProgramadafromComponent } from './paginas/manutencao-nao-programada/mantencao-nao-programadafrom/mantencao-nao-programadafrom.component';
import { ParametrosRaksComponent } from './paginas/parametros-raks/parametros-raks.component';
import { CartelasComponent } from './paginas/lmep/cartelas/cartelas.component';
import { ABDICLINHAOFService } from './servicos/ab-dic-linha-of.service';
import { ABMOVMANUTENCAOETIQService } from 'app/servicos/ab-mov-manutencao-etiq.service';
import { CalendarioComponent } from './paginas/gestao-tarefas/calendario/calendario.component';
import { ListagemManutencoesComponent } from './paginas/listagem-manutencoes/listagem-manutencoes.component';
import { AnaliseconsumosComponent } from './paginas/consultas/analiseconsumos/analiseconsumos.component';
import { GestaoeventostemporaisComponent } from './paginas/gestaoeventostemporais/gestaoeventostemporais.component';
import { GEREVENTOSPROGRAMADOSService } from './servicos/ger-eventos-programados.service';
import { ListaeventostempComponent } from './paginas/gestaoeventostemporais/listaeventostemp/listaeventostemp.component';
import { CorrecaoquantidadesComponent } from './paginas/utilitarios/correcaoquantidades/correcaoquantidades.component';
import { AnaliseEtiquetasComponent } from './paginas/utilitarios/analise-etiquetas/analise-etiquetas.component';
import { AnaliseconsumosetiquetasComponent } from './paginas/consultas/analiseconsumosetiquetas/analiseconsumosetiquetas.component';
import { TarefasComponent } from './paginas/home-modulo/tarefas/tarefas.component';
import { ProdutosComponent } from './paginas/moduloepi/produtos/produtos.component';
import { ReclamacaoCliente8DComponent } from './paginas/modulo_reclamacoes/reclamacao-cliente-8-d/reclamacao-cliente-8-d.component';
import { RejeicoesComponent } from './paginas/modulo_reclamacoes/parametros/rejeicoes/rejeicoes.component';
import { TiposreclamacoesComponent } from './paginas/modulo_reclamacoes/parametros/tiposreclamacoes/tiposreclamacoes.component';
import { GrausimportanciaComponent } from './paginas/modulo_reclamacoes/parametros/grausimportancia/grausimportancia.component';
import { TiposdefeitoComponent } from './paginas/modulo_reclamacoes/parametros/tiposdefeito/tiposdefeito.component';
import { FicheirosanaliseComponent } from './paginas/modulo_reclamacoes/parametros/ficheirosanalise/ficheirosanalise.component';
import { RCDICTIPODEFEITOService } from './servicos/rc-dic-tipo-defeito.service';
import { RCDICTIPORECLAMACAOService } from './servicos/rc-dic-tipo-reclamacao.service';
import { RCDICREJEICAOService } from './servicos/rc-dic-rejeicao.service';
import { RCDICFICHEIROSANALISEService } from './servicos/rc-dic-ficheiros-analise.service';
import { ListareclamacoesclientesComponent } from './paginas/modulo_reclamacoes/listareclamacoesclientes/listareclamacoesclientes.component';
import { RCMOVRECLAMACAOService } from './servicos/rc-mov-reclamacao.service';
import { TemposrespostaComponent } from './paginas/modulo_reclamacoes/parametros/temposresposta/temposresposta.component';
import { RCDICTEMPORESPOSTAService } from './servicos/rc-dic-tempo-resposta.service';
import { RCMOVRECLAMACAOENVIOSGARANTIDOSService } from './servicos/rc-mov-reclamacao-envios-garantidos.service';
import { RCMOVRECLAMACAOPLANOACCOESCORRETIVASService } from './servicos/rc-mov-reclamacao-plano-accoes-corretivas.service';
import { RCMOVRECLAMACAOARTIGOSIMILARESService } from './servicos/rc-mov-reclamacao-artigo-similares.service';
import { RCMOVRECLAMACAOEQUIPAService } from './servicos/rc-mov-reclamacao-equipa.service';
import { RCMOVRECLAMACAOFICHEIROSService } from './servicos/rc-mov-reclamacao-ficheiros.service';
import { DepartamentosComponent } from './paginas/gestao-utilizadores/departamentos/departamentos.component';
import { ListaSeccoesComponent } from './paginas/gestao-utilizadores/seccoes/lista-seccoes/lista-seccoes.component';
import { FormSeccoesComponent } from './paginas/gestao-utilizadores/seccoes/form-seccoes/form-seccoes.component';
import { FormGruposComponent } from './paginas/gestao-utilizadores/grupos/form-grupos/form-grupos.component';
import { ListaGruposComponent } from './paginas/gestao-utilizadores/grupos/lista-grupos/lista-grupos.component';
import { GERDEPARTAMENTOService } from './servicos/ger-departamento.service';
import { GERSECCAOService } from './servicos/ger-seccao.service';
import { GERSECCAOUTZService } from './servicos/ger-seccao-utz.service';
import { GERGRUPOService } from './servicos/ger-grupo.service';
import { GERGRUPOUTZService } from './servicos/ger-grupo-utz.service';
import { GERSECCAOCHEFESService } from './servicos/ger-seccao-chefes.service';
import { GTDICTarefasComponent } from './paginas/gestao-tarefas/parametros/tarefas/dictarefas.component';
import { RCDICACCOESRECLAMACAOService } from './servicos/rc-dic-accoes-reclamacao.service';
import { RCMOVRECLAMACAOSTOCKService } from './servicos/rc-mov-reclamacao-stock.service';
import { GTMOVTAREFASService } from './servicos/gt-mov-tarefas.service';
import { ProcessosComponent } from './paginas/home-modulo/processos/processos.component';
import { PaginatarefaComponent } from './paginas/gestao-tarefas/paginatarefa/paginatarefa.component';
import { RCMOVRECLAMACAOENCOMENDASService } from './servicos/rc-mov-reclamacao-encomendas.service';
import { RCMOVRECLAMACAOTIPONAODETECAOService } from './servicos/rc-mov-reclamacao-tipo-nao-detecao.service';
import { RCMOVRECLAMACAOTIPOOCORRENCIAService } from './servicos/rc-mov-reclamacao-tipo-ocorrencia.service';
import { GERATUALIZACAOSILVERBITABELASService } from './servicos/ger-atualizacao-silver-bi-tabelas.service';
import { ReclamacaoFornecedorComponent } from './paginas/modulo_reclamacoes/reclamacao-fornecedor/reclamacao-fornecedor.component';
import { ListareclamacoesfornecedoresComponent } from './paginas/modulo_reclamacoes/listareclamacoesfornecedores/listareclamacoesfornecedores.component';
import { TiponaodetecaoComponent } from './paginas/modulo_reclamacoes/parametros/tiponaodetecao/tiponaodetecao.component';
import { TipoocorrenciaComponent } from './paginas/modulo_reclamacoes/parametros/tipoocorrencia/tipoocorrencia.component';
import { ManutencoesFicheiroComponent } from './paginas/utilitarios/manutencoes-ficheiro/manutencoes-ficheiro.component';
import { ControloAssiduidadeComponent } from './paginas/modulo-recursos-humanos/controlo-assiduidade/controlo-assiduidade.component';
import { EstadosfuncionariosComponent } from './paginas/modulo-recursos-humanos/parametros/estadosfuncionarios/estadosfuncionarios.component';
import { SectoresComponent } from './paginas/modulo-recursos-humanos/parametros/sectores/sectores.component';
import { TurnosrecursosComponent } from './paginas/modulo-recursos-humanos/parametros/turnosrecursos/turnosrecursos.component';
import { FuncionariosComponent } from './paginas/modulo-recursos-humanos/parametros/funcionarios/funcionarios.component';
import { RHESTADOSFUNCService } from './servicos/rh-estados-func.service';
import { RHFUNCIONARIOSService } from './servicos/rh-funcionarios.service';
import { RHTURNOSService } from './servicos/rh-turnos.service';
import { RHSECTORESService } from './servicos/rh-sectores.service';
import { RH_EXCLUSAO_TIPO_EXTRAService } from './servicos/RH_EXCLUSAO_TIPO_EXTRA.service';
import { GERLOCAISService } from './servicos/ger-locais.service';
import { LocaisComponent } from './paginas/locais/locais.component';
import { CacifosComponent } from './paginas/modulo-recursos-humanos/parametros/cacifos/cacifos.component';
import { RHDICCACIFOSService } from './servicos/rh-dic-cacifos.service';
import { TipoCacifosComponent } from './paginas/modulo-recursos-humanos/parametros/tipo-cacifos/tipo-cacifos.component';
import { RHDICTIPOCACIFOService } from './servicos/rh-dic-tipo-cacifo.service';
import { PausasComponent } from './paginas/modulo-recursos-humanos/parametros/pausas/pausas.component';
import { RHTIPOSPAUSAService } from './servicos/rh-tipos-pausa.service';
import { RHPAUSASService } from './servicos/rh-pausas.service';
import { PedidosdaproducaoComponent } from './paginas/modulo-stocks/pedidosdaproducao/pedidosdaproducao.component';
import { PEDIDOSPRODUCAOService } from './servicos/pedidosproducao.service';
import { AnaliseDeRejeicoesComponent } from './paginas/modulo-producao/analise-de-rejeicoes/analise-de-rejeicoes.component';
import { ProducaoDashboardComponent } from './paginas/modulo-producao/producao-dashboard/producao-dashboard.component';
import { RelatoriosOcorrenciasComponent } from './paginas/modulo-seguranca-trabalho/relatorios-ocorrencias/relatorios-ocorrencias.component';
import { ModuloSegurancaTrabalhoComponent } from './paginas/modulo-seguranca-trabalho/modulo-seguranca-trabalho.component';
import { ATTESTEMUNHASService } from './servicos/at-testemunhas.service';
import { ATOCORRENCIASService } from './servicos/at-ocorrencias.service';
import { ATENTREVISTASService } from './servicos/at-entrevistas.service';
import { ATACCOESService } from './servicos/at-accoes.service';
import { PlaneamentosComponent } from './paginas/modulo-producao/planeamentos/planeamentos.component';
import { PlaneamentosFormComponent } from './paginas/modulo-producao/planeamentos-form/planeamentos-form.component';
import { PLANEAMENTOCABService } from './servicos/planeamento-cab.service';
import { PLANEAMENTOLINHASService } from './servicos/planeamento-linhas.service';
import { TiposOcorrenciaComponent } from './paginas/modulo-seguranca-trabalho/parametros/tipos-ocorrencia/tipos-ocorrencia.component';
import { CapacidadeLinhaComponent } from './paginas/modulo-producao/parametros/capacidade-linha/capacidade-linha.component';
import { CAPACIDADELINHAService } from './servicos/capacidade-linha.service';
import { TIPOSOCORRENCIAService } from './servicos/tipos-ocorrencia.service';
import { FeriadosComponent } from './paginas/feriados/feriados.component';
import { GERFERIADOSService } from './servicos/ger-feriados.service';
import { ObjetivosPlanosComponent } from './paginas/modulo-producao/parametros/objetivos-planos/objetivos-planos.component';
import { PRDICOBJETIVOSPLANOSService } from './servicos/pr-dic-objetivos-planos.service';
import { SectoresAnaliseComponent } from './paginas/modulo-producao/parametros/sectores-analise/sectores-analise.component';
import { PRDICSECTORESANALISEService } from './servicos/pr-dic-sectores-analise.service';
import { AmostrasComponent } from './paginas/modulo-producao/amostras/amostras.component';
import { AmostrasformComponent } from './paginas/modulo-producao/amostras/amostrasform/amostrasform.component';
import { TipologiaEnsaioComponent } from './paginas/modulo-producao/parametros/tipologia-ensaio/tipologia-ensaio.component';
import { PRDICTIPOLOGIAENSAIOService } from './servicos/pr-dic-tipologia-ensaio.service';
import { PRAMOSTRASCABService } from './servicos/pr-amostras-cab.service';
import { PRAMOSTRASACCOESService } from './servicos/pr-amostras-accoes.service';
import { RCDICCLASSIFICACAOService } from './servicos/rc-dic-classificacao.service';
import { ClassificacaoComponent } from './paginas/modulo_reclamacoes/parametros/classificacao/classificacao.component';
import { TipologiaComponent } from './paginas/modulo_reclamacoes/parametros/tipologia/tipologia.component';
import { RCDICGRAUIMPORTANCIAService } from './servicos/rc-dic-grau-importancia.service';
import { RCDICTIPOLOGIAService } from './servicos/rc-dic-tipologia.service';
import { RCMOVRECLAMACAOFORNECEDORService } from './servicos/rc-mov-reclamacao-fornecedor.service';
import { RCMOVRECLAMACAOFICHEIROSFORNECEDORService } from './servicos/rc-mov-reclamacao-ficheiros-fornecedor.service';
import { ObjetivosCumprimentoFornecedorComponent } from './paginas/modulo-logistica/parametros/objetivos-cumprimento-fornecedor/objetivos-cumprimento-fornecedor.component';
import { LGDICOBJETIVOSService } from './servicos/lg-dic-objetivos.service';
import { BarrasAlertaComponent } from './paginas/modulo-producao/barras-alerta/barras-alerta.component';
import { RevisoesPrioritariasComponent } from './paginas/modulo-producao/revisoes-prioritarias/revisoes-prioritarias.component';
import { ProducoesPrioritariasComponent } from './paginas/modulo-producao/producoes-prioritarias/producoes-prioritarias.component';
import { PRPRODUCOESPRIORITARIASService } from './servicos/pr-producoes-prioritarias.service';
import { PRREVISOESPRIORITARIASService } from './servicos/pr-revisoes-prioritarias.service';
import { PRBARRASALERTAService } from './servicos/pr-barras-alerta.service';
import { ObjetivosCumprimentoClienteComponent } from './paginas/modulo-logistica/parametros/objetivos-cumprimento-cliente/objetivos-cumprimento-cliente.component';
import { ListaplanosComponent } from './paginas/modulo-planos-acao/listaplanos/listaplanos.component';
import { FormplanosComponent } from './paginas/modulo-planos-acao/formplanos/formplanos.component';
import { PAMOVLINHAService } from './servicos/pa-mov-linha.service';
import { PAMOVCABService } from './servicos/pa-mov-cab.service';
import { GERDEPARTAMENTOSSECTORESService } from './servicos/ger-departamentos-sectores.service';
import { PAMOVFICHEIROSService } from './servicos/pa-mov-ficheiros.service';
import { GTMOVFICHEIROSService } from './servicos/gt-mov-ficheiros.service';
import { AmbitosComponent } from './paginas/modulo-planos-acao/parametros/ambitos/ambitos.component';
import { PADICAMBITOSService } from './servicos/pa-dic-ambitos.service';
import { PEDIDOSAPPService } from './servicos/pedidos-app.service';
import { FICHEIROSPAGINASService } from './servicos/ficheiros-paginas.service';
import { TipoAcaoComponent } from './paginas/gestao-tarefas/parametros/tipo-acao/tipo-acao.component';
import { GTDICTIPOACAOService } from './servicos/gt-dic-tipo-acao.service';
import { ListaacoesComponent } from './paginas/modulo-planos-acao/listaacoes/listaacoes.component';
import { AlertaseprioridadesComponent } from './paginas/modulo-engenharia-processos/alertaseprioridades/alertaseprioridades.component';
import { DashboardService } from './servicos/dashboard.service';
import { LoadingComponent } from './paginas/loading/loading.component';
import { ProducaoOemComponent } from './paginas/modulo-producao/producao-oem/producao-oem.component';
import { ProducaoVeiculosComponent } from './paginas/modulo-producao/producao-veiculos/producao-veiculos.component';
import { ProducaoProgramaComponent } from './paginas/modulo-producao/producao-programas/producao-programa.component';
import { ProducaoFabricasComponent } from './paginas/modulo-producao/producao-fabricas/producao-fabricas.component';
import { ProducaoProjetosComponent } from './paginas/modulo-producao/producao-projetos/producao-projetos.component';
import { AnaliseencomendasComponent } from './paginas/modulo-producao/analiseencomendas/analiseencomendas.component';
import { GERDICOEMService } from './servicos/ger-dic-oem.service';
import { GERDICFABRICAService } from './servicos/ger-dic-fabrica.service';
import { GERDICPROJCABService } from './servicos/ger-dic-proj-cab.service';
import { GERDICPROJREFService } from './servicos/ger-dic-proj-ref.service';
import { GERDICPROJFABService } from './servicos/ger-dic-proj-fab.service';
import { GERDICPROGRAMAService } from './servicos/ger-dic-programa.service';
import { GERDICVEICULOService } from './servicos/ger-dic-veiculo.service';
import { ListaProjComponent } from './paginas/modulo-producao/producao-projetos/lista-proj/lista-proj.component';
import { ProducaoLimitesEncomendaComponent } from './paginas/modulo-producao/producao-limites-encomenda/producao-limites-encomenda.component';
import { GERDICLIMITESENCOMENDAService } from './servicos/ger-dic-limites-encomenda.service';
import { ObjetivosComponent } from './paginas/modulo-financeira/objetivos/objetivos.component';
import { SeguimentoFaturacaoComponent } from './paginas/modulo-financeira/seguimento-faturacao/seguimento-faturacao.component';
import { FINDICOBJETIVOSService } from './servicos/fin-dic-objetivos.service';
import { ListaComponent as ListaAnalise } from './paginas/modulo-financeira/analise-dividas/lista/lista.component';
import { FichaComponent } from './paginas/modulo-financeira/analise-dividas/ficha/ficha.component';
import { TiposDocumentoComponent } from './paginas/modulo-financeira/tipos-documento/tipos-documento.component';
import { FINANALISEDIVIDASService } from './servicos/fin-analise-dividas.service';
import { FINDICTIPODOCService } from './servicos/fin-dic-tipo-doc.service';
import { FINDICCLIENTESService } from './servicos/fin-dic-clientes.service';
import { FINDOCACORDOService } from './servicos/fin-doc-acordo.service';
import { FINREGISTOACOESService } from './servicos/fin-registo-acoes.service';
import { FINDIVIDASATIVIDADEService } from './servicos/fin-dividas-atividade.service';
import { PlaneamentoProducaoComponent } from './paginas/modulo-producao/planeamento-producao/planeamento-producao.component';
import { FormComponent as FormaPlaneamento } from './paginas/modulo-producao/planeamento-producao/form/form.component';
import { DiasProducaoComponent } from './paginas/modulo-producao/parametros/dias-producao/dias-producao.component';
import { CapacidadeAcabamentoComponent } from './paginas/modulo-producao/parametros/capacidade-acabamento/capacidade-acabamento.component';
import { CaapcidadeRacksComponent } from './paginas/modulo-producao/parametros/caapcidade-racks/caapcidade-racks.component';
import { SemanasAnaliseComponent } from './paginas/modulo-producao/parametros/semanas-analise/semanas-analise.component';
import { PRDICSEMANASANALISEService } from './servicos/pr-dic-semanas-analise.service';
import { PRDICCAPACIDADERACKSService } from './servicos/pr-dic-capacidade-racks.service';
import { PRDICCAPACIDADEACABAMENTOService } from './servicos/pr-dic-capacidade-acabamento.service';
import { PRDICPRODUCAOSEMANAService } from './servicos/pr-dic-producao-semana.service';
import { PRPLANEAMENTOPRODUCAOLINHASService } from './servicos/pr-planeamento-producao-linhas.service';
import { PRPLANEAMENTOPRODUCAOCABService } from './servicos/pr-planeamento-producao-cab.service';
import { PlaneamentoAnalisesComponent } from './paginas/modulo-producao/planeamento-analises/planeamento-analises.component';
import { PlameamentoAnalisesFormComponent } from './paginas/modulo-producao/planeamento-analises/plameamento-analises-form/plameamento-analises-form.component';
import { SectoresAgregadoresComponent } from './paginas/modulo-producao/parametros/sectores-agregadores/sectores-agregadores.component';
import { PRDICSECTORESAGREGADORESService } from './servicos/pr-dic-sectores-agregadores.service';
import { PRDICSECTORESAGREGADORESLINHAService } from './servicos/pr-dic-sectores-agregadores-linha.service';
import { PRPLANEAMENTOPRODUCAOANALISESService } from './servicos/pr-planeamento-producao-analises.service';
import { PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService } from './servicos/pr-planeamento-producao-analises-recursos-humanos.service';
import { GestaoBarrasComponent } from './paginas/modulo-producao/gestao-barras/gestao-barras.component';
import { ValidacoesBastidoresComponent } from './paginas/modulo-producao/parametros/validacoes-bastidores/validacoes-bastidores.component';
import { PRGESTAOBARRASREFERENCIASService } from './servicos/pr-gestao-barras-referencias.service';
import { PRGESTAOBARRASService } from './servicos/pr-gestao-barras.service';
import { PRDICVALIDACAOBASTIDORService } from './servicos/pr-dic-validacao-bastidor.service';
import { GERFAVORITOSService } from './servicos/ger-favoritos.service';
import { SeguimentoFaturacaoAnualComponent } from './paginas/modulo-financeira/seguimento-faturacao-anual/seguimento-faturacao-anual.component';
import { FINSEGUIMENTOFATURACAOANUALService } from './servicos/fin-seguimento-faturacao-anual.service';
import { ParametrosSeguimentoComponent } from './paginas/modulo-financeira/parametros-seguimento/parametros-seguimento.component';
import { FINDICPARAMETROSSEGUIMENTOService } from './servicos/fin-dic-parametros-seguimento.service';
import { ATDICCAUSASACIDENTEService } from './servicos/at-dic-causas-acidente.service';
import { RHDICEPIService } from './servicos/rh-dic-epi.service';
import { CausasAcidenteComponent } from './paginas/modulo-seguranca-trabalho/parametros/causas-acidente/causas-acidente.component';
import { EpisComponent } from './paginas/modulo-recursos-humanos/parametros/epis/epis.component';
import { RCMOVRECLAMACAOCLIENTESService } from './servicos/rc-mov-reclamacao-clientes.service';
import { AnaliseLoteFornecedorComponent } from './paginas/modulo-producao/analise-de-rejeicoes/analise-lote-fornecedor/analise-lote-fornecedor.component';
import { AuditoriasComponent } from './paginas/modulo-qualidade/auditorias/auditorias.component';
import { TipoAuditoriaComponent } from './paginas/modulo-qualidade/parametros/tipo-auditoria/tipo-auditoria.component';
import { QUADICTIPOSAUDITORIAQTDPREVISTAService } from './servicos/qua-dic-tipos-auditoria-qtd-prevista.service';
import { QUADICTIPOSAUDITORIAService } from './servicos/qua-dic-tipos-auditoria.service';
import { QUAMOVAUDITORIASService } from './servicos/qua-mov-auditorias.service';
import { DerrogacoesComponent } from './paginas/modulo-qualidade/derrogacoes/derrogacoes.component';
import { DerrogacoesFormComponent } from './paginas/modulo-qualidade/derrogacoes/derrogacoes-form/derrogacoes-form.component';
import { QUADERROGACOESService } from './servicos/qua-derrogacoes.service';
import { GERREFERENCIASFASTRESPONSEREJEICOESService } from './servicos/ger-referencias-fastresponse-rejeicoes.service';
import { SectoresAbsentismoComponent } from './paginas/modulo-recursos-humanos/parametros/sectores-absentismo/sectores-absentismo.component';
import { RHDICSECTORESABSENTISMOService } from './servicos/rh-dic-sectores-absentismo.service';
import { RHDICSECTORESABSENTISMOLINHAService } from './servicos/rh-dic-sectores-absentismo-linha.service';
import { AnaliseClientesComponent } from './paginas/modulo-comercial/analise-clientes/analise-clientes.component';
import { COANALISECLIENTESService } from './servicos/co-analise-clientes.service';
import { COANALISECLIENTESQUANTIDADEService } from './servicos/co-analise-clientes-quantidade.service';
import { COANALISECLIENTESOBSERVACOESService } from './servicos/co-analise-clientes-observacoes.service';
import { COANALISECLIENTESACCOESService } from './servicos/co-analise-clientes-accoes.service';
import { QUADERROGACOESACOESService } from './servicos/qua-derrogacoes-acoes.service';
import { QUADERROGACOESFICHEIROSService } from './servicos/qua-derrogacoes-ficheiros.service';
import { QUADERROGACOESPLANOSACCOESService } from './servicos/qua-derrogacoes-planos-accoes.service';
import { QUADERROGACOESEQUIPAService } from './servicos/qua-derrogacoes-equipa.service';
import { FichaManutencaoComponent } from './paginas/modulo-manutencao/ficha-manutencao/ficha-manutencao.component';
import { FichaEquipamentoComponent } from './paginas/modulo-manutencao/ficha-equipamento/ficha-equipamento.component';
import { AmbitosReunioesComponent } from './paginas/modulo-reunioes/ambitos-reunioes/ambitos-reunioes.component';
import { FormAmbitosReunioesComponent } from './paginas/modulo-reunioes/ambitos-reunioes/form-ambitos-reunioes/form-ambitos-reunioes.component';
import { ReunioesComponent } from './paginas/modulo-reunioes/reunioes/reunioes.component';
import { ReunioesFormComponent } from './paginas/modulo-reunioes/reunioes/reunioes-form/reunioes-form.component';
import { REUAMBITOSREUNIOESService } from './servicos/reu-ambitos-reunioes.service';
import { REUAMBITOSREUNIOESPARTICIPANTESService } from './servicos/reu-ambitos-reunioes-participantes.service';
import { REUREUNIOESService } from './servicos/reu-reunioes.service';
import { REUREUNIOESPARTICIPANTESService } from './servicos/reu-reunioes-participantes.service';
import { REUREUNIOESFICHEIROSService } from './servicos/reu-reunioes-ficheiros.service';
import { AnaliseEnviosComponent } from './paginas/modulo-logistica/analise-envios/analise-envios.component';
import { FICHEIROTNTService } from './servicos/ficheiro-tnt.service';
import { EquipasManutencaoComponent } from './paginas/modulo-manutencao/parametros/equipas-manutencao/equipas-manutencao.component';
import { EdificiosComponent } from './paginas/modulo-manutencao/parametros/edificios/edificios.component';
import { PisosComponent } from './paginas/modulo-manutencao/parametros/pisos/pisos.component';
import { DivisoesComponent } from './paginas/modulo-manutencao/parametros/divisoes/divisoes.component';
import { EquipamentosComponent } from './paginas/modulo-manutencao/equipamentos/equipamentos.component';
import { MANDICEDIFICIOSService } from './servicos/man-dic-edificios.service';
import { MANDICPISOSService } from './servicos/man-dic-pisos.service';
import { MANDICEQUIPASService } from './servicos/man-dic-equipas.service';
import { MANDICEQUIPASUTILIZADORESService } from './servicos/man-dic-equipas-utilizadores.service';
import { MANDICDIVISOESService } from './servicos/man-dic-divisoes.service';
import { MANMOVMANUTENCAOEQUIPAMENTOSService } from './servicos/man-mov-manutencao-equipamentos.service';
import { MANMOVMANUTENCAODOCUMENTOSService } from './servicos/man-mov-manutencao-documentos.service';
import { MANMOVMANUTENCAODADOSCOMPRAService } from './servicos/man-mov-manutencao-dados-compra.service';
import { MANMOVMANUTENCAOCOMPONENTESService } from './servicos/man-mov-manutencao-componentes.service';
import { MANMOVMANUTENCAOPLANOSService } from './servicos/man-mov-manutencao-planos.service';
import { MANMOVMANUTENCAOCONTRATOSSUPORTEService } from './servicos/man-mov-manutencao-contratos-suporte.service';
import { MANMOVMANUTENCAOGRAUSIMPORTANCIAService } from './servicos/man-mov-manutencao-graus-importancia.service';
import { MANMOVPEDIDOSService } from './servicos/man-mov-pedidos.service';
import { MANMOVMANUTENCAOANEXOSService } from './servicos/man-mov-manutencao-anexos.service';
import { MANMOVPEDIDOSDOCUMENTOSService } from './servicos/man-mov-pedidos-documentos.service';
import { ListaPedidosComponent } from './paginas/modulo-manutencao/lista-pedidos/lista-pedidos.component';
import { EvolucaoDividasComponent } from './paginas/modulo-financeira/evolucao-dividas/evolucao-dividas.component';
import { ContratoComponent } from './paginas/modulo-comercial/contratos/contrato/contrato.component';
import { ContratoFormComponent } from './paginas/modulo-comercial/contratos/contrato/contrato-form/contrato-form.component';
import { ReferenciasComponent } from './paginas/modulo-comercial/contratos/referencias/referencias.component';
import { ReferenciasFormComponent } from './paginas/modulo-comercial/contratos/referencias/referencias-form/referencias-form.component';
import { AcordosComponent } from './paginas/modulo-comercial/contratos/acordos/acordos.component';
import { AcordosFormComponent } from './paginas/modulo-comercial/contratos/acordos/acordos-form/acordos-form.component';
import { COMACORDOSService } from './servicos/com-acordos.service';
import { COMACORDOSACTIVIDADESService } from './servicos/com-acordos-actividades.service';
import { COMACORDOSAMORTIZACOESService } from './servicos/com-acordos-amortizacoes.service';
import { COMACORDOSANEXOSService } from './servicos/com-acordos-anexos.service';
import { COMACORDOSHISTORICOService } from './servicos/com-acordos-historico.service';
import { COMACORDOSLTAService } from './servicos/com-acordos-lta.service';
import { COMACORDOSPRECOSService } from './servicos/com-acordos-precos.service';
import { COMCONTRATOSService } from './servicos/com-contratos.service';
import { COMREFERENCIASService } from './servicos/com-referencias.service';
import { COMACORDOSVOLUMESService } from './servicos/com-acordos-volumes.service';
import { COMREFERENCIASSILVERService } from './servicos/com-referencias-silver.service';
import { AnaliseAcordosComponent } from './paginas/modulo-comercial/analise-acordos/analise-acordos.component';
import { BusinessanalyticsComponent } from './paginas/modulo-engenharia-processos/businessanalytics/businessanalytics.component';
import { PlaneamentoBarrasAnaliseComponent } from './paginas/modulo-producao/planeamento-barras-analise/planeamento-barras-analise.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent, canActivate: [LoginService] },
  {
    path: 'fornecedor', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Fornecedores" },
    children: [
      { path: '', component: FornecedoresComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormComponent, canActivate: [LoginService], data: { breadcrumb: "Fornecedor" } },
      { path: 'editar', component: FormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormComponent, data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'tinas', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Tinas" },
    children: [
      { path: '', component: TinasComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: TinasformComponent, canActivate: [LoginService], data: { breadcrumb: "Tina" } },
      { path: 'editar', component: TinasformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: TinasformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'banhos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Banhos" },
    children: [
      { path: '', component: BanhosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: BanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Banho" } },
      { path: 'editar', component: BanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: BanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'componentes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Componentes/Aditivos" },
    children: [
      { path: '', component: ComponentesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: CompformComponent, canActivate: [LoginService], data: { breadcrumb: "Componente/Aditivo" } },
      { path: 'editar', component: CompformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: CompformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'utilizadores', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Utilizadores" },
    children: [
      { path: '', component: UtilizadoresComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: UtlformComponent, canActivate: [LoginService], data: { breadcrumb: "Utilizador" } },
      { path: 'editar', component: UtlformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: UtlformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'registo', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Registo Análises" },
    children: [
      { path: '', component: RegistoanalisesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: RegistoformComponent, canActivate: [LoginService], data: { breadcrumb: "Análise" } },
      { path: 'editar', component: RegistoformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: RegistoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoAnalisesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } },]
  },
  { path: 'homegestaobanhos', component: GestaoBanhosComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Banhos" } },
  // { path: 'hometarefas', component: TarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Tarefas" } },
  {
    path: 'manutencao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções Planedas" },
    children: [
      { path: '', component: ManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenção Planeada" } },
      { path: 'editar', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  },
  {
    path: 'construcaobanhos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Construção Banhos" },
    children: [
      { path: '', component: ConstrucaoBanhosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ConstbanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Construção Banho" } },
      { path: 'editar', component: ConstbanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ConstbanhosformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  }, {
    path: 'manutencaoreposicao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções de Reposição" },
    children: [
      { path: '', component: ManutencaoReposicaoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ManutecaoReposicaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenção de Reposição" } },
      { path: 'editar', component: ManutecaoReposicaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ManutecaoReposicaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  }, {
    path: 'manutencaonaoprogramada', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções não Programadas" },
    children: [
      { path: '', component: ManutencaoNaoProgramadaComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: MantencaoNaoProgramadafromComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenção não Programada" } },
      { path: 'editar', component: MantencaoNaoProgramadafromComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: MantencaoNaoProgramadafromComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } },
      { path: 'historico', component: HistoricoManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Histórico" } }]
  },
  {
    path: 'registopara', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Reg. Parâm. de Operações" },
    children: [
      { path: '', component: RegistoparametrosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Reg. Parâm. de Operação" } },
      { path: 'editar', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },

  {
    path: 'producao_projetos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Projetos" },
    children: [
      { path: '', component: ListaProjComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ProducaoProjetosComponent, canActivate: [LoginService], data: { breadcrumb: "Projeto" } },
      { path: 'editar', component: ProducaoProjetosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ProducaoProjetosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'comercial_projetos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Projetos" },
    children: [
      { path: '', component: ListaProjComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ProducaoProjetosComponent, canActivate: [LoginService], data: { breadcrumb: "Projeto" } },
      { path: 'editar', component: ProducaoProjetosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ProducaoProjetosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },

  { path: 'perfil/view', component: PerfilComponent, canActivate: [LoginService], data: { breadcrumb: "Perfil" } },
  { path: 'config', component: ConfiguracoesComponent, canActivate: [LoginService], data: { breadcrumb: "Configurações" } },
  {
    path: 'parametros', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Parâmetros Aplicação" },
    children: [
      { path: '', component: ParametrosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: ParametrosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },
  { path: 'unidades', component: UnidadesmedidaComponent, canActivate: [LoginService], data: { breadcrumb: "Unidade de Medida" } },
  { path: 'linhas', component: LinhasComponent, canActivate: [LoginService], data: { breadcrumb: "Linhas" } },
  { path: 'tipos_ocorrencia', component: TiposOcorrenciaComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo de Ocorrência" } },
  { path: 'capacidade_linha', component: CapacidadeLinhaComponent, canActivate: [LoginService], data: { breadcrumb: "Capacidade da Linha" } },
  { path: 'objetivos_cumprimento_fornecedor', component: ObjetivosCumprimentoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Objetivos Cumprimento Fornecedores" } },
  { path: 'objetivos_cumprimento_cliente', component: ObjetivosCumprimentoClienteComponent, canActivate: [LoginService], data: { breadcrumb: "Objetivos Cumprimento Clientes" } },
  { path: 'sectores_analise', component: SectoresAnaliseComponent, canActivate: [LoginService], data: { breadcrumb: "Sectores de Análise - Dashboard Formariz" } },

  { path: 'objetivos_faturacao', component: ObjetivosComponent, canActivate: [LoginService], data: { breadcrumb: "Objetivos Faturação" } },
  { path: 'parametros_seguimento_faturacao_anual', component: ParametrosSeguimentoComponent, canActivate: [LoginService], data: { breadcrumb: "Parâmetros Seguimento Faturação Anual" } },

  { path: 'tipos_documento', component: TiposDocumentoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Documento" } },
  { path: 'seguimento_faturacao', component: SeguimentoFaturacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Seguimento Faturação Mensal" } },
  { path: 'seguimento_faturacao_anual', component: SeguimentoFaturacaoAnualComponent, canActivate: [LoginService], data: { breadcrumb: "Seguimento Faturação Anual" } },
  { path: 'tipologia_ensaio', component: TipologiaEnsaioComponent, canActivate: [LoginService], data: { breadcrumb: "Tipologias de Ensaio" } },
  { path: 'causas_acidente', component: CausasAcidenteComponent, canActivate: [LoginService], data: { breadcrumb: "Causas do Acid./Emerg" } },
  { path: 'epis', component: EpisComponent, canActivate: [LoginService], data: { breadcrumb: "EPI's" } },
  { path: 'producao_fabricas', component: ProducaoFabricasComponent, canActivate: [LoginService], data: { breadcrumb: "Fábricas" } },
  { path: 'producao_programas', component: ProducaoProgramaComponent, canActivate: [LoginService], data: { breadcrumb: "Programas" } },
  { path: 'limites_encomendas', component: ProducaoLimitesEncomendaComponent, canActivate: [LoginService], data: { breadcrumb: "Limites Encomendas" } },

  { path: 'dias_producao', component: DiasProducaoComponent, canActivate: [LoginService], data: { breadcrumb: "Dias Produção/Semana" } },
  { path: 'capacidade_acabamento', component: CapacidadeAcabamentoComponent, canActivate: [LoginService], data: { breadcrumb: "Capacidade/Acabamento" } },
  { path: 'capacidade_racks', component: CaapcidadeRacksComponent, canActivate: [LoginService], data: { breadcrumb: "Capacidade Racks" } },
  { path: 'semanas_analise', component: SemanasAnaliseComponent, canActivate: [LoginService], data: { breadcrumb: "Nº Semanas Análise" } },
  { path: 'sectores_agregadores', component: SectoresAgregadoresComponent, canActivate: [LoginService], data: { breadcrumb: "Sectores Agregadores" } },
  { path: 'validacoes_bastidores', component: ValidacoesBastidoresComponent, canActivate: [LoginService], data: { breadcrumb: "Validações Bastidores" } },

  { path: 'sectores_absentismo', component: SectoresAbsentismoComponent, canActivate: [LoginService], data: { breadcrumb: "Sectores/Absentismo" } },
  { path: 'sectores_absentismo_financeira', component: SectoresAbsentismoComponent, canActivate: [LoginService], data: { breadcrumb: "Sectores/Absentismo" } },
  { path: 'analise_clientes', component: AnaliseClientesComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Clientes" } },
  { path: 'analise_acordos', component: AnaliseAcordosComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Acordos" } },
  { path: 'business_analytics', component: BusinessanalyticsComponent, canActivate: [LoginService], data: { breadcrumb: "Business Analytics" } },

  {
    path: 'planeamento_producao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Planos Produção" },
    children: [
      { path: '', component: PlaneamentoProducaoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormaPlaneamento, canActivate: [LoginService], data: { breadcrumb: "Plano Produção" } },
      { path: 'editar', component: FormaPlaneamento, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormaPlaneamento, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },

  {
    path: 'planeamento_analises', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Planos Produção - Análises" },
    children: [
      { path: '', component: PlaneamentoAnalisesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: PlameamentoAnalisesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Análise" } },
      { path: 'editar', component: PlameamentoAnalisesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: PlameamentoAnalisesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },

  {
    path: 'derrogacoes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Derrogações" },
    children: [
      { path: '', component: DerrogacoesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: DerrogacoesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Derrogações" } },
      { path: 'editar', component: DerrogacoesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: DerrogacoesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },

  { path: 'producao_veiculos', component: ProducaoVeiculosComponent, canActivate: [LoginService], data: { breadcrumb: "Veículos" } },
  { path: 'producao_oem', component: ProducaoOemComponent, canActivate: [LoginService], data: { breadcrumb: "OEM" } },
  { path: 'comercial_fabricas', component: ProducaoFabricasComponent, canActivate: [LoginService], data: { breadcrumb: "Fábricas" } },
  { path: 'comercial_programas', component: ProducaoProgramaComponent, canActivate: [LoginService], data: { breadcrumb: "Programas" } },
  { path: 'comercial_limites_encomendas', component: ProducaoLimitesEncomendaComponent, canActivate: [LoginService], data: { breadcrumb: "Limites Encomendas" } },
  { path: 'comercial_veiculos', component: ProducaoVeiculosComponent, canActivate: [LoginService], data: { breadcrumb: "Veículos" } },
  { path: 'comercial_oem', component: ProducaoOemComponent, canActivate: [LoginService], data: { breadcrumb: "OEM" } },
  { path: 'analiseencomendas_p', component: AnaliseencomendasComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Encomendas" } },
  { path: 'analiseencomendas', component: AnaliseencomendasComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Encomendas" } },
  { path: 'objetivos_planos', component: ObjetivosPlanosComponent, canActivate: [LoginService], data: { breadcrumb: "Objetivos" } },
  { path: 'zonas', component: ZonasComponent, canActivate: [LoginService], data: { breadcrumb: "Zonas" } },
  { path: 'armazens', component: ArmazensComponent, canActivate: [LoginService], data: { breadcrumb: "Armazéns" } },
  { path: 'turnos', component: TurnosComponent, canActivate: [LoginService], data: { breadcrumb: "Turnos" } },
  { path: 'adicoes', component: TipoadicaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Adição" } },
  { path: 'manutencoes', component: TipomanutenacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Manutenção" } },
  { path: 'operacoes', component: TipooperacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Operação" } },
  { path: 'perfil/editar', component: PerfilComponent, canActivate: [LoginService], data: { breadcrumb: "Perfil" } },
  { path: 'relatorio', component: RelatorioViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatório" } },
  { path: 'correcaoquantidades', component: CorrecaoquantidadesComponent, canActivate: [LoginService], data: { breadcrumb: "Correção de Quantidades de Etiquetas" } },
  { path: 'analiseetiquetas', component: AnaliseEtiquetasComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Etiquetas" } },
  { path: 'ficheirosmanutencoes', component: ManutencoesFicheiroComponent, canActivate: [LoginService], data: { breadcrumb: "Ficheiros Manutenções (Interface)" } },

  {
    path: 'controloassiduidade_producao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Recursos Humanos" }, children: [
      { path: '', component: ControloAssiduidadeComponent, canActivate: [LoginService], data: { breadcrumb: "Análises de Assiduidade e Produtividade" } },
    ]
  },
  {
    path: 'controloassiduidade_financeira', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Recursos Humanos" }, children: [
      { path: '', component: ControloAssiduidadeComponent, canActivate: [LoginService], data: { breadcrumb: "Análises de Assiduidade e Produtividade" } },
    ]
  },
  { path: 'analise_rejeicoes_engenharia', component: AnaliseDeRejeicoesComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Rejeições" } },
  { path: 'analise_rejeicoes_qualidade', component: AnaliseDeRejeicoesComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Rejeições" } },
  {
    path: 'producao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Produção" }, children: [
      { path: '', component: ProducaoDashboardComponent, canActivate: [LoginService], data: { breadcrumb: "Dashboard" } },
      { path: 'analise_rejeicoes', component: AnaliseDeRejeicoesComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Rejeições" } },
      {
        path: 'planeamento', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Planeamentos de Barras" }, children: [
          { path: '', component: PlaneamentosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
          { path: 'view', component: PlaneamentosFormComponent, canActivate: [LoginService], data: { breadcrumb: "Planeamento de Barras" } },
          { path: 'editar', component: PlaneamentosFormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
          { path: 'novo', component: PlaneamentosFormComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
      },
      { path: 'planeamento_barras_analise', component: PlaneamentoBarrasAnaliseComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Rejeições" } },
      {
        path: 'amostras', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Amostras" }, children: [
          { path: '', component: AmostrasComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
          { path: 'view', component: AmostrasformComponent, canActivate: [LoginService], data: { breadcrumb: "Amostra" } },
          { path: 'editar', component: AmostrasformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
          { path: 'novo', component: AmostrasformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
      },
      { path: 'barras_alerta', component: BarrasAlertaComponent, canActivate: [LoginService], data: { breadcrumb: "Barras em Alerta" } },
      { path: 'revisoes_prioritarias', component: RevisoesPrioritariasComponent, canActivate: [LoginService], data: { breadcrumb: "Revisões Prioritárias" } },
      { path: 'producoes_prioritarias', component: ProducoesPrioritariasComponent, canActivate: [LoginService], data: { breadcrumb: "Produções Prioritárias" } },
    ]
  },
  {
    path: 'listaacoes', component: ListaacoesComponent, canActivate: [LoginService], data: { breadcrumb: "Lista de Ações" }
  },

  {
    path: 'alertasePrioridades', component: AlertaseprioridadesComponent, canActivate: [LoginService], data: { breadcrumb: "Lista de Ações" }
  },
  {
    path: 'planosacao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },

  {
    path: 'planosacaoengenaria', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Engenharia" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  }
  ,
  {
    path: 'planosacaoproducao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Produção" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'planosacaologistica', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Logística" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'planosacaomanutencao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Manutenção" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'planosacaoinjecao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Injeção" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'planosacaoqualidade', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Qualidade" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'planosacaoFinanceira', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Financeira" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'planosacaoComercial', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Comercial" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'planosacaoProjetos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ações - Projetos" },
    children: [
      { path: '', component: ListaplanosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Plano de Ação" } },
      { path: 'editar', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormplanosComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },


  {
    path: 'analise_dividas', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Dívidas" },
    children: [
      { path: '', component: ListaAnalise, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FichaComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Dívidas - Ficha" } },
      { path: 'editar', component: FichaComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },
  {
    path: 'evolucao_dividas', component: EvolucaoDividasComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Evolução de Dívidas" },
  },

  {
    path: 'auditorias', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Auditorias" },
    children: [
      { path: '', component: AuditoriasComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: AuditoriasComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },

  { path: 'tipo_auditoria', component: TipoAuditoriaComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Auditoria" } },
  { path: 'ambitos', component: AmbitosComponent, canActivate: [LoginService], data: { breadcrumb: "Âmbitos" } },
  { path: 'estadosfuncionarios', component: EstadosfuncionariosComponent, canActivate: [LoginService], data: { breadcrumb: "Estados Funcionários" } },
  { path: 'sectores', component: SectoresComponent, canActivate: [LoginService], data: { breadcrumb: "Sectores" } },
  { path: 'turnosrecursos', component: TurnosrecursosComponent, canActivate: [LoginService], data: { breadcrumb: "Turnos" } },
  { path: 'funcionarios', component: FuncionariosComponent, canActivate: [LoginService], data: { breadcrumb: "Funcionários" } },
  { path: 'pausas', component: PausasComponent, canActivate: [LoginService], data: { breadcrumb: "Pausas" } },
  { path: 'estadosfuncionarios_p', component: EstadosfuncionariosComponent, canActivate: [LoginService], data: { breadcrumb: "Estados Funcionários" } },
  { path: 'sectores_p', component: SectoresComponent, canActivate: [LoginService], data: { breadcrumb: "Sectores" } },
  { path: 'turnosrecursos_p', component: TurnosrecursosComponent, canActivate: [LoginService], data: { breadcrumb: "Turnos" } },
  { path: 'funcionarios_p', component: FuncionariosComponent, canActivate: [LoginService], data: { breadcrumb: "Funcionários" } },

  { path: 'pausas_p', component: PausasComponent, canActivate: [LoginService], data: { breadcrumb: "Pausas" } },
  { path: 'pedidosdaproducao', component: PedidosdaproducaoComponent, canActivate: [LoginService], data: { breadcrumb: "Pedidos da Produção" } },

  { path: 'teste1', component: GestaoTarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Teste1" } },
  { path: 'teste2', component: FormTarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Teste2" } },
  { path: 'teste3', component: ProdutosComponent, canActivate: [LoginService], data: { breadcrumb: "Teste3" } },
  //{ path: 'reclamacao', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamação Cliente" } },
  { path: 'calendario', component: CalendarioComponent, canActivate: [LoginService], data: { breadcrumb: "Calendário" } },
  {
    path: 'analiseenvios', component: AnaliseEnviosComponent, canActivate: [LoginService], data: { breadcrumb: "Análise de Envios" },

  },

  {
    path: 'tarefas', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Tarefas" },
    children: [
      { path: '', component: TarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Tarefas" } },
      { path: 'view', component: PaginatarefaComponent, canActivate: [LoginService], data: { breadcrumb: "Tarefa" } },
      { path: 'editar', component: PaginatarefaComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },
  {
    path: 'eventosprogramados', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Eventos Programados" },
    children: [
      { path: '', component: ListaeventostempComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: GestaoeventostemporaisComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Evento Programado" } },
      { path: 'editar', component: GestaoeventostemporaisComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: GestaoeventostemporaisComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'eventos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Eventos" },
    children: [
      { path: '', component: EventoslistaComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: GestaoeventosComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão Evento" } },
      { path: 'editar', component: GestaoeventosComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } }]
  },
  { path: 'grid', component: ListaComponent, canActivate: [LoginService], data: { breadcrumb: "Grid" } },
  { path: 'cartelas', component: CartelasComponent, canActivate: [LoginService], data: { breadcrumb: "Cartelas" } },
  { path: 'analisesjasper', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Análises Jasper" } },
  { path: 'gestaobanhos_relatorios', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatórios Gestão" } },
  { path: 'reclamacoes_relatorios', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatórios Gestão" } },
  { path: 'lmep_relatorios', component: ViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatórios Gestão" } },
  { path: 'configjasper', component: ConfComponent, canActivate: [LoginService], data: { breadcrumb: "Configurações Jasper" } },
  { path: 'parametrosraks', component: ParametrosRaksComponent, canActivate: [LoginService], data: { breadcrumb: "Parâmetros Raks" } },
  { path: 'listagem', component: ListagemManutencoesComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções Ativas" } },
  { path: 'analiseconsumos', component: AnaliseconsumosComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Consumos" } },
  { path: 'analiseconsumosetiquetas', component: AnaliseconsumosetiquetasComponent, canActivate: [LoginService], data: { breadcrumb: "Análise Consumos por Etiquetas" } },

  { path: 'rejeicoes', component: RejeicoesComponent, canActivate: [LoginService], data: { breadcrumb: "Rejeições" } },
  { path: 'tiposreclamacoes', component: TiposreclamacoesComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Reclamações" } },
  { path: 'dictarefas', component: GTDICTarefasComponent, canActivate: [LoginService], data: { breadcrumb: "Tarefas" } },
  { path: 'dictiposacao', component: TipoAcaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Ação" } },
  { path: 'grausimportancia', component: GrausimportanciaComponent, canActivate: [LoginService], data: { breadcrumb: "Graus de Importância" } },
  { path: 'classificacao', component: ClassificacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Classificação" } },
  { path: 'tipologia', component: TipologiaComponent, canActivate: [LoginService], data: { breadcrumb: "Tipologia" } },
  { path: 'tiposdefeito', component: TiposdefeitoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Defeito" } },
  { path: 'ficheirosanalise', component: FicheirosanaliseComponent, canActivate: [LoginService], data: { breadcrumb: "Ficheiros de Análise" } },
  { path: 'temposresposta', component: TemposrespostaComponent, canActivate: [LoginService], data: { breadcrumb: "Tempos de Resposta" } },
  { path: 'tiposnaodetecao', component: TiponaodetecaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos Não Deteção" } },
  { path: 'tiposocorrencia', component: TipoocorrenciaComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos Ocorrência" } },
  { path: 'departamentos', component: DepartamentosComponent, canActivate: [LoginService], data: { breadcrumb: "Departamentos" } },
  { path: 'cacifos', component: CacifosComponent, canActivate: [LoginService], data: { breadcrumb: "Cacifos" } },
  { path: 'tiposcacifos', component: TipoCacifosComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Cacifo" } },
  { path: 'cacifos_p', component: CacifosComponent, canActivate: [LoginService], data: { breadcrumb: "Cacifos" } },
  { path: 'tiposcacifos_p', component: TipoCacifosComponent, canActivate: [LoginService], data: { breadcrumb: "Tipos de Cacifo" } },
  { path: 'locais', component: LocaisComponent, canActivate: [LoginService], data: { breadcrumb: "Locais" } },
  { path: 'feriados', component: FeriadosComponent, canActivate: [LoginService], data: { breadcrumb: "Feriados" } },


  {
    path: 'reclamacoesclientes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamações Cliente" },
    children: [
      { path: '', component: ListareclamacoesclientesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamação Cliente" } },
      { path: 'duplicar', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Duplicar" } },
      { path: 'editar', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ReclamacaoCliente8DComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'reclamacoesfornecedores', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamações Fornecedor" },
    children: [
      { path: '', component: ListareclamacoesfornecedoresComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Reclamação Fornecedor" } },
      { path: 'duplicar', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Duplicar" } },
      { path: 'editar', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ReclamacaoFornecedorComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'seguranca_trabalho', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Segurança no Trabalho" },
    children: [
      { path: '', component: ModuloSegurancaTrabalhoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: RelatoriosOcorrenciasComponent, canActivate: [LoginService], data: { breadcrumb: "Relatórios de Ocorrências" } },
      { path: 'editar', component: RelatoriosOcorrenciasComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: RelatoriosOcorrenciasComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'seccoes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Secções" },
    children: [
      { path: '', component: ListaSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "Secção" } },
      { path: 'editar', component: FormSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormSeccoesComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'grupos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Grupos" },
    children: [
      { path: '', component: ListaGruposComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormGruposComponent, canActivate: [LoginService], data: { breadcrumb: "Grupo" } },
      { path: 'editar', component: FormGruposComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormGruposComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'gestao_barras', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Gestão de Barras" },
    children: [
      { path: '', component: GestaoBarrasComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: GestaoBarrasComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: GestaoBarrasComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: GestaoBarrasComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'reunioes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Fichas de Reunião" },
    children: [
      { path: '', component: ReunioesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ReunioesFormComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: ReunioesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ReunioesFormComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'ambitos_reunioes', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Âmbitos de Reuniões" },
    children: [
      { path: '', component: AmbitosReunioesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FormAmbitosReunioesComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: FormAmbitosReunioesComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FormAmbitosReunioesComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'equipamentos_manutencao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Equipamentos" },
    children: [
      { path: '', component: EquipamentosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FichaEquipamentoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: FichaEquipamentoComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FichaEquipamentoComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  { path: 'edificios', component: EdificiosComponent, canActivate: [LoginService], data: { breadcrumb: "Edifícios" } },
  { path: 'pisos', component: PisosComponent, canActivate: [LoginService], data: { breadcrumb: "Pisos" } },
  { path: 'divisoes', component: DivisoesComponent, canActivate: [LoginService], data: { breadcrumb: "Divisões" } },
  { path: 'equipasmanutencao', component: EquipasManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "Divisões" } },
  { path: 'ficha_manutencao', component: FichaManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "Ficha Manutenção" } },
  {
    path: 'lista_pedidos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Lista de Pedido de Manutenção" },
    children: [
      { path: '', component: ListaPedidosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: FichaManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'editar', component: FichaManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: FichaManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }
    ]
  },

  /**comercial contratos */
  {
    path: 'comercial_contratos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Contratos" },
    children: [
      { path: '', component: ContratoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ContratoFormComponent, canActivate: [LoginService], data: { breadcrumb: "Contrato" } },
      { path: 'editar', component: ContratoFormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ContratoFormComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'comercial_referencias', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Referências" },
    children: [
      { path: '', component: ReferenciasComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ReferenciasFormComponent, canActivate: [LoginService], data: { breadcrumb: "Referência" } },
      { path: 'editar', component: ReferenciasFormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ReferenciasFormComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'comercial_acordos', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Acordos" },
    children: [
      { path: '', component: AcordosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: AcordosFormComponent, canActivate: [LoginService], data: { breadcrumb: "Acordo" } },
      { path: 'editar', component: AcordosFormComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: AcordosFormComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },

  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });

@NgModule({
  declarations: [
    AppComponent,
    ReunioesFormComponent,
    AmbitosReunioesComponent,
    FormAmbitosReunioesComponent,
    ReunioesComponent,
    LoginComponent,
    RodapeComponent,
    CabecalhoComponent,
    MenuComponent,
    HomeComponent,
    RouterComponent,
    FornecedoresComponent,
    TinasComponent,
    FormComponent,
    FormaPlaneamento,
    TinasformComponent,
    ComponentesComponent,
    CompformComponent,
    UtilizadoresComponent,
    UtlformComponent,
    BanhosComponent,
    BanhosformComponent,
    ControlosComponent,
    PerfilComponent,
    ConfiguracoesComponent,
    RegistoanalisesComponent,
    RegistoformComponent,
    ManutencaoComponent,
    ManutencaoformComponent,
    LinhasComponent,
    UnidadesmedidaComponent,
    ZonasComponent,
    TurnosComponent,
    TipoadicaoComponent,
    TipomanutenacaoComponent,
    TipooperacaoComponent,
    RegistoparametrosComponent,
    RegistoparaformComponent,
    RelatorioViewerComponent,
    ArmazensComponent,
    GestaoeventosComponent,
    EventoslistaComponent,
    HistoricoAnalisesComponent,
    TiposOcorrenciaComponent,
    ListaComponent,
    ConfComponent,
    HeaderComponent,
    ViewerComponent,
    HeaderGroupComponent,
    HistoricoManutencoesComponent,
    ParametrosComponent,
    GestaoTarefasComponent,
    FormTarefasComponent,
    ConstrucaoBanhosComponent,
    ConstbanhosformComponent,
    GestaoBanhosComponent,
    ManutencaoReposicaoComponent,
    ManutecaoReposicaoformComponent,
    ManutencaoNaoProgramadaComponent,
    MantencaoNaoProgramadafromComponent,
    ParametrosRaksComponent,
    CartelasComponent,
    CalendarioComponent,
    ListagemManutencoesComponent,
    AnaliseconsumosComponent,
    GestaoeventostemporaisComponent,
    ListaeventostempComponent,
    CorrecaoquantidadesComponent,
    AnaliseEtiquetasComponent,
    AnaliseconsumosetiquetasComponent,
    TarefasComponent,
    ProcessosComponent,
    ProdutosComponent,
    ReclamacaoCliente8DComponent,
    RejeicoesComponent,
    TiposreclamacoesComponent,
    GrausimportanciaComponent,
    TiposdefeitoComponent,
    FicheirosanaliseComponent,
    DepartamentosComponent,
    ListareclamacoesclientesComponent,
    TemposrespostaComponent,
    ListaSeccoesComponent,
    FormSeccoesComponent,
    FormGruposComponent,
    ListaGruposComponent,
    GTDICTarefasComponent,
    PaginatarefaComponent,
    ReclamacaoFornecedorComponent,
    ListareclamacoesfornecedoresComponent,
    TiponaodetecaoComponent,
    TipoocorrenciaComponent,
    ManutencoesFicheiroComponent,
    ControloAssiduidadeComponent,
    EstadosfuncionariosComponent,
    SectoresComponent,
    TurnosrecursosComponent,
    FuncionariosComponent,
    LocaisComponent,
    CacifosComponent,
    TipoCacifosComponent,
    PausasComponent,
    PedidosdaproducaoComponent,
    AnaliseDeRejeicoesComponent,
    ProducaoDashboardComponent,
    RelatoriosOcorrenciasComponent,
    ModuloSegurancaTrabalhoComponent,
    PlaneamentosComponent,
    PlaneamentosFormComponent,
    CapacidadeLinhaComponent,
    FeriadosComponent,
    ObjetivosPlanosComponent,
    SectoresAnaliseComponent,
    AmostrasComponent,
    AmostrasformComponent,
    TipologiaEnsaioComponent,
    ClassificacaoComponent,
    TipologiaComponent,
    ObjetivosCumprimentoFornecedorComponent,
    BarrasAlertaComponent,
    RevisoesPrioritariasComponent,
    ProducoesPrioritariasComponent,
    ObjetivosCumprimentoClienteComponent,
    ListaplanosComponent,
    AmbitosComponent,
    FormplanosComponent,
    TipoAcaoComponent,
    ListaacoesComponent,
    LoadingComponent,
    AlertaseprioridadesComponent,
    ProducaoOemComponent,
    ProducaoVeiculosComponent,
    ProducaoProgramaComponent,
    ProducaoFabricasComponent,
    ProducaoProjetosComponent,
    AnaliseencomendasComponent,
    ListaProjComponent,
    ProducaoLimitesEncomendaComponent,
    ObjetivosComponent,
    SeguimentoFaturacaoComponent,
    SeguimentoFaturacaoAnualComponent,
    FichaComponent,
    TiposDocumentoComponent,
    ListaAnalise,
    PlaneamentoProducaoComponent,
    DiasProducaoComponent,
    CapacidadeAcabamentoComponent,
    CaapcidadeRacksComponent,
    SemanasAnaliseComponent,
    PlaneamentoAnalisesComponent,
    PlameamentoAnalisesFormComponent,
    SectoresAgregadoresComponent,
    GestaoBarrasComponent,
    ValidacoesBastidoresComponent,
    ParametrosSeguimentoComponent,
    CausasAcidenteComponent,
    EpisComponent,
    AnaliseLoteFornecedorComponent,
    AuditoriasComponent,
    TipoAuditoriaComponent,
    DerrogacoesComponent,
    DerrogacoesFormComponent,
    SectoresAbsentismoComponent,
    AnaliseClientesComponent,
    FichaManutencaoComponent,
    FichaEquipamentoComponent,
    AmbitosReunioesComponent,
    FormAmbitosReunioesComponent,
    ReunioesComponent,
    ReunioesFormComponent,
    AnaliseEnviosComponent,
    EquipasManutencaoComponent,
    EdificiosComponent,
    PisosComponent,
    DivisoesComponent,
    EquipamentosComponent,
    ListaPedidosComponent,
    EvolucaoDividasComponent,
    ContratoComponent,
    ContratoFormComponent,
    ReferenciasComponent,
    ReferenciasFormComponent,
    AcordosComponent,
    AcordosFormComponent,
    AnaliseAcordosComponent,
    BusinessanalyticsComponent,
    PlaneamentoBarrasAnaliseComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataTableModule,
    Ng2MaskModule,
    SharedModule,
    DropdownModule,
    FormsModule,
    CalendarModule,
    ToggleButtonModule,
    HttpModule,
    ReactiveFormsModule,
    DialogModule,
    RadioButtonModule,
    ColorPickerModule,
    TreeModule,
    ConfirmDialogModule,
    PickListModule,
    ChartModule,
    CheckboxModule,
    MultiSelectModule,
    EditorModule,
    ListboxModule,
    FileUploadModule,
    AutoCompleteModule,
    ProgressBarModule,
    DragDropModule,
    ScheduleModule,
    OrderListModule,
    SelectButtonModule,
    PanelModule,
    OverlayPanelModule,
    TriStateCheckboxModule,
    TooltipModule,
    AgGridModule.withComponents(
      [
        HeaderGroupComponent,
        HeaderComponent,

      ]
    ),
    routing
  ],
  providers: [AppGlobals,
    LoginService,
    ConfirmationService,
    GERUTILIZADORESService,
    ABDICTINAService,
    ABDICTINAService,
    ABDICTURNOService,
    ABDICZONAService,
    ABMOVMANUTENCAOService,
    ABDICTIPOADICAOService,
    ABDICTIPOOPERACAOService,
    EmailService,
    ABDICTIPOMANUTENCAOService,
    ADMOVREGPARAMOPERACAOService,
    ABDICBANHOService,
    ABDICBANHOCOMPONENTEService,
    ABMOVMANUTENCAOCABService,
    ABMOVMANUTENCAOLINHAService,
    ABDICCOMPONENTEService,
    ABDICLINHAService,
    ABMOVANALISEService,
    ABDICBANHOADITIVOService,
    ABMOVANALISELINHAService,
    ABUNIDADADEMEDIDAService,
    GERMODULOService,
    GERPERFILLINService,
    RelatoriosService,
    GERPERFILCABService,
    GERUTZPERFILService,
    GERARMAZEMService,
    GERANALISESService,
    GEREVENTOSCONFService,
    GERPARAMETROSService,
    UploadService,
    GERVISTASService,
    RegistoProducao,
    GERCAMPOSDISPService,
    GERPOSTOSService,
    ABDICLINHAOFService,
    ABMOVMANUTENCAOETIQService,
    GEREVENTOSPROGRAMADOSService,
    RCDICTIPODEFEITOService,
    RCDICTIPORECLAMACAOService,
    RCDICREJEICAOService,
    RCDICGRAUIMPORTANCIAService,
    RCDICFICHEIROSANALISEService,
    RCMOVRECLAMACAOService,
    RCDICTEMPORESPOSTAService,
    RCMOVRECLAMACAOENVIOSGARANTIDOSService,
    RCMOVRECLAMACAOPLANOACCOESCORRETIVASService,
    RCMOVRECLAMACAOARTIGOSIMILARESService,
    RCMOVRECLAMACAOEQUIPAService,
    RCMOVRECLAMACAOFICHEIROSService,
    GERSECCAOCHEFESService,
    GERGRUPOUTZService,
    GERGRUPOService,
    GERSECCAOUTZService,
    RCDICACCOESRECLAMACAOService,
    GERSECCAOService,
    GERDEPARTAMENTOService,
    RCMOVRECLAMACAOSTOCKService,
    GTMOVTAREFASService,
    RCMOVRECLAMACAOENCOMENDASService,
    RCMOVRECLAMACAOTIPONAODETECAOService,
    RCMOVRECLAMACAOTIPOOCORRENCIAService,
    GERATUALIZACAOSILVERBITABELASService,
    RHESTADOSFUNCService,
    RHFUNCIONARIOSService,
    RHTURNOSService,
    RHSECTORESService,
    RH_EXCLUSAO_TIPO_EXTRAService,
    GERLOCAISService,
    RHDICCACIFOSService,
    RHDICTIPOCACIFOService,
    RHPAUSASService,
    RHTIPOSPAUSAService,
    PEDIDOSPRODUCAOService,
    ATTESTEMUNHASService,
    ATOCORRENCIASService,
    ATENTREVISTASService,
    ATACCOESService,
    GERFERIADOSService,
    PLANEAMENTOCABService,
    PLANEAMENTOLINHASService,
    CAPACIDADELINHAService,
    TIPOSOCORRENCIAService,
    PRDICOBJETIVOSPLANOSService,
    PRDICSECTORESANALISEService,
    PRDICTIPOLOGIAENSAIOService,
    PRAMOSTRASCABService,
    PRAMOSTRASACCOESService,
    RCDICTIPOLOGIAService,
    RCDICCLASSIFICACAOService,
    RCMOVRECLAMACAOFORNECEDORService,
    RCMOVRECLAMACAOFICHEIROSFORNECEDORService,
    LGDICOBJETIVOSService,
    PRPRODUCOESPRIORITARIASService,
    PRREVISOESPRIORITARIASService,
    PRBARRASALERTAService,
    PAMOVCABService,
    GTMOVFICHEIROSService,
    PAMOVLINHAService,
    PAMOVFICHEIROSService,
    PADICAMBITOSService,
    FICHEIROSPAGINASService,
    PEDIDOSAPPService,
    GTDICTIPOACAOService,
    GERDEPARTAMENTOSSECTORESService,
    DashboardService,
    GERDICOEMService,
    GERDICFABRICAService,
    GERDICPROGRAMAService,
    GERDICPROJCABService,
    GERDICPROJREFService,
    GERDICPROJFABService,
    GERDICVEICULOService,
    GERFORNECEDORService,
    GERDICLIMITESENCOMENDAService,
    FINDICOBJETIVOSService,
    FINANALISEDIVIDASService,
    FINDICTIPODOCService,
    FINDICCLIENTESService,
    FINDOCACORDOService,
    FINREGISTOACOESService,
    FINDIVIDASATIVIDADEService,
    PRDICSEMANASANALISEService,
    PRDICCAPACIDADERACKSService,
    PRDICCAPACIDADEACABAMENTOService,
    PRDICPRODUCAOSEMANAService,
    PRPLANEAMENTOPRODUCAOLINHASService,
    PRPLANEAMENTOPRODUCAOCABService,
    PRDICSECTORESAGREGADORESLINHAService,
    PRDICSECTORESAGREGADORESService,
    PRPLANEAMENTOPRODUCAOANALISESService,
    PRPLANEAMENTOPRODUCAOANALISESRECURSOSHUMANOSService,
    PRGESTAOBARRASREFERENCIASService,
    PRGESTAOBARRASService,
    PRDICVALIDACAOBASTIDORService,
    GERFAVORITOSService,
    FINSEGUIMENTOFATURACAOANUALService,
    FINDICPARAMETROSSEGUIMENTOService,
    ATDICCAUSASACIDENTEService,
    RHDICEPIService,
    RCMOVRECLAMACAOCLIENTESService,
    QUADICTIPOSAUDITORIAQTDPREVISTAService,
    QUADICTIPOSAUDITORIAService,
    QUAMOVAUDITORIASService,
    QUADERROGACOESService,
    GERREFERENCIASFASTRESPONSEREJEICOESService,
    RHDICSECTORESABSENTISMOService,
    RHDICSECTORESABSENTISMOLINHAService,
    COANALISECLIENTESOBSERVACOESService,
    COANALISECLIENTESQUANTIDADEService,
    COANALISECLIENTESACCOESService,
    COANALISECLIENTESService,
    QUADERROGACOESACOESService,
    QUADERROGACOESFICHEIROSService,
    QUADERROGACOESPLANOSACCOESService,
    QUADERROGACOESEQUIPAService,
    REUAMBITOSREUNIOESService,
    REUAMBITOSREUNIOESPARTICIPANTESService,
    REUREUNIOESService,
    REUREUNIOESPARTICIPANTESService,
    REUREUNIOESFICHEIROSService,
    FICHEIROTNTService,
    MANDICPISOSService,
    MANDICEDIFICIOSService,
    MANDICEQUIPASService,
    MANDICEQUIPASUTILIZADORESService,
    MANDICDIVISOESService,
    MANMOVMANUTENCAOEQUIPAMENTOSService,
    MANMOVMANUTENCAODOCUMENTOSService,
    MANMOVMANUTENCAODADOSCOMPRAService,
    MANMOVMANUTENCAOCOMPONENTESService,
    MANMOVMANUTENCAOPLANOSService,
    MANMOVMANUTENCAOCONTRATOSSUPORTEService,
    MANMOVMANUTENCAOGRAUSIMPORTANCIAService,
    MANMOVPEDIDOSService,
    MANMOVPEDIDOSDOCUMENTOSService,
    MANMOVMANUTENCAOANEXOSService,
    COMACORDOSService,
    COMACORDOSACTIVIDADESService,
    COMACORDOSAMORTIZACOESService,
    COMACORDOSANEXOSService,
    COMACORDOSHISTORICOService,
    COMACORDOSLTAService,
    COMACORDOSPRECOSService,
    COMACORDOSVOLUMESService,
    COMCONTRATOSService,
    COMREFERENCIASService,
    COMREFERENCIASSILVERService,
    [{ provide: LOCALE_ID, useValue: 'pt' }]],
  bootstrap: [AppComponent],

})
export class AppModule { }
