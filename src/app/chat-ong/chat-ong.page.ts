import { Component, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

interface Mensagem {
  texto: string;
  deMim: boolean;
  hora: string;
}

@Component({
  selector: 'app-chat-ong',
  templateUrl: './chat-ong.page.html',
  styleUrls: ['./chat-ong.page.scss'],
  standalone: false
})
export class ChatOngPage implements OnInit {

  @ViewChild('scrollArea') scrollArea!: IonContent;

  ong: any;
  pet: any;
  mensagens: Mensagem[] = [];
  novaMensagem = '';

  private respostasOng = [
    'Que ótimo! Pode me mandar algumas fotos do seu espaço? 😊',
    'Perfeito! Vamos agendar uma visita para você conhecer o animal pessoalmente.',
    'Fico feliz que tenha interesse! Temos um formulário rápido de adoção, posso te enviar.',
    'Claro! O processo é bem simples, te explico tudo com calma. 🐾',
    'Que notícia boa! Tenho certeza que vão se dar muito bem juntos! ❤️'
  ];

  private respostaIdx = 0;

  constructor(private location: Location, private router: Router) {}

  ngOnInit() {
    const state = history.state;
    this.ong = state?.ong;
    this.pet = state?.pet;
  }

  horaAtual(): string {
    const d = new Date();
    return `${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  }

  enviar() {
    const texto = this.novaMensagem.trim();
    if (!texto) return;

    this.mensagens.push({ texto, deMim: true, hora: this.horaAtual() });
    this.novaMensagem = '';
    this.scrollToBottom();

    // Simula resposta da ONG após 1.2s
    setTimeout(() => {
      const resposta = this.respostasOng[this.respostaIdx % this.respostasOng.length];
      this.respostaIdx++;
      this.mensagens.push({ texto: resposta, deMim: false, hora: this.horaAtual() });
      this.scrollToBottom();
    }, 1200);
  }

  scrollToBottom() {
    setTimeout(() => this.scrollArea?.scrollToBottom(300), 100);
  }

  goBack() { this.location.back(); }
}