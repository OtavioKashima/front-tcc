import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage {

  usuario: string = '';
  senha: string = '';
  showPassword: boolean = false;

  private API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  // Navegação
  goToHome() { this.navCtrl.navigateRoot('/home'); }
  goToCadastroPage() { this.navCtrl.navigateRoot('/registro'); }
  goToRecuperarSenha() { this.navCtrl.navigateForward('/recuperar-senha'); }

  // Máscaras e Validações
  somenteNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) event.preventDefault();
  }

  maskCPF() {
    this.usuario = this.usuario
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  // Login com feedback visual
  async login() {
    if (!this.usuario || !this.senha) {
      this.mostrarToast('Por favor, preencha todos os campos.', 'erro');
      return;
    }

    this.http.post<any>(`${this.API_URL}/login`, {
      identificador: this.usuario,
      senha: this.senha
    }).subscribe({
      next: async (res) => {
        localStorage.setItem('token', res.token);
        await this.mostrarToast('Bem-vindo(a) de volta!', 'sucesso');
        this.navCtrl.navigateRoot('/tabs');
      },
      error: async (err) => {
        const msg = err.status === 401 ? 'CPF ou senha incorretos.' : 'Erro ao conectar com o servidor.';
        this.mostrarToast(msg, 'erro');
      }
    });
  }

  // Toast customizado para o App
  async mostrarToast(mensagem: string, tipo: 'sucesso' | 'erro') {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 3000,
      position: 'top', // Melhor visibilidade em mobile (evita o teclado)
      cssClass: tipo === 'sucesso' ? 'toast-sucesso' : 'toast-erro',
      buttons: [{ icon: 'close', role: 'cancel' }]
    });
    await toast.present();
  }
}