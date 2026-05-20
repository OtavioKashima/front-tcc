import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController } from '@ionic/angular';

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

  // Lista para as postagens exclusivas deste usuário
  minhasPostagens: any[] = [];

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) {
    window.addEventListener('fotoAtualizada', () => {
      this.carregarDadosUsuario();
    });
  }



  // Dispara as buscas assim que a tela abre
  ngOnInit() {
    this.carregarDadosUsuario();
    this.carregarMinhasPostagens();
  }

  // Se o usuário sair da tela e voltar (ex: fez uma postagem nova), recarrega a lista
  ionViewWillEnter() {
    // Só busca os dados se a tela estiver vazia (primeiro acesso)
    if (!this.usuario) {
      this.carregarDadosUsuario();
    }
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
        error: (err) => console.error('Erro ao buscar usuário:', err)
      });
  }


  carregarMinhasPostagens() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get('http://localhost:3000/api/postperfil', { headers })
      .subscribe({
        next: (res: any) => {
          // Para cada postagem, criamos a URL completa da foto
          this.minhasPostagens = res.map((post: any) => {
            return {
              ...post,
              fotoUrl: post.foto ? `http://localhost:3000/uploads/${post.foto}` : null
            };
          });
        },
        error: (err) => console.error('Erro ao buscar minhas postagens:', err)
      });
  }

  // Navegações dos botões
  adicionar() {
    this.navCtrl.navigateForward('/postagem'); // Ajuste para a rota correta da sua tela de criar
  }

  editPerfil() {
    this.navCtrl.navigateForward('/editar-perfil'); // Ajuste se houver tela de edição
  }
}