// CineMy-Go/Pagina-Principal/scripts/templetes.js

document.addEventListener("DOMContentLoaded", function() {
    const API_URL = "http://127.0.0.1:5000";

    function getPostIdFromURL() {
        const params = new URLSearchParams(window.location.search);
        return params.get("id");
    }

    const postId = getPostIdFromURL();

    async function fetchMovieDetails() {
        if (!postId) {
            document.querySelector(".content").innerHTML = "<h1>Filme não especificado.</h1>";
            return;
        }

        try {
            const response = await fetch(`${API_URL}/filmes/${postId}`);
            if (!response.ok) {
                throw new Error('Filme não encontrado');
            }
            const filme = await response.json();
            populateMovieDetails(filme);
        } catch (error) {
            console.error("Erro ao buscar detalhes do filme:", error);
            document.querySelector(".content").innerHTML = "<h1>Erro ao carregar os detalhes do filme.</h1>";
        }
    }

    function populateMovieDetails(filme) {
        document.title = `Cinemy: ${filme.titulo || 'Filme'}`;
        document.querySelector('.titulo-filme').textContent = filme.titulo || 'Título não disponível';
        document.getElementById('ano').textContent = filme.ano || 'N/A';
        document.getElementById('tempo').textContent = filme.tempo || 'N/A';
        document.getElementById('avaliacao').textContent = filme.avaliacao || 'N/A';
        document.getElementById('bilheteria').textContent = filme.bilheteria ? `${filme.bilheteria}` : 'N/A';
        document.getElementById('faixa').textContent = filme.faixa ? `${filme.faixa}` : 'L';

        if (filme.video) {
            document.getElementById('video').src = filme.video;
        }

        document.getElementById('imagem').src = filme.imagem || '';
        document.getElementById('imagem').alt = `Cartaz de ${filme.titulo}`;
        
        // Imagens de template
        const imgPost1 = document.querySelector('.img-temp:nth-child(1) img');
        if (imgPost1) imgPost1.src = filme.img_post || '';
        const fullImg1 = document.querySelector('.img-filmes-templetes .full-img-anime');
        if (fullImg1) fullImg1.src = filme.img_post || '';

        const imgPost2 = document.querySelector('.img-temp:nth-child(2) img');
        if(imgPost2) imgPost2.src = filme.img_post2 || '';
        const fullImg2 = document.querySelector('.img-filmes-templetes2 .full-img-anime');
        if (fullImg2) fullImg2.src = filme.img_post2 || '';

        const imgPost3 = document.querySelector('.img-temp:nth-child(3) img');
        if(imgPost3) imgPost3.src = filme.img_post3 || '';
        const fullImg3 = document.querySelector('.img-filmes-templetes3 .full-img-anime');
        if (fullImg3) fullImg3.src = filme.img_post3 || '';

        document.getElementById('sinopse').textContent = filme.sinopse || 'Sinopse não disponível.';
        document.getElementById('direcao').textContent = filme.direcao || 'Direção não disponível.';
        document.getElementById('artistas').textContent = filme.artistas || 'Artistas não disponíveis.';
    }

    fetchMovieDetails();
});