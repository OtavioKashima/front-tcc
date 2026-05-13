import { Component, OnInit } from '@angular/core';
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
    private navCtrl: NavController
  ) {}

  // Dispara as buscas assim que a tela abre
  ngOnInit() {
    this.carregarDadosUsuario();
    this.carregarMinhasPostagens();
  }

  // Se o usuário sair da tela e voltar (ex: fez uma postagem nova), recarrega a lista
  ionViewWillEnter() {
    this.carregarMinhasPostagens();
  }

  carregarDadosUsuario() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    // Rota no backend para pegar os dados do dono do token
    this.http.get('http://localhost:3000/api/perfil', { headers })
      .subscribe({
        next: (res: any) => {
          this.usuario = res;
        },
        error: (err) => console.error('Erro ao buscar usuário:', err)
      });
  }

  carregarMinhasPostagens() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    // Rota no backend para pegar apenas as postagens deste usuário
    this.http.get('http://localhost:3000/api/postagens/minhas', { headers })
      .subscribe({
        next: (res: any) => {
          this.minhasPostagens = res;
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