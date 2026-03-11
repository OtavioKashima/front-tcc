import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adocao-detalhe',
  templateUrl: './adocao-detalhe.page.html',
  styleUrls: ['./adocao-detalhe.page.scss'],
  standalone: false
})
export class AdocaoDetalhePage {

  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }

}