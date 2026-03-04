import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
})
export class PostagemPage {

  tipoSelecionado: string = '';

  mudarTipo(event: any) {
    this.tipoSelecionado = event.detail.value;
  }

}