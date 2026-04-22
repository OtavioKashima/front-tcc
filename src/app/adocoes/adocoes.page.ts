import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

interface Comentario {
  nome: string;
  avatar: string;
  texto: string;
}

interface Usuario {
  nome: string;
  avatar: string;
  cidade: string;
}

interface Pet {
  titulo: string;
  tipoAnimal: string;
  raca: string;
  idadeTexto: string;
  idadeMeses: number;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
  usuario: Usuario;
  liked?: boolean;
  showHeart?: boolean;
  saved?: boolean;
}

interface Filtros {
  animal: string;
  raca: string;
  cidade: string;
  estado: string;
  idade: string;
}

@Component({
  selector: 'app-adocoes',
  templateUrl: './adocoes.page.html',
  styleUrls: ['./adocoes.page.scss'],
  standalone: false
})
export class AdocoesPage {

  showSearch = false;
  showFiltros = false;
  termoBusca = '';
  private lastTap = 0;

  filtros: Filtros = { animal: '', raca: '', cidade: '', estado: '', idade: '' };

  comentariosAbertos = false;
  novoComentario = '';

  comentarios: Comentario[] = [
    { nome: 'Carlos Silva',  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',   texto: 'Que animal lindo! Ainda disponível?' },
    { nome: 'Ana Paula',     avatar: 'https://randomuser.me/api/portraits/women/65.jpg', texto: 'Tenho interesse! Como faço para adotar?' },
    { nome: 'João Ferreira', avatar: 'https://randomuser.me/api/portraits/men/54.jpg',   texto: 'Minha filha vai amar 😍' },
  ];

  pets: Pet[] = [
    {
      titulo: 'Gato - Fêmea',
      tipoAnimal: 'gato',
      raca: 'Vira-lata',
      idadeTexto: 'Filhote',
      idadeMeses: 4,
      imagem: 'https://img.olx.com.br/images/26/263662263627797.jpg',
      descricao: 'Gatinha fêmea, ainda filhote, muito dócil e carinhosa. Adora brincar e estar próxima das pessoas.',
      descricaoCompleta: 'Gatinha fêmea, ainda filhote, muito dócil e carinhosa. Adora brincar e estar próxima das pessoas. Procura um lar responsável que ofereça cuidado, atenção e amor.',
      usuario: { nome: 'Regina Almeida', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', cidade: 'São Paulo, SP' }
    },
    {
      titulo: 'Gato - Macho',
      tipoAnimal: 'gato',
      raca: 'Vira-lata',
      idadeTexto: 'Filhote',
      idadeMeses: 4,
      imagem: 'https://images.openai.com/static-rsc-4/NGLjatZFsVVQKPAjzU7PlEQmJYe6keV6GTh4OhqYLu6lHMQHZg7YaSfoKbcd7RTAWxXCmfNPCohcXzGSxut9nJDxCgcqlafolhgjURCDGIi89t66IW41SgCmopm1TURO39e6oWfipqgpBNTOoj1B-kQHGnPcj_7WATcUDo7PtT7yAX-TiaLGBIzpSHdXHiut?purpose=fullsize',
      descricao: 'Gatinho macho, ainda filhote, dócil e muito carinhoso. É brincalhão, curioso e adora interagir com as pessoas.',
      descricaoCompleta: 'Gatinho macho, ainda filhote, dócil e muito carinhoso. É brincalhão, curioso e adora interagir com as pessoas. Procura um lar responsável que ofereça cuidado, atenção e amor.',
      usuario: { nome: 'Marcos Oliveira', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', cidade: 'Campinas, SP' }
    },
    {
      titulo: 'Gato - Macho',
      tipoAnimal: 'gato',
      raca: 'Vira-lata',
      idadeTexto: 'Adulto',
      idadeMeses: 48,
      imagem: 'https://cdn.shopify.com/s/files/1/0500/8965/6473/files/Cleiton2_480x480.jpg?v=1662048905',
      descricao: 'Gatinho frajolinha, adulto, muito dócil e carinhoso. É tranquilo, companheiro e adora a presença das pessoas.',
      descricaoCompleta: 'Gatinho frajolinha, adulto, muito dócil e carinhoso. É tranquilo, companheiro e adora a presença das pessoas. Procura um lar responsável que ofereça cuidado, atenção e muito amor.',
      usuario: { nome: 'Fernanda Costa', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', cidade: 'Curitiba, PR' }
    },
    {
      titulo: 'Gato - Macho',
      tipoAnimal: 'gato',
      raca: 'Vira-lata',
      idadeTexto: 'Adulto',
      idadeMeses: 36,
      imagem: 'https://cdn.crusoe.com.br/uploads/2025/08/pexels-furkanakt-28934306-scaled.jpg',
      descricao: 'Gato laranja, adulto, dócil e muito carinhoso. É tranquilo, companheiro e adora a presença das pessoas.',
      descricaoCompleta: 'Gato laranja, adulto, dócil e muito carinhoso. É tranquilo, companheiro e adora a presença das pessoas. Procura um lar responsável que ofereça cuidado, atenção e muito amor.',
      usuario: { nome: 'Lucas Pereira', avatar: 'https://randomuser.me/api/portraits/men/45.jpg', cidade: 'Belo Horizonte, MG' }
    },
    {
      titulo: 'Cachorro - Macho',
      tipoAnimal: 'cachorro',
      raca: 'Vira-lata',
      idadeTexto: 'Filhote',
      idadeMeses: 4,
      imagem: 'https://adotar.com.br/painel/upload/2023-05/animais_imagem988506.jpg',
      descricao: 'Cachorrinho, ainda filhote, muito dócil e carinhoso. É brincalhão, cheio de energia e adora a companhia das pessoas.',
      descricaoCompleta: 'Cachorrinho, ainda filhote, muito dócil e carinhoso. É brincalhão, cheio de energia e adora a companhia das pessoas. Procura um lar responsável que ofereça cuidado, atenção e muito amor.',
      usuario: { nome: 'Juliana Santos', avatar: 'https://randomuser.me/api/portraits/women/30.jpg', cidade: 'Porto Alegre, RS' }
    },
    {
      titulo: 'Cadela - Fêmea',
      tipoAnimal: 'cachorro',
      raca: 'Vira-lata',
      idadeTexto: 'Filhote',
      idadeMeses: 5,
      imagem: 'https://www.patasdacasa.com.br/sites/default/files/noticias/2021/06/cachorro-vira-lata-filhote-quais-os-cuidados-mais-importantes-durante-essa-fase.jpg',
      descricao: 'Cadelinha, ainda filhote, muito ativa e cheia de energia. É brincalhona, curiosa e adora aprontar enquanto descobre o mundo.',
      descricaoCompleta: 'Cadelinha, ainda filhote, muito ativa e cheia de energia. É brincalhona, curiosa e adora aprontar enquanto descobre o mundo. Procura um lar paciente e responsável que ofereça cuidado, atenção e amor.',
      usuario: { nome: 'Carla Mendes', avatar: 'https://randomuser.me/api/portraits/women/55.jpg', cidade: 'Florianópolis, SC' }
    },
    {
      titulo: 'Cadela - Fêmea',
      tipoAnimal: 'cachorro',
      raca: 'Vira-lata',
      idadeTexto: 'Jovem',
      idadeMeses: 18,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96sqG_kgeWzNUSWaCJoNJ3nJ0xJ2z8nwzdA&s',
      descricao: 'Cadelinha muito carinhosa e carente, adora atenção e estar sempre por perto. É dócil, companheira e ama receber carinho.',
      descricaoCompleta: 'Cadelinha muito carinhosa e carente, adora atenção e estar sempre por perto. É dócil, companheira e ama receber carinho. Procura um lar responsável que ofereça muito amor, cuidado e presença constante.',
      usuario: { nome: 'Roberta Lima', avatar: 'https://randomuser.me/api/portraits/women/72.jpg', cidade: 'Ribeirão Preto, SP' }
    },
    {
      titulo: 'Coelha - Fêmea',
      tipoAnimal: 'coelho',
      raca: 'Vira-lata',
      idadeTexto: 'Jovem',
      idadeMeses: 8,
      imagem: 'https://vipzinho.com.br/wp-content/uploads/2025/08/coelhos.jpeg',
      descricao: 'Coelhinha fêmea, dócil e muito tranquila. É delicada, curiosa e gosta de um ambiente calmo.',
      descricaoCompleta: 'Coelhinha fêmea, dócil e muito tranquila. É delicada, curiosa e gosta de um ambiente calmo. Procura um lar responsável que ofereça cuidado, carinho e segurança.',
      usuario: { nome: 'Patricia Souza', avatar: 'https://randomuser.me/api/portraits/women/82.jpg', cidade: 'Santos, SP' }
    },
    {
      titulo: 'Maritaca - Fêmea',
      tipoAnimal: 'pássaro',
      raca: 'Maritaca',
      idadeTexto: 'Adulto',
      idadeMeses: 36,
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKfXShRyYUS7vo2B3GTNBqTFdzlVYqhTTgoQ&s',
      descricao: 'Maritaca, muito ativa e comunicativa. É curiosa, inteligente e adora interagir com as pessoas.',
      descricaoCompleta: 'Maritaca, muito ativa e comunicativa. É curiosa, inteligente e adora interagir com as pessoas. Procura um lar responsável que ofereça atenção, cuidado e um ambiente adequado.',
      usuario: { nome: 'Eduardo Ramos', avatar: 'https://randomuser.me/api/portraits/men/60.jpg', cidade: 'Campinas, SP' }
    },
  ];

  petsFiltrados: Pet[] = [...this.pets];

  get estadosDisponiveis(): string[] {
    const estados = this.pets.map(p => p.usuario.cidade.split(', ')[1]).filter(Boolean);
    return [...new Set(estados)].sort();
  }

  constructor(private location: Location, private navCtrl: NavController) {}

  temFiltroAtivo(): boolean {
    return !!(this.filtros.animal || this.filtros.raca || this.filtros.cidade || this.filtros.estado || this.filtros.idade);
  }

  filtrar() {
    const termo   = this.termoBusca.toLowerCase().trim();
    const animal  = this.filtros.animal.toLowerCase().trim();
    const raca    = this.filtros.raca.toLowerCase().trim();
    const cidade  = this.filtros.cidade.toLowerCase().trim();
    const estado  = this.filtros.estado;
    const idadeFx = this.filtros.idade;

    this.petsFiltrados = this.pets.filter(pet => {
      const cidadeCompleta = pet.usuario.cidade.toLowerCase();
      const estadoPet      = pet.usuario.cidade.split(', ')[1] || '';

      const matchTermo  = !termo  || pet.titulo.toLowerCase().includes(termo) || pet.descricao.toLowerCase().includes(termo);
      const matchAnimal = !animal || pet.tipoAnimal.toLowerCase().includes(animal) || pet.titulo.toLowerCase().includes(animal);
      const matchRaca   = !raca   || pet.raca.toLowerCase().includes(raca);
      const matchCidade = !cidade || cidadeCompleta.includes(cidade);
      const matchEstado = !estado || estadoPet === estado;
      const matchIdade  = !idadeFx || this.checarFaixaIdade(pet.idadeMeses, idadeFx);

      return matchTermo && matchAnimal && matchRaca && matchCidade && matchEstado && matchIdade;
    });

    // Salvos sempre no topo
    this.petsFiltrados.sort((a, b) => (b.saved ? 1 : 0) - (a.saved ? 1 : 0));
  }

  checarFaixaIdade(meses: number, faixa: string): boolean {
    switch (faixa) {
      case 'filhote': return meses <= 12;
      case 'jovem':   return meses > 12 && meses <= 36;
      case 'adulto':  return meses > 36 && meses <= 96;
      case 'idoso':   return meses > 96;
      default:        return true;
    }
  }

  idadeLabel(faixa: string): string {
    const labels: Record<string, string> = {
      filhote: 'Filhote', jovem: 'Jovem', adulto: 'Adulto', idoso: 'Idoso'
    };
    return labels[faixa] || faixa;
  }

  selecionarIdade(faixa: string) {
    this.filtros.idade = faixa;
    this.filtrar();
  }

  limparCampo(campo: keyof Filtros) {
    this.filtros[campo] = '';
    this.filtrar();
  }

  limparTodosFiltros() {
    this.filtros = { animal: '', raca: '', cidade: '', estado: '', idade: '' };
    this.filtrar();
  }

  limparBusca() {
    this.termoBusca = '';
    this.filtrar();
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) this.limparBusca();
  }

  toggleFiltros() {
    this.showFiltros = !this.showFiltros;
  }

  onImageTap(pet: Pet) {
    const now  = Date.now();
    const diff = now - this.lastTap;
    if (diff < 300 && diff > 0) {
      pet.liked     = true;
      pet.showHeart = true;
      setTimeout(() => pet.showHeart = false, 700);
    }
    this.lastTap = now;
  }

  curtir(pet: Pet) {
    pet.liked = !pet.liked;
    if (pet.liked) {
      pet.showHeart = true;
      setTimeout(() => pet.showHeart = false, 700);
    }
  }

  salvar(pet: Pet) {
    pet.saved = !pet.saved;
    this.filtrar();
  }

  abrirComentarios(pet: Pet) { this.comentariosAbertos = true; }
  fecharComentarios()        { this.comentariosAbertos = false; }

  enviarComentario() {
    if (!this.novoComentario.trim()) return;
    this.comentarios.push({ nome: 'Você', avatar: 'https://randomuser.me/api/portraits/men/32.jpg', texto: this.novoComentario });
    this.novoComentario = '';
  }

  abrirDetalhe(pet: Pet) {
    this.navCtrl.navigateForward('/adocao-detalhe', { state: { pet } });
  }

  async compartilhar(pet: Pet) {
    if (navigator.share) {
      await navigator.share({ title: pet.titulo, text: pet.descricaoCompleta, url: window.location.href });
    }
  }

  goBack() { this.location.back(); }
}