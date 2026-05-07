import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PerfilUsuarioDetalhePageRoutingModule } from './perfil-usuario-detalhe-routing.module';
import { PerfilUsuarioDetalhePage } from './perfil-usuario-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilUsuarioDetalhePageRoutingModule
  ],
  declarations: [PerfilUsuarioDetalhePage]
})
export class PerfilUsuarioDetalhePageModule {}