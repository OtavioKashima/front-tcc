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
  cidade: string; // "Cidade, UF"
}

interface Pet {
  titulo: string;
  tipoAnimal: string;    // cachorro, gato, pássaro...
  raca: string;
  idadeTexto: string;    // texto exibido: "6 meses", "3 anos"
  idadeMeses: number;    // para filtro numérico
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
  usuario: Usuario;
  liked?: boolean;
  showHeart?: boolean;
  saved?: boolean;       // ← NOVO: controla o bookmark favorito
}

interface Filtros {
  animal: string;
  raca: string;
  cidade: string;
  estado: string;
  idade: string; // '', 'filhote', 'jovem', 'adulto', 'idoso'
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
      titulo: 'Pitbulls - Ambos Gêneros',
      tipoAnimal: 'cachorro',
      raca: 'Pitbull',
      idadeTexto: '1 ano',
      idadeMeses: 12,
      imagem: 'https://i.pinimg.com/736x/d3/87/ce/d387cefdbee49054a82b283e5bc2f65f.jpg',
      descricao: 'Minha cachorra deu muita cria e eu não tenho como cuidar de todos os filhotes...',
      descricaoCompleta: 'Minha cachorra deu muita cria e eu não tenho como cuidar de todos os filhotes.',
      usuario: { nome: 'Regina Almeida', avatar: 'https://randomuser.me/api/portraits/women/44.jpg', cidade: 'São Paulo, SP' }
    },
    {
      titulo: 'Maritaca - Macho',
      tipoAnimal: 'pássaro',
      raca: 'Maritaca',
      idadeTexto: '3 anos',
      idadeMeses: 36,
      imagem: 'https://i.pinimg.com/1200x/6a/52/5a/6a525af45c71da21660ade37a065f733.jpg',
      descricao: 'Eu comprei uma maritaca achando que ia ser legal, mas meu vizinho reclama do barulho...',
      descricaoCompleta: 'Eu comprei uma maritaca achando que ia ser legal, mas meu vizinho de baixo reclama do barulho.',
      usuario: { nome: 'Marcos Oliveira', avatar: 'https://randomuser.me/api/portraits/men/22.jpg', cidade: 'Campinas, SP' }
    },
    {
      titulo: 'Gato - Macho',
      tipoAnimal: 'gato',
      raca: 'Vira-lata',
      idadeTexto: '6 meses',
      idadeMeses: 6,
      imagem: 'https://i.pinimg.com/736x/47/a4/cc/47a4cc82153975f696ab99559f2ce9c8.jpg',
      descricao: 'A gata da minha irmã deu cria e ela não quer mais gatos, estamos doando...',
      descricaoCompleta: 'A gata da minha irmã deu cria e ela não quer mais gatos, então estamos doando os filhotes.',
      usuario: { nome: 'Fernanda Costa', avatar: 'https://randomuser.me/api/portraits/women/68.jpg', cidade: 'Curitiba, PR' }
    }
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
    const termo    = this.termoBusca.toLowerCase().trim();
    const animal   = this.filtros.animal.toLowerCase().trim();
    const raca     = this.filtros.raca.toLowerCase().trim();
    const cidade   = this.filtros.cidade.toLowerCase().trim();
    const estado   = this.filtros.estado;
    const idadeFx  = this.filtros.idade;

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

  // ← NOVO: alterna o estado de favorito do pet
  salvar(pet: Pet) {
    pet.saved = !pet.saved;
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