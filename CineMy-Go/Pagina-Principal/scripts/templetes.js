const supabaseUrl = "https://isktnyabdtsfsbbsudqk.supabase.co";
        const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlza3RueWFiZHRzZnNiYnN1ZHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1OTA1MjAsImV4cCI6MjA1MzE2NjUyMH0.BuhzZ_-rd5ZujHQ77tXiqBdzbHIMa7mf_1q-odynMGs"; // Chave do Supabase
        const tableName = "filmes";

        let linkPlataforma = "";

        // Função para pegar os dados via API
        async function fetchData() {
            // Pega o parâmetro 'id' da URL
            const idFilme = new URLSearchParams(window.location.search).get('id'); 
            if (!idFilme) {
                document.querySelector('.titulo-filme').textContent = "Filme não fornecido.";
                return;
            }

            const response = await fetch(`${supabaseUrl}/rest/v1/${tableName}?id=eq.${idFilme}`, {
                method: 'GET',
                headers: {
                    'apikey': supabaseKey,
                    'Authorization': `Bearer ${supabaseKey}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    const filme = data[0]; // Pegando o primeiro filme 
                    // Preenchendo os dados na página
                    document.querySelector('.titulo-filme').textContent = filme.titulo;
                    document.getElementById('ano').textContent = filme.ano;
                    document.getElementById('faixa').textContent = filme.faixa;
                    document.getElementById('tempo').textContent = filme.tempo;
                    document.getElementById('avaliacao').textContent = `${filme.avaliacao}/10`;
                    document.getElementById('bilheteria').textContent = filme.bilheteria;
                    document.getElementById('sinopse').textContent = filme.sinopse;
                    document.getElementById('direcao').textContent = filme.direcao;
                    document.getElementById('artistas').textContent = filme.artistas;
                    document.getElementById('video').src = filme.video;
                    document.getElementById('imagem').src = filme.imagem;

                    document.querySelector('.img-temp img').src = filme.img_post;
                    document.querySelector('.img-temp2 img').src = filme.img_post2;
                    document.querySelector('.img-temp3 img').src = filme.img_post3;

                    document.querySelector('.img-movie-temp').src = filme.img_post;
                    document.querySelector('.img-movie-temp2').src = filme.img_post2;
                    document.querySelector('.img-movie-temp3').src = filme.img_post3;

                    document.title =  filme.titulo + " (" + filme.ano + ") - " + "CineMy ";

                    // Adicionando a cor de fundo para a faixa etária
                    const faixaColor = filme.faixa <= 12 ? 'green' : filme.faixa === 14 ? 'orange' : filme.faixa === 16 ? 'gray' : 'red';
                    
                    document.getElementById('faixa').style.backgroundColor = faixaColor;
                
                    document.getElementById('nome-plat').textContent = filme.plataforma;
                    
                    const nomePlat = filme.plataforma;
                    


                    if(nomePlat.toLowerCase() === 'netflix'){
                        document.getElementById('imagem-plat').src = './img/netflixLogo.png'
                        linkPlataforma = "https://www.netflix.com";
                    } 
                    else if(nomePlat.toLowerCase() === 'prime video'){
                        document.getElementById('imagem-plat').src = './img/prime.png'
                        linkPlataforma = "https://www.primevideo.com";
                    }
                    else if(nomePlat.toLowerCase() === 'disney+'){
                        document.getElementById('imagem-plat').src = './img/disneyplusLogo.png'
                        linkPlataforma = "https://www.disneyplus.com";
                    }
                    else if(nomePlat.toLowerCase() === 'globoplay'){
                        document.getElementById('imagem-plat').src = './img/globoplay.png'
                        linkPlataforma = "https://www.globoplay.com";
                    }

                   
                
                } else {
                    document.getElementById('titulo-filme').textContent = "Filme não encontrado!";
                }
            } else {
                console.error("Erro ao buscar dados:", response.statusText);
                document.getElementById('titulo-filme').textContent = "Erro ao carregar os dados.";
            }
        }
        function streaming() {
            if (linkPlataforma) {
                window.open(linkPlataforma, "_blank");
            } else {
                alert("Nenhuma plataforma selecionada!");
            }
        }
        // Chama a função ao carregar a página
        document.addEventListener("DOMContentLoaded", fetchData);