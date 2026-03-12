import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PostagemPage {
  // 👇 Variável para o HTML (mostra/esconde os campos baseados na seleção)
  tipoSelecionado = '';

  // Variáveis do formulário (Banco de Dados)
  tipo_postagem = ''; 
  titulo = '';
  descricao = '';
  raca = '';
  genero = '';
  idade: number | null = null;

  // Variáveis para a imagem
  fotoSelecionada: File | null = null;
  fotoPreview: string | ArrayBuffer | null = null;

  // Injetando o HttpClient no construtor
  constructor(private http: HttpClient) {}

  // 👇 Função para capturar a escolha do ion-select e ajustar para o MySQL
  mudarTipo(event: any) {
    this.tipoSelecionado = event.detail.value;

    if (this.tipoSelecionado === 'adocao') {
      this.tipo_postagem = 'adoção';
    } else if (this.tipoSelecionado === 'doacao') {
      this.tipo_postagem = 'doação';
    } else if (this.tipoSelecionado === 'denuncia') {
      this.tipo_postagem = 'denuncia';
    }
  }

  // Função para capturar a foto do HTML
  selecionarFoto(event: any) {
    const file = event.target.files[0];
    
    if (file) {
      this.fotoSelecionada = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Função para enviar para o Node.js
  enviarPostagem() {
    // Trava para não enviar vazio
    if (!this.tipo_postagem) {
      alert('Por favor, selecione o tipo de postagem!');
      return;
    }

    const formData = new FormData();
    
    formData.append('tipo_postagem', this.tipo_postagem);
    formData.append('titulo', this.titulo);
    formData.append('descricao', this.descricao);
    
    // Anexa campos opcionais apenas se estiverem preenchidos
    if (this.raca) formData.append('raca', this.raca);
    if (this.genero) formData.append('genero', this.genero);
    if (this.idade) formData.append('idade', this.idade.toString());
    
    // Anexa a foto
    if (this.fotoSelecionada) {
      formData.append('foto', this.fotoSelecionada); 
    }

    // Pega o token (ajuste a chave se você salvou com outro nome no login)
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:3000/api/postagens', formData, { headers })
      .subscribe({
        next: (res: any) => {
          console.log('Postagem salva com sucesso!', res);
          alert('Postagem enviada com sucesso!');
          // Aqui você pode limpar os campos ou redirecionar o usuário
        },
        error: (err: any) => {
          console.error('Erro ao salvar a postagem', err);
          alert('Erro ao enviar postagem. Verifique o console.');
        }
      });
  }
}