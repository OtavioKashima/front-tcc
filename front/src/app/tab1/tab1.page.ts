import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  constructor(private navCtrl: NavController) {}

  goToLogin() {
    // Navega para a tela de Login (Tab 2)
    this.navCtrl.navigateForward('/tabs/tab2');
  }

  goToRegistration() {
    // Navega para a tela de Cadastro (Tab 3)
    this.navCtrl.navigateForward('/tabs/tab3');
  }
}
