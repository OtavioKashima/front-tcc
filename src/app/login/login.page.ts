import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {

  usuario: string = ''; // aqui será o CPF
  senha: string = '';

  private API_URL = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    if (!this.usuario || !this.senha) {
      alert('Preencha CPF e senha!');
      return;
    }

    const dados = { usuario: this.usuario, senha: this.senha };

    this.http.post<any>(this.API_URL, dados).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/adocoes']); // ir para página de adocoes
      },
      error: (err) => {
        alert(err.error.message || 'CPF ou senha inválidos');
      }
    });
  }

maskCPF() {
  // Remove tudo que não é número
  let v = this.usuario.replace(/\D/g, '');

  // Limita a 11 dígitos
  if(v.length > 11) {
    v = v.slice(0, 11);
  }

  // Adiciona a formatação: 000.000.000-00
  if(v.length > 9) {
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  } else if(v.length > 6) {
    v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else if(v.length > 3) {
    v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }

  this.usuario = v;
}


  goToHome() {
    this.router.navigate(['/home']);
  }

  goToCadastroPage() {
    this.router.navigate(['/registro']);
  }

}