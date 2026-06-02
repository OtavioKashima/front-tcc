import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

// 1. Atualizamos a interface para aceitar um array de imagens
interface Pet {
  titulo: string;
  idade: string;
  imagem: string;
  imagens?: string[]; 
  fotos?: string[];
  descricao: string;
  descricaoCompleta: string;
  raca?: string;
  genero?: string;
  
  // 🌟 NOVOS CAMPOS ADICIONADOS PARA RESOLVER O ERRO
  usuario_id?: number;
  usuario_nome?: string;
  usuario_foto?: string;
  usuario_capa?: string;
  usuario_bio?: string;
  usuario_pix?: string;
  tipo_usuario?: 'ong' | 'usuario' | 'admin';
  cidade?: string;
  estado?: string;
}

@Component({
  selector: 'app-adocao-detalhe',
  templateUrl: './adocoes-detalhes.page.html',
  styleUrls: ['./adocoes-detalhes.page.scss'],
  standalone: false
})
export class AdocoesDetalhesPage implements OnInit {

  // Variável para controlar qual bolinha do carrossel está ativa
  imagemAtiva: number = 0;

  pet: Pet = {
    titulo: 'Carregando...',
    idade: '',
    imagem: '', // Fallback
    imagens: [], // Array vazio inicial
    descricao: '',
    descricaoCompleta: '',
    raca: 'Não informada',
    genero: 'Não informado'
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state?.['pet']) {
      // Clona o pet que veio da tela de listagem
      this.pet = { ...nav.extras.state['pet'] };

      // Endereço padrão da API onde ficam as fotos
      const urlDoServidor = 'http://localhost:3000/uploads/';

      // Pega o 'fotosArray' criado na listagem (ou tenta ler o 'foto' bruto se der F5)
      let listaDeFotos: string[] = [];

      if ((this.pet as any).fotosArray && (this.pet as any).fotosArray.length > 0) {
        listaDeFotos = (this.pet as any).fotosArray;
      } else if ((this.pet as any).foto) {
        // Fallback de segurança idêntico à sua função do feed
        try {
          listaDeFotos = JSON.parse((this.pet as any).foto);
        } catch (e) {
          listaDeFotos = [(this.pet as any).foto];
        }
      }

      // Agora mapeamos aplicando a URL do servidor antes de cada nome de imagem
      if (listaDeFotos && listaDeFotos.length > 0) {
        this.pet.imagens = listaDeFotos.map(nomeDaImagem => {
          if (nomeDaImagem.startsWith('http')) {
            return nomeDaImagem;
          }
          return `${urlDoServidor}${nomeDaImagem}`;
        });
      } else {
        // Se realmente não tiver fotos na galeria, usa a imagem principal de capa
        if (this.pet.imagem) {
          const imagemCapa = this.pet.imagem.startsWith('http')
            ? this.pet.imagem
            : `${urlDoServidor}${this.pet.imagem}`;
          this.pet.imagens = [imagemCapa];
        } else {
          this.pet.imagens = [];
        }
      }
    }
  }

  // 🌟 NOVA FUNÇÃO: Atualiza a bolinha ativa ao deslizar o carrossel
  onScroll(event: any) {
    const scrollLeft = event.target.scrollLeft;
    const width = event.target.clientWidth;
    // Calcula em qual índice o scroll está focado
    this.imagemAtiva = Math.round(scrollLeft / width);
  }

  irParaComentarios() {
    this.navCtrl.navigateForward('/comentario', {
      state: { pet: this.pet }
    });
  }

  async compartilhar() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Adoção: ${this.pet.titulo}`,
          text: `Conheça ${this.pet.titulo}! ${this.pet.descricaoCompleta}`
        });
      } catch (err) {
        console.error('Erro ao compartilhar', err);
      }
    }
  }

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/adocoes');
  }

  irParaPerfilOng() {
    // Pegamos o ID do criador da postagem que veio do banco de dados (usuarios_id)
    const criadorId = (this.pet as any).usuarios_id;

    if (!criadorId) {
      console.error('Não foi possível encontrar o ID do criador desta postagem.');
      return;
    }

    // Navega para a tela de perfil público passando o ID do criador
    this.navCtrl.navigateForward('/perfil-publico', {
      state: { usuario_id: criadorId }
    });
  }


  async queroAdotar() {
    const toast = await this.toastCtrl.create({
      message: 'Redirecionando para o formulário de adoção...',
      duration: 2000,
      color: 'success',
      icon: 'paw'
    });
    toast.present();
  }
}