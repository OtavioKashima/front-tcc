import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface Usuario {
  id?: string;
  nome: string;
  avatar: string;
  cidade: string;
  bio?: string;
}

interface DenunciaResumo {
  titulo: string;
  imagem: string;
  categoria?: string;
  dataFormatada: string;
  descricao?: string;
  autor?: string;
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
    bio: ''
  };

  denunciasUsuario: DenunciaResumo[] = [];

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    const nav = this.router.getCurrentNavigation();
    if (nav?.extras?.state?.['usuario']) {
      this.usuario = { ...this.usuario, ...nav.extras.state['usuario'] };
    } else if (history.state?.usuario) {
      this.usuario = { ...this.usuario, ...history.state.usuario };
    }

    // TODO: carregar denúncias pelo this.usuario.id
    // this.denunciaService.getDenunciasPorUsuario(this.usuario.id).subscribe(lista => {
    //   this.denunciasUsuario = lista;
    // });
  }

  verDenuncia(denuncia: DenunciaResumo): void {
    this.router.navigate(['/denuncia-detalhe'], {
      state: { denuncia }
    });
  }

  compartilharUsuario(): void {
    if (navigator.share) {
      navigator.share({
        title: this.usuario.nome,
        text: this.usuario.bio || '',
        url: window.location.href
      }).catch(err => console.error('Erro ao compartilhar:', err));
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  }

  compartilharDenuncia(denuncia: DenunciaResumo): void {
    if (navigator.share) {
      navigator.share({
        title: denuncia.titulo,
        text: denuncia.descricao || '',
        url: window.location.href
      }).catch(err => console.error('Erro ao compartilhar:', err));
    }
  }

  goBack(): void {
    this.navCtrl.back();
  }
}