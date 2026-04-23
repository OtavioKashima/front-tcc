import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

interface Pet {
  titulo: string;
  idade: string;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
  raca?: string;
  genero?: string;
  usuario?: {
    nome: string;
    avatar: string;
    cidade: string;
  };
}

const ONG_FRADA = {
  nome: 'Frada',
  avatar: 'https://adotar.com.br/uploadadm/logo_ong4041.jpg?w=410&format=webp',
  cidade: 'São Paulo',
  whatsapp: '5511999999999'
};

@Component({
  selector: 'app-adocao-detalhe',
  templateUrl: './adocao-detalhe.page.html',
  styleUrls: ['./adocao-detalhe.page.scss'],
  standalone: false
})
export class AdocaoDetalhePage implements OnInit {

  pet: Pet = {
    titulo: '',
    idade: '5 anos',
    imagem: '',
    descricao: '',
    descricaoCompleta: '',
    raca: 'SRD',
    genero: 'Macho'
  };

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['pet']) {
      const petRecebido = nav.extras.state['pet'];
      this.pet = {
        ...petRecebido,
        raca: petRecebido.raca === 'Viralata' ? 'SRD' : (petRecebido.raca || 'SRD'),
        genero: petRecebido.genero || 'Macho',
        idade: petRecebido.idade || '5 anos'
      };
    } else if (history.state?.pet) {
      const petRecebido = history.state.pet;
      this.pet = {
        ...petRecebido,
        raca: petRecebido.raca === 'Viralata' ? 'SRD' : (petRecebido.raca || 'SRD'),
        genero: petRecebido.genero || 'Macho',
        idade: petRecebido.idade || '5 anos'
      };
    }
  }

  irParaPerfilOng(): void {
    this.navCtrl.navigateForward('/perfil-ong', {
      state: { ong: ONG_FRADA }
    });
  }

  queroAdotar(): void {
    this.navCtrl.navigateForward('/chat-ong', {
      state: {
        ong: ONG_FRADA,
        pet: this.pet
      }
    });
  }

  irParaComentarios(): void {
    this.navCtrl.navigateForward('/comentario', {
      state: { pet: this.pet }
    });
  }

  async compartilhar(): Promise<void> {
    if (navigator.share) {
      await navigator.share({
        title: this.pet.titulo,
        text: this.pet.descricaoCompleta
      });
    }
  }

  goBack(): void {
    this.navCtrl.navigateBack('/tabs/adocoes');
  }
}