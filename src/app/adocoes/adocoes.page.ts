import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adocoes',
  templateUrl: './adocoes.page.html',
  styleUrls: ['./adocoes.page.scss']
})
export class AdocoesPage {

  showSearch = false;

  constructor(private location: Location) {}

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  goBack() {
    this.location.back();
  }

}
