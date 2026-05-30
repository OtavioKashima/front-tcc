import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // 🟢 IMPORTANTE ADICIONAR

@Component({
  selector: 'app-perfil-publico',
  templateUrl: './perfil-publico.page.html',
  styleUrls: ['./perfil-publico.page.scss'],
  standalone: false
})
export class PerfilPublicoPage implements OnInit {
  abaAtiva: string = 'postagens';
  usuarioId!: number; // Vai guardar o ID que veio da tela anterior

  postagensUsuario: any[] = []; // Vai guardar as postagens dessa pessoa

  perfil: any = {
    nome: 'Carregando...',
    tipo: 'usuario',
    fotoPerfil: 'assets/avatar-default.png',
    fotoCapa: 'assets/cover-default.jpg',
    bio: '',
    cidade: '',
    estado: ''
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private http: HttpClient // 🟢 INJETAR O HTTP
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['usuario_id']) {
      this.usuarioId = nav.extras.state['usuario_id'];
      
      // Dispara o carregamento dos dados reais do banco
      this.carregarDadosDoPerfil();
      this.carregarPostagensDoUsuario();
    }
  }

  carregarDadosDoPerfil() {
    this.http.get(`http://localhost:3000/api/usuarios/${this.usuarioId}`).subscribe({
      next: (res: any) => {
        this.perfil = res;
        
        // Formata as fotos com o caminho do seu servidor local
        if (this.perfil.foto_perfil) {
          this.perfil.fotoPerfil = `http://localhost:3000/uploads/${this.perfil.foto_perfil}`;
        } else {
          this.perfil.fotoPerfil = 'assets/avatar-default.png';
        }

        // Se você tiver uma coluna de foto_capa, descomente abaixo:
        // this.perfil.fotoCapa = this.perfil.foto_capa ? `http://localhost:3000/uploads/${this.perfil.foto_capa}` : 'assets/cover-default.jpg';
        this.perfil.fotoCapa = 'assets/cover-default.jpg'; 

        // Adapta as variáveis locais para o que o HTML espera
        this.perfil.tipo = this.perfil.tipo_usuario || 'usuario'; 
        this.perfil.chavePix = this.perfil.chave_pix;
      },
      error: (err) => console.error('Erro ao carregar dados do perfil público', err)
    });
  }

  carregarPostagensDoUsuario() {
    this.http.get(`http://localhost:3000/api/postagens/usuario/${this.usuarioId}`).subscribe({
      next: (res: any) => {
        const dadosReais = Array.isArray(res) ? res : [];

        // Converte o campo 'foto' de string JSON para Array (exatamente como você faz no feed)
        this.postagensUsuario = dadosReais.map((post: any) => {
          if (post.foto) {
            try { post.fotosArray = JSON.parse(post.foto); }
            catch (e) { post.fotosArray = [post.foto]; }
          } else { post.fotosArray = []; }
          return post;
        });
      },
      error: (err) => console.error('Erro ao carregar postagens do usuário', err)
    });
  }

  trocarAba(event: any) {
    this.abaAtiva = event.detail.value;
  }

  voltar() {
    this.navCtrl.back();
  }
}