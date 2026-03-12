import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
  standalone: false
})
export class RecuperarSenhaPage {

  email: string = '';
  emailInvalido: boolean = false;

  constructor(private router: Router) {}

  // Voltar para login
  goToLogin() {
    this.router.navigate(['/login']);
  }

  validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = !regex.test(this.email);
  }

  recuperarSenha() {

    if(!this.email) {
      alert('Digite seu email!');
      return;
    }

    if(this.emailInvalido) {
      alert('Informe um email válido!');
      return;
    }

    alert('Código enviado para seu email!');

    this.router.navigate(['/codigo-verificacao']);
  }

}