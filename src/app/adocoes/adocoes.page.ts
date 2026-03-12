import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';

interface Pet {
  titulo: string;
  idade: string;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
}

@Component({
  selector: 'app-adocoes',
  templateUrl: './adocoes.page.html',
  styleUrls: ['./adocoes.page.scss'],
  standalone: false
})
export class AdocoesPage {

  showSearch = false;
  termoBusca = '';

  pets: Pet[] = [
    {
      titulo: 'Pitbulls - Ambos Gêneros',
      idade: '1 ano',
      imagem: 'https://i.pinimg.com/736x/d3/87/ce/d387cefdbee49054a82b283e5bc2f65f.jpg',
      descricao: 'Minha cachorra deu muita cria e eu não tenho como cuidar de todos os filhotes, então estou coloca...',
      descricaoCompleta: 'Minha cachorra deu muita cria e eu não tenho como cuidar de todos os filhotes, então estou colocando eles pra adoção, até agora eu tenho 2 machos e 3 fêmeas, todos de um ano. Caso esteja interessado entre em contato comigo pelo meu email: fulaninha@gmail.com'
    },
    {
      titulo: 'Maritaca - Macho',
      idade: '3 anos',
      imagem: 'https://i.pinimg.com/1200x/6a/52/5a/6a525af45c71da21660ade37a065f733.jpg',
      descricao: 'Eu comprei uma maritaca achando que ia ser legal, mas meu vizinho de baixo reclama do barulho...',
      descricaoCompleta: 'Eu comprei uma maritaca achando que ia ser legal, mas meu vizinho de baixo reclama do barulho e eu não consigo mais ficar com ela em casa. Ela é dócil e já está acostumada com pessoas.'
    },
    {
      titulo: 'Gato - Macho',
      idade: '6 meses',
      imagem: 'https://i.pinimg.com/736x/47/a4/cc/47a4cc82153975f696ab99559f2ce9c8.jpg',
      descricao: 'A gata da minha irmã deu cria e ela não quer mais gatos, ent estamos doando...',
      descricaoCompleta: 'A gata da minha irmã deu cria e ela não quer mais gatos, então estamos doando os filhotes. São gatinhos saudáveis, vacinados e muito carinhosos. Entre em contato para mais informações.'
    }
  ];

  petsFiltrados: Pet[] = [...this.pets];

  constructor(
    private location: Location,
    private navCtrl: NavController
  ) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.limparBusca();
    }
  }

  filtrar() {
    const termo = this.termoBusca.toLowerCase().trim();
    if (!termo) {
      this.petsFiltrados = [...this.pets];
      return;
    }
    this.petsFiltrados = this.pets.filter(pet =>
      pet.titulo.toLowerCase().includes(termo) ||
      pet.descricao.toLowerCase().includes(termo)
    );
  }

  limparBusca() {
    this.termoBusca = '';
    this.petsFiltrados = [...this.pets];
  }

  abrirDetalhe(pet: Pet) {
    this.navCtrl.navigateForward('/adocao-detalhe', {
      state: { pet }
    });
  }

  goBack() {
    this.location.back();
  }
}