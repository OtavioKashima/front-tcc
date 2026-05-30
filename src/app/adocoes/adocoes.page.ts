import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

// Interface atualizada
interface Adocao {
  id?: number;
  titulo: string;
  descricao: string;
  descricaoCompleta?: string;
  idade?: string;
  raca?: string;
  genero?: string;
  foto?: string;
  fotosArray?: string[];
  fixado?: number; // 🔴 ALTERADO: de 'destaque?: string' para 'fixado?: number'
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
    this.http.get('http://localhost:3000/api/postagens/tipo/adocao').subscribe({
      next: (res: any) => {
        const dadosReais = Array.isArray(res) ? res : (res.data || res.postagens || []);

        this.adocoes = dadosReais.map((adocao: any) => {
          if (adocao.foto) {
            try { adocao.fotosArray = JSON.parse(adocao.foto); }
            catch (e) { adocao.fotosArray = [adocao.foto]; }
          } else { adocao.fotosArray = []; }

          if (!adocao.descricaoCompleta) { adocao.descricaoCompleta = adocao.descricao || ''; }

          return adocao;
        });

        // 🟢 ORDENAÇÃO ATUALIZADA PARA LER O NÚMERO 1 ou 0
        this.adocoes.sort((a, b) => {
          // Se for 1 é destaque, se for 0 (ou null) é postagem normal
          const aFixado = a.fixado === 1 ? 1 : 0;
          const bFixado = b.fixado === 1 ? 1 : 0;

          // 1º Critério: Quem for fixado sobe.
          if (aFixado !== bFixado) {
            return bFixado - aFixado;
          }

          // 2º Critério: Desempate (o mais novo fica em cima).
          return (b.id || 0) - (a.id || 0);
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
    this.navCtrl.navigateForward('/adocoes-detalhes', {
      state: { pet: adocao }
    });
  }

  goBack() {
    this.location.back();
  }
}