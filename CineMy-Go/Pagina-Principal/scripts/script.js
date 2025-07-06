//header
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

    if(!login.contains(event.target) && event.target.id !== abrirConta){
        login.classList.remove('visivel');
        setTimeout(() =>{   
        login.style.display = 'none';
    }, 300);
        document.removeEventListener('click', fecharconta);
    }
}
//fim header

//Slider Topo do Site
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
    if(contNoticia < 3){
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
    const header = document.querySelector('.header-Geral'); // Seleciona o cabeçalho

    if (window.scrollY > 0) {
        header.classList.remove('no-background'); 
    } else {
        header.classList.add('no-background'); 
    }
});



function smoothScroll(container, amount) {
    let start = container.scrollLeft;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let scrollStep = Math.min(progress / 300, 1); 
        container.scrollLeft = start + scrollStep * amount;
        if (scrollStep < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Função para controlar a rolagem e visibilidade dos botões
function scrollContainer(containerSelector, amount, leftButton, rightButton) {
    const container = document.querySelector(containerSelector);
    smoothScroll(container, amount);


    if (amount < 0) {
        leftButton.style.display = 'none';
        rightButton.style.display = 'flex';
    } else {
        leftButton.style.display = 'flex';
        rightButton.style.display = 'none';
    }
}

// Botões e eventos para vídeos
const rightVideos = document.querySelector('.right-btn');
const leftVideos = document.querySelector('.left-btn');

rightVideos.addEventListener('click', () =>
    scrollContainer('.entrevistas-container', 2600, leftVideos, rightVideos)
);

leftVideos.addEventListener('click', () =>
    scrollContainer('.entrevistas-container', -2600, leftVideos, rightVideos)
);

// Botões e eventos para categorias
const catButtonLeft = document.querySelector('.left-btnCat');
const catButtonRight = document.querySelector('.right-btnCat');

catButtonRight.addEventListener('click', () =>
    scrollContainer('.categoria-conteiner', 2600, catButtonLeft, catButtonRight)
);

catButtonLeft.addEventListener('click', () =>
    scrollContainer('.categoria-conteiner', -2600, catButtonLeft, catButtonRight)
);

const voteButtonLeft = document.querySelector('.left-btnVote');
const voteButtonRight = document.querySelector('.right-btnVote');


voteButtonLeft.addEventListener('click', () =>
    scrollContainer('.votacao-conteiner', -1500, voteButtonLeft, voteButtonRight)
);

voteButtonRight.addEventListener('click', () =>
    scrollContainer('.votacao-conteiner', 1500, voteButtonLeft, voteButtonRight) // Corrigido aqui
);





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
        FullImageAnime.style.marginLeft = '-100%';
        clickImage++
      } else if(clickImage === 1){
        FullImageAnime.style.marginLeft = '0';
        clickImage++
      } else {
        FullImageAnime.style.marginLeft = '-200%';
        clickImage = 0;
      }
    }

    let containerImgAnime = document.querySelector('.content-img-anime');
    function EnterImgAnime(){
      containerImgAnime.style.display = 'flex'
    }

    function CloseImgAnime(){
      containerImgAnime.style.display = 'none';
    }

    const returnButton = document.querySelector('.return-button');
    const sectionFour = document.querySelector('.section-four');

    window.addEventListener('scroll', () => {

      const sectionPosition = sectionFour.getBoundingClientRect().top;

      if (sectionPosition <= window.innerHeight) {
        returnButton.classList.add('show'); 
      } else {
        returnButton.classList.remove('show'); 
      }
    });


    const menuLinks = document.querySelectorAll('.menu a[href^="#"]');

    function getDistanceFromTheTop(element) {
      const id = element.getAttribute("href");
      return document.querySelector(id).offsetTop;
    }
    
    // function nativeScroll(distanceFromTheTop) {
    //   window.scroll({
    //     top: distanceFromTheTop,
    //     behavior: "smooth",
    //   });
    // }
    
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
    
      // Selecione todos os elementos a serem observados
      const elements = document.querySelectorAll('.lazy-component');
      elements.forEach(element => observer.observe(element));
    }

    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadComponent();
    });


    const abrirConta = document.querySelector('.container-account');

    function CriarConta(){
      abrirConta.style.display = 'flex';
    }
    function closeCriarconta(){
      abrirConta.style.display = 'none';
    }

    //VALIDAÇÃO DE CAMPOS CRIAR CONTA
    function enviarFormulario() {
      let enviar = true;
      let nome = document.getElementById('username').value;
      let email = document.getElementById('emailCriar').value;
      let senha = document.getElementById('password').value;
      let confirmSenha = document.getElementById('confirm-password').value;
      let mensagem = ""; // Variável para armazenar a mensagem de erro
  
      // Limpa qualquer mensagem anterior
      document.getElementById('mensagem').innerHTML = "";
  
      // Validação dos campos
      if (nome.length == 0) {
          enviar = false;
          document.getElementById('username').placeholder = "Digite o nome*: ";
          document.getElementById('username').style.backgroundColor = "#FA8072";
          document.getElementById('username').style.border = "1px solid red";
      }else{
        document.getElementById('username').style.backgroundColor = "";
        document.getElementById('username').style.border = "";
      }
  
      if (email.indexOf("@") < 0) {
          enviar = false;
          document.getElementById('emailCriar').placeholder = "Digite o email*: ";
          document.getElementById('emailCriar').style.backgroundColor = "#FA8072";
          document.getElementById('emailCriar').style.border = "1px solid red";
      } else{
        document.getElementById('emailCriar').style.backgroundColor = "";
          document.getElementById('emailCriar').style.border = "";
      }
  
      if (senha.length == 0) {
          enviar = false;
          document.getElementById('password').placeholder = "Digite a senha*: ";
          document.getElementById('password').style.backgroundColor = "#FA8072";
          document.getElementById('password').style.border = "1px solid red";
      } else{
        document.getElementById('password').style.backgroundColor = "";
          document.getElementById('password').style.border = "";
      }

  
      if (confirmSenha.length === 0) {
          enviar = false;
          document.getElementById('confirm-password').placeholder = "Digite a confirmação de senha*: ";
          document.getElementById('confirm-password').style.backgroundColor = "#FA8072";
          document.getElementById('confirm-password').style.border = "1px solid red";
      }else{
        document.getElementById('confirm-password').style.backgroundColor = "";
          document.getElementById('confirm-password').style.border = "";
      }
  
      if (senha !== confirmSenha) {
          enviar = false;
          mensagem += "<br>As senhas não conferem.<br>";
      }
  
      // Se houver mensagens de erro, mostra na tela
      if (mensagem !== "") {
          document.getElementById('mensagem').innerHTML = mensagem;
      } else {
        nome.textContent = "";
        email.textContent = "";
          
        document.criarConta.submit();
         
        setTimeout(() => {
          nome.value = "";
          email.value = "";
          senha.value = "";
          confirmSenha.value = "";
      }, 100);
      }
  }



  //PESQUISA AVANÇADA
  

  async function searchSupabase() {
    const SUPABASE_URL = "https://isktnyabdtsfsbbsudqk.supabase.co"; 
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlza3RueWFiZHRzZnNiYnN1ZHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1OTA1MjAsImV4cCI6MjA1MzE2NjUyMH0.BuhzZ_-rd5ZujHQ77tXiqBdzbHIMa7mf_1q-odynMGs";
    const { createClient } = supabase;
    const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
    let query = document.getElementById("pesquisa").value;
    if (query.length < 2) { 
        document.getElementById("results").innerHTML = "";
        return;
    }

    let { data, error } = await supabaseClient
        .from('filmes')  // Altere para o nome correto da tabela
        .select('*')
        .ilike('titulo', `%${query}%`);

    if (error) {
        console.error("Erro na pesquisa:", error);
        return;
    }

    let resultsList = document.getElementById("results");
    resultsList.innerHTML = ""; 

    data.forEach(item => {
        let li = document.createElement("li");

        let link = document.createElement("a");
        link.href = `https://dev-gabriell.github.io/CineMy/filmes.html?id=${item.id}`; 
        link.textContent = item.titulo;

        li.appendChild(link);
        resultsList.appendChild(li);
    });
}


async function searchSupabase2(){
  const SUPABASE_URL = "https://isktnyabdtsfsbbsudqk.supabase.co"; 
  const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlza3RueWFiZHRzZnNiYnN1ZHFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc1OTA1MjAsImV4cCI6MjA1MzE2NjUyMH0.BuhzZ_-rd5ZujHQ77tXiqBdzbHIMa7mf_1q-odynMGs";
  const { createClient } = supabase;
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  
  let query = document.getElementById("pesquisa2").value;
  if (query.length < 2) { 
      document.getElementById("results2").innerHTML = "";
      return;
  }

  let { data, error } = await supabaseClient
      .from('filmes')  // Altere para o nome correto da tabela
      .select('*')
      .ilike('titulo', `%${query}%`);

  if (error) {
      console.error("Erro na pesquisa:", error);
      return;
  }

  let resultsList = document.getElementById("results2");
  resultsList.innerHTML = ""; 

  data.forEach(item => {
      let li = document.createElement("li");

      let link = document.createElement("a");
      link.href = `https://dev-gabriell.github.io/CineMy/filmes.html?id=${item.id}`; 
      link.textContent = item.titulo;

      li.appendChild(link);
      resultsList.appendChild(li);
  });
}