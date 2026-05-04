import { Component, OnInit } from '@angular/core';

interface Denuncia {
  titulo: string;
  imagem: string;
  descricao: string;
}

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.page.html',
  styleUrls: ['./denuncias.page.scss'],
  standalone: false,
})
export class DenunciasPage implements OnInit {

  showSearch: boolean = false;
  termoBusca: string = '';

  denuncias: Denuncia[] = [
    {
      titulo: 'Não seja enganado',
      imagem: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_640.jpg',
      descricao: 'Meu vizinho se diz dono de um abrigo de animais, o que é pura fachada, ele pede dinheiro mas não ajuda os animais.'
    },
    {
      titulo: 'Veneno na comida',
      imagem: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
      descricao: 'Ultimamente eu e meus vizinhos percebemos várias mortes de animais na rua, tanto animais domésticos quanto de rua.'
    },
    {
      titulo: 'Maus tratos',
      imagem: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?w=400',
      descricao: 'Eu peguei o cachorro do meu vizinho pra mim pelo simples motivo de que ele não cuidava do animal.'
    }
  ];

  denunciasFiltradas: Denuncia[] = [];

  constructor() {}

  ngOnInit(): void {
    this.denunciasFiltradas = [...this.denuncias];
  }

  filtrar(): void {
    const termo = this.termoBusca.toLowerCase().trim();
    this.denunciasFiltradas = this.denuncias.filter((d: Denuncia) =>
      !termo ||
      d.titulo.toLowerCase().includes(termo) ||
      d.descricao.toLowerCase().includes(termo)
    );
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.filtrar();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.limparBusca();
    }
  }

  async compartilhar(denuncia: Denuncia): Promise<void> {
    if (navigator.share) {
      await navigator.share({
        title: denuncia.titulo,
        text: denuncia.descricao,
        url: window.location.href
      });
    }
  }

}