import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComunicadoDetalhePage } from './comunicado-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: ComunicadoDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComunicadoDetalhePageRoutingModule {}
