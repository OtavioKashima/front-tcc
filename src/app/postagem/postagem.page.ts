import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.page.html',
  styleUrls: ['./postagem.page.scss'],
  standalone: false
})
export class PostagemPage {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('fileInputDenuncia') fileInputDenuncia!: ElementRef<HTMLInputElement>;

  tipoSelecionado: string = '';
  fotoPreview: string | null = null;
  fotoPreviewDenuncia: string | null = null;

  form = {
    raca: '',
    genero: '',
    idade: '',
    descricao: '',
    titulo: '',
    localizacao: '',
  };

  constructor(private navCtrl: NavController) {}

  mudarTipo(event: any) {
    this.tipoSelecionado = event.detail.value;
    this.fotoPreview = null;
    this.fotoPreviewDenuncia = null;
    this.form = { raca: '', genero: '', idade: '', descricao: '', titulo: '', localizacao: '' };
  }

  selecionarFoto() {
    this.fileInput.nativeElement.click();
  }

  onFotoSelecionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.fotoPreview = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }

  selecionarFotoDenuncia() {
    this.fileInputDenuncia.nativeElement.click();
  }

  onFotoDenunciaSelecionada(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.fotoPreviewDenuncia = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }

  postar() {
    console.log('Tipo:', this.tipoSelecionado);
    console.log('Form:', this.form);
    console.log('Foto adoção:', this.fotoPreview ? 'Anexada' : 'Sem foto');
    console.log('Foto denúncia:', this.fotoPreviewDenuncia ? 'Anexada' : 'Sem foto');
  }

  goToHome() {
    this.navCtrl.back();
  }
}