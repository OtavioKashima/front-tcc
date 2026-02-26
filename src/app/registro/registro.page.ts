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
  cpf = '';
  email = '';
  telefone = '';
  senha = '';
  confirmarSenha = '';
  emailInvalido = false;

  fotoSelecionada: File | null = null;

  private API_URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  // =========================
  // Navegação
  // =========================
  goToLoginPage() {
    this.navCtrl.navigateRoot('/login');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home');
  }

  // =========================
  // Máscaras e validações
  // =========================

  somenteNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  maskCPF() {
    this.cpf = this.cpf
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
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

  // =========================
  // Registro
  // =========================
  async registrar() {

    if (this.senha !== this.confirmarSenha) {
      this.mostrarToast('As senhas não coincidem.');
      return;
    }

    if (this.emailInvalido) {
      this.mostrarToast('Email inválido.');
      return;
    }

    const formData = new FormData();
    formData.append('nome', this.nome);
    formData.append('cpf', this.cpf);
    formData.append('email', this.email);
    formData.append('telefone', this.telefone);
    formData.append('senha', this.senha);

    if (this.fotoSelecionada) {
      formData.append('foto_perfil', this.fotoSelecionada);
    }

    this.http.post<any>(`${this.API_URL}/usuarios`, formData)
      .subscribe({
        next: async () => {
          await this.mostrarToast('Cadastro realizado com sucesso!');
          this.navCtrl.navigateRoot('/login');
        },
        error: async (err) => {
          if (err.status === 409) {
            this.mostrarToast('Usuário já cadastrado.');
          } else {
            this.mostrarToast(err);
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