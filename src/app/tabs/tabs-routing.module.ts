// tabs.routing.module.ts CORRIGIDO

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '', // Vazio, pois o AppRoutingModule já definiu o path '/tabs'
    component: TabsPage,
    children: [
      {
        path: 'adocoes', // Rota completa: /tabs/adocoes
        loadChildren: () => import('../adocoes/adocoes.module').then(m => m.AdocoesPageModule)
      },
      {
        path: 'doacoes', // Rota completa: /tabs/doacoes
        loadChildren: () => import('../doacoes/doacoes.module').then(m => m.DoacoesPageModule)
      },
      {
        path: 'denuncias', // Rota completa: /tabs/denuncias
        loadChildren: () => import('../denuncias/denuncias.module').then( m => m.DenunciasPageModule)
      },
      {
        path: 'perfil', // Rota completa: /tabs/perfil
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        // Redirecionamento padrão DENTRO das tabs
        path: '',
        redirectTo: 'adocoes', // Ao navegar para /tabs, redireciona para /tabs/adocoes
        pathMatch: 'full'
      }
    ]
  }
  // O redirecionamento { path: '', redirectTo: '/tabs/...', ... } foi removido daqui
  // O redirecionamento principal agora está no app-routing.module.ts
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}