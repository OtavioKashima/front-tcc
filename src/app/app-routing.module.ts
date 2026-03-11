// app-routing.module.ts CORRIGIDO

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Rotas que NÃO TÊM a barra de tabs
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage)
  },

  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then(m => m.RegistroPage)
  },  

  // ROTA PRINCIPAL QUE CARREGA O LAYOUT DE TABS
  // Todas as páginas com tabs (adocoes, perfil, etc.) virão DESTE módulo
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },

  // Redirecionamento padrão do app
  {
    path: '',
    redirectTo: 'home', // Ou 'login', dependendo da sua lógica de app
    pathMatch: 'full'
  },

  {
    path: 'recuperar-senha',
    loadChildren: () => import('./recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule)
  },  {
    path: 'adocao-detalhe',
    loadChildren: () => import('./adocao-detalhe/adocao-detalhe.module').then( m => m.AdocaoDetalhePageModule)
  },
  {
    path: 'comentario',
    loadChildren: () => import('./comentario/comentario.module').then( m => m.ComentarioPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'postagem',
    loadChildren: () => import('./postagem/postagem.module').then( m => m.PostagemPageModule)
  }


  // As rotas 'adocoes', 'doacoes', 'perfil', 'denuncias' FORAM REMOVIDAS DAQUI
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}