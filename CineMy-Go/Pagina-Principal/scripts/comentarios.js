// Função para calcular o tempo decorrido
function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} s atrás`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} m atrás`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} h atrás`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} d atrás`;
}

const API_URL = "http://127.0.0.1:5000";

function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

const postId = getPostIdFromURL();
const commentsDiv = document.getElementById("comments");

function renderComments(comments) {
    commentsDiv.innerHTML = "";
    if (comments.length === 0) {
        commentsDiv.innerHTML = "<p>Nenhum comentário ainda. Seja o primeiro a comentar!</p>";
        return;
    }

    comments.forEach(comment => {
        const div = document.createElement("div");
        div.classList.add("comment");
        const timeElapsed = timeAgo(comment.data_criacao);
        
        let stars = '';
        for(let i = 0; i < 5; i++) {
            if(i < comment.avaliacao_estrelas) {
                stars += '★';
            } else {
                stars += '☆';
            }
        }

        div.innerHTML = `
            <p><strong>${comment.nome_usuario}</strong></p>
            <p style="color: #FFD700;">${stars}</p>
            <p>${comment.conteudo}</p>
            <p><em>${timeElapsed}</em></p>
            <hr>
        `;
        commentsDiv.appendChild(div);
    });
}

async function fetchComments() {
    if (!postId) return;
    try {
        const response = await fetch(`${API_URL}/filmes/${postId}/comentarios`);
        if (!response.ok) throw new Error('Erro ao buscar comentários');
        const data = await response.json();
        renderComments(data);
    } catch (error) {
        console.error("Erro:", error);
        commentsDiv.innerHTML = "<p style='color:red;'>Não foi possível carregar os comentários.</p>";
    }
}

async function addComment() {
    const savedUser = sessionStorage.getItem('currentUser');
    const currentUser = savedUser ? JSON.parse(savedUser) : null;

    if (!currentUser) {
        alert("Você precisa estar logado para comentar!");
        return;
    }

    const commentInput = document.getElementById("commentInput");
    const content = commentInput.value.trim();
    const rating = document.querySelector('input[name="rating"]:checked');

    if (!content) {
        alert("O comentário não pode estar vazio!");
        return;
    }
    
    if (!rating) {
        alert("Por favor, selecione uma avaliação de estrelas.");
        return;
    }
    
    const commentData = {
        conteudo: content,
        id_usuario: currentUser.id_usuario,
        avaliacao_estrelas: rating.value
    };

    try {
        // ✅ ATUALIZAÇÃO: URL corrigido para a nova rota de POST
        const response = await fetch(`${API_URL}/filmes/${postId}/comentarios/add`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(commentData),
        });

        const data = await response.json();

        if (!data.sucesso) {
            throw new Error(data.mensagem || 'Erro desconhecido ao adicionar comentário');
        }
        
        commentInput.value = "";
        rating.checked = false;
        fetchComments(); 
    } catch (error) {
        console.error("Erro ao adicionar comentário:", error);
        alert(`Não foi possível adicionar o comentário: ${error.message}`);
    }
}

// Inicia a busca de comentários quando a página carrega
fetchComments();