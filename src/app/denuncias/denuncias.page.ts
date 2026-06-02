import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

interface Denuncia {
  id?: number;
  titulo: string;
  descricao: string;
  descricaoCompleta?: string;
  foto?: string; // Vem como string do banco
  fotosArray?: string[]; // Array que nós criamos para o frontend
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

  // Nomes corrigidos para corresponder à lógica
  denuncias: Denuncia[] = [];
  denunciasFiltradas: Denuncia[] = [];

  constructor(
    private location: Location,
    private navCtrl: NavController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.carregarDenuncias();
  }

  carregarDenuncias() {
    this.http.get('http://localhost:3000/api/postagens/tipo/denuncia').subscribe({
      next: (res: any) => {

        const dadosReais = Array.isArray(res) ? res : (res.data || res.postagens || []);

        this.denuncias = dadosReais.map((denuncia: any) => {
          if (denuncia.foto) {
            try {
              denuncia.fotosArray = JSON.parse(denuncia.foto);
            } catch (e) {
              denuncia.fotosArray = [denuncia.foto];
            }
          } else {
            denuncia.fotosArray = [];
          }
          if (!denuncia.descricaoCompleta) {
            denuncia.descricaoCompleta = denuncia.descricao || '';
          }
          return denuncia;
        });

        this.denunciasFiltradas = [...this.denuncias];
      },
      error: (err) => console.error('Erro ao buscar denúncias', err)
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
      this.denunciasFiltradas = [...this.denuncias];
      return;
    }
    this.denunciasFiltradas = this.denuncias.filter(d =>
      (d.titulo && d.titulo.toLowerCase().includes(termo)) ||
      (d.descricaoCompleta && d.descricaoCompleta.toLowerCase().includes(termo))
    );
  }

  limparBusca() {
    this.termoBusca = '';
    this.denunciasFiltradas = [...this.denuncias];
  }

 irParaDetalhes(item: any) {
  this.navCtrl.navigateForward('/denuncias-detalhes', {
    state: { denuncia: item } // 🟢 O nome aqui TEM QUE SER 'denuncia'
  });
}

  goBack() {
    this.location.back();
  }
}