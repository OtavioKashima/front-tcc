import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilOngPageRoutingModule } from './perfil-ong-routing.module';

import { PerfilOngPage } from './perfil-ong.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilOngPageRoutingModule
  ],
  declarations: [PerfilOngPage]
})
export class PerfilOngPageModule {}
