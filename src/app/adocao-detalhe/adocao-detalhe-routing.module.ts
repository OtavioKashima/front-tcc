import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdocaoDetalhePage } from './adocao-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: AdocaoDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdocaoDetalhePageRoutingModule {}
