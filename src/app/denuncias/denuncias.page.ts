import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

interface Filtros {
  data: string;
  cidade: string;
  estado: string;
  tipoAnimal: string;
  idade: string;
}

interface Denuncia {
  titulo: string;
  imagem: string;
  descricao: string;
  tipo?: string;
  categoria?: string;
  status?: string;
  local?: string;
  dataFormatada?: string;
  dataISO?: string;
  tipoAnimal?: string;
  idade?: string;
  usuario?: {
    nome: string;
    avatar: string;
    cidade: string;
    whatsapp?: string;
  };
}

@Component({
  selector: 'app-denuncias',
  templateUrl: './denuncias.page.html',
  styleUrls: ['./denuncias.page.scss'],
  standalone: false,
})
export class DenunciasPage implements OnInit {

  showSearch: boolean = false;
  showFiltros: boolean = false;
  termoBusca: string = '';

  filtros: Filtros = { data: '', cidade: '', estado: '', tipoAnimal: '', idade: '' };

  denuncias: Denuncia[] = [
    {
      titulo: 'Não seja enganado',
      imagem: 'https://cdn.pixabay.com/photo/2017/09/25/13/12/dog-2785074_640.jpg',
      descricao: 'Meu vizinho se diz dono de um abrigo de animais, o que é pura fachada, ele pede dinheiro mas não ajuda os animais.',
      tipo: 'Fraude',
      categoria: 'Animal',
      status: 'Aberta',
      local: 'São Paulo, SC',
      dataFormatada: '01/05/2025',
      dataISO: '2025-05-01',
      tipoAnimal: 'cachorro',
      idade: 'adulto',
      usuario: { nome: 'João Silva', avatar: 'https://i.pravatar.cc/150?img=1', cidade: 'São Paulo, SC' }
    },
    {
      titulo: 'Veneno na comida',
      imagem: 'https://www.petz.com.br/blog/wp-content/uploads/2018/12/intoxicacao-alimentar-em-pet.jpg',
      descricao: 'Ultimamente eu e meus vizinhos percebemos várias mortes de animais na rua, tanto animais domésticos quanto de rua.',
      tipo: 'Envenenamento',
      categoria: 'Animal',
      status: 'Em Análise',
      local: 'Campinas, SC',
      dataFormatada: '03/05/2025',
      dataISO: '2025-05-03',
      tipoAnimal: 'gato',
      idade: 'jovem',
      usuario: { nome: 'Maria Souza', avatar: 'https://i.pravatar.cc/150?img=5', cidade: 'Campinas, SC' }
    },
    {
      titulo: 'Maus tratos',
      imagem: 'https://aguaslindasdegoias.go.gov.br/wp-content/uploads/2022/05/animais-maus-tratos.jpg',
      descricao: 'Eu peguei o cachorro do meu vizinho pra mim pelo simples motivo de que ele não cuidava do animal.',
      tipo: 'Maus-tratos',
      categoria: 'Animal',
      status: 'Resolvida',
      local: 'Ribeirão Preto, SC',
      dataFormatada: '05/05/2025',
      dataISO: '2025-05-05',
      tipoAnimal: 'cachorro',
      idade: 'adulto',
      usuario: { nome: 'Carlos Oliveira', avatar: 'https://i.pravatar.cc/150?img=8', cidade: 'Ribeirão Preto, SC' }
    },
    {
      titulo: 'Cachorro preso sem água',
      imagem: 'https://dog4fun.com/2019/wp-content/uploads/2019/05/%C3%A1gua-pra-cachorro-1200x675.jpg',
      descricao: 'Um cachorro está preso no quintal há dias sem acesso à água ou comida.',
      tipo: 'Maus-tratos',
      categoria: 'Animal',
      status: 'Aberta',
      local: 'Botucatu, SC',
      dataFormatada: '12/05/2025',
      dataISO: '2025-05-12',
      tipoAnimal: 'cachorro',
      idade: 'jovem',
      usuario: { nome: 'Bruna Martins', avatar: 'https://i.pravatar.cc/150?img=40', cidade: 'Botucatu, SC' }
    },
    {
      titulo: 'Gatos abandonados em caixa',
      imagem: 'https://cdn.pixabay.com/photo/2017/11/09/21/41/cat-2934720_640.jpg',
      descricao: 'Filhotes de gato foram deixados dentro de uma caixa na rua.',
      tipo: 'Abandono',
      categoria: 'Animal',
      status: 'Em Análise',
      local: 'Jaú, SC',
      dataFormatada: '13/05/2025',
      dataISO: '2025-05-13',
      tipoAnimal: 'gato',
      idade: 'jovem',
      usuario: { nome: 'Diego Rocha', avatar: 'https://i.pravatar.cc/150?img=45', cidade: 'Jaú, SC' }
    },
    {
      titulo: 'Cavalo sendo maltratado',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdZRD97kQ6dv_IwqYo4tBYOrGFgnJuk5pC6g&s',
      descricao: 'Um cavalo está sendo usado para trabalho pesado sem descanso e em condições ruins.',
      tipo: 'Maus-tratos',
      categoria: 'Animal',
      status: 'Aberta',
      local: 'Avaré, SC',
      dataFormatada: '14/05/2025',
      dataISO: '2025-05-14',
      tipoAnimal: 'coelho',
      idade: 'adulto',
      usuario: { nome: 'Ricardo Lopes', avatar: 'https://i.pravatar.cc/150?img=50', cidade: 'Avaré, SC' }
    },
    {
      titulo: 'Cães vivendo em ambiente insalubre',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMv8clDfRQLxMSHKOEhoLx3yq4UMiITBL_Pw&s',
      descricao: 'Diversos cães estão vivendo em local sujo, com fezes acumuladas e sem higiene.',
      tipo: 'Maus-tratos',
      categoria: 'Animal',
      status: 'Em Análise',
      local: 'Lençóis Paulista, SC',
      dataFormatada: '15/05/2025',
      dataISO: '2025-05-15',
      tipoAnimal: 'cachorro',
      idade: 'adulto',
      usuario: { nome: 'Patrícia Gomes', avatar: 'https://i.pravatar.cc/150?img=55', cidade: 'Lençóis Paulista, SC' }
    },
    {
      titulo: 'Venda ilegal de animais silvestres',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD7RTZcpLQnl70Otr6qjwClEy-1Gobb48KsQ&s',
      descricao: 'Pessoas estão vendendo aves silvestres sem autorização em feira local.',
      tipo: 'Tráfico de animais',
      categoria: 'Animal',
      status: 'Aberta',
      local: 'Bauru, SC',
      dataFormatada: '16/05/2025',
      dataISO: '2025-05-16',
      tipoAnimal: 'ave',
      idade: 'jovem',
      usuario: { nome: 'Lucas Fernandes', avatar: 'https://i.pravatar.cc/150?img=60', cidade: 'Bauru, SC' }
    },
    {
      titulo: 'Cachorro ferido sem atendimento',
      imagem: 'https://pbs.twimg.com/media/GJuEEquWMAAMkFn.jpg',
      descricao: 'Um cachorro está com ferimentos graves e sem nenhum tipo de cuidado.',
      tipo: 'Negligência',
      categoria: 'Animal',
      status: 'Aberta',
      local: 'São Manuel, SC',
      dataFormatada: '17/05/2025',
      dataISO: '2025-05-17',
      tipoAnimal: 'cachorro',
      idade: 'adulto',
      usuario: { nome: 'Marcos Vinicius', avatar: 'https://i.pravatar.cc/150?img=65', cidade: 'São Manuel, SC' }
    }
  ];

  denunciasFiltradas: Denuncia[] = [];

  get cidadesDisponiveis(): string[] {
    const cidades = this.denuncias
      .map(d => d.usuario?.cidade.split(', ')[0])
      .filter(Boolean) as string[];
    return [...new Set(cidades)].sort();
  }

  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    this.denunciasFiltradas = [...this.denuncias];
  }

  temFiltroAtivo(): boolean {
    return !!(this.filtros.data || this.filtros.cidade || this.filtros.estado || this.filtros.tipoAnimal || this.filtros.idade);
  }

  filtrar(): void {
    const termo      = this.termoBusca.toLowerCase().trim();
    const cidade     = this.filtros.cidade.toLowerCase().trim();
    const estado     = this.filtros.estado;
    const data       = this.filtros.data;
    const tipoAnimal = this.filtros.tipoAnimal;
    const idade      = this.filtros.idade;

    this.denunciasFiltradas = this.denuncias.filter(d => {
      const cidadeCompleta = d.usuario?.cidade.toLowerCase() || '';
      const estadoDenuncia = d.usuario?.cidade.split(', ')[1] || '';

      const matchTermo      = !termo      || d.titulo.toLowerCase().includes(termo) || d.descricao.toLowerCase().includes(termo);
      const matchCidade     = !cidade     || cidadeCompleta.includes(cidade);
      const matchEstado     = !estado     || estadoDenuncia === estado;
      const matchData       = !data       || d.dataISO === data;
      const matchTipoAnimal = !tipoAnimal || d.tipoAnimal === tipoAnimal;
      const matchIdade      = !idade      || d.idade === idade;

      return matchTermo && matchCidade && matchEstado && matchData && matchTipoAnimal && matchIdade;
    });
  }

  limparCampo(campo: keyof Filtros): void {
    this.filtros[campo] = '';
    this.filtrar();
  }

  limparTodosFiltros(): void {
    this.filtros = { data: '', cidade: '', estado: '', tipoAnimal: '', idade: '' };
    this.filtrar();
  }

  limparBusca(): void {
    this.termoBusca = '';
    this.filtrar();
  }

  toggleSearch(): void {
    this.showSearch = !this.showSearch;
    if (!this.showSearch) this.limparBusca();
  }

  toggleFiltros(): void {
    this.showFiltros = !this.showFiltros;
  }

  abrirDetalhe(denuncia: Denuncia): void {
    this.navCtrl.navigateForward('/denuncia-detalhe', { state: { denuncia } });
  }

  async compartilhar(denuncia: Denuncia): Promise<void> {
    if (navigator.share) {
      await navigator.share({
        title: denuncia.titulo,
        text: denuncia.descricao,
        url: window.location.href
      });
    }
  }
}