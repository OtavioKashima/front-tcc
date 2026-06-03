import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-perfil-publico',
  templateUrl: './perfil-publico.page.html',
  styleUrls: ['./perfil-publico.page.scss'],
  standalone: false
})
export class PerfilPublicoPage implements OnInit {

  // Controle da Aba Selecionada ('adocoes' ou 'denuncias')
  tabAtiva: string = 'adocoes';
  adocoes: any[] = [];

  // Objeto principal da ONG/Usuário
  ong: any = {
    nome: '',
    cidade: '',
    estado: '',
    descricao: '',
    avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
    admin: null // 🟢 Começa nulo até o banco responder
  };

  // Arrays para armazenar as postagens
  postagens: any[] = [];
  denuncias: any[] = [];
  comunicados: any[] = [];

  // ID do usuário recebido da navegação
  usuarioId: number = 0;

  // URL base do servidor
  readonly urlUploads = 'http://localhost:3000/uploads/';
  readonly apiUrl = 'http://localhost:3000/api';

  constructor(
    private location: Location,
    private router: Router,
    private navCtrl: NavController,
    private http: HttpClient,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    // 1. Receber os dados da navegação (o state passado da tela Início)
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['usuario_id']) {
      this.usuarioId = nav.extras.state['usuario_id'];
      this.carregarPerfil();
    } else {
      // Se não houver ID (acesso direto à tela, etc.), volta pro início
      this.goBack();
    }
  }

  // Busca os dados do usuário (ONG/Protetor)
  carregarPerfil() {
    this.http.get(`${this.apiUrl}/usuarios/${this.usuarioId}`).subscribe({
      next: (res: any) => {
        this.ong = {
          id: this.usuarioId,
          nome: res.nome,
          cidade: res.cidade || 'Local não informado',
          estado: res.estado || '',
          descricao: res.bio || '',
          avatar: res.foto_perfil ? `${this.urlUploads}${res.foto_perfil}` : 'https://ionicframework.com/docs/img/demos/avatar.svg',
          foto_perfil: res.foto_perfil,
          // 🟢 Garante que 'admin' seja tratado estritamente como número (0, 1 ou 2)
          admin: res.admin !== undefined ? Number(res.admin) : 0
        };

        // 🟢 SE FOR USUÁRIO COMUM (admin === 0): Força a aba ativa a ser 'denuncias'
        if (this.ong.admin === 0) {
          this.tabAtiva = 'denuncias';
        }

        this.carregarPostagensUsuario();
      },
      error: (err) => {
        console.error('Erro ao buscar perfil:', err);
        this.mostrarToast('Erro ao carregar perfil.');
      }
    });
  }

  // Busca TODAS as postagens desse usuário específico
  carregarPostagensUsuario() {
    this.http.get(`${this.apiUrl}/postagens/usuario/${this.usuarioId}`).subscribe({
      next: (res: any) => {
        // Zera os arrays
        this.postagens = [];
        this.denuncias = [];
        this.comunicados = [];

        // Filtra e formata as postagens conforme o tipo
        res.forEach((post: any) => {

          // Formata as imagens do grid
          let fotosArray: string[] = [];
          let imagemUrl = 'assets/img/placeholder.png';

          if (post.foto) {
            try {
              const fotosParsed = JSON.parse(post.foto);
              if (Array.isArray(fotosParsed)) {
                fotosArray = fotosParsed;
                if (fotosParsed.length > 0) {
                  imagemUrl = `${this.urlUploads}${fotosParsed[0]}`;
                }
              } else {
                fotosArray = [post.foto];
                imagemUrl = `${this.urlUploads}${post.foto}`;
              }
            } catch (e) {
              fotosArray = [post.foto];
              imagemUrl = `${this.urlUploads}${post.foto}`;
            }
          }

          // 🟢 O PULO DO GATO: Injetamos o usuário criador aqui
          const postFormatado = {
            ...post, // Mantém dados originais do post (titulo, descricao, etc.)
            id: post.id || post.id_postagem || post._id,
            imagem: imagemUrl,
            fotosArray: fotosArray,
            saved: false,

            // 1. Se a sua tela de detalhes procura por um objeto "usuario" (padrão do feed)
            usuario: {
              id: this.ong.id,
              nome: this.ong.nome,
              foto_perfil: this.ong.foto_perfil,
              avatar: this.ong.avatar
            },

            // 2. Se a sua tela de detalhes procura por propriedades diretas (flat)
            nome_usuario: this.ong.nome,
            foto_usuario: this.ong.avatar,
            usuario_id: this.ong.id
          };

          // Distribui nos arrays corretos usando o campo tipo_postagem
          if (post.tipo_postagem === 'adocao') {
            this.postagens.push(postFormatado);
          } else if (post.tipo_postagem === 'denuncia') {
            this.denuncias.push(postFormatado);
          } else if (post.tipo_postagem === 'comunicado') {
            this.comunicados.push(postFormatado);
          }
        });

        console.log('Postagens prontas com criador injetado:', this.postagens);
      },
      error: (err) => {
        console.error('Erro ao buscar postagens:', err);
      }
    });
  }

  // ==========================================
  // NAVEGAÇÃO E AÇÕES
  // ==========================================

  goBack() {
    this.location.back();
  }

  compartilharOng() {
    this.mostrarToast(`Link para doar a ${this.ong.nome} copiado!`);
  }

  compartilhar(post: any) {
    this.mostrarToast('Link de adoção copiado!');
  }

  compartilharDenuncia(post: any) {
    this.mostrarToast('Link de denúncia copiado!');
  }

  salvar(post: any) {
    post.saved = !post.saved;
    const msg = post.saved ? 'Postagem salva.' : 'Removido dos salvos.';
    this.mostrarToast(msg);
  }

  // Abrir detalhes de Adoção
  abrirDetalhe(post: any) {
    // Salva a ONG atual no "espelho de segurança" do navegador
    localStorage.setItem('ong_perfil_atual', JSON.stringify(this.ong));

    this.router.navigate(['/adocoes-detalhes'], {
      state: { pet: post, postagemSelecionada: post }
    });
  }

  abrirDenuncia(d: any) {
    localStorage.setItem('ong_perfil_atual', JSON.stringify(this.ong));

    this.router.navigate(['/denuncias-detalhes'], {
      state: { pet: d, postagemSelecionada: d }
    });
  }

  abrirComunicado(aviso: any) {
    localStorage.setItem('ong_perfil_atual', JSON.stringify(this.ong));

    // Ajuste a rota abaixo de acordo com o nome real da sua página de detalhes de comunicados
    this.router.navigate(['/comunicado'], {
      state: { comunicado: aviso }
    });
  }

  irParaDoacao() {
    this.navCtrl.navigateForward('/doacoes', { state: { ongSelecionada: this.ong } });
  }

  abrirDetalhes(post: any) {
    this.router.navigate(['/comunicado'], { state: { postagemSelecionada: post } });
  }

  abrirChat() {
    this.router.navigate(['/chat-ong'], {
      state: {
        ong: this.ong,
        pet: null // Como entrou direto pelo perfil, não há contexto de um pet específico
      }
    });
  }

  // Helper para exibir mensagens rápidas na tela
  async mostrarToast(mensagem: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2000,
      position: 'bottom',
      color: 'dark'
    });
    toast.present();
  }
}