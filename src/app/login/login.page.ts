import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
  
})
export class LoginPage {

  constructor(private navCtrl: NavController) {}

  goToLogin() {
    // Navega para a tela de Login (Tab 2)
    this.navCtrl.navigateForward('/tabs/tab2');
  }

  goToRegistration() {
    // Navega para a tela de Cadastro (Tab 3)
    this.navCtrl.navigateForward('/registro');
  }
}
