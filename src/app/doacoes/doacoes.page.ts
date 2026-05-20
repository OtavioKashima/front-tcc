import { Component, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';

interface CardDoacao {
  titulo: string;
  descricao: string;
  imagem: string;
  tags: string;
}

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.page.html',
  styleUrls: ['./doacoes.page.scss'],
  standalone: false,
})
export class DoacoesPage implements OnInit {

  showSearch = false;
  termoBusca = '';

  valoresRapidos = [10, 25, 50, 100];
  valorSelecionado: number | null = 50;
  valorDoacao: number | null = 50;

  processando = false;

  todosCards: CardDoacao[] = [
    {
      titulo: 'Tratamentos de saúde',
      descricao: 'Gatos e cachorros com doenças que precisam de atenção veterinária urgente.',
      imagem: 'https://inovaveterinaria.com.br/wp-content/uploads/2017/09/vermifugo-para-cachorros-e-gatos-1024x703-1.jpg',
      tags: 'tratamentos saúde gatos cachorros doenças veterinária',
    },
    {
      titulo: 'Alimentação no abrigo',
      descricao: 'Custeamos a ração diária de dezenas de animais em nosso abrigo.',
      imagem: 'https://bompracachorro.blogfolha.uol.com.br/files/2020/06/img_9511.jpg',
      tags: 'alimentação abrigo ração diária animais',
    },
    {
      titulo: 'Remédios e vacinas',
      descricao: 'Mantemos a saúde dos animais em dia com medicamentos e vacinação.',
      imagem: 'https://cobasiblog.blob.core.windows.net/production-ofc/2022/07/AdobeStock_254690460.webp',
      tags: 'remédios vacinas medicamentos vacinação saúde',
    },
  ];

  cardsFiltrados: CardDoacao[] = [];

  private chavePix = 'contato@patinhasfelizes.com.br';

  ngOnInit() {
    this.cardsFiltrados = [...this.todosCards];
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) this.limparBusca();
  }

  limparBusca() {
    this.termoBusca = '';
    this.filtrarCards();
  }

  filtrarCards() {
    const termo = this.termoBusca.toLowerCase().trim();
    if (!termo) {
      this.cardsFiltrados = [...this.todosCards];
      return;
    }
    this.cardsFiltrados = this.todosCards.filter(card =>
      (card.titulo + ' ' + card.descricao + ' ' + card.tags)
        .toLowerCase()
        .includes(termo)
    );
  }

  setValor(v: number) {
    this.valorSelecionado = v;
    this.valorDoacao = v;
  }

  async processarDoacao() {
    const valor = Number(this.valorDoacao);

    if (!valor || valor <= 0) {
      alert('Por favor, informe um valor para doação.');
      return;
    }

    this.processando = true;

    try {
      const pixUrl = `https://nubank.com.br/cobrar/pix?chave=${encodeURIComponent(this.chavePix)}&valor=${valor}&descricao=${encodeURIComponent('Doação ONG Patinhas Felizes')}`;
      await Browser.open({ url: pixUrl });
    } catch (err) {
      console.error('Erro ao abrir PIX:', err);
      alert('Não foi possível abrir o pagamento. Tente novamente.');
    } finally {
      this.processando = false;
    }
  }
}