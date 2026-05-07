import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilUsuarioDetalhePage } from './perfil-usuario-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilUsuarioDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  
})
export class PerfilUsuarioDetalhePageRoutingModule {}