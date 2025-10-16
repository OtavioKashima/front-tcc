import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  constructor(private navCtrl: NavController) {}

  goToLogin() {
    this.navCtrl.navigateForward('/login');
  }

  goToRegistration() {
    this.navCtrl.navigateForward('/registro');
  }
}
