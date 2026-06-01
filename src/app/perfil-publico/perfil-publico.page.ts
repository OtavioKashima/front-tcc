import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil-publico',
  templateUrl: './perfil-publico.page.html',
  styleUrls: ['./perfil-publico.page.scss'],
  standalone: false
})
export class PerfilPublicoPage implements OnInit {
  abaAtiva: string = 'postagens';
  usuarioId!: number;

  postagens: any[] = []; 

  usuario: any = {
    nome: 'Carregando...',
    admin: 0, // 🟢 Agora esperamos receber o nível de acesso
    tipoDisplay: '', // 🟢 Variável que vai guardar o texto final (ONG, Admin, Usuário)
    foto_perfil: null,
    bio: '',
    cidade: '',
    estado: '',
    telefone: ''
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private http: HttpClient
  ) { }

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['usuario_id']) {
      this.usuarioId = nav.extras.state['usuario_id'];
      
      this.carregarDadosDoPerfil();
      this.carregarPostagensDoUsuario();
    }
  }

  carregarDadosDoPerfil() {
    this.http.get(`http://localhost:3000/api/usuarios/${this.usuarioId}`).subscribe({
      next: (res: any) => {
        this.usuario = res;
        
        // 🟢 LÓGICA DE TRADUÇÃO DO TIPO DE USUÁRIO
        if (this.usuario.admin === 1) {
          this.usuario.tipoDisplay = 'Administrador';
        } else if (this.usuario.admin === 2) {
          this.usuario.tipoDisplay = 'ONG';
        } else {
          this.usuario.tipoDisplay = 'Usuário Comum';
        }
        
        if (this.usuario.foto_perfil && !this.usuario.foto_perfil.startsWith('http')) {
          this.usuario.foto_perfil = `http://localhost:3000/uploads/${this.usuario.foto_perfil}`;
        }
      },
      error: (err) => console.error('Erro ao carregar dados do perfil público', err)
    });
  }

  carregarPostagensDoUsuario() {
    this.http.get(`http://localhost:3000/api/postagens/usuario/${this.usuarioId}`).subscribe({
      next: (res: any) => {
        const dadosReais = Array.isArray(res) ? res : [];

        this.postagens = dadosReais.map((post: any) => {
          if (post.foto) {
            try { 
              let fotosArray = JSON.parse(post.foto); 
              post.foto = fotosArray[0]; 
            }
            catch (e) {}

            if (post.foto && !post.foto.startsWith('http')) {
              post.foto = `http://localhost:3000/uploads/${post.foto}`;
            }
          }
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