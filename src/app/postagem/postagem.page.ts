import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PostagemPage implements OnInit {
  // Controle de exibição e permissão
  tipoSelecionado = '';
  isAdminOuOng = false;

  // Variáveis do formulário (Banco de Dados)
  tipo_postagem = '';
  titulo = '';
  descricao = '';
  localizacao = '';
  raca = '';
  genero = '';
  idade: number | null = null;

  // Variáveis para a imagem
  fotosSelecionadas: File[] = [];
  fotosPreviews: string[] = [];
  fotoSelecionada: File | null = null;
  fotoPreview: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient, private navCtrl: NavController) { }

  ngOnInit() {
    // 🔴 Verifica o tipo do usuário salvo na hora do login
    const tipoUsuario = localStorage.getItem('tipo_usuario');

    if (tipoUsuario === 'admin' || tipoUsuario === 'ong') {
      this.isAdminOuOng = true;
    } else {
      // 🔴 Se for usuário comum, já trava e pré-seleciona "denuncia"
      this.isAdminOuOng = false;
      this.tipoSelecionado = 'denuncia';
      this.tipo_postagem = 'denuncia';
    }
  }

  // Função para capturar a escolha do ion-select e ajustar para o MySQL
  mudarTipo(event: any) {
    this.tipoSelecionado = event.detail.value;
    this.tipo_postagem = this.tipoSelecionado;
  }

  // Função para capturar a foto do HTML
  selecionarFoto(event: any) {
    const files = event.target.files;

    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Adiciona o arquivo real na lista para enviar ao banco
        this.fotosSelecionadas.push(file);

        // Gera o preview para mostrar na tela
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.fotosPreviews.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removerFoto(index: number) {
    this.fotosSelecionadas.splice(index, 1);
    this.fotosPreviews.splice(index, 1);
  }
  
  goBack(): void {
    this.navCtrl.navigateBack('/tabs/doacoes');
  }

  // Função para enviar para o Node.js
  enviarPostagem() {
    if (!this.tipo_postagem) {
      alert('Por favor, selecione o tipo de postagem!');
      return;
    }

    // Validação básica: Título e Descrição continuam sendo obrigatórios
    if (!this.titulo || !this.descricao) {
      alert('Título e Descrição são obrigatórios!');
      return;
    }

    const formData = new FormData();
    formData.append('tipo_postagem', this.tipo_postagem);
    formData.append('titulo', this.titulo);
    formData.append('descricao', this.descricao);

    if (this.localizacao) formData.append('localizacao', this.localizacao);

    if (this.tipo_postagem !== 'denuncia') {
      if (this.raca) formData.append('raca', this.raca);
      if (this.genero) formData.append('genero', this.genero);
      if (this.idade) formData.append('idade', this.idade.toString());
    }

    // 🔴 TRUQUE AQUI: Envia todas as fotos selecionadas usando a mesma chave 'fotos'
    if (this.fotosSelecionadas.length > 0) {
      this.fotosSelecionadas.forEach((foto) => {
        formData.append('fotos', foto); // O Node.js vai receber isso como um Array
      });
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.post('http://localhost:3000/api/postagens', formData, { headers })
      .subscribe({
        next: (res: any) => {
          console.log('Postagem salva com sucesso!', res);
          window.dispatchEvent(new CustomEvent('postagemCriada'));
          this.navCtrl.navigateRoot('/tabs');
        },
        error: (err: any) => {
          console.error('Erro ao salvar', err.error);
          alert('Erro ao enviar postagem.');
        }
      });
  }
}