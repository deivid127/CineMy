'use strict';

const e = React.createElement;

// Componente CardPlay
function CardPlay({ nome, modo, anoLancamento, link, imagem, avaliacao }) {
    return e(
        'div',
        { className: `conteudo-catalogo catalogo1` },
        e(
            'div',
            { className: 'star-play' },
            e('img', { src: './img/star.png', alt: 'Botão de play' }),
            e('p', null, avaliacao ? avaliacao : '0')
        ),
        e(
            'a',
            { href: link },
            e(
                'div',
                { className: 'imagem-cartaz' },
                e('img', {
                    src: imagem ? imagem : './img/Imagem-Catalogo/Sonic.jpg',
                    alt: `Cartaz de ${nome}`,
                }),
            ),
            e('p', null, nome ? nome : 'Filme'),
            e('p', null, anoLancamento ? anoLancamento : 'Ano'),
            e('button', null, 'Ver mais')
        ),
    );
}

// Componente SectionOne
function SectionOne() {
    const cards = [
        {
            avaliacao: '7.2',
            nome: 'Sonic 3',
            modo: '1h 50m',
            anoLancamento: '2024',
            link: 'http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=1',
            imagem: 'https://media-cache.cinematerial.com/p/500x/grnwpsui/sonic-the-hedgehog-3-movie-poster.jpg?v=1731049635',
        },
        {
            avaliacao: '6.3',
            nome: 'Operação Natal',
            modo: '2h 03m',
            anoLancamento: '2024',
            link: 'http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=4',
            imagem: 'https://media-cache.cinematerial.com/p/500x/slq8cgtd/red-one-movie-poster.jpg?v=1733771259',
        },
        {
            avaliacao: '6.0',
            nome: 'Venom 3',
            modo: '1h 49m',
            anoLancamento: '2024',
            link: 'http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=5',
            imagem: 'https://media-cache.cinematerial.com/p/500x/bicsbagk/venom-the-last-dance-movie-poster.jpg?v=1717423514',
        },
        {
            avaliacao: '6.7',
            nome: 'Mufasa: O Rei Leão',
            modo: '2h 0m',
            anoLancamento: '2024',
            link: 'http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=7',
            imagem: 'https://m.media-amazon.com/images/M/MV5BYjBkOWUwODYtYWI3YS00N2I0LWEyYTktOTJjM2YzOTc3ZDNlXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg',
            
        },
        {
            avaliacao: '7.0',
            nome: 'Capitão América: Admirável...',
            modo: '1h 58m',
            anoLancamento: '2025',
            link: 'http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=24',
            imagem: 'https://m.media-amazon.com/images/M/MV5BMjIyNjZmOTEtYWFiYS00YzRhLThhMTktMDUwN2Q3ZDgzZmJmXkEyXkFqcGc@._V1_QL75_UY562_CR7,0,380,562_.jpg',
        },
    ];

    return e(
        'section',
        { id: 'section-one' },
        e(
            'div',
            { className: 'conteiner-one' },
            e(
                'div',
                { className: 'text-verMais' },
                e(
                    'div',
                    { className: 'NomeSecoes' },
                    e('h2', null, 'Últimos filmes lançados'),
                    e('div', { className: 'division2' })
                ),
                e(
                    'div',
                    { className: 'verMais' },
                    e('p', null, e('a', { href: '#' }, 'Ver mais'))
                )
            ),
            e(
                'div',
                { className: 'catalogo' },
                e(
                    'div',
                    { className: 'catalogo-destaque' },
                    cards.map((card) =>
                        e(CardPlay, {
                            key: card.nome,
                            ...card,
                        })
                    )
                    
                )
            ),
            e('div', { className: 'space-line' })
        )
    );
}

// Renderizando a SectionOne no elemento com id "CardMovie"
const domContainer = document.getElementById('CardMovie');
const root = ReactDOM.createRoot(domContainer);
root.render(e(SectionOne));




