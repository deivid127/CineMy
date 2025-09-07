// ====================================================================
// SCRIPT.JS ATUALIZADO COM GESTÃO DE SESSÃO DE UTILIZADOR
// ====================================================================

// Variável global para guardar os dados do utilizador logado
let currentUser = null;

// --- Funções de Login / Logout ---

async function handleLogin(event) {
    event.preventDefault(); 

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    if (!email || !senha) {
        alert('Por favor, preencha o email e a senha.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, senha: senha }),
        });

        const data = await response.json();

        alert(data.mensagem); 

        if (data.sucesso) {
            // ✅ GUARDA OS DADOS DO UTILIZADOR GLOBALMENTE
            currentUser = data.usuario;
            // Salva no sessionStorage para persistir entre páginas
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser)); 

            updateLoginUI(); // Atualiza a interface
            closeLoginModal(); // Fecha a janela de login
        }

    } catch (error) {
        console.error('Erro ao tentar fazer login:', error);
        alert('Ocorreu um erro ao conectar ao servidor. Tente novamente.');
    }
}

function handleLogout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser'); // Remove os dados da sessão
    updateLoginUI(); // Reverte a interface para o estado de "não logado"
    alert('Você saiu da sua conta.');
}

function updateLoginUI() {
    const loginImgContainer = document.querySelector('.loginImg');
    if (!loginImgContainer) return;

    if (currentUser) {
        // Se o utilizador estiver logado, mostra o nome e um botão de logout
        loginImgContainer.innerHTML = `
            <div class="user-info">
                <span>Olá, ${currentUser.nome_usuario}</span>
                <button onclick="handleLogout()" class="logout-btn">Sair</button>
            </div>
        `;
    } else {
        // Se não estiver logado, mostra o ícone de login
        loginImgContainer.innerHTML = `
            <img onclick="login()" style="width: 30px; height: auto; margin-left: 25px; margin-top: 3px; cursor: pointer;" src="./CineMy-Go/Pagina-Principal/img/imgHeader/logo-login.png" alt="Login">
        `;
    }
}

function closeLoginModal() {
    const loginModal = document.getElementById('conteudo-conta');
    loginModal.classList.remove('visivel');
    setTimeout(() => {   
        loginModal.style.display = 'none';
    }, 300);
    document.removeEventListener('click', fecharconta);
}


// --- Funções do Modal de Login (sem alterações) ---
let bloqueioClique = false;
function login(){
    if (bloqueioClique) return;
    const login = document.getElementById('conteudo-conta');
    login.style.display = 'flex';
    
    setTimeout(() =>{
        login.classList.add('visivel');
    },0)

    bloqueioClique = true;
    setTimeout(() =>{
        bloqueioClique = false;
        document.addEventListener('click', fecharconta);
    }, 0);
}

function fecharconta(event){
    const login = document.getElementById('conteudo-conta');
    const abrirConta = document.querySelector('[onclick="login()"]');

    if(!login.contains(event.target) && !login.contains(abrirConta) && event.target !== abrirConta){
        closeLoginModal();
    }
}

// Verifica se há um utilizador guardado na sessão quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
    }
    updateLoginUI();
    lazyLoadComponent();
});


// (O resto do seu código de sliders, scroll, etc., continua aqui...)
// ...
let radio = document.querySelector('.manual-btn');
let cont = 1

document.getElementById('radio1').checked = true;

setInterval(() =>{
    proximaImg()
}, 5000)

function proximaImg(){
    cont++

    if(cont > 3){
        cont = 1
    }
    document.getElementById('radio' + cont).checked = true;
}

//Slider Noticias
let radioNoticia = document.querySelector('.manual-noticia-btn');
let contNoticia = 1

document.getElementById('radioN1').checked = true;

setInterval(() =>{
    proximaImgNoticia()
}, 5000)

function proximaImgNoticia(){
    contNoticia++

    if(contNoticia > 3){
        contNoticia = 1
    }
    document.getElementById('radioN' + contNoticia).checked = true;
}

function ButtonClickLeft(){
    contNoticia--
    if(contNoticia < 1){ // Corrigido para não ir abaixo de 1
      contNoticia = 3;
    }
    document.getElementById('radioN' + contNoticia).checked = true;
}

function ButtonClicRight(){
    contNoticia++
    if(contNoticia > 3){
        contNoticia = 1
    }
    document.getElementById('radioN' + contNoticia).checked = true;
}

function Search(){
    const search = document.querySelector('.input-Search');
    
    if (search) {
        if (search.style.display === "block") {
            search.style.display = "none"; 
        } else {
            search.style.display = "block";
        }
    }
}
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header-Geral'); 

    if (window.scrollY > 0) {
        header.classList.remove('no-background'); 
    } else {
        header.classList.add('no-background'); 
    }
});

function smoothScroll(container, amount) {
    container.scrollBy({ left: amount, behavior: 'smooth' });
}

// Controladores de scroll para os carrosséis
document.addEventListener('DOMContentLoaded', () => {
    const setupCarousel = (containerSelector, leftBtnSelector, rightBtnSelector, scrollAmount) => {
        const container = document.querySelector(containerSelector);
        const leftBtn = document.querySelector(leftBtnSelector);
        const rightBtn = document.querySelector(rightBtnSelector);

        if (container && leftBtn && rightBtn) {
            rightBtn.addEventListener('click', () => smoothScroll(container, scrollAmount));
            leftBtn.addEventListener('click', () => smoothScroll(container, -scrollAmount));
        }
    };

    setupCarousel('.entrevistas-container', '.left-btn', '.right-btn', 1000);
    setupCarousel('.categoria-conteiner', '.left-btnCat', '.right-btnCat', 1000);
    setupCarousel('.votacao-conteiner', '.left-btnVote', '.right-btnVote', 1000);
});

// Funções do banner de imagens do anime
let clickImage = 0
function ImageClickRight(){
  let FullImageAnime = document.querySelector('.primeiro-img-anime');

  if(clickImage === 0){
    FullImageAnime.style.marginLeft = '-100%';
    clickImage++
  } else if(clickImage === 1){
    FullImageAnime.style.marginLeft = '-200%';
    clickImage++
  } else {
    FullImageAnime.style.marginLeft = '0';
    clickImage = 0;
  }
}

function ImageClickLeft(){
  let FullImageAnime = document.querySelector('.primeiro-img-anime');

  if(clickImage === 0){
    FullImageAnime.style.marginLeft = '-200%';
    clickImage = 2;
  } else if(clickImage === 1){
    FullImageAnime.style.marginLeft = '0';
    clickImage--
  } else {
    FullImageAnime.style.marginLeft = '-100%';
    clickImage--;
  }
}

let containerImgAnime = document.querySelector('.content-img-anime');
function EnterImgAnime(){
  if(containerImgAnime) containerImgAnime.style.display = 'flex'
}

function CloseImgAnime(){
  if(containerImgAnime) containerImgAnime.style.display = 'none';
}

const returnButton = document.querySelector('.return-button');
const sectionFour = document.querySelector('.section-four');

window.addEventListener('scroll', () => {
    if(!sectionFour || !returnButton) return;
    const sectionPosition = sectionFour.getBoundingClientRect().top;

    if (sectionPosition <= window.innerHeight) {
    returnButton.classList.add('show'); 
    } else {
    returnButton.classList.remove('show'); 
    }
});

// Funções de scroll suave para links de menu
const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== "undefined" ? duration : 300;

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60);
}

// Lazy Loading para componentes
function lazyLoadComponent() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        target.classList.add('visible');
        observer.unobserve(target);
      }
    });
  }, {
    root: null,
    rootMargin: '90px',
    threshold: 0.1 
  });

  const elements = document.querySelectorAll('.lazy-component');
  elements.forEach(element => observer.observe(element));
}

// Funções do modal "Criar Conta"
const abrirConta = document.querySelector('.container-account');

function CriarConta(){
  if (abrirConta) abrirConta.style.display = 'flex';
}
function closeCriarconta(){
  if (abrirConta) abrirConta.style.display = 'none';
}

async function enviarFormulario() {
    // A primeira parte, de validação, continua igual
    let enviar = true;
    const nomeInput = document.getElementById('username');
    const emailInput = document.getElementById('emailCriar');
    const senhaInput = document.getElementById('password');
    const confirmSenhaInput = document.getElementById('confirm-password');
    const mensagemDiv = document.getElementById('mensagem');
    
    const nome = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;
    const confirmSenha = confirmSenhaInput.value;
    let mensagem = "";

    mensagemDiv.innerHTML = "";

    if (nome.length === 0) {
        enviar = false;
        mensagem += "O campo Nome de utilizador é obrigatório.<br>";
    }
    if (email.indexOf("@") < 0) {
        enviar = false;
        mensagem += "Por favor, insira um email válido.<br>";
    }
    if (senha.length < 4) { // Adicionada validação de tamanho mínimo da senha
        enviar = false;
        mensagem += "A senha deve ter pelo menos 4 caracteres.<br>";
    }
    if (senha !== confirmSenha) {
        enviar = false;
        mensagem += "As senhas não coincidem.<br>";
    }

    if (!enviar) {
        mensagemDiv.innerHTML = mensagem;
        return; // Para a execução se houver erros
    }

    // Se a validação passar, enviamos os dados para a API
    try {
        const response = await fetch('http://127.0.0.1:5000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: nome,
                email: email,
                password: senha
            }),
        });

        const data = await response.json();

        // Mostra a mensagem da API (sucesso ou erro, como "email já existe")
        alert(data.mensagem);

        if (data.sucesso) {
            // Limpa os campos e fecha o modal se o registo for bem-sucedido
            nomeInput.value = "";
            emailInput.value = "";
            senhaInput.value = "";
            confirmSenhaInput.value = "";
            closeCriarconta();
        }

    } catch (error) {
        console.error('Erro ao tentar registar:', error);
        alert('Ocorreu um erro ao conectar ao servidor. Tente novamente.');
    }
}

// ====================================================================
// NOVA FUNÇÃO DE BUSCA USANDO A API PYTHON
// ====================================================================
async function searchMovies(inputId, resultsId) {
    const API_URL = "http://127.0.0.1:5000";
    const query = document.getElementById(inputId).value;
    const resultsList = document.getElementById(resultsId);

    if (query.length < 2) {
        resultsList.innerHTML = '';
        resultsList.style.display = 'none';
        return;
    }

    try {
        const params = new URLSearchParams({ q: query });
        const response = await fetch(`${API_URL}/search/filmes?${params}`);
        const results = await response.json();

        resultsList.innerHTML = ''; 
        if (results.length > 0) {
            results.forEach(filme => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="filmes.html?id=${filme.id_filme}">
                                  <img src="${filme.imagem}" alt="${filme.titulo}" width="40" style="margin-right: 10px;">
                                  <span>${filme.titulo}</span>
                                </a>`;
                resultsList.appendChild(li);
            });
            resultsList.style.display = 'block';
        } else {
            resultsList.style.display = 'none';
        }
    } catch (error) {
        console.error('Erro na busca:', error);
        resultsList.style.display = 'none';
    }
}