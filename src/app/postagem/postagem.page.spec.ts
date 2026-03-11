import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
})
export class PostagemPage implements OnInit {

  tipoSelecionado: string = '';

  constructor() {}

  ngOnInit() {}

  mudarTipo(event: any) {
    this.tipoSelecionado = event.detail.value;
  }

}