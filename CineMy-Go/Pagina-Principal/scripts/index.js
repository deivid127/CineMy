'use strict';

const e = React.createElement;

// ====================================================================
// COMPONENTE PARTILHADO: CardPlay
// Este componente agora estará visível para todos os outros
// ====================================================================
function CardPlay({ nome, link, imagem, avaliacao, anoLancamento }) {
    return e(
        'div', { className: 'conteudo-catalogo catalogo1' },
        e('div', { className: 'star-play' },
            e('img', { src: './CineMy-Go/Pagina-Principal/img/star.png', alt: 'Estrela de avaliação' }),
            e('p', null, avaliacao || '0')
        ),
        e('a', { href: link },
            e('div', { className: 'imagem-cartaz' },
                e('img', {
                    src: imagem || './CineMy-Go/Pagina-Principal/img/Imagem-Catalogo/Sonic.jpg',
                    alt: `Cartaz de ${nome}`,
                })
            ),
            e('p', null, nome || 'Filme'),
            e('p', null, anoLancamento || 'Ano'),
            e('button', null, 'Ver mais')
        )
    );
}

// ====================================================================
// FUNÇÃO AUXILIAR PARA BUSCAR E RENDERIZAR SECÇÕES
// ====================================================================
function createSectionComponent(title, endpoint) {
    return () => {
        const [cards, setCards] = React.useState([]);
        const [error, setError] = React.useState(null);

        React.useEffect(() => {
            fetch(`http://127.0.0.1:5000/${endpoint}`)
                .then(response => {
                    if (!response.ok) throw new Error(`Falha na rede para ${endpoint}`);
                    return response.json();
                })
                .then(data => {
                    const formattedData = data.map(filme => ({
                        key: `${endpoint}-${filme.id_filme}`,
                        avaliacao: filme.avaliacao.toString(),
                        nome: filme.titulo,
                        anoLancamento: filme.ano.toString(),
                        link: `filmes.html?id=${filme.id_filme}`,
                        imagem: filme.imagem,
                    }));
                    setCards(formattedData);
                })
                .catch(err => {
                    console.error(`Erro ao buscar dados para ${title}:`, err);
                    setError(err.message);
                });
        }, []);

        if (error) {
            return e('p', { style: { color: 'red', textAlign: 'center' } }, `Não foi possível carregar: ${title}`);
        }

        if (cards.length === 0) {
            return e('p', { style: { textAlign: 'center' } }, `A carregar ${title}...`);
        }

        return e(
            'div', { className: 'conteiner-one' }, // Usando uma classe de container genérica
            e('div', { className: 'text-verMais' },
                e('div', { className: 'NomeSecoes' },
                    e('h2', null, title),
                    e('div', { className: 'division2' })
                ),
                e('div', { className: 'verMais' }, e('p', null, e('a', { href: '#' }, 'Ver mais')))
            ),
            e('div', { className: 'catalogo' },
                e('div', { className: 'catalogo-destaque' },
                    cards.map(card => e(CardPlay, card))
                )
            ),
            e('div', { className: 'space-line' })
        );
    };
}

// ====================================================================
// DEFINIÇÃO DAS SECÇÕES
// ====================================================================
const SectionOne = createSectionComponent('Últimos filmes lançados', 'filmes/lancamentos');
const SectionThree = createSectionComponent('Filmes Populares', 'filmes/populares');
const SectionSix = createSectionComponent('Séries em Destaque', 'filmes/series');
const SectionSeven = createSectionComponent('Adicionados Recentemente', 'filmes/populares'); // Reutilizando endpoint

// ====================================================================
// RENDERIZAÇÃO DOS COMPONENTES NOS SEUS DEVIDOS LUGARES
// ====================================================================
function renderComponent(component, elementId) {
    const container = document.getElementById(elementId);
    if (container) {
        const root = ReactDOM.createRoot(container);
        root.render(e(component));
    } else {
        console.warn(`Elemento com ID '${elementId}' não foi encontrado no DOM.`);
    }
}

renderComponent(SectionOne, 'CardMovie');
renderComponent(SectionThree, 'FilmesSeries');
renderComponent(SectionSix, 'section-six');
renderComponent(SectionSeven, 'section-seven');