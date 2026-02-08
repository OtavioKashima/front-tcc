import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {

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

  // Validação do email em tempo real
  validarEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = !emailRegex.test(this.email);
  }

  registrar() {
    // Validação campos obrigatórios
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
}
