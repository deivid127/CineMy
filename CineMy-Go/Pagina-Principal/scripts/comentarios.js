// Função para calcular o tempo decorrido
function timeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000); 

    if (diffInSeconds < 60) {
        return `${diffInSeconds} s atrás`;
    }

    const diffInMinutes = Math.floor(diffInSeconds / 60); // Diferença em minutos
    if (diffInMinutes < 60) {
        return `${diffInMinutes} m atrás`;
    }

    const diffInHours = Math.floor(diffInMinutes / 60); // Diferença em horas
    if (diffInHours < 24) {
        return `${diffInHours} h atrás`;
    }

    const diffInDays = Math.floor(diffInHours / 24); // Diferença em dias
    return `${diffInDays} d atrás`;
}

// Conectar ao Supabase
const SUPABASE_URL = "https://isktnyabdtsfsbbsudqk.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlza3RueWFiZHRzZnNiYnN1ZHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1OTA1MjAsImV4cCI6MjA1MzE2NjUyMH0.BuhzZ_-rd5ZujHQ77tXiqBdzbHIMa7mf_1q-odynMGs";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function getPostIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

const postId = getPostIdFromURL();

// Limite de comentários por vez
const commentsPerPage = 5;
let currentIndex = 0;
let allComments = [];
const commentsDiv = document.getElementById("comments");
const loadMoreBtn = document.createElement("button");
loadMoreBtn.textContent = "Ver mais";
loadMoreBtn.style.display = "none"; 

loadMoreBtn.addEventListener("click", loadMoreComments);

// Função para renderizar os comentários
function renderComments() {
    commentsDiv.innerHTML = "";
    const visibleComments = allComments.slice(0, currentIndex + commentsPerPage);

    visibleComments.forEach(comment => {
        const div = document.createElement("div");
        div.classList.add("comment");

        const timeElapsed = timeAgo(comment.created_at);

        div.innerHTML = `
            <p>Usuario</p>
            <p><strong>Comentário:</strong> ${comment.content}</p>
            <p><em>${timeElapsed}<br></em></p>
        `;

        commentsDiv.appendChild(div);
    });

    if (currentIndex + commentsPerPage < allComments.length) {
        loadMoreBtn.style.display = "block";
    } else {
        loadMoreBtn.style.display = "none";
    }
}

// Carregar mais comentários
function loadMoreComments() {
    currentIndex += commentsPerPage;
    renderComments();
}

// Buscar Comentários
async function fetchComments() {
    const { data, error } = await supabaseClient
        .from("comments")
        .select("*")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Erro ao buscar comentários:", error);
        return;
    }

    allComments = data;
    currentIndex = 0;
    renderComments();

    if (!commentsDiv.contains(loadMoreBtn)) {
        commentsDiv.appendChild(loadMoreBtn);
    }
}

// Adicionar Comentário
async function addComment() {
    const commentInput = document.getElementById("commentInput");
    const content = commentInput.value.trim();

    if (!content) {
        alert("O comentário não pode estar vazio!");
        return;
    }

    const { data, error } = await supabaseClient
        .from("comments")
        .insert([{ post_id: postId, content }]);

    if (error) {
        console.error("Erro ao adicionar comentário:", error);
        return;
    }

    commentInput.value = "";
    fetchComments(); 
}
fetchComments();
