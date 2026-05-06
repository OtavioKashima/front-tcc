import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Denuncia {
  titulo: string;
  imagem: string;
  descricao: string;
  tipo?: string;
  status?: string;
  local?: string;
  dataFormatada?: string;
  dataISO?: string;
  tipoAnimal?: string;
  usuario?: {
    nome: string;
    avatar: string;
    cidade: string;
    whatsapp?: string;
  };
}

interface Usuario {
  nome: string;
  avatar: string;
  cidade: string;
  whatsapp?: string;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
  standalone: false,
})
export class PerfilUsuarioPage implements OnInit {

  usuario: Usuario = {
    nome: '',
    avatar: '',
    cidade: ''
  };

  denunciasUsuario: Denuncia[] = [];

  // Lista completa de denúncias — idealmente viria de um serviço compartilhado
  todasDenuncias: Denuncia[] = [
    {
      titulo: 'Não seja enganado',
      imagem: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_640.jpg',
      descricao: 'Meu vizinho se diz dono de um abrigo de animais, o que é pura fachada, ele pede dinheiro mas não ajuda os animais.',
      tipo: 'Fraude',
      status: 'Aberta',
      local: 'São Paulo, SC',
      dataFormatada: '01/05/2025',
      dataISO: '2025-05-01',
      tipoAnimal: 'cachorro',
      usuario: { nome: 'João Silva', avatar: 'https://i.pravatar.cc/150?img=1', cidade: 'São Paulo, SC' }
    },
    {
      titulo: 'Veneno na comida',
      imagem: 'https://www.petz.com.br/blog/wp-content/uploads/2018/12/intoxicacao-alimentar-em-pet.jpg',
      descricao: 'Ultimamente eu e meus vizinhos percebemos várias mortes de animais na rua, tanto animais domésticos quanto de rua.',
      tipo: 'Envenenamento',
      status: 'Em Análise',
      local: 'Campinas, SC',
      dataFormatada: '03/05/2025',
      dataISO: '2025-05-03',
      tipoAnimal: 'gato',
      usuario: { nome: 'Maria Souza', avatar: 'https://i.pravatar.cc/150?img=5', cidade: 'Campinas, SC' }
    },
    {
      titulo: 'Maus tratos',
      imagem: 'https://aguaslindasdegoias.go.gov.br/wp-content/uploads/2022/05/animais-maus-tratos.jpg',
      descricao: 'Eu peguei o cachorro do meu vizinho pra mim pelo simples motivo de que ele não cuidava do animal.',
      tipo: 'Maus-tratos',
      status: 'Resolvida',
      local: 'Ribeirão Preto, SC',
      dataFormatada: '05/05/2025',
      dataISO: '2025-05-05',
      tipoAnimal: 'cachorro',
      usuario: { nome: 'Carlos Oliveira', avatar: 'https://i.pravatar.cc/150?img=8', cidade: 'Ribeirão Preto, SC' }
    },
    {
      titulo: 'Cachorro preso sem água',
      imagem: 'https://cdn.pixabay.com/photo/2017/03/27/14/56/dog-2178696_640.jpg',
      descricao: 'Um cachorro está preso no quintal há dias sem acesso à água ou comida.',
      tipo: 'Maus-tratos',
      status: 'Aberta',
      local: 'Botucatu, SC',
      dataFormatada: '12/05/2025',
      dataISO: '2025-05-12',
      tipoAnimal: 'cachorro',
      usuario: { nome: 'Bruna Martins', avatar: 'https://i.pravatar.cc/150?img=40', cidade: 'Botucatu, SC' }
    },
    {
      titulo: 'Gatos abandonados em caixa',
      imagem: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_640.jpg',
      descricao: 'Filhotes de gato foram deixados dentro de uma caixa na rua.',
      tipo: 'Abandono',
      status: 'Em Análise',
      local: 'Jaú, SC',
      dataFormatada: '13/05/2025',
      dataISO: '2025-05-13',
      tipoAnimal: 'gato',
      usuario: { nome: 'Diego Rocha', avatar: 'https://i.pravatar.cc/150?img=45', cidade: 'Jaú, SC' }
    },
    {
      titulo: 'Cavalo sendo maltratado',
      imagem: 'https://cdn.pixabay.com/photo/2016/11/29/09/16/horse-1868532_640.jpg',
      descricao: 'Um cavalo está sendo usado para trabalho pesado sem descanso e em condições ruins.',
      tipo: 'Maus-tratos',
      status: 'Aberta',
      local: 'Avaré, SC',
      dataFormatada: '14/05/2025',
      dataISO: '2025-05-14',
      tipoAnimal: 'coelho',
      usuario: { nome: 'Ricardo Lopes', avatar: 'https://i.pravatar.cc/150?img=50', cidade: 'Avaré, SC' }
    },
    {
      titulo: 'Cães vivendo em ambiente insalubre',
      imagem: 'https://cdn.pixabay.com/photo/2016/02/19/11/19/dog-1207810_640.jpg',
      descricao: 'Diversos cães estão vivendo em local sujo, com fezes acumuladas e sem higiene.',
      tipo: 'Maus-tratos',
      status: 'Em Análise',
      local: 'Lençóis Paulista, SC',
      dataFormatada: '15/05/2025',
      dataISO: '2025-05-15',
      tipoAnimal: 'cachorro',
      usuario: { nome: 'Patrícia Gomes', avatar: 'https://i.pravatar.cc/150?img=55', cidade: 'Lençóis Paulista, SC' }
    },
    {
      titulo: 'Venda ilegal de animais silvestres',
      imagem: 'https://cdn.pixabay.com/photo/2016/03/27/21/16/parrot-1283600_640.jpg',
      descricao: 'Pessoas estão vendendo aves silvestres sem autorização em feira local.',
      tipo: 'Tráfico de animais',
      status: 'Aberta',
      local: 'Bauru, SC',
      dataFormatada: '16/05/2025',
      dataISO: '2025-05-16',
      tipoAnimal: 'ave',
      usuario: { nome: 'Lucas Fernandes', avatar: 'https://i.pravatar.cc/150?img=60', cidade: 'Bauru, SC' }
    },
    {
      titulo: 'Cachorro ferido sem atendimento',
      imagem: 'https://cdn.pixabay.com/photo/2016/11/22/19/15/dog-1850465_640.jpg',
      descricao: 'Um cachorro está com ferimentos graves e sem nenhum tipo de cuidado.',
      tipo: 'Negligência',
      status: 'Aberta',
      local: 'São Manuel, SC',
      dataFormatada: '17/05/2025',
      dataISO: '2025-05-17',
      tipoAnimal: 'cachorro',
      usuario: { nome: 'Marcos Vinicius', avatar: 'https://i.pravatar.cc/150?img=65', cidade: 'São Manuel, SC' }
    }
  ];

  constructor(private navCtrl: NavController, private router: Router) {}

  ngOnInit(): void {
    const state = this.router.getCurrentNavigation()?.extras?.state as { usuario: Usuario };
    if (state?.usuario) {
      this.usuario = state.usuario;
      this.denunciasUsuario = this.todasDenuncias.filter(
        d => d.usuario?.nome === this.usuario.nome
      );
    }
  }

  voltar(): void {
    this.navCtrl.back();
  }

  abrirDetalhe(denuncia: Denuncia): void {
    this.navCtrl.navigateForward('/denuncia-detalhe', { state: { denuncia } });
  }
}