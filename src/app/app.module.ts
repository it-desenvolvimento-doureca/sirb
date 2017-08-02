import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
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
import { DataTableModule, SharedModule, ConfirmDialogModule, ConfirmationService, DropdownModule, CalendarModule, DialogModule, ColorPickerModule, RadioButtonModule, TreeNode, TreeModule, ChartModule } from 'primeng/primeng';
import { AppGlobals } from "app/menu/sidebar.metadata";
import { FormComponent } from './paginas/fornecedores/form/form.component';
import { FormsModule } from "@angular/forms";
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
      { path: 'novo', component: RegistoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'manutencao', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenções" },
    children: [
      { path: '', component: ManutencaoComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Manutenção" } },
      { path: 'editar', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: ManutencaoformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  {
    path: 'registopara', component: RouterComponent, canActivate: [LoginService], data: { breadcrumb: "Reg. Parâm. de Operações" },
    children: [
      { path: '', component: RegistoparametrosComponent, canActivate: [LoginService], data: { breadcrumb: "" } },
      { path: 'view', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Reg. Parâm. de Operação" } },
      { path: 'editar', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Editar" } },
      { path: 'novo', component: RegistoparaformComponent, canActivate: [LoginService], data: { breadcrumb: "Novo" } }]
  },
  { path: 'perfil/view', component: PerfilComponent, canActivate: [LoginService], data: { breadcrumb: "Perfil" } },
  { path: 'config', component: ConfiguracoesComponent, canActivate: [LoginService], data: { breadcrumb: "Configurações" } },
  { path: 'unidades', component: UnidadesmedidaComponent, canActivate: [LoginService], data: { breadcrumb: "Unidade de Medida" } },
  { path: 'linhas', component: LinhasComponent, canActivate: [LoginService], data: { breadcrumb: "Linhas" } },
  { path: 'zonas', component: ZonasComponent, canActivate: [LoginService], data: { breadcrumb: "Zonas" } },
  { path: 'turnos', component: TurnosComponent, canActivate: [LoginService], data: { breadcrumb: "Turnos" } },
  { path: 'adicoes', component: TipoadicaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Adição" } },
  { path: 'manutencoes', component: TipomanutenacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Manutenção" } },
  { path: 'operacoes', component: TipooperacaoComponent, canActivate: [LoginService], data: { breadcrumb: "Tipo Operação" } },
  { path: 'perfil/editar', component: PerfilComponent, canActivate: [LoginService], data: { breadcrumb: "Perfil" } },
  { path: 'relatorio', component: RelatorioViewerComponent, canActivate: [LoginService], data: { breadcrumb: "Relatório" } },
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

export const routing = RouterModule.forRoot(routes);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RodapeComponent,
    CabecalhoComponent,
    MenuComponent,
    HomeComponent,
    RouterComponent,
    FornecedoresComponent,
    TinasComponent,
    FormComponent,
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
    RelatorioViewerComponent
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
    HttpModule,
    DialogModule,
    RadioButtonModule,
    ColorPickerModule,
    TreeModule,
    ConfirmDialogModule,
    ChartModule,
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
    RelatoriosService,
    GERFORNECEDORService],
  bootstrap: [AppComponent]
})
export class AppModule { }
