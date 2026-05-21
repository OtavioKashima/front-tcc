import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';

interface Pet {
  titulo: string;
  idade: string;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
  raca: string;
  genero: string;
}

const ONG_FRADA = {
  nome: 'Frada',
  avatar: 'https://adotar.com.br/uploadadm/logo_ong4041.jpg?w=410&format=webp',
  cidade: 'Joinville, SC',
  whatsapp: '5547999999999'
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
    idade: '',
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
    this.carregarPet();
  }

  
  ionViewWillEnter(): void {
    this.carregarPet();
  }

  private carregarPet(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['pet']) {
      const p = nav.extras.state['pet'];
      this.aplicarPet(p);
    } else if (history.state?.pet) {
      this.aplicarPet(history.state.pet);
    }
  }

  private aplicarPet(p: any): void {
    this.pet = {
      titulo: p.titulo || '',
      imagem: p.imagem || '',
      descricao: p.descricao || '',
      descricaoCompleta: p.descricaoCompleta || p.descricao || '',
      raca: p.raca || 'SRD',
      genero: p.genero || 'Macho',
      idade: p.idade || '2 anos'
    };
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

  async compartilhar(): Promise<void> {
    if (navigator.share) {
      await navigator.share({
        title: this.pet.titulo,
        text: this.pet.descricaoCompleta
      });
    }
  }

  goBack(): void {
    this.navCtrl.back();
  }
}