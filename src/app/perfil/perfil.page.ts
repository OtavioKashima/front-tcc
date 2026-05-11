import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, AlertController } from '@ionic/angular';

export type TipoRole = 'ong' | 'usuario';
export type StatusDenuncia = 'pendente' | 'em_analise' | 'resolvido';

export interface Postagem {
  id: string;
  titulo: string;
  tag?: string;
  data: string;
  imagem: string;
  descricao: string;
  salvos: number;
  comentarios: number;
}

export interface PostagemAdocao extends Postagem {
  disponivel: boolean;
}

export interface PostagemDenuncia extends Postagem {
  status: StatusDenuncia;
}

export interface Usuario {
  nome: string;
  avatar: string;
  role: TipoRole;
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {

  abaAtiva: 'denuncias' | 'adocoes' = 'denuncias';

  usuario: Usuario = {
    nome: 'Benito Martins',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    role: 'ong', // 'usuario' para usuário comum
  };

  get isOng(): boolean {
    return this.usuario.role === 'ong';
  }

  adocoes: PostagemAdocao[] = [
    {
      id: 'a1',
      titulo: 'Gato - Macho',
      tag: 'Filhote',
      data: 'há 2 dias',
      imagem: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_640.jpg',
      descricao: 'A gata da minha irmã deu cria. Estamos doando os filhotinhos, são saudáveis!',
      disponivel: true,
      salvos: 8,
      comentarios: 3,
    },
    {
      id: 'a2',
      titulo: 'Cachorra Golden - Fêmea',
      tag: 'Adulto',
      data: 'há 5 dias',
      imagem: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400',
      descricao: 'Dona viajou para o exterior e não pode mais cuidar. Golden vacinada e castrada.',
      disponivel: false,
      salvos: 21,
      comentarios: 11,
    },
  ];

  denuncias: PostagemDenuncia[] = [
    {
      id: 'd1',
      titulo: 'Ajuda com Remédios',
      tag: 'SOS',
      data: 'há 1 semana',
      imagem: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
      descricao: 'Tenho o Thor desde filhote e agora está velhinho. Não consigo mais arcar com os remédios.',
      status: 'pendente',
      salvos: 14,
      comentarios: 7,
    },
    {
      id: 'd2',
      titulo: 'Maus-tratos — Bairro Sul',
      tag: 'Urgente',
      data: 'há 3 dias',
      imagem: 'https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=400',
      descricao: 'Vizinho deixa cachorro no sol sem água. Animal visivelmente desnutrido e com feridas.',
      status: 'em_analise',
      salvos: 5,
      comentarios: 2,
    },
  ];

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    // Carregar usuário logado e definir role:
    // this.authService.getUsuario().then(u => {
    //   this.usuario = u;
    //   this.abaAtiva = this.isOng ? 'adocoes' : 'denuncias';
    // });
  }

  mudarAba(aba: 'denuncias' | 'adocoes') {
    this.abaAtiva = aba;
  }

  statusLabel(status: StatusDenuncia): string {
    const labels: Record<StatusDenuncia, string> = {
      pendente: 'Pendente',
      em_analise: 'Em análise',
      resolvido: 'Resolvido',
    };
    return labels[status] ?? status;
  }

  async menuPostagem(post: Postagem, tipo: 'adocao' | 'denuncia') {
    const alert = await this.alertCtrl.create({
      header: post.titulo,
      buttons: [
        { text: '✏️ Editar', handler: () => this.editarPostagem(post) },
        {
          text: '🗑 Excluir',
          role: 'destructive',
          handler: () => this.excluirPostagem(post, tipo),
        },
        { text: 'Cancelar', role: 'cancel' },
      ],
    });
    await alert.present();
  }

  editarPostagem(post: Postagem) {
    this.navCtrl.navigateForward(`/editar-postagem/${post.id}`);
  }

  async excluirPostagem(post: Postagem, tipo: 'adocao' | 'denuncia') {
    const alert = await this.alertCtrl.create({
      header: 'Excluir postagem',
      message: `Deseja excluir "${post.titulo}"? Essa ação não pode ser desfeita.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            if (tipo === 'adocao') {
              this.adocoes = this.adocoes.filter(p => p.id !== post.id);
            } else {
              this.denuncias = this.denuncias.filter(p => p.id !== post.id);
            }
          },
        },
      ],
    });
    await alert.present();
  }

  goBack() { this.location.back(); }
  editarPerfil() { this.navCtrl.navigateForward('/editar-perfil'); }
}