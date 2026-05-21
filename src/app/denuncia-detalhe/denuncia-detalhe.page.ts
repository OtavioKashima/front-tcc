import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface DenunciaResumo {
  titulo: string;
  imagem: string;
  categoria?: string;
  dataFormatada: string;
  descricao?: string;
  autor?: string;
  local?: string;
  status?: string;
  tipo?: string;
}

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
    id?: string;
    nome: string;
    avatar: string;
    cidade: string;
    bio?: string;
    totalDenuncias?: number;
    denuncias?: DenunciaResumo[];
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
      id: '',
      nome: '',
      avatar: 'assets/avatar-default.png',
      cidade: '',
      bio: '',
      totalDenuncias: 0,
      denuncias: []
    }
  };

  private navState: any;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {
    const nav = this.router.getCurrentNavigation();
    this.navState = nav?.extras?.state ?? null;
  }

  ngOnInit(): void {
    const state = this.navState ?? history.state;

    if (state?.denuncia) {
      this.denuncia = { ...this.denuncia, ...state.denuncia };
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

  verPerfilUsuario(): void {


    const denunciaAtual: DenunciaResumo = {
      titulo: this.denuncia.titulo,
      imagem: this.denuncia.imagem,
      categoria: this.denuncia.categoria,
      dataFormatada: this.denuncia.dataFormatada,
      descricao: this.denuncia.descricao,
      autor: this.denuncia.usuario.nome,
      local: this.denuncia.local,
      status: this.denuncia.status,
      tipo: this.denuncia.tipo
    };

    const denunciasUsuario = this.denuncia.usuario.denuncias ?? [];

    const jaExiste = denunciasUsuario.some(
      d => d.titulo === denunciaAtual.titulo
    );

    if (!jaExiste) {
      denunciasUsuario.push(denunciaAtual);
    }

    this.router.navigate(['/perfil-usuario-detalhe'], {
      state: {
        usuario: {
          ...this.denuncia.usuario,
          denuncias: denunciasUsuario
        },
        denuncias: denunciasUsuario
      }
    });
  }
}