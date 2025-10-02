import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { LoginPage } from './login/login.page';
import { RegistroPage } from './registro/registro.page';
import { AdocoesPage } from './adocoes/adocoes.page';
import { DoacoesPage } from './doacoes/doacoes.page';
import { PerfilPage } from './perfil/perfil.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'adocoes',
    loadChildren: () => import('./adocoes/adocoes.module').then( m => m.AdocoesPageModule)
  },
  {
    path: 'doacoes',
    loadChildren: () => import('./doacoes/doacoes.module').then( m => m.DoacoesPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

const tela1teste: Routes = [
  {
    path: './src/app/login/login.page.html',
    component: LoginPage, 
  },
  {
    path: './src/app/registro/registro.page.html',
    component: RegistroPage,
  },
  {
    path: './src/app/adocoes/adocoes.page.html',
    component: AdocoesPage,
  },
  {
    path: './src/app/doacoes/doacoes.page.html',
    component: DoacoesPage,
  },
  {
    path: './src/app/perfil/perfil.page.html',
    component: PerfilPage,
  },
];