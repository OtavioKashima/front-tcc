import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { Tela1Page } from '../app/tela1/tela1.page';

const routes: Routes = [
  { path: '', redirectTo: 'tela1', pathMatch: 'full' },
  { path: 'tela1', component: Tela1Page }, // ✅ componente standalone
  // adicione outras rotas aqui
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
