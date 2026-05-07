import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Denuncia {
  titulo: string;
  idade: string;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
}

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.page.html',
  styleUrls: ['./denuncias.page.scss'],
  standalone: false,
})
export class DenunciasPage implements OnInit {

  showSearch = false;
  termoBusca = '';

  // 1. As listas começam vazias agora, aguardando o banco de dados
  denuncias: Denuncia[] = []; 
  denunciasFiltrados: Denuncia[] = [];

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private http: HttpClient // 👈 Injetamos o HttpClient no construtor
  ) { }

  // 2. Dispara a busca na API assim que a tela abre
  ngOnInit() {
    this.carregarAdocoes();
  }

  // 3. Função que busca os dados reais e converte para o formato da interface Denuncia
  carregarAdocoes() {
    this.http.get('http://localhost:3000/api/postagens/tipo/denuncias')
      .subscribe({
        next: (res: any) => {
          // Pega a resposta do banco e "molda" para encaixar no seu HTML
          this.denuncias = res.map((item: any) => ({
            titulo: item.titulo,
            idade: item.idade ? item.idade + ' ano(s)' : 'Idade não informada',
            
            // Se tiver foto, usaremos o caminho do servidor. Se não, uma imagem padrão.
            // (Ajustaremos o caminho exato quando configurarmos o Multer 100%)
            imagem: item.foto ? item.foto : 'https://via.placeholder.com/150', 
            
            // Corta a descrição para não ficar gigante no card
            descricao: item.descricao.length > 60 ? item.descricao.substring(0, 60) + '...' : item.descricao,
            
            // Guarda a descrição inteira para a tela de detalhes
            descricaoCompleta: item.descricao 
          }));

          // Alimenta a lista que vai para a tela
          this.denunciasFiltrados = [...this.denuncias];
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
      this.denunciasFiltrados = [...this.denuncias];
      return;
    }
    this.denunciasFiltrados = this.denuncias.filter(denuncias =>
      denuncias.titulo.toLowerCase().includes(termo) ||
      denuncias.descricaoCompleta.toLowerCase().includes(termo) // Alterei para buscar na descrição completa para resultados melhores
    );
  }

  limparBusca() {
    this.termoBusca = '';
    this.denunciasFiltrados = [...this.denuncias];
  }

  abrirDetalhe(denuncias: Denuncia) {
    this.navCtrl.navigateForward('/adocoes-detalhes', {
      state: { denuncias }
    });
  }

  goBack() {
    this.location.back();
  }
}
