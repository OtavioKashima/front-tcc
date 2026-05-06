import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DenunciaDetalhePage } from './denuncia-detalhe.page';

const routes: Routes = [
  { path: '', component: DenunciaDetalhePage }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DenunciaDetalhePageRoutingModule {}