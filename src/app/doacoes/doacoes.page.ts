import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Browser } from '@capacitor/browser';

/**
 * ⚠️  Troque pelo seu Access Token de TESTE do Mercado Pago
 * Disponível em: https://www.mercadopago.com.br/developers/panel/credentials
 * O token de teste começa com "TEST-..."
 */
const MP_ACCESS_TOKEN = 'TEST-COLOQUE_SEU_TOKEN_AQUI';
const MP_API_URL = 'https://api.mercadopago.com/checkout/preferences';

interface CardDoacao {
  titulo: string;
  descricao: string;
  imagem: string;
  tags: string; // palavras-chave para busca
}

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.page.html',
  styleUrls: ['./doacoes.page.scss'],
  standalone: false,
})
export class DoacoesPage implements OnInit {

  // ── Header / busca ──
  showSearch = false;
  termoBusca = '';

  // ── Valores de doação ──
  valoresRapidos = [10, 25, 50, 100];
  valorSelecionado: number | null = 50;
  valorDoacao: number | null = 50;

  // ── Estado do botão ──
  processando = false;

  // ── Cards ──
  todosCards: CardDoacao[] = [
    {
      titulo: 'Tratamentos de saúde',
      descricao: 'Gatos e cachorros com doenças que precisam de atenção veterinária urgente.',
      imagem: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400',
      tags: 'tratamentos saúde gatos cachorros doenças veterinária',
    },
    {
      titulo: 'Alimentação no abrigo',
      descricao: 'Custeamos a ração diária de dezenas de animais em nosso abrigo.',
      imagem: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400',
      tags: 'alimentação abrigo ração diária animais',
    },
    {
      titulo: 'Remédios e vacinas',
      descricao: 'Mantemos a saúde dos animais em dia com medicamentos e vacinação.',
      imagem: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400',
      tags: 'remédios vacinas medicamentos vacinação saúde',
    },
  ];

  cardsFiltrados: CardDoacao[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.cardsFiltrados = [...this.todosCards];
  }

  // =============================================
  // HEADER — BUSCA
  // =============================================

  toggleSearch() {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) {
      this.limparBusca();
    }
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

  // =============================================
  // DOAÇÃO
  // =============================================

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
      const url = await this.criarPreferencia(valor);
      await Browser.open({ url });
    } catch (err) {
      console.error('Erro Mercado Pago:', err);
      alert('Não foi possível conectar ao Mercado Pago. Verifique o token de acesso.');
    } finally {
      this.processando = false;
    }
  }

  /**
   * Cria uma preferência de pagamento genérica para a ONG.
   */
  private async criarPreferencia(valor: number): Promise<string> {
    const preference = {
      items: [
        {
          title: 'Doação para ONG Patinhas Felizes',
          description: 'Doação livre — a ONG decide como utilizar o valor para ajudar os animais.',
          quantity: 1,
          currency_id: 'BRL',
          unit_price: valor,
        },
      ],
      back_urls: {
        success: 'https://seuapp.com/doacao/sucesso',
        failure: 'https://seuapp.com/doacao/erro',
        pending: 'https://seuapp.com/doacao/pendente',
      },
      auto_return: 'approved',
    };

    const response: any = await this.http.post(MP_API_URL, preference, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MP_ACCESS_TOKEN}`,
      },
    }).toPromise();

    // sandbox_init_point = testes | init_point = produção
    return response.sandbox_init_point ?? response.init_point;
  }
}