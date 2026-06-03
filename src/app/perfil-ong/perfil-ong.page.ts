import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { Platform, ToastController } from '@ionic/angular';

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

interface Comunicado {
  titulo: string;
  texto: string;
  tipo: string;
  icone: string;
  tempo: string;
  imagem: string;
  dataFormatada: string;
  local: string;
}

interface CardDoacao {
  titulo: string;
  descricao: string;
  imagem: string;
  tags: string;
}

@Component({
  selector: 'app-perfil-ong',
  templateUrl: './perfil-ong.page.html',
  styleUrls: ['./perfil-ong.page.scss'],
  standalone: false
})
export class PerfilOngPage implements OnInit {

  tabAtiva: 'adocoes' | 'denuncias' | 'comunicados' | 'chat' = 'adocoes';

  // Controle do modal de doação
  doacaoAberta = false;

  // Doações
  valoresRapidos = [10, 25, 50, 100];
  valorSelecionado: number | null = 50;
  valorDoacao: number | null = 50;
  processando = false;
  private chavePix = '12.282.452/0001-92';

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

  comunicados: Comunicado[] = [
    {
      titulo: 'Feirão de Adoção',
      texto: 'Neste sábado, dia 07/06, realizaremos nosso feirão mensal de adoção no Parque Municipal das Crianças das 9h às 14h. Venha conhecer nossos animais e levar um amigo para casa!',
      tipo: 'Evento',
      icone: 'calendar-outline',
      tempo: 'Há 1 dia',
      imagem: 'https://midias.diariodepernambuco.com.br/static/app/noticia_127983242361/2020/04/17/825933/20200417104610761816i.jpg',
      dataFormatada: 'Sábado, 07/06/2025 · 9h às 14h',
      local: 'Parque Municipal das Crianças, Joinville'
    },
    {
      titulo: 'Campanha de Vacinação ',
      texto: 'Encerramos com sucesso nossa campanha de vacinação de agosto. Foram 47 animais vacinados graças ao apoio dos nossos doadores. Muito obrigada a todos!',
      tipo: 'Resultado',
      icone: 'checkmark-circle-outline',
      tempo: 'Há 3 dias',
      imagem: 'https://cobasiblog.blob.core.windows.net/production-ofc/2022/07/AdobeStock_254690460.webp',
      dataFormatada: 'Terça-feira, 03/06/2025',
      local: 'Joinville, SC'
    },
    {
      titulo: 'Novos animais chegaram ao abrigo',
      texto: 'Recebemos esta semana 5 filhotes de cachorro e 3 gatos adultos resgatados de situação de abandono. Todos estão recebendo cuidados veterinários e logo estarão disponíveis para adoção.',
      tipo: 'Aviso',
      icone: 'paw-outline',
      tempo: 'Há 5 dias',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb2Qltwwrje9Xn8bpmcqYvqOoMuAoRwNH-UA&s',
      dataFormatada: 'Domingo, 01/06/2025',
      local: 'Abrigo Frada, Joinville'
    },
    {
      titulo: 'Parceria com Clínica VetCare',
      texto: 'A partir deste mês, firmamos parceria com a Clínica VetCare para consultas com desconto de 30% para adotantes cadastrados na Frada. Entre em contato para saber mais.',
      tipo: 'Parceria',
      icone: 'people-outline',
      tempo: 'Há 1 semana',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrsVVAkUJVKaQyzhg1Kl2UkQeiwy-jU-dMg&s',
      dataFormatada: 'Segunda-feira, 26/05/2025',
      local: 'Clínica VetCare, Joinville'
    }
  ];

