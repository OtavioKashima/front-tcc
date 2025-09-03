import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tela1',
  templateUrl: './tela1.page.html',
  styleUrls: ['./tela1.page.scss'],
  standalone: true,           // ✅ componente standalone
  imports: [CommonModule, IonicModule] // módulos que você precisa
})
export class Tela1Page {}
