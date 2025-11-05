// app-routing.module.ts CORRIGIDO

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // Rotas que NÃO TÊM a barra de tabs
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
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
  }
  // As rotas 'adocoes', 'doacoes', 'perfil', 'denuncias' FORAM REMOVIDAS DAQUI
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}