import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

export interface Denuncia {
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

export interface Usuario {
  nome: string;
  avatar: string;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  usuario: Usuario = {
    nome: 'Benedito Gomes',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  denuncias: Denuncia[] = [
    {
      id: 'd1',
      titulo: 'Ajuda com Remédios',
      imagem: 'https://www.santelaboratorio.com.br/wp-content/uploads/2018/03/remedio_cachorro4.jpg',
      descricao: 'Tenho o Thor desde filhote e agora está velhinho. Não consigo mais arcar com os remédios do tratamento.',
      tipo: 'Negligência',
      categoria: 'Animal',
      status: 'pendente',
      local: 'Joinville, SC',
      dataFormatada: 'há 1 semana',
      usuario: {
        id: 'u1',
        nome: 'Benedito Gomes',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        cidade: 'Joinville, SC',
        bio: 'Amante dos animais.',
        totalDenuncias: 2,
      },
    },
    {
      id: 'd2',
      titulo: 'Maus tratos',
      imagem: 'https://blog-static.petlove.com.br/wp-content/uploads/2022/06/cachorro-maus-tratos-Petlove.jpg',
      descricao: 'Vizinho deixa cachorro no sol sem água. Animal visivelmente desnutrido e com feridas.',
      tipo: 'Maus-tratos',
      categoria: 'Animal',
      status: 'em_analise',
      local: 'Joinville, SC',
      dataFormatada: 'há 3 dias',
      usuario: {
        id: 'u1',
        nome: 'Benedito Gomes',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        cidade: 'Joinville, SC',
        bio: 'Amante dos animais.',
        totalDenuncias: 2,
      },
    },
  ];

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit(): void {}

  ionViewWillEnter(): void {
    const state = history.state;

    if (state?.denunciaAtualizada) {
      this.aplicarEdicaoDenuncia(state.denunciaAtualizada);
    }

    if (state?.usuarioAtualizado) {
      this.aplicarEdicaoUsuario(state.usuarioAtualizado);
    }
  }

  private aplicarEdicaoDenuncia(denunciaAtualizada: Denuncia): void {
    const idx = this.denuncias.findIndex(d => d.id === denunciaAtualizada.id);
    if (idx !== -1) {
      this.denuncias[idx] = denunciaAtualizada;
      this.denuncias = [...this.denuncias];
      this.mostrarToast('Denúncia atualizada!');
    }
  }

  private aplicarEdicaoUsuario(usuarioAtualizado: Usuario): void {
    this.usuario = { ...this.usuario, ...usuarioAtualizado };
    this.mostrarToast('Perfil atualizado!');
  }

  abrirDenuncia(denuncia: Denuncia): void {
    this.navCtrl.navigateForward(['/denuncia-detalhe'], {
      state: { denuncia }
    });
  }

  editarDenuncia(post: Denuncia): void {
    this.navCtrl.navigateForward(['/editar-denuncia'], {
      state: { denuncia: post }
    });
  }

  excluirDenuncia(post: Denuncia): void {
    this.denuncias = this.denuncias.filter(d => d.id !== post.id);
  }

  // Passa o usuario atual para a tela de edição
  editarPerfil(): void {
    this.navCtrl.navigateForward('/editar-perfil', {
      state: { usuario: this.usuario }
    });
  }

  private async mostrarToast(message: string): Promise<void> {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }
}