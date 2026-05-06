import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DenunciaDetalhePageRoutingModule } from './denuncia-detalhe-routing.module';
import { DenunciaDetalhePage } from './denuncia-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DenunciaDetalhePageRoutingModule
  ],
  declarations: [DenunciaDetalhePage]
})
export class DenunciaDetalhePageModule {}