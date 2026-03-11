import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
  standalone: false
})
export class PostagemPage implements OnInit {

  tipoSelecionado: string = '';

  constructor(private navCtrl: NavController) { }

  ngOnInit() {}

  mudarTipo(event: any) {
    this.tipoSelecionado = event.detail.value;
  }

  goToHome() {
    this.navCtrl.back();
  }

  postar() {
    // Lógica de postagem aqui
    console.log('Tipo:', this.tipoSelecionado);
  }

}