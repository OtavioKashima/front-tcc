import { Component } from '@angular/core';
import { NavController } from '@ionic/angular'; // Importe o NavController

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage  {

  // 1. Injete o NavController no construtor
  constructor(private navCtrl: NavController) {}

  // 2. Crie a função de navegação para a página de login
  goToLoginPage() {
    // Este método navega de volta para a rota da sua Tab1 (Login)
    // Se a sua estrutura de rotas for diferente, ajuste o caminho
    this.navCtrl.navigateBack('/login'); 
  }
  goToCadastroPage() {
    // Navega para a página de login
    this.navCtrl.navigateBack('/login');
  }

}