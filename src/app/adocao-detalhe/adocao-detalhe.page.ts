import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface Pet {
  titulo: string;
  idade: string;
  imagem: string;
  descricao: string;
  descricaoCompleta: string;
}

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
    descricaoCompleta: ''
  };

  constructor(
    private router: Router,
    private navCtrl: NavController
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