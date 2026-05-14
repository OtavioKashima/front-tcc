import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
  standalone: false
})
export class EditarPerfilPage implements OnInit {
  usuario = {
    nome: '',
    telefone: ''
  };

  fotoSelecionada: File | null = null;
  previewFoto: string | ArrayBuffer | null = null;

  constructor(
    private http: HttpClient,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.carregarDadosAtuais();
  }

  // Puxa os dados que já estão no banco para preencher a tela
  carregarDadosAtuais() {
    const token = localStorage.getItem('token');
    if (!token) return;

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get('http://localhost:3000/api/perfil', { headers })
      .subscribe({
        next: (res: any) => {
          this.usuario.nome = res.nome;
          this.usuario.telefone = res.telefone;
          if (res.foto) {
            this.previewFoto = `http://localhost:3000/uploads/${res.foto}`;
          }
        },
        error: (err) => console.error('Erro ao buscar dados do perfil:', err)
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

    // 1. Criamos o FormData igualzinho à postagem
    const formData = new FormData();
    formData.append('nome', this.usuario.nome);
    formData.append('telefone', this.usuario.telefone);

    // 2. Se ele escolheu uma foto no input, anexamos com o nome 'foto'
    if (this.fotoSelecionada) {
      formData.append('foto', this.fotoSelecionada);
    }

    // 3. Enviamos o token, mas DEIXAMOS O ANGULAR DECIDIR O CONTENT-TYPE DO FORMDATA!
    const headers = new HttpHeaders({ 
      'Authorization': `Bearer ${token}` 
      // ⚠️ NADA de 'Content-Type' aqui.
    });

    // 4. Dispara para o Node.js (Ajuste a URL para a sua rota exata)
    this.http.put('http://localhost:3000/api/perfiledit', formData, { headers })
      .subscribe({
        next: () => {
          this.mostrarToast('Perfil atualizado com sucesso!', 'success');
          // Altere '/perfil' para o caminho exato do seu arquivo app-routing.module.ts
          this.navCtrl.navigateBack('/tabs/perfil'); 
        },
        error: (err) => {
          console.error('Erro ao atualizar perfil:', err);
          this.mostrarToast('Erro ao atualizar. Tente novamente.', 'danger');
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