import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Home', icon: 'dashboard', class: '', acesso: [{ leitura: false, alterar: true, apagar: true }] },
    { path: 'fornecedor', title: 'Fornecedores', icon: 'person', class: '', acesso: [{ leitura: true, alterar: true, apagar: true }] },
    { path: 'tinas', title: 'Tinas', icon: 'content_paste', class: '', acesso: [{ leitura: true, alterar: true, apagar: true }] },
    { path: 'typography', title: 'Banhos', icon: 'library_books', class: '', acesso: [{ leitura: true, alterar: true, apagar: true }] },
    { path: 'icons', title: 'Icons', icon: 'bubble_chart', class: '', acesso: [{ leitura: true, alterar: true, apagar: true }] },
    { path: 'maps', title: 'Aditivos', icon: 'location_on', class: '', acesso: [{ leitura: true, alterar: true, apagar: true }] },
    { path: 'notifications', title: 'Notifications', icon: 'notifications', class: '', acesso: [{ leitura: true, alterar: true, apagar: true }] },
    { path: 'upgrade', title: 'Sair', icon: 'unarchive', class: 'active-pro', acesso: [{ leitura: true, alterar: true, apagar: true }] },
];
