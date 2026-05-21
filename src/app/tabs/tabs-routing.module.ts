

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '', 
    component: TabsPage,
    children: [
      {
        path: 'adocoes', 
        loadChildren: () => import('../adocoes/adocoes.module').then(m => m.AdocoesPageModule)
      },
      {
        path: 'doacoes', 
        loadChildren: () => import('../doacoes/doacoes.module').then(m => m.DoacoesPageModule)
      },
      {
        path: 'denuncias',
        loadChildren: () => import('../denuncias/denuncias.module').then( m => m.DenunciasPageModule)
      },
      {
        path: 'perfil', 
        loadChildren: () => import('../perfil/perfil.module').then(m => m.PerfilPageModule)
      },
      {
        
        path: '',
        redirectTo: 'adocoes', 
        pathMatch: 'full'
      }
    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}