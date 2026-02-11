import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
  standalone: false
})
export class RecuperarSenhaPage {

  cpf: string = '';
  email: string = '';
  emailInvalido: boolean = false;

  constructor(private router: Router) {}

  // Voltar para a Home
  goToHome() {
    this.router.navigate(['/home']);
  }

  // Validação e máscara CPF
  maskCPF() {
    let v = this.cpf.replace(/\D/g, '');

    if(v.length > 11) v = v.slice(0, 11);

    if(v.length > 9) {
      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    } else if(v.length > 6) {
      v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if(v.length > 3) {
      v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    }

    this.cpf = v;
  }

  somenteNumeros(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if(charCode < 48 || charCode > 57) event.preventDefault();
  }

  // Validação simples de email
  validarEmail() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = !regex.test(this.email);
  }

  // Função de recuperação de senha
  recuperarSenha() {
    if(!this.cpf || !this.email) {
      alert('Preencha CPF e Email!');
      return;
    }

    if(this.emailInvalido) {
      alert('Informe um email válido!');
      return;
    }

    // Aqui você chamaria a API de recuperação de senha
    alert('Se o CPF e Email estiverem corretos, você receberá instruções no email.');
  }

}
