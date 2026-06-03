import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: false
})
export class InicioPage implements OnInit {
  ongs: any[] = [];
  comunicados: any[] = [];

  constructor(private http: HttpClient, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.carregarComunicados();
    this.carregarOngs();
  }

  // 🟢 Puxando do Banco via API
  carregarComunicados() {
    this.http.get('http://localhost:3000/api/postagens/tipo/comunicado').subscribe({
      next: (res: any) => {
        this.comunicados = res;
      },
      error: (err) => console.error('Erro ao buscar Comunicados', err)
    });
  }

  // 🟢 Puxando do Banco via API
  carregarOngs() {
    this.http.get('http://localhost:3000/api/ongs').subscribe({
      next: (res: any) => {
        this.ongs = res;
      },
      error: (err) => console.error('Erro ao buscar ONGs', err)
    });
  }

  getFotoUrl(foto_perfil: string) {
    if (!foto_perfil) return 'https://ionicframework.com/docs/img/demos/avatar.svg';
    return `http://localhost:3000/uploads/${foto_perfil}`;
  }

  abrirDoacao(ong: any) {
    this.navCtrl.navigateForward('/doacoes', { state: { ongSelecionada: ong } });
  }

  abrirComunicado(aviso: any) {
    this.router.navigate(['/comunicado'], {
      state: { postagemSelecionada: aviso }
    });
  }
}