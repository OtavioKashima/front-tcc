import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController, AlertController } from '@ionic/angular';

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
    nome: 'Benito Martins',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  denuncias: Denuncia[] = [
    {
      id: 'd1',
      titulo: 'Ajuda com Remédios',
      imagem: 'https://inovaveterinaria.com.br/wp-content/uploads/2017/09/vermifugo-para-cachorros-e-gatos-1024x703-1.jpg',
      descricao: 'Tenho o Thor desde filhote e agora está velhinho. Não consigo mais arcar com os remédios do tratamento.',
      tipo: 'Negligência',
      categoria: 'Animal',
      status: 'pendente',
      local: 'Joinville, SC',
      dataFormatada: 'há 1 semana',
      usuario: {
        id: 'u1',
        nome: 'Benito Martins',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        cidade: 'Joinville, SC',
        bio: 'Amante dos animais.',
        totalDenuncias: 2,
      },
    },
    {
      id: 'd2',
      titulo: 'Maus tratos ',
      imagem: 'https://blog-static.petlove.com.br/wp-content/uploads/2022/06/cachorro-maus-tratos-Petlove.jpg',
      descricao: 'Vizinho deixa cachorro no sol sem água. Animal visivelmente desnutrido e com feridas.',
      tipo: 'Maus-tratos',
      categoria: 'Animal',
      status: 'em_analise',
      local: 'Joinville, SC',
      dataFormatada: 'há 3 dias',
      usuario: {
        id: 'u1',
        nome: 'Benito Martins',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        cidade: 'Joinville, SC',
        bio: 'Amante dos animais.',
        totalDenuncias: 2,
      },
    },
  ];

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {
    // this.authService.getUsuario().then(u => this.usuario = u);
  }

  abrirDenuncia(denuncia: Denuncia): void {
    this.navCtrl.navigateForward(['/denuncia-detalhe'], {
      state: { denuncia }
    });
  }

  async editarDenuncia(post: Denuncia) {
    const alert = await this.alertCtrl.create({
      header: 'Editar denúncia',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: post.titulo,
          placeholder: 'Título',
        },
        {
          name: 'descricao',
          type: 'textarea',
          value: post.descricao,
          placeholder: 'Descrição',
        },
      ],
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Salvar',
          handler: (data) => {
            const idx = this.denuncias.findIndex(d => d.id === post.id);
            if (idx !== -1) {
              this.denuncias[idx] = {
                ...this.denuncias[idx],
                titulo: data.titulo,
                descricao: data.descricao,
              };
              this.denuncias = [...this.denuncias];
            }
          },
        },
      ],
    });
    await alert.present();
  }

  async excluirDenuncia(post: Denuncia) {
    const alert = await this.alertCtrl.create({
      header: 'Excluir denúncia',
      message: `Deseja excluir "${post.titulo}"? Essa ação não pode ser desfeita.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {
            this.denuncias = this.denuncias.filter(d => d.id !== post.id);
          },
        },
      ],
    });
    await alert.present();
  }

  goBack(): void { this.location.back(); }
  editarPerfil(): void { this.navCtrl.navigateForward('/editar-perfil'); }
}