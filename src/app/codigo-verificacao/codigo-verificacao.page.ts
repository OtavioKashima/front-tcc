import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-codigo-verificacao',
  templateUrl: './codigo-verificacao.page.html',
  styleUrls: ['./codigo-verificacao.page.scss'],
  standalone: false
})
export class CodigoVerificacaoPage implements OnInit {

  codigo: string = '';
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  // 'cadastro'   → vai para /login após verificar
  // 'recuperacao' → vai para /nova-senha após verificar
  origem: string = 'cadastro';
  email: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state;

    if (state) {
      this.origem = state['origem'] || 'cadastro';
      this.email  = state['email']  || '';
    }
  }

  goToRecuperar() {
    if (this.origem === 'recuperacao') {
      this.router.navigate(['/recuperar-senha']);
    } else {
      this.router.navigate(['/registro']);
    }
  }

  verificarCodigo() {
    this.mensagemErro = '';
    this.mensagemSucesso = '';

    if (!this.codigo) {
      this.mensagemErro = 'Digite o código!';
      setTimeout(() => { this.mensagemErro = ''; }, 3000);
      return;
    }

    // ── Aqui você pode chamar sua API para validar o código ──
    // this.http.post('/verificar', { email: this.email, codigo: this.codigo })

    this.mensagemSucesso = 'Código confirmado!';

    setTimeout(() => {
      this.mensagemSucesso = '';

      if (this.origem === 'recuperacao') {
        // Veio da recuperação de senha → redefine senha
        this.router.navigate(['/nova-senha'], {
          state: { email: this.email }
        });
      } else {
        // Veio do cadastro → vai direto pro login
        this.router.navigate(['/login']);
      }

    }, 2000);
  }

  reenviarCodigo() {
    this.mensagemErro = '';
    this.mensagemSucesso = 'Código reenviado para seu email!';
    setTimeout(() => { this.mensagemSucesso = ''; }, 3000);

    // ── Aqui você pode chamar sua API para reenviar ──
    // this.http.post('/reenviar-codigo', { email: this.email })
  }
}