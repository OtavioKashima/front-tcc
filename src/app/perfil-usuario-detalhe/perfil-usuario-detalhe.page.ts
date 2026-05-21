import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

interface Usuario {
  id?: string;
  nome: string;
  avatar: string;
  cidade: string;
  bio?: string;
  denuncias?: DenunciaResumo[];
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
    bio: '',
    denuncias: []
  };

  denunciasUsuario: DenunciaResumo[] = [];

  private navState: any;

  constructor(
    private router: Router,
    private navCtrl: NavController
  ) {

    const nav = this.router.getCurrentNavigation();

    this.navState = nav?.extras?.state ?? null;

  }

  ngOnInit(): void {

    const state = this.navState ?? history.state;


    if (state?.usuario) {

      this.usuario = {
        ...this.usuario,
        ...state.usuario
      };

      if (this.usuario.nome === 'Benedito') {
        this.usuario.bio = '';
      }

    }

 
    if ((state?.denuncias ?? []).length > 0) {

      this.denunciasUsuario = [
        ...state.denuncias
      ];

    }

    else if ((this.usuario.denuncias ?? []).length > 0) {

      this.denunciasUsuario = [
        ...(this.usuario.denuncias ?? [])
      ];

    }


    else {

      this.denunciasUsuario = [];

      console.log('Nenhuma denúncia encontrada');

    }

  }

  verDenuncia(denuncia: DenunciaResumo): void {

    this.router.navigate(
      ['/denuncia-detalhe'],
      {
        state: {
          denuncia: {
            ...denuncia,
            usuario: this.usuario
          }
        }
      }
    );

  }

  compartilharUsuario(): void {

    if (navigator.share) {

      navigator.share({
        title: this.usuario.nome,
        text: this.usuario.bio || '',
        url: window.location.href
      }).catch(err => {

        console.error(
          'Erro ao compartilhar:',
          err
        );

      });

    } else {

      navigator.clipboard.writeText(
        window.location.href
      );

    }

  }

  compartilharDenuncia(
    denuncia: DenunciaResumo
  ): void {

    if (navigator.share) {

      navigator.share({
        title: denuncia.titulo,
        text: denuncia.descricao || '',
        url: window.location.href
      }).catch(err => {

        console.error(
          'Erro ao compartilhar denúncia:',
          err
        );

      });

    }

  }

  goBack(): void {

    this.navCtrl.back();

  }

}