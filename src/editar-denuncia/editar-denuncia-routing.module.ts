import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarDenunciaPage } from './editar-denuncia.page';

const routes: Routes = [
  {
    path: '',
    component: EditarDenunciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarDenunciaPageRoutingModule {}