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

  private API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  // =========================
  // Navegação
  // =========================

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  goToCadastroPage() {
    this.navCtrl.navigateRoot('/registro');
  }

  goToTabsPage() {
    this.navCtrl.navigateRoot('/tabs');
  }

  goToRecuperarSenha() {
    this.mostrarToast('Tela de recuperação ainda não implementada.');
  }

  // =========================
  // Máscaras
  // =========================

  somenteNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  maskCPF() {
    this.usuario = this.usuario
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  // =========================
  // Login
  // =========================

  async login() {

    if (!this.usuario || !this.senha) {
      this.mostrarToast('Preencha todos os campos.');
      return;
    }

    this.http.post<any>(`${this.API_URL}/login`, {
      identificador: this.usuario,
      senha: this.senha
    }).subscribe({
      next: async (res) => {
        localStorage.setItem('token', res.token);
        await this.mostrarToast('Login realizado com sucesso!');
        this.navCtrl.navigateRoot('/tabs');
      },
      error: async (err) => {
        if (err.status === 401) {
          this.mostrarToast('Credenciais inválidas.');
        } else {
          this.mostrarToast('Erro ao conectar com servidor.');
        }
      }
    });
  }

  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: 'primary'
    });
    toast.present();
  }
}