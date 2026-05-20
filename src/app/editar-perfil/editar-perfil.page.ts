import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController, AlertController } from '@ionic/angular';

export interface Usuario {
  nome: string;
  avatar: string;
  telefone?: string;
  email?: string;
}

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: false
})
export class EditarPerfilPage implements OnInit {

  usuario: Usuario = {
    nome: '',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    telefone: '',
    email: '',
  };

  form = {
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  };

  avatarPreview: string | null = null;
  mostrarSenha = false;
  mostrarConfirmarSenha = false;
  salvando = false;
  emailInvalido = false;
  senhasNaoCoincidem = false;

  private navState: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.navState = nav?.extras?.state ?? null;
  }

  ngOnInit(): void {
    const state = this.navState ?? history.state;
    if (state?.usuario) {
      this.usuario = state.usuario;
    }
    this.form.nome = this.usuario.nome ?? '';
    this.form.telefone = this.usuario.telefone ?? '';
    this.form.email = this.usuario.email ?? '';
  }

  onAvatarSelecionado(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { this.avatarPreview = reader.result as string; };
    reader.readAsDataURL(file);
  }

  maskTelefone(): void {
    this.form.telefone = this.form.telefone
      .replace(/\D/g, '')
      .replace(/^(\d{2})(\d)/g, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  validarEmail(): void {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.emailInvalido = this.form.email ? !regex.test(this.form.email) : false;
  }

  validarSenhas(): void {
    this.senhasNaoCoincidem =
      this.form.confirmarSenha.length > 0 &&
      this.form.senha !== this.form.confirmarSenha;
  }

  async salvar(): Promise<void> {
    if (!this.form.nome.trim()) {
      await this.mostrarToast('O nome não pode estar vazio.', 'warning');
      return;
    }

    if (this.emailInvalido) {
      await this.mostrarToast('Informe um e-mail válido.', 'warning');
      return;
    }

    if (this.form.senha && this.form.senha.length < 8) {
      await this.mostrarToast('A senha deve ter no mínimo 8 caracteres.', 'warning');
      return;
    }

    if (this.form.senha !== this.form.confirmarSenha) {
      await this.mostrarToast('As senhas não coincidem.', 'warning');
      return;
    }

    this.salvando = true;
    await new Promise(resolve => setTimeout(resolve, 800));
    this.salvando = false;

    const usuarioAtualizado: Usuario = {
      nome: this.form.nome.trim(),
      avatar: this.avatarPreview ?? this.usuario.avatar,
      telefone: this.form.telefone.trim(),
      email: this.form.email.trim(),
    };

    await this.mostrarToast('Perfil atualizado com sucesso!', 'success');

    this.navCtrl.navigateBack(['/perfil'], {
      state: { usuarioAtualizado }
    });
  }

  async confirmarDeletar(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Deletar conta',
      message: 'Tem certeza que deseja deletar sua conta? Esta ação não pode ser desfeita.',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Deletar',
          role: 'destructive',
          handler: () => { this.mostrarToast('Conta deletada.', 'danger'); }
        }
      ]
    });
    await alert.present();
  }

  goBack(): void {
    this.navCtrl.back();
  }

  private async mostrarToast(message: string, color: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
      position: 'bottom'
    });
    await toast.present();
  }
}