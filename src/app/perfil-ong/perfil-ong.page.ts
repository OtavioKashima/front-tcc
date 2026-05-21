import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Ong {
  nome: string;
  avatar: string;
  cidade: string;
  descricao: string;
  whatsapp?: string;
  chatId?: string;
}

interface Postagem {
  titulo: string;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
  raca: string;
  genero: string;
  idade: string;
  saved: boolean;
}

interface Denuncia {
  titulo: string;
  imagem: string;
  descricao: string;
  autor: string;
  tempo: string;
  local: string;
  dataFormatada: string;
  usuario: {
    nome: string;
    avatar: string;
    cidade: string;
  };
}

@Component({
  selector: 'app-perfil-ong',
  templateUrl: './perfil-ong.page.html',
  styleUrls: ['./perfil-ong.page.scss'],
  standalone: false
})
export class PerfilOngPage implements OnInit {

  tabAtiva: 'adocoes' | 'denuncias' = 'adocoes';

  ong: Ong = {
    nome: 'Frada',
    avatar: 'https://adotar.com.br/uploadadm/logo_ong4041.jpg?w=410&format=webp',
    cidade: 'Joinville, SC',
    descricao: 'A Frada é uma organização sem fins lucrativos dedicada ao resgate, cuidado e adoção responsável de animais abandonados. Atuamos desde 2018 em Joinville, promovendo o bem-estar animal e a consciência sobre adoção.',
    whatsapp: '5547999999999',
    chatId: 'frada-joinville'
  };

  postagens: Postagem[] = [
    {
      titulo: 'Cachorro - Macho',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb2Qltwwrje9Xn8bpmcqYvqOoMuAoRwNH-UA&s',
      descricao: 'Rex tem 2 anos, é vacinado e castrado. Muito dócil e brincalhão, adora crianças e outros animais.',
      descricaoCompleta: 'Rex tem 2 anos, é vacinado, castrado e vermifugado. Muito dócil e brincalhão, adora crianças e convive bem com outros animais. Já é adaptado a andar de coleira e obedece comandos básicos. Está pronto para encontrar um lar cheio de amor!',
      raca: 'SRD',
      genero: 'Macho',
      idade: '2 anos',
      saved: false
    },
    {
      titulo: 'Gata - Fêmea',
      imagem: 'https://adimax.com.br/wp-content/uploads/2022/12/gata-no-cio.jpg',
      descricao: 'Mimi tem 1 ano, é calma e carinhosa. Ótima para apartamento, já adaptada à vida em casa.',
      descricaoCompleta: 'Mimi tem 1 ano, é calma, carinhosa e perfeita para apartamento. Já adaptada à vida em casa, vacinada e castrada. Adora colo e se dá bem com pessoas de todas as idades. Espera por um lar tranquilo e cheio de afeto.',
      raca: 'SRD',
      genero: 'Fêmea',
      idade: '1 ano',
      saved: false
    }
  ];

  denuncias: Denuncia[] = [
    {
      titulo: 'Maus tratos',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEdcxF0dPONUPVqD8AnnwlCgbnvQASDcNmSw&s',
      descricao: 'Cachorro preso sem água ou comida há dias em apartamento na Rua XV de Novembro.',
      autor: 'Maria S.',
      tempo: 'Há 2 horas',
      local: 'Rua XV de Novembro, Joinville',
      dataFormatada: 'Hoje, 10:30',
      usuario: {
        nome: 'Maria S.',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTwcDKNEeRMNkDDy9lf1XUjZ2DtlHPiGWzlw&s',
        cidade: 'Joinville, SC'
      }
    },
    {
      titulo: 'Animal ferido',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOLnUCsFIAPc0RiP15VfNbMRArx80u9JE_ew&s',
      descricao: 'Gato laranja com pata machucada encontrado próximo à entrada do parque.',
      autor: 'João P.',
      tempo: 'Há 5 horas',
      local: 'Parque Municipal, Joinville',
      dataFormatada: 'Hoje, 07:15',
      usuario: {
        nome: 'João P.',
        avatar: 'https://s2-gshow.glbimg.com/dnpswqI0JAydxGEbyGy-T9FrZB8=/0x0:520x439/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_e84042ef78cb4708aeebdf1c68c6cbd6/internal_photos/bs/2023/P/x/XnTxT4SCAbr7oVhdlA6g/rege-instagram.jpg',
        cidade: 'Joinville, SC'
      }
    },
    {
      titulo: 'Abandono',
      imagem: 'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/12/cachorro-abandonado.jpg?w=1200&h=1200&crop=1',
      descricao: 'Filhotes de gato abandonados em caixa de papelão no bairro Boa Vista.',
      autor: 'Ana C.',
      tempo: 'Ontem',
      local: 'Bairro Boa Vista, Joinville',
      dataFormatada: 'Ontem, 18:00',
      usuario: {
        nome: 'Ana C.',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkJcH09tV8MrYOW7vcKfl9kne8DFrvtsqmgg&s',
        cidade: 'Joinville, SC'
      }
    }
  ];

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['ong']) {
      this.ong = nav.extras.state['ong'];
    } else if (history.state?.ong) {
      this.ong = history.state.ong;
    }
  }

  abrirChat(): void {
    this.navCtrl.navigateForward(['/chat-ong'], {
      state: { ong: this.ong }
    });
  }

  goBack(): void {
    this.navCtrl.back();
  }


  compartilharOng(): void {
    if (navigator.share) {
      navigator.share({
        title: this.ong.nome,
        text: this.ong.descricao,
        url: window.location.href
      }).catch(err => console.error('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  abrirDetalhe(post: Postagem): void {
    this.navCtrl.navigateForward(['/adocao-detalhe'], {
      state: {
        pet: {
          titulo: post.titulo,
          imagem: post.imagem,
          descricao: post.descricao,
          descricaoCompleta: post.descricaoCompleta,
          raca: post.raca,
          genero: post.genero,
          idade: post.idade
        }
      }
    });
  }

  abrirDenuncia(denuncia: Denuncia): void {
    this.navCtrl.navigateForward(['/denuncia-detalhe'], {
      state: { denuncia }
    });
  }

  compartilhar(post: Postagem): void {
    if (navigator.share) {
      navigator.share({
        title: post.titulo,
        text: post.descricao,
        url: window.location.href
      });
    }
  }

  compartilharDenuncia(denuncia: Denuncia): void {
    if (navigator.share) {
      navigator.share({
        title: denuncia.titulo,
        text: denuncia.descricao,
        url: window.location.href
      });
    }
  }

  salvar(post: Postagem): void {
    post.saved = !post.saved;
    this.postagens.sort((a, b) => (b.saved ? 1 : 0) - (a.saved ? 1 : 0));
  }
}