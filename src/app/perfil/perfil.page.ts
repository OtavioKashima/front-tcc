import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // 🔴 CORRIGIDO: Importado do lugar certo!
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: false
})
export class PerfilPage implements OnInit {
  // Variável para os dados do usuário logado
  usuario: any = {
    nome: 'Carregando...',
    telefone: '',
    foto: null
  };

  // Listas para controle de dados e filtros
  minhasPostagens: any[] = [];
  postagensFiltradas: any[] = [];
  postagensExibidas: any[] = [];

  // Controle de Paginação
  paginaAtual: number = 1;
  itensPorPagina: number = 3;
  totalPaginas: number = 1;

  // Estados dos Filtros
  termoBusca: string = '';
  filtroSegmento: string = 'todas';

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alertController: AlertController
  ) {
    window.addEventListener('fotoAtualizada', () => {
      this.carregarDadosUsuario();
    });
  }

  ngOnInit() {
    this.carregarDadosUsuario();
    this.carregarMinhasPostagens();
  }

  ionViewWillEnter() {
    if (!this.usuario || this.usuario.nome === 'Carregando...') {
      this.carregarDadosUsuario();
    }
    this.carregarMinhasPostagens();
  }

  carregarDadosUsuario() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const apiTimestamp = new Date().getTime();

    this.http.get(`http://localhost:3000/api/perfil?t=${apiTimestamp}`, { headers })
      .subscribe({
        next: (res: any) => {
          this.usuario = res;
          if (this.usuario && this.usuario.foto_perfil) {
            const imgTimestamp = new Date().getTime();
            this.usuario.fotoUrl = `http://localhost:3000/uploads/${this.usuario.foto_perfil}?t=${imgTimestamp}`;
          }
          this.cdr.detectChanges();
        },
        error: (err: any) => console.error('Erro ao buscar usuário:', err) // 🔴 CORRIGIDO: Tipado explicitamente como any
      });
  }

  carregarMinhasPostagens() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get('http://localhost:3000/api/postperfil', { headers })
      .subscribe({
        next: (res: any) => {
          this.minhasPostagens = res.map((post: any) => {
            return {
              ...post,
              fotoUrl: post.foto ? `http://localhost:3000/uploads/${post.foto}` : null
            };
          });

          this.aplicarFiltrosEPaginacao();
        },
        error: (err: any) => console.error('Erro ao buscar minhas postagens:', err) // 🔴 CORRIGIDO: Tipado explicitamente como any
      });
  }

  aplicarFiltrosEPaginacao() {
    let resultado = this.minhasPostagens.filter(post => {
      const termo = this.termoBusca.toLowerCase();
      const tituloMatch = post.titulo?.toLowerCase().includes(termo);
      const descMatch = post.descricao?.toLowerCase().includes(termo);
      return tituloMatch || descMatch;
    });

    if (this.filtroSegmento === 'recentes') {
      resultado = [...resultado].reverse();
    }

    this.postagensFiltradas = resultado;
    this.totalPaginas = Math.ceil(this.postagensFiltradas.length / this.itensPorPagina) || 1;

    if (this.paginaAtual > this.totalPaginas) {
      this.paginaAtual = this.totalPaginas;
    }

    const indexInicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const indexFim = indexInicio + this.itensPorPagina;
    this.postagensExibidas = this.postagensFiltradas.slice(indexInicio, indexFim);

    this.cdr.detectChanges();
  }

  pesquisarPost(event: any) {
    this.termoBusca = event.target.value || '';
    this.paginaAtual = 1;
    this.aplicarFiltrosEPaginacao();
  }

  filtrarCategoria(event: any) {
    this.filtroSegmento = event.detail.value;
    this.paginaAtual = 1;
    this.aplicarFiltrosEPaginacao();
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.aplicarFiltrosEPaginacao();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.aplicarFiltrosEPaginacao();
    }
  }

  editPerfil() {
    this.navCtrl.navigateForward('/editar-perfil');
  }

  logout() {
    localStorage.removeItem('token');
    this.usuario = null;
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  editarDenuncia(post: any) {
    // Aqui você direciona o usuário para a tela de edição, passando o ID da postagem.
    // Atenção: Ajuste a rota '/editar-postagem' para o nome da tela que você usa no seu app.
    this.navCtrl.navigateForward(`/editar-postagem/${post.id}`);
  }

  // 2. Função para Excluir
  async excluirDenuncia(post: any) {
    const alert = await this.alertController.create({
      header: 'Excluir Postagem',
      message: 'Tem certeza que deseja apagar esta postagem? Essa ação não pode ser desfeita.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary'
        },
        {
          text: 'Excluir',
          role: 'destructive', // Faz o botão ficar vermelho no iOS/Android
          handler: () => {
            // Se clicar em excluir, executa a requisição
            const token = localStorage.getItem('token');
            if (!token) return;

            const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

            this.http.delete(`http://localhost:3000/api/postagensDelete/${post.id}`, { headers })
              .subscribe({
                next: () => {
                  this.minhasPostagens = this.minhasPostagens.filter(p => p.id !== post.id);
                  this.aplicarFiltrosEPaginacao();
                },
                error: (err: any) => console.error('Erro ao excluir:', err)
              });
          }
        }
      ]
    });

    await alert.present();
  }
}