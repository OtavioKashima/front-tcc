import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilOngPage } from './perfil-ong.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilOngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilOngPageRoutingModule {}
