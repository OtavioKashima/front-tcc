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
    whatsapp?: string;
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
    tipo: 'Maus-tratos',
    categoria: 'Animal',
    status: 'Aberta',
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

  getStatusClass(): string {
    const map: Record<string, string> = {
      'Aberta': 'status--aberta',
      'Em Análise': 'status--analise',
      'Resolvida': 'status--resolvida'
    };
    return map[this.denuncia.status] ?? '';
  }

  entrarEmContato(): void {
    if (this.denuncia.usuario.whatsapp) {
      const msg = encodeURIComponent(`Olá! Vi sua denúncia "${this.denuncia.titulo}" no app e quero ajudar.`);
      window.open(`https://wa.me/${this.denuncia.usuario.whatsapp}?text=${msg}`, '_blank');
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