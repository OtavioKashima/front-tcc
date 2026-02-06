import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  dados: any[] = [];
  carregando = false;
  erro: string | null = null;

  constructor(private navCtrl: NavController, private apiService: ApiService) {}

  ngOnInit() {
    this.buscarDados();
  }

  buscarDados() {
    this.carregando = true;
    this.apiService.get<any[]>('endpoint').subscribe({
      next: (response) => {
        this.dados = response;
        this.carregando = false;
      },
      error: (error) => {
        this.erro = 'Erro ao buscar dados';
        this.carregando = false;
        console.error(error);
      }
    });
  }

  enviarDados(data: any) {
    this.apiService.post('endpoint', data).subscribe({
      next: (response) => {
        console.log('Sucesso:', response);
      },
      error: (error) => console.error('Erro:', error)
    });
  }

  goToRegistration() {
    // Navega para a tela de Login (Tab 2)
    this.navCtrl.navigateForward('/registro');
  }

  goToLogin() {
    // Navega para a tela de Login (Tab 2)
    this.navCtrl.navigateForward('/login');
  }

  
}
