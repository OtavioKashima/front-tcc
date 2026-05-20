import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

interface Denuncia {
  id: string;
  titulo: string;
  imagem: string;
  descricao: string;
  tipo: string;
  categoria: string;
  status: string;
  local: string;
  dataFormatada: string;
  usuario: {
    id?: string;
    nome: string;
    avatar: string;
    cidade: string;
    bio?: string;
    totalDenuncias?: number;
  };
}

@Component({
  selector: 'app-editar-denuncia',
  templateUrl: './editar-denuncia.page.html',
  styleUrls: ['./editar-denuncia.page.scss'],
  standalone: false
})
export class EditarDenunciaPage implements OnInit {

  denuncia!: Denuncia;

  form = {
    titulo: '',
    descricao: '',
    local: '',
    imagem: ''
  };

  imagemPreview: string | null = null;
  salvando = false;

  private navState: any;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.navState = nav?.extras?.state ?? null;
  }

  ngOnInit(): void {
    const state = this.navState ?? history.state;

    if (state?.denuncia) {
      this.denuncia = state.denuncia;
      this.form = {
        titulo: this.denuncia.titulo,
        descricao: this.denuncia.descricao,
        local: this.denuncia.local,
        imagem: this.denuncia.imagem
      };
    } else {
      this.navCtrl.back();
    }
  }

  onImagemSelecionada(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagemPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  async salvar(): Promise<void> {
    if (!this.form.titulo.trim()) {
      await this.mostrarToast('O título não pode estar vazio.', 'warning');
      return;
    }

    this.salvando = true;

    await new Promise(resolve => setTimeout(resolve, 800));

    const denunciaAtualizada: Denuncia = {
      ...this.denuncia,
      titulo: this.form.titulo.trim(),
      descricao: this.form.descricao.trim(),
      local: this.form.local.trim(),
      imagem: this.imagemPreview ?? this.form.imagem
    };

    this.salvando = false;

    await this.mostrarToast('Denúncia atualizada com sucesso!', 'success');

    this.navCtrl.navigateBack(['/perfil'], {
      state: { denunciaAtualizada }
    });
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