import { Component, OnInit } from '@angular/core'; // 👈 Importamos o OnInit
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // 👈 Importamos o HttpClient

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
export class AdocoesPage implements OnInit { // 👈 Adicionamos implements OnInit

  showSearch = false;
  termoBusca = '';

  // 1. As listas começam vazias agora, aguardando o banco de dados
  pets: Pet[] = [];
  petsFiltrados: Pet[] = [];

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private http: HttpClient // 👈 Injetamos o HttpClient no construtor
  ) { }

  // 2. Dispara a busca na API assim que a tela abre
  ngOnInit() {
    this.carregarAdocoes();
  }

  // 3. Função que busca os dados reais e converte para o formato da interface Pet
  carregarAdocoes() {
    this.http.get('http://localhost:3000/api/postagens/tipo/adocao')
      .subscribe({
        next: (res: any) => {
          // Pega a resposta do banco e "molda" para encaixar no seu HTML
          // No seu adocoes.page.ts, dentro do map:
          this.pets = res.map((item: any) => ({
            titulo: item.titulo,
            idade: item.idade ? item.idade + ' ano(s)' : 'Idade não informada',
            // Monta a URL para o seu servidor local
            imagem: item.foto ? `http://localhost:3000/uploads/${item.foto}` : 'https://via.placeholder.com/300x300/e0e0e0/808080?text=Sem+Foto',
            descricao: item.descricao.length > 60 ? item.descricao.substring(0, 60) + '...' : item.descricao,
            descricaoCompleta: item.descricao
          }));

    // Alimenta a lista que vai para a tela
    this.petsFiltrados = [...this.pets];
  },
  error: (err: any) => {
          console.error('Erro ao buscar adoções da API', err);
}
      });
  }

// 👇 As funções dos botões continuam iguais!

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
    pet.descricaoCompleta.toLowerCase().includes(termo) // Alterei para buscar na descrição completa para resultados melhores
  );
}

limparBusca() {
  this.termoBusca = '';
  this.petsFiltrados = [...this.pets];
}

abrirDetalhe(pet: Pet) {
  this.navCtrl.navigateForward('/adocoes-detalhes', {
    state: { pet }
  });
}

goBack() {
  this.location.back();
}
}