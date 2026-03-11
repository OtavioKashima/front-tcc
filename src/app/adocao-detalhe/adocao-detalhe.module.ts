import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdocaoDetalhePageRoutingModule } from './adocao-detalhe-routing.module';

import { AdocaoDetalhePage } from './adocao-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdocaoDetalhePageRoutingModule
  ],
  declarations: [AdocaoDetalhePage]
})
export class AdocaoDetalhePageModule {}
