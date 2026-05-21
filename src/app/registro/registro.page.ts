import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage {

  nome = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';
  emailInvalido = false;

  showSenha = false;
  showConfirmarSenha = false;

  fotoSelecionada: File | null = null;

  private API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  goToLoginPage() {
    this.navCtrl.navigateRoot('/login');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  somenteNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  maskTelefone() {
    this.telefone = this.telefone
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = this.email ? !regex.test(this.email) : false;
  }

  selecionarFoto(event: any) {
    this.fotoSelecionada = event.target.files[0];
  }

  async registrar() {
    if (!this.nome.trim()) {
      this.mostrarToast('Informe seu nome de usuário.');
      return;
    }

    if (!this.email.trim() || this.emailInvalido) {
      this.mostrarToast('Informe um e-mail válido.');
      return;
    }

    if (this.senha.length < 8) {
      this.mostrarToast('A senha deve ter no mínimo 8 caracteres.');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      this.mostrarToast('As senhas não coincidem.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('email', this.email);
    formData.append('telefone', this.telefone);
    formData.append('senha', this.senha);

    if (this.fotoSelecionada) {
      formData.append('foto_perfil', this.fotoSelecionada);
    }

    this.http.post<any>(`${this.API_URL}/usuarios`, formData)
      .subscribe({
        next: async () => {
         
          this.http.post<any>(`${this.API_URL}/usuarios/enviar-verificacao`, { email: this.email })
            .subscribe({
              next: async () => {
                await this.mostrarToast('Código de verificação enviado para seu e-mail!');
                
                this.navCtrl.navigateForward('/codigo-verificacao', {
                  state: { email: this.email }
                });
              },
              error: async () => {
             
                await this.mostrarToast('Cadastro realizado! Verifique seu e-mail.');
                this.navCtrl.navigateForward('/codigo-verificacao', {
                  state: { email: this.email }
                });
              }
            });
        },
        error: async (err) => {
          if (err.status === 409) {
            this.mostrarToast('Usuário já cadastrado.');
          } else {
            this.mostrarToast('Erro ao realizar cadastro.');
          }
        }
      });
  }

  async mostrarToast(mensagem: string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 2000,
      color: 'light',
      cssClass: 'toast-custom'
    });
    toast.present();
  }
}