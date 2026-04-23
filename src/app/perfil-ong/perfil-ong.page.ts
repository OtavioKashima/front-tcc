import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

interface Ong {
  nome: string;
  avatar: string;
  cidade: string;
  whatsapp?: string;
}

@Component({
  selector: 'app-perfil-ong',
  templateUrl: './perfil-ong.page.html',
  styleUrls: ['./perfil-ong.page.scss'],
  standalone: false
})
export class PerfilOngPage implements OnInit {

  ong: Ong = {
    nome: 'Frada',
    avatar: 'https://adotar.com.br/uploadadm/logo_ong4041.jpg?w=410&format=webp',
    cidade: 'São Paulo',
    whatsapp: '5511999999999'
  };

  constructor(
    private navCtrl: NavController,
    private router: Router
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['ong']) {
      this.ong = nav.extras.state['ong'];
    } else if (history.state?.ong) {
      this.ong = history.state.ong;
    }
  }

  abrirWhatsapp(): void {
    const numero = this.ong.whatsapp || '5511999999999';
    const mensagem = `Olá, ${this.ong.nome}! Gostaria de saber mais sobre os animais disponíveis para adoção.`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  abrirInstagram(): void {
    window.open('https://instagram.com/frada.ong', '_blank');
  }

  abrirEmail(): void {
    window.open('mailto:contato@frada.org.br', '_blank');
  }

  goBack(): void {
    this.navCtrl.back();
  }
}