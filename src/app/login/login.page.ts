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

  goToCadastroPage() {
    // Navega para a tela de Login (Tab 2)
    this.navCtrl.navigateForward('/registro');
  }

  goToLoginPage() {
    // Navega para a tela de Login (Tab 2)
    this.navCtrl.navigateForward('/login');

  }

  goToHome(){
    this.navCtrl.navigateForward('/home');
  }

  goToAdocoes(){
    this.navCtrl.navigateForward('/adocoes');
  }

}
