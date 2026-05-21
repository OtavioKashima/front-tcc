import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NavController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-editar-postagem',
  templateUrl: './editar-postagem.page.html',
  styleUrls: ['./editar-postagem.page.scss'],
  standalone: false
})
export class EditarPostagemPage implements OnInit {
  postId: string | null = null;
  carregando: boolean = true;
  isAdminOuOng: boolean = false; 

  // Objeto com as colunas EXATAS do banco de dados
  post: any = {
    tipo_postagem: '',
    titulo: '',
    descricao: '',
    raca: '',
    genero: '',
    idade: null,
    foto: ''
  };

  // 🔴 NOVAS VARIÁVEIS PARA GESTÃO DE IMAGEM
  fotoPreviewURL: string | null = null; // Guarda a imagem que aparece na tela (local ou servidr)
  novaFotoArquivo: File | null = null;  // Guarda o arquivo real para enviar ao backend

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private navCtrl: NavController,
    private toastController: ToastController,
    private alertController: AlertController,
    private cdr: ChangeDetectorRef // Para forçar atualização da tela se necessário
  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('id');
    
    // Verifica nível de acesso
    const tipoUsuario = localStorage.getItem('tipo_usuario'); 
    if (tipoUsuario === 'admin' || tipoUsuario === 'ong') {
      this.isAdminOuOng = true;
    }

    if (this.postId) {
      this.carregarPostagem(this.postId);
    }
  }

  carregarPostagem(id: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get(`http://localhost:3000/api/postagens/${id}`, { headers })
      .subscribe({
        next: (res: any) => {
          this.post = res;
          
          // 🔴 SOLUÇÃO ANTI-CACHE (IGUAL DO PERFIL)
          // Se o post já tem foto, montamos a URL com timestamp para quebrar o cache
          if (this.post.foto) {
            const timestamp = new Date().getTime();
            this.fotoPreviewURL = `http://localhost:3000/uploads/${this.post.foto}?t=${timestamp}`;
          } else {
            // Imagem padrão caso não tenha foto
            this.fotoPreviewURL = 'assets/img/sem-foto.png'; 
          }

          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro ao carregar postagem', err);
          this.mostrarToast('Erro ao carregar dados.', 'danger');
          this.carregando = false;
        }
      });
  }

  // 🔴 LÓGICA DE SELEÇÃO DE IMAGEM
  // Aciona o clique no input file escondido
  gatilhoSelecaoArquivo() {
    document.getElementById('inputFotoPost')?.click();
  }

  // Captura o arquivo selecionado pelo usuário
  onFileSelected(event: any) {
    const arquivo = event.target.files[0];
    if (arquivo) {
      this.novaFotoArquivo = arquivo; // Guarda o arquivo para o upload

      // Cria um preview local para o usuário ver antes de salvar (FileReader)
      const reader = new FileReader();
      reader.onload = () => {
        this.fotoPreviewURL = reader.result as string; // Atualiza a imagem na tela
        this.cdr.detectChanges(); // Força o Angular a renderizar a nova imagem
      };
      reader.readAsDataURL(arquivo);
    }
  }

  async salvarEdicao() {
    if (!this.post.titulo || !this.post.descricao) {
      this.mostrarToast('Título e Descrição são obrigatórios!', 'warning');
      return;
    }

    const token = localStorage.getItem('token');
    // 🔴 IMPORTANTE: Para FormData, não definimos o Content-Type manual, o navegador faz isso.
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.carregando = true; // Mostra loading ao salvar

    // 🔴 MUDANÇA CRUCIAL: Usando FormData para enviar arquivo e texto juntos
    const formData = new FormData();
    formData.append('tipo_postagem', this.post.tipo_postagem);
    formData.append('titulo', this.post.titulo);
    formData.append('descricao', this.post.descricao);
    
    // Campos condicionais (só enviamos se não for denúncia, para limpar o banco se mudou o tipo)
    if (this.post.tipo_postagem !== 'denuncia') {
      formData.append('raca', this.post.raca || '');
      formData.append('genero', this.post.genero || '');
      formData.append('idade', this.post.idade ? this.post.idade.toString() : '');
    }

    // Se o usuário selecionou uma nova foto, adiciona ela ao FormData
    if (this.novaFotoArquivo) {
      formData.append('foto', this.novaFotoArquivo);
    }

    // Envia o PUT usando FormData
    this.http.put(`http://localhost:3000/api/postperfil/${this.postId}`, formData, { headers })
      .subscribe({
        next: (res: any) => {
          this.carregando = false;
          this.mostrarToast('Postagem atualizada com sucesso!', 'success');
          
          // Emite um evento global para avisar o Perfil para atualizar a lista
          window.dispatchEvent(new CustomEvent('postagemAtualizada'));
          
          this.navCtrl.back(); // Volta para o perfil
        },
        error: (err) => {
          this.carregando = false;
          console.error('Erro ao salvar', err);
          this.mostrarToast('Erro ao atualizar. Verifique os dados.', 'danger');
        }
      });
  }

  async mostrarToast(mensagem: string, cor: string) {
    const toast = await this.toastController.create({
      message: mensagem, duration: 2000, color: cor, position: 'bottom'
    });
    toast.present();
  }
}