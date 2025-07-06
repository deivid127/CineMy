// Certifique-se de importar o cliente Supabase corretamente no seu arquivo JS
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://your-project-id.supabase.co', 'public-anon-key');

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.scrollContainerRef = createRef();
    this.leftButtonRef = createRef();
    this.rightButtonRef = createRef();
    this.state = {
      searchQuery: '',
      results: [], // Guardando os resultados da pesquisa aqui
    };
  }

  smoothScroll = (amount) => {
    if (!this.scrollContainerRef.current) return;

    const container = this.scrollContainerRef.current;
    let start = container.scrollLeft;
    let startTime = null;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const scrollStep = Math.min(progress / 300, 1);
      container.scrollLeft = start + scrollStep * amount;

      if (scrollStep < 1) {
        requestAnimationFrame(step);
      } else {
        this.updateButtonVisibility();
      }
    };
    requestAnimationFrame(step);
  };

  updateButtonVisibility = () => {
    if (!this.scrollContainerRef.current || !this.leftButtonRef.current || !this.rightButtonRef.current) return;

    const container = this.scrollContainerRef.current;
    const leftButton = this.leftButtonRef.current;
    const rightButton = this.rightButtonRef.current;

    if (container.scrollLeft === 0) {
      leftButton.style.display = "none";
    } else {
      leftButton.style.display = "block";
    }

    if (container.scrollLeft + container.offsetWidth >= container.scrollWidth) {
      rightButton.style.display = "none";
    } else {
      rightButton.style.display = "block";
    }
  };

  // Função de busca no Supabase
  handleSearch = async (e) => {
    const query = e.target.value;
    this.setState({ searchQuery: query });

    if (query.length < 2) {
      this.setState({ results: [] });
      return;
    }

    const data = await this.searchSupabase(query);
    this.setState({ results: data });
  };

  // Consultando o Supabase para buscar filmes baseados na pesquisa
  searchSupabase = async (query) => {
    const { data, error } = await supabase
      .from('filmes') // Substitua com o nome da sua tabela
      .select('*')
      .ilike('titulo', `%${query}%`);

    if (error) {
      console.error('Erro ao buscar filmes:', error);
      return [];
    }

    return data;
  };

  render() {
    const { searchQuery, results } = this.state;

    return React.createElement(
      'header',
      null,
      React.createElement(
        'div',
        { className: 'header-Geral' },
        React.createElement(
          'div',
          { className: 'header-content' },
          React.createElement(
            'a',
            { href: '#inicio' },
            React.createElement('img', { src: './img/imgHeader/logotipo.png', alt: 'Logo' })
          ),
          React.createElement('input', {
            type: 'checkbox',
            id: 'close-menu',
            className: 'close-menu',
            'aria-label': 'Close menu',
            role: 'button'
          }),
          React.createElement(
            'label',
            { htmlFor: 'close-menu', title: 'close-menu', className: 'close-menu-label' }
          ),
          React.createElement(
            'nav',
            { className: 'menu' },
            React.createElement(
              'div',
              { id: 'categorias-geral' },
              React.createElement(
                'ul',
                { onClick: () => document.getElementById('close-menu').checked = false },
                React.createElement('li', null, React.createElement('a', { href: '#inicio' }, 'Página Inicial')),
                React.createElement('div', { className: 'cat' }, React.createElement('li', null, React.createElement('a', { href: '#noticia' }, 'Notícias'))),
                React.createElement('li', null, React.createElement('a', { href: '#FilmesSeries' }, 'Filmes/Séries')),
                React.createElement('li', null, React.createElement('a', { href: '#contato' }, 'Contato')),
                React.createElement('hr', null),
                React.createElement(
                  'div',
                  { className: 'contato' },
                  React.createElement('h3', null, 'Precisa de ajuda?'),
                  React.createElement('p', null, React.createElement('a', { href: '#' }, 'Whatapp +55 00 0000-0000')),
                  React.createElement('p', null, React.createElement('a', { href: '#' }, 'Email'))
                )
              )
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'search' },
          React.createElement(
            'div',
            { className: 'enviar' },
            React.createElement(
              'div',
              { className: 'input-Search' },
              React.createElement('input', {
                type: 'text',
                name: 'pesquisa',
                id: 'pesquisa',
                className: 'pesquisa',
                placeholder: 'Digite...',
                value: searchQuery,
                onChange: this.handleSearch
              }),
              React.createElement(
                'button',
                { className: 'botao2' },
                React.createElement('img', { src: './img/lupa.png', alt: 'Lupa' })
              ),
              React.createElement(
                'ul',
                { id: 'results' },
                results.length > 0 ? (
                  results.map(item => React.createElement('li', { key: item.id }, React.createElement('a', { href: `#filme/${item.id}` }, item.titulo)))
                ) : (
                  React.createElement('li', null, 'Nenhum resultado encontrado')
                )
              )
            ),
            React.createElement(
              'button',
              { className: 'botao', onClick: () => { Search() } },
              React.createElement('img', { src: './img/lupa.png', alt: 'Lupa' })
            ),
            React.createElement(
              'div',
              { className: 'minha-Lista' },
              React.createElement(
                'a',
                { href: '#' },
                React.createElement('img', { src: './img/imgHeader/LogoMinhaLista.png', alt: 'Minha Lista' })
              )
            ),
            React.createElement('div', { className: 'login', onClick: () => document.getElementById('close-menu').checked = false })
          )
        )
      )
    );
  }
}

// Renderizando o Header no div com id="header-container"
const domContainerHeader = document.getElementById("header-container");
const rootHeader = ReactDOM.createRoot(domContainerHeader);
rootHeader.render(React.createElement(Header));
