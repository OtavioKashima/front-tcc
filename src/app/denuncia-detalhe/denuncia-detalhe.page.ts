import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface Denuncia {
  titulo: string;
  imagem: string;
  descricao: string;
  tipo: string;
  categoria: string;
  status: string;
  local: string;
  dataFormatada: string;
  usuario: {
    nome: string;
    avatar: string;
    cidade: string;
  };
}

@Component({
  selector: 'app-denuncia-detalhe',
  templateUrl: './denuncia-detalhe.page.html',
  styleUrls: ['./denuncia-detalhe.page.scss'],
  standalone: false
})
export class DenunciaDetalhePage implements OnInit {

  denuncia: Denuncia = {
    titulo: '',
    imagem: '',
    descricao: '',
    tipo: '',
    categoria: '',
    status: '',
    local: '',
    dataFormatada: '',
    usuario: {
      nome: '',
      avatar: 'assets/avatar-default.png',
      cidade: ''
    }
  };

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['denuncia']) {
      this.denuncia = { ...this.denuncia, ...nav.extras.state['denuncia'] };
    } else if (history.state?.denuncia) {
      this.denuncia = { ...this.denuncia, ...history.state.denuncia };
    }
  }

  async compartilhar(): Promise<void> {
    if (navigator.share) {
      await navigator.share({
        title: this.denuncia.titulo,
        text: this.denuncia.descricao
      });
    }
  }

  goBack(): void {
    this.navCtrl.back();
  }
}