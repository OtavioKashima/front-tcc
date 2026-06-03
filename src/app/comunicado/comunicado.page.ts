import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

interface Comunicado {
  id?: number;
  titulo: string;
  texto: string;
  data?: string;
  imagem?: string;
  imagens?: string[];
  fotosArray?: string[];

  // Informações do criador
  usuarios_id?: number;
  usuario_nome?: string;
  usuario_foto?: string;
  tipo_usuario?: string;
}

@Component({
  selector: 'app-comunicado',
  templateUrl: './comunicado.page.html',
  styleUrls: ['./comunicado.page.scss'],
  standalone: false
})
export class ComunicadoPage implements OnInit {

  imagemAtiva: number = 0;

  comunicado: Comunicado = {
    titulo: 'Carregando...',
    texto: '',
    imagens: []
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();

    if (nav?.extras?.state?.['postagemSelecionada']) {
      // Pegamos o objeto bruto que veio da tela anterior (igual adoções)
      const dados = nav.extras.state['postagemSelecionada'];

      // Mapeamos EXATAMENTE conforme a sua query listarPorTipo
      this.comunicado = {
        id: dados.id,
        titulo: dados.titulo,
        // Se a sua tabela usa 'descricao', pegamos ela:
        texto: dados.descricao || dados.texto || '',
        // A data pura do banco
        data: dados.data_criacao,

        // Os campos do INNER JOIN que você passou no controller:
        usuarios_id: dados.usuarios_id,
        usuario_nome: dados.usuario_nome,
        usuario_foto: dados.usuario_foto,
        tipo_usuario: dados.usuario_admin ? 'admin' : 'usuario'
      };

      const urlDoServidor = 'http://localhost:3000/uploads/';
      let listaDeFotos: string[] = [];

      // Processamento das fotos (idêntico ao que funciona nas outras telas)
      if (dados.fotosArray && dados.fotosArray.length > 0) {
        listaDeFotos = dados.fotosArray;
      } else if (dados.foto) {
        try {
          listaDeFotos = JSON.parse(dados.foto);
        } catch (e) {
          listaDeFotos = [dados.foto];
        }
      }

      // Aplica a URL do servidor
      if (listaDeFotos && listaDeFotos.length > 0) {
        this.comunicado.imagens = listaDeFotos.map(nomeDaImagem => {
          if (nomeDaImagem.startsWith('http')) return nomeDaImagem;
          return `${urlDoServidor}${nomeDaImagem}`;
        });
      } else {
        this.comunicado.imagens = [];
      }
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
          title: `Comunicado: ${this.comunicado.titulo}`,
          text: `Leia o comunicado: ${this.comunicado.titulo}\n\n${this.comunicado.texto}`
        });
      } catch (err) {
        console.error('Erro ao compartilhar', err);
      }
    }
  }

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/inicio');
  }

  irParaPerfilOng() {
    // 🟢 Busca o ID criador direto do objeto clonado
    const criadorId = (this.comunicado as any).usuarios_id;

    if (!criadorId) {
      console.error('Não foi possível encontrar o ID do criador desta postagem.');
      return;
    }

    this.navCtrl.navigateForward('/perfil-publico', {
      state: { usuario_id: criadorId }
    });
  }
}