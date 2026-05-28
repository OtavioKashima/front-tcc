import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

// 1. Atualizamos a interface para refletir os dados que o HTML pede
interface Pet {
  titulo: string;
  idade: string;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
  raca?: string;   // Adicionado para o HTML
  genero?: string; // Adicionado para o HTML
}

@Component({
  selector: 'app-adocao-detalhe',
  templateUrl: './adocoes-detalhes.page.html',
  styleUrls: ['./adocoes-detalhes.page.scss'],
  standalone: false
})
export class AdocoesDetalhesPage implements OnInit {

  // 2. Inicializamos as novas variáveis vazias por segurança
  pet: Pet = {
    titulo: '',
    idade: '',
    imagem: '',
    descricao: '',
    descricaoCompleta: '',
    raca: 'Não informada',
    genero: 'Não informado'
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastCtrl: ToastController // Importado para dar feedback visual nos botões novos
  ) {}

  ngOnInit() {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['pet']) {
      this.pet = nav.extras.state['pet'];
    }
  }

  irParaComentarios() {
    this.navCtrl.navigateForward('/comentario', {
      state: { pet: this.pet }
    });
  }

  async compartilhar() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Adoção: ${this.pet.titulo}`,
          text: `Conheça ${this.pet.titulo}! ${this.pet.descricaoCompleta}`
        });
      } catch (err) {
        console.error('Erro ao compartilhar', err);
      }
    }
  }

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/adocoes');
  }

  // ==========================================
  // NOVAS FUNÇÕES INTEGRADAS AO HTML
  // ==========================================

  irParaPerfilOng() {
    // Redireciona para o perfil da ONG (você pode ajustar a rota conforme seu projeto)
    console.log('Navegando para o perfil da ONG...');
    // this.navCtrl.navigateForward('/perfil-ong'); 
  }

  async queroAdotar() {
    // Lógica do botão flutuante "Quero Adotar"
    // Pode abrir o WhatsApp, um formulário ou chat. Por enquanto, exibe um aviso:
    const toast = await this.toastCtrl.create({
      message: 'Redirecionando para o formulário de adoção...',
      duration: 2000,
      color: 'success',
      icon: 'paw'
    });
    toast.present();
  }
}