import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.page.html',
  styleUrls: ['./nova-senha.page.scss'],
  standalone: false
})
export class NovaSenhaPage {

  novaSenha: string = '';
  confirmarSenha: string = '';
  mensagemErro: string = ''; // <-- mensagem para mostrar abaixo dos campos

  constructor(private navCtrl: NavController) {}

  goToCodigo() {
    this.navCtrl.back();
  }

  redefinirSenha() {
    this.mensagemErro = ''; // limpa mensagem antes de validar

    if (!this.novaSenha || !this.confirmarSenha) {
      this.mensagemErro = 'Preencha todos os campos.';
      return;
    }

    if (this.novaSenha !== this.confirmarSenha) {
      this.mensagemErro = 'As senhas não coincidem.';
      return;
    }

    // Simulação de sucesso
    this.mensagemErro = 'Senha redefinida com sucesso!';
    // Aqui você chamaria seu serviço de backend para atualizar a senha
    // e depois redirecionar, se quiser:
    // this.navCtrl.navigateRoot('/login');
  }

}