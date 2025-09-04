import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(private navCtrl: NavController) {}

  goToLoginPage() {
    // Navega de volta para a Tab 1. Ajuste a rota se necessário.
    this.navCtrl.navigateBack('/tabs/tab1');
  }

}
