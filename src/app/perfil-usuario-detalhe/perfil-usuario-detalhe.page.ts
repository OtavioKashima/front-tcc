import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface Usuario {
  id?: string;
  nome: string;
  avatar: string;
  cidade: string;
  bio?: string;
  totalDenuncias?: number;
  totalResolvidas?: number;
  totalCurtidas?: number;
}

interface DenunciaResumo {
  titulo: string;
  imagem: string;
  categoria: string;
  dataFormatada: string;
  descricao?: string;
  local?: string;
  status?: string;
  tipo?: string;
  usuario?: Usuario;
}

@Component({
  selector: 'app-perfil-usuario-detalhe',
  templateUrl: './perfil-usuario-detalhe.page.html',
  styleUrls: ['./perfil-usuario-detalhe.page.scss'],
  standalone: false
})
export class PerfilUsuarioDetalhePage implements OnInit {

  usuario: Usuario = {
    id: '',
    nome: '',
    avatar: 'assets/avatar-default.png',
    cidade: '',
    bio: '',
    totalDenuncias: 0,
    totalResolvidas: 0,
    totalCurtidas: 0
  };

  

  // Lista de denúncias do usuário — preencha com dados reais do seu serviço
  denunciasUsuario: DenunciaResumo[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    // Recupera o usuário passado via state da navegação
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['usuario']) {
      this.usuario = { ...this.usuario, ...nav.extras?.state?.['usuario'] };
    } else if (history.state?.usuario) {
      this.usuario = { ...this.usuario, ...history.state.usuario };
    }

    // TODO: carregar denúncias do usuário pelo this.usuario.id
    // Exemplo:
    // this.denunciaService.getDenunciasPorUsuario(this.usuario.id).subscribe(lista => {
    //   this.denunciasUsuario = lista;
    // });
  }

  verDenuncia(denuncia: DenunciaResumo): void {
    this.router.navigate(['/denuncia-detalhe'], {
      state: { denuncia }
    });
  }

  goBack(): void {
    this.navCtrl.back();
  }
}