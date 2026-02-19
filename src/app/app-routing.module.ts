import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'adocoes',
    loadChildren: () =>
      import('./adocoes/adocoes.module').then(m => m.AdocoesPageModule)
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then(m => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule)
  },

  {
    path: 'registro',
    loadChildren: () =>
      import('./registro/registro.module').then(m => m.RegistroPageModule)
  },

  {
    path: 'doacoes',
    loadChildren: () =>
      import('./doacoes/doacoes.module').then(m => m.DoacoesPageModule)
  },

  {
    path: 'perfil',
    loadChildren: () =>
      import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },

  // rota coringa caso algo dê errado
  {
    path: '**',
    redirectTo: 'adocoes'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