  todosCards: CardDoacao[] = [
    {
      titulo: 'Tratamentos de saúde',
      descricao: 'Gatos e cachorros com doenças que precisam de atenção veterinária urgente.',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrsVVAkUJVKaQyzhg1Kl2UkQeiwy-jU-dMg&s',
      tags: 'tratamentos saúde gatos cachorros doenças veterinária',
    },
    {
      titulo: 'Alimentação no abrigo',
      descricao: 'Custeamos a ração diária de dezenas de animais em nosso abrigo.',
      imagem: 'https://bompracachorro.blogfolha.uol.com.br/files/2020/06/img_9511.jpg',
      tags: 'alimentação abrigo ração diária animais',
    },
    {
      titulo: 'Remédios e vacinas',
      descricao: 'Mantemos a saúde dos animais em dia com medicamentos e vacinação.',
      imagem: 'https://cobasiblog.blob.core.windows.net/production-ofc/2022/07/AdobeStock_254690460.webp',
      tags: 'remédios vacinas medicamentos vacinação saúde',
    },
  ];

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private platform: Platform,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['ong']) {
      this.ong = nav.extras.state['ong'];
    } else if (history.state?.ong) {
      this.ong = history.state.ong;
    }
  }

  abrirDoacao(): void {
    this.doacaoAberta = true;
  }

  fecharDoacao(): void {
    this.doacaoAberta = false;
  }

  setValor(v: number): void {
    this.valorSelecionado = v;
    this.valorDoacao = v;
  }
  

  async copiarPix(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.chavePix);
      const toast = await this.toastController.create({
        message: 'Chave Pix copiada!',
        duration: 2000,
        position: 'bottom',
        color: 'success'
      });
      await toast.present();
    } catch (error) {
      console.error('Erro ao copiar chave Pix:', error);
    }
  }

  async processarDoacao(): Promise<void> {
    const valor = Number(this.valorDoacao);
    if (!valor || valor <= 0) {
      alert('Por favor, informe um valor para doação.');
      return;
    }
    this.processando = true;
    try {
      if (this.platform.is('android')) {
        window.location.href = 'bb://';
        setTimeout(async () => {
          await Browser.open({ url: 'https://play.google.com/store/apps/details?id=br.com.bb.android' });
        }, 1500);
      } else if (this.platform.is('ios')) {
        window.location.href = 'bb://';
        setTimeout(async () => {
          await Browser.open({ url: 'https://apps.apple.com/br/app/banco-do-brasil/id539638839' });
        }, 1500);
      } else {
        await Browser.open({ url: 'https://www.bb.com.br' });
      }
    } catch (err) {
      console.error('Erro ao abrir o Banco do Brasil:', err);
      alert('Não foi possível abrir o app. Tente novamente.');
    } finally {
      this.processando = false;
    }
  }

  abrirChat(): void {
    this.navCtrl.navigateForward(['/chat-ong'], { state: { ong: this.ong } });
  }

  goBack(): void {
    this.navCtrl.back();
  }

  compartilharOng(): void {
    if (navigator.share) {
      navigator.share({ title: this.ong.nome, text: this.ong.descricao, url: window.location.href })
        .catch(err => console.error('Erro ao compartilhar:', err));
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
    this.navCtrl.navigateForward(['/denuncia-detalhe'], { state: { denuncia } });
  }

  compartilhar(post: Postagem): void {
    if (navigator.share) {
      navigator.share({ title: post.titulo, text: post.descricao, url: window.location.href });
    }
  }

  compartilharDenuncia(denuncia: Denuncia): void {
    if (navigator.share) {
      navigator.share({ title: denuncia.titulo, text: denuncia.descricao, url: window.location.href });
    }
  }

  abrirComunicado(comunicado: Comunicado): void {
    this.navCtrl.navigateForward(['/comunicado-detalhe'], {
      state: { comunicado, ong: this.ong }
    });
  }

  compartilharComunicado(comunicado: Comunicado): void {
    if (navigator.share) {
      navigator.share({ title: comunicado.titulo, text: comunicado.texto, url: window.location.href });
    }
  }

  salvar(post: Postagem): void {
    post.saved = !post.saved;
    this.postagens.sort((a, b) => (b.saved ? 1 : 0) - (a.saved ? 1 : 0));
  }
}
