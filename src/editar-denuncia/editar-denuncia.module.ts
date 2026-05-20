import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditarDenunciaPageRoutingModule } from './editar-denuncia-routing.module';
import { EditarDenunciaPage } from './editar-denuncia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarDenunciaPageRoutingModule
  ],
  declarations: [EditarDenunciaPage]
})
export class EditarDenunciaPageModule {}