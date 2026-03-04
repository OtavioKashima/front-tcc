import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

<<<<<<< HEAD:src/app/login/login.module.ts
import { LoginPageRoutingModule } from './login-routing.module';
import { LoginPage } from './login.page';
=======
import { DenunciasPageRoutingModule } from './denuncias-routing.module';

import { DenunciasPage } from './denuncias.page';
>>>>>>> origin/main:src/app/denuncias/denuncias.module.ts

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DenunciasPageRoutingModule
  ],
<<<<<<< HEAD:src/app/login/login.module.ts
  declarations: [LoginPage]  // ✅ Modo antigo
=======
  declarations: [DenunciasPage]
>>>>>>> origin/main:src/app/denuncias/denuncias.module.ts
})
export class DenunciasPageModule {}
