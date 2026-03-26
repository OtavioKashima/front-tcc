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

@Component({
  selector: 'app-doacoes',
  templateUrl: './doacoes.page.html',
  styleUrls: ['./doacoes.page.scss'],
  standalone: false,
})
export class DoacoesPage implements OnInit {

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.registrarFuncoes();
  }

  private registrarFuncoes() {

    /** Destaca o botão de valor rápido selecionado e preenche o input */
    (window as any)['setValor'] = (v: number) => {
      const input = document.getElementById('valorDoacao') as HTMLInputElement;
      input.value = String(v);

      document.querySelectorAll<HTMLButtonElement>('.valor-rapido button').forEach(btn => {
        btn.classList.toggle('ativo', btn.textContent?.trim() === `R$ ${v}`);
      });
    };

    /** Chama a API do Mercado Pago e abre o Checkout */
    (window as any)['processarDoacao'] = async () => {
      const input = document.getElementById('valorDoacao') as HTMLInputElement;
      const valor = parseFloat(input.value);

      if (!valor || valor <= 0) {
        alert('Por favor, informe um valor para doação.');
        return;
      }

      const btn = document.querySelector<HTMLButtonElement>('.btn-pagar')!;
      btn.textContent = 'Aguarde...';
      btn.disabled = true;

      try {
        const url = await this.criarPreferencia(valor);
        await Browser.open({ url });
      } catch (err) {
        console.error('Erro Mercado Pago:', err);
        alert('Não foi possível conectar ao Mercado Pago. Verifique o token de acesso.');
      } finally {
        btn.innerHTML = `
          <img src="https://logospng.org/download/mercado-pago/logo-mercado-pago-icone-1024.png"
               onerror="this.style.display='none'"
               style="width:22px;height:22px;border-radius:4px;vertical-align:middle;margin-right:8px;">
          Pagar com Mercado Pago`;
        btn.disabled = false;
      }
    };
  }

  /**
   * Cria uma preferência de pagamento genérica para a ONG.
   * A ONG decide como utilizar o valor recebido.
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

    // sandbox_init_point = ambiente de testes | init_point = produção
    return response.sandbox_init_point ?? response.init_point;
  }
}