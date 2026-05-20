import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: false
})
export class EditarPerfilPage implements OnInit {
  usuario: any = { nome: '', telefone: '' };

  fotoSelecionada: File | null = null;
  previewFoto: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private toastCtrl: ToastController,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.carregarDadosAtuais();
  }

  // Puxa os dados que já estão no banco para preencher a tela
  carregarDadosAtuais() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get('http://localhost:3000/api/perfil', { headers }).subscribe({
      next: (res: any) => {
        this.usuario = res;

        if (this.usuario && this.usuario.foto_perfil) {
          this.usuario.fotoUrl = `http://localhost:3000/uploads/${this.usuario.foto_perfil}`;
        }
      }, // 🔴 A VÍRGULA QUE ESTAVA FALTANDO É ESSA AQUI!
      error: (err) => console.error('Erro ao buscar dados do perfil:', err)
    });
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
        },
        error: (err) => console.error('Erro ao buscar usuário:', err)
      });
  }




  // Exatamente igual ao sistema de postagens
  selecionarFoto(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.fotoSelecionada = event.target.files[0];

      // Atualiza a bolinha da foto na hora para o usuário ver o que escolheu
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewFoto = e.target.result;
      };
      reader.readAsDataURL(this.fotoSelecionada!);
    }
  }

  salvarPerfil() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.mostrarToast('Você precisa estar logado.', 'danger');
      return;
    }

    // 1. Prepara os dados (perfeito, não mude nada aqui)
    const formData = new FormData();
    formData.append('nome', this.usuario.nome);
    formData.append('telefone', this.usuario.telefone);

    if (this.fotoSelecionada) {
      formData.append('foto', this.fotoSelecionada);
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    // 2. Dispara para o Backend
    this.http.put('http://localhost:3000/api/perfiledit', formData, { headers }).subscribe({
      next: (response: any) => {

        window.dispatchEvent(new CustomEvent('fotoAtualizada'));

        this.navCtrl.back();
      }
    });
  }

  async mostrarToast(mensagem: string, cor: string) {
    const toast = await this.toastCtrl.create({
      message: mensagem,
      duration: 2500,
      color: cor,
      position: 'top'
    });
    toast.present();
  }
}