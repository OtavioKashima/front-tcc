import { Component } from '@angular/core';
<<<<<<< HEAD
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
>>>>>>> origin/main

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class RegistroPage {

<<<<<<< HEAD
  nome: string = '';
  cpf: string = '';
  telefone: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  emailInvalido: boolean = false;

  private API_URL = 'http://localhost:3000/auth/register';

  constructor(private navCtrl: NavController, private http: HttpClient) {}

  goToLoginPage() { this.navCtrl.navigateBack('/login'); }
  goToHome(){ this.navCtrl.navigateForward('/home'); }

  validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = !emailRegex.test(this.email);
  }

  registrar() {

    if (!this.nome || !this.cpf || !this.telefone || !this.email || !this.senha) {
      alert('Preencha todos os campos!');
      return;
    }

    if (this.nome.length > 50) {
      alert('Nome deve ter no máximo 50 caracteres!');
      return;
    }

    if (this.senha !== this.confirmarSenha) {
      alert('As senhas não conferem!');
      return;
    }

    if (this.emailInvalido) {
      alert('Digite um e-mail válido!');
      return;
    }

    const dados = {
      nome: this.nome,
      cpf: this.cpf,
      telefone: this.telefone,
      email: this.email,
      senha: this.senha
    };

    this.http.post<any>(this.API_URL, dados).subscribe({
      next: (res) => {
        alert(res.message);
        this.navCtrl.navigateBack('/login');
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message || 'Erro ao cadastrar');
      }
    });
  }

  maskCPF() {
    this.cpf = this.cpf.replace(/\D/g, '');
    this.cpf = this.cpf.replace(/(\d{3})(\d)/, '$1.$2');
    this.cpf = this.cpf.replace(/(\d{3})(\d)/, '$1.$2');
    this.cpf = this.cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  maskTelefone() {
    this.telefone = this.telefone.replace(/\D/g, '');
    this.telefone = this.telefone.replace(/^(\d{2})(\d)/, '($1)$2');
    this.telefone = this.telefone.replace(/(\d{5})(\d)/, '$1-$2');
  }

  // 🔒 BLOQUEIO DE LETRAS (ADICIONADO)
  somenteNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;

=======
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
>>>>>>> origin/main
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

<<<<<<< HEAD
}
=======
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
>>>>>>> origin/main
