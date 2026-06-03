import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Comunicado {
  titulo: string;
  texto: string;
  tipo: string;
  icone: string;
  tempo: string;
  imagem: string;
  dataFormatada: string;
  local: string;
}

interface Ong {
  nome: string;
  avatar: string;
  cidade: string;
  descricao: string;
}

@Component({
  selector: 'app-comunicado-detalhe',
  templateUrl: './comunicado-detalhe.page.html',
  styleUrls: ['./comunicado-detalhe.page.scss'],
  standalone: false
})
export class ComunicadoDetalhePage implements OnInit {

  comunicado: Comunicado = {
    titulo: '',
    texto: '',
    tipo: '',
    icone: 'megaphone-outline',
    tempo: '',
    imagem: '',
    dataFormatada: '',
    local: ''
  };

  ong: Ong = {
    nome: '',
    avatar: '',
    cidade: '',
    descricao: ''
  };

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['comunicado']) {
      this.comunicado = nav.extras.state['comunicado'];
    } else if (history.state?.comunicado) {
      this.comunicado = history.state.comunicado;
    }

    if (nav?.extras?.state?.['ong']) {
      this.ong = nav.extras.state['ong'];
    } else if (history.state?.ong) {
      this.ong = history.state.ong;
    }
  }

  goBack(): void {
    this.navCtrl.back();
  }

  verPerfilOng(): void {
    this.navCtrl.navigateForward(['/perfil-ong'], {
      state: { ong: this.ong }
    });
  }

  compartilhar(): void {
    if (navigator.share) {
      navigator.share({
        title: this.comunicado.titulo,
        text: this.comunicado.texto,
        url: window.location.href
      }).catch(err => console.error('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }
}