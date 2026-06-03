import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

// Interface ajustada para refletir os dados de uma denúncia
interface Denuncia {
  titulo: string;
  imagem: string;
  imagens?: string[];
  fotos?: string[];
  descricao: string;
  descricaoCompleta: string;
  localizacao?: string; // 📍 Novo campo exclusivo para denúncias

  // Dados do usuário que fez a denúncia
  usuarios_id?: number;
  usuario_nome?: string;
  usuario_foto?: string;
  tipo_usuario?: 'ong' | 'usuario' | 'admin';
}

@Component({
  selector: 'app-denuncias-detalhes',
  templateUrl: './denuncias-detalhes.page.html',
  styleUrls: ['./denuncias-detalhes.page.scss'],
  standalone: false
})
export class DenunciasDetalhesPage implements OnInit {

  imagemAtiva: number = 0;
  postagem: any;

  denuncia: Denuncia = {
    titulo: 'Carregando...',
    imagem: '',
    imagens: [],
    descricao: '',
    descricaoCompleta: '',
    localizacao: 'Não informada'
  };

  constructor(
    private location: Location,
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    // 🔴 CORREÇÃO AQUI: Mudamos de router.getCurrentNavigation() para history.state
    const state = history.state;

    // Captura os dados caso venham como 'postagemSelecionada' ou como 'denuncia'
    const dadosDenuncia = state?.['postagemSelecionada'] || state?.['denuncia'];

    if (dadosDenuncia) {
      this.denuncia = { ...dadosDenuncia };

      // 🟢 GARANTIA: Se o banco não tiver 'descricaoCompleta', usa a 'descricao' normal
      if (!this.denuncia.descricaoCompleta && this.denuncia.descricao) {
        this.denuncia.descricaoCompleta = this.denuncia.descricao;
      }

      const urlDoServidor = 'http://localhost:3000/uploads/';
      let listaDeFotos: string[] = [];

      // Verifica se as fotos vieram como Array ou String JSON
      if ((this.denuncia as any).fotosArray && (this.denuncia as any).fotosArray.length > 0) {
        listaDeFotos = (this.denuncia as any).fotosArray;
      } else if ((this.denuncia as any).foto) {
        try {
          listaDeFotos = JSON.parse((this.denuncia as any).foto);
        } catch (e) {
          listaDeFotos = [(this.denuncia as any).foto];
        }
      }

      if (listaDeFotos && listaDeFotos.length > 0) {
        this.denuncia.imagens = listaDeFotos.map(nomeDaImagem => {
          if (nomeDaImagem.startsWith('http')) return nomeDaImagem;
          return `${urlDoServidor}${nomeDaImagem}`;
        });
      } else if (this.denuncia.imagem) {
        const imagemCapa = this.denuncia.imagem.startsWith('http')
          ? this.denuncia.imagem
          : `${urlDoServidor}${this.denuncia.imagem}`;
        this.denuncia.imagens = [imagemCapa];
      } else {
        this.denuncia.imagens = [];
      }
    }

    // Injeta as propriedades de segurança da ONG
    this.aplicarCriadorSeguranca();
  }

  aplicarCriadorSeguranca() {
    const ongSalva = localStorage.getItem('ong_perfil_atual');

    if (ongSalva && this.denuncia) {
      const ongData = JSON.parse(ongSalva);
      let temp: any = this.denuncia;

      temp.usuario_nome = temp.usuario_nome || temp.nome_usuario || temp.autor || ongData.nome;
      temp.usuario_foto = temp.usuario_foto || temp.foto_usuario || ongData.avatar;
      temp.tipo_usuario = 'ong';
      temp.usuarios_id = temp.usuarios_id || ongData.id;
    }
  }

  onScroll(event: any) {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    this.imagemAtiva = Math.round(scrollLeft / width);
  }

  async compartilhar() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Denúncia: ${this.denuncia.titulo}`,
          text: `Ajude neste caso: ${this.denuncia.titulo}. Local: ${this.denuncia.localizacao}`
        });
      } catch (err) {
        console.error('Erro ao compartilhar', err);
      }
    }
  }

  goBack() {
    this.location.back();
  }

  irParaPerfilOng() {
    const criadorId = (this.denuncia as any).usuarios_id;

    if (!criadorId) {
      console.error('ID do denunciante não encontrado.');
      return;
    }

    this.navCtrl.navigateForward('/perfil-publico', {
      state: { usuario_id: criadorId }
    });
  }

  async oferecerAjuda() {
    const toast = await this.toastCtrl.create({
      message: 'Redirecionando para contato com o denunciante...',
      duration: 2000,
      color: 'warning',
      icon: 'alert-circle'
    });
    toast.present();
  }
}