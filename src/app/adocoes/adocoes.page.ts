import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

// Interface atualizada para conter as informações de adoção
interface Adocao {
  id?: number;
  titulo: string;
  descricao: string;
  descricaoCompleta?: string;
  idade?: string;  // Novo: Puxa do banco "3 meses", "2 anos", etc
  raca?: string;   // Novo: Raça do animal
  genero?: string; // Novo: Gênero do animal
  foto?: string; // Vem como string do banco (formato JSON)
  fotosArray?: string[]; // Array que nós criamos para o frontend
}

@Component({
  selector: 'app-adocoes',
  templateUrl: './adocoes.page.html',
  styleUrls: ['./adocoes.page.scss'],
  standalone: false,
})
export class AdocoesPage implements OnInit {

  showSearch = false;
  termoBusca = '';

  adocoes: Adocao[] = [];
  adocoesFiltradas: Adocao[] = [];

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.carregarAdocoes();
  }

  carregarAdocoes() {
    // 🔴 ALTERAÇÃO AQUI: Mudando a rota para buscar apenas adoções
    this.http.get('http://localhost:3000/api/postagens/tipo/adocao').subscribe({
      next: (res: any) => {

        const dadosReais = Array.isArray(res) ? res : (res.data || res.postagens || []);

        this.adocoes = dadosReais.map((adocao: any) => {
          if (adocao.foto) {
            try {
              adocao.fotosArray = JSON.parse(adocao.foto);
            } catch (e) {
              adocao.fotosArray = [adocao.foto];
            }
          } else {
            adocao.fotosArray = [];
          }
          if (!adocao.descricaoCompleta) {
            adocao.descricaoCompleta = adocao.descricao || '';
          }
          return adocao;
        });

        this.adocoesFiltradas = [...this.adocoes];
      },
      error: (err) => console.error('Erro ao buscar adoções', err)
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.limparBusca();
    }
  }

  filtrar() {
    const termo = this.termoBusca.toLowerCase().trim();
    if (!termo) {
      this.adocoesFiltradas = [...this.adocoes];
      return;
    }
    
    // Filtra pelo título, descrição ou raça!
    this.adocoesFiltradas = this.adocoes.filter(a =>
      (a.titulo && a.titulo.toLowerCase().includes(termo)) ||
      (a.descricaoCompleta && a.descricaoCompleta.toLowerCase().includes(termo)) ||
      (a.raca && a.raca.toLowerCase().includes(termo))
    );
  }

  limparBusca() {
    this.termoBusca = '';
    this.adocoesFiltradas = [...this.adocoes];
  }

  abrirDetalhe(adocao: Adocao) {
    // Certifique-se de que a rota '/adocoes-detalhes' existe no seu app-routing.module.ts
    this.navCtrl.navigateForward('/adocoes-detalhes', {
      state: { pet: adocao } 
    });
  }

  goBack() {
    this.location.back();
  }
}