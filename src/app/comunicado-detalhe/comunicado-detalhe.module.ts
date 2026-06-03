import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComunicadoDetalhePageRoutingModule } from './comunicado-detalhe-routing.module';

import { ComunicadoDetalhePage } from './comunicado-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComunicadoDetalhePageRoutingModule
  ],
  declarations: [ComunicadoDetalhePage]
})
export class ComunicadoDetalhePageModule {}
