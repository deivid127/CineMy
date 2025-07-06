function SectionSeven({scrollAmount}) {
    const scrollContainerRef = React.createRef();
    const leftButtonRef = React.createRef();
    const rightButtonRef = React.createRef();
    
    // Função de rolagem suave
    const smoothScroll = (amount) => {
      if (!scrollContainerRef.current) return;
  
      const container = scrollContainerRef.current;
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
          updateButtonVisibility();
        }
      };
      requestAnimationFrame(step);
    };
  
    // Função para atualizar a visibilidade dos botões
    const updateButtonVisibility = () => {
      if (!scrollContainerRef.current || !leftButtonRef.current || !rightButtonRef.current) return;
  
      const container = scrollContainerRef.current;
      const leftButton = leftButtonRef.current;
      const rightButton = rightButtonRef.current;
  
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
  
    React.useEffect(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
  
      container.addEventListener("scroll", updateButtonVisibility);
      updateButtonVisibility(); // Inicializa a visibilidade dos botões
  
      return () => {
        container.removeEventListener("scroll", updateButtonVisibility);
      };
    }, []);
  
    // Criando o layout com React.createElement
    return React.createElement(
      "div",
      { className: "Filmes-Series-content" },
      React.createElement(
        "div",
        null,
        React.createElement(
          "div",
          { className: "text-verMais" },
          React.createElement(
            "div",
            { className: "NomeSecoes2" },
            React.createElement("p", null,
              React.createElement(
                "a",{ href: "#" },"Filmes no top 10 »")
            )
          ),
      
        ),
        React.createElement(
          "div",
          { className: "conteiner-two-destaques top10", style: { position: "relative", display: "flex", alignItems: "center" } },
          React.createElement(
            "button",
            {
              id: "scrollLeft",
              className: "scrollLeft",
              ref: leftButtonRef,
              onClick: () => smoothScroll(-scrollAmount),
              style: { display: "none", position: "absolute", left: "0", top: "50%", transform: "translateY(-50%)" }
            },
            React.createElement("p", null, "«")
          ),
          React.createElement(
            "div",
            {
              className: "filmes-destaques",
              ref: scrollContainerRef,
              style: { display: "flex", overflowX: "auto", whiteSpace: "nowrap", width: "100%", scrollBehavior: "smooth" }
            },
  
            // Adicionando os Cards
            React.createElement(CardPlay, {
              avaliacao: '1',
              nome: "Mufasa: O Rei Leão",
              modo: "2h 0m",
              anoLancamento: "2024",
              link: 'http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=7',
              imagem: "https://m.media-amazon.com/images/M/MV5BYjBkOWUwODYtYWI3YS00N2I0LWEyYTktOTJjM2YzOTc3ZDNlXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg",
            }),
            React.createElement(CardPlay, {
              avaliacao: '2',
              nome: "Venom: A Última Rodada",
              modo: "1h 49m",
              anoLancamento: "2024",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=5",
              imagem: "https://media-cache.cinematerial.com/p/500x/bicsbagk/venom-the-last-dance-movie-poster.jpg?v=1717423514",
            }),
            React.createElement(CardPlay, {
              avaliacao: '3',
              nome: "Sonic",
              modo: "1h 50m",
              anoLancamento: "2024",
              link: 'http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=1',
              imagem: 'https://media-cache.cinematerial.com/p/500x/grnwpsui/sonic-the-hedgehog-3-movie-poster.jpg?v=1731049635',
            }),
            React.createElement(CardPlay, {
              avaliacao: '4',
              nome: "Deadpool e Wolverine",
              modo: "2h 07m",
              anoLancamento: "2024",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=2",
              imagem: "https://media-cache.cinematerial.com/p/500x/wxeowuan/deadpool-wolverine-movie-poster.jpg?v=1716210577",
            }),
            React.createElement(CardPlay, {
                avaliacao: '5',
                nome: "Chico Bento e a...",
                modo: "1h 30m",
                anoLancamento: "2025",
                link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=8",
                imagem: "https://media-cache.cinematerial.com/p/500x/t3l4xxjg/chico-bento-e-a-goiabeira-maraviosa-brazilian-movie-poster.jpg?v=1718904653",
              }),
              
            React.createElement(CardPlay, {
              avaliacao: '6',
              nome: "Planeta dos Macacos...",
              modo: "2h 25m",
              anoLancamento: "2024",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=11",
              imagem: "https://media-cache.cinematerial.com/p/500x/csaedmkp/kingdom-of-the-planet-of-the-apes-malaysian-movie-poster.jpg?v=1713866472",
            }),
            React.createElement(CardPlay, {
              avaliacao: '7',
              nome: "Donzela",
              modo: "1h 50m",
              anoLancamento: "2024",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=12",
              imagem: "https://media-cache.cinematerial.com/p/500x/xwpjmlhg/damsel-movie-poster.jpg?v=1706814681",
            }),
            React.createElement(CardPlay, {
              avaliacao: '8',
              nome: "Atlas",
              modo: "2 horas",
              anoLancamento: "2024",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=13",
              imagem: "https://media-cache.cinematerial.com/p/500x/gdlrqh5q/atlas-movie-poster.jpg?v=1716533773",
            }),
            React.createElement(CardPlay, {
              avaliacao: '6.1',
              nome: "Godzilla e Kong",
              modo: "1h 55m",
              anoLancamento: "2024",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=14",
              imagem: "https://media-cache.cinematerial.com/p/500x/owcbij6r/godzilla-x-kong-the-new-empire-movie-poster.jpg?v=1710376554",
            }),
            React.createElement(CardPlay, {
              avaliacao: '10',
              nome: "Sua Culpa",
              modo: "2h 0m",
              anoLancamento: "2024",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=15",
              imagem: "https://media-cache.cinematerial.com/p/500x/l3lzi4lp/culpa-tuya-movie-poster.jpg?v=1735805677",
            }) 
          ),
          React.createElement(
            "button",
            {
              id: "scrollRight",
              className: "scrollRight",
              ref: rightButtonRef,
              onClick: () => smoothScroll(scrollAmount),
              style: { position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)" }
            },
            React.createElement("p", null, "»")
          )
        )
      )
    );
  }
  
  const domContainerSeven = document.getElementById("section-seven");
  const rootSeven = ReactDOM.createRoot(domContainerSeven);
  rootSeven.render(React.createElement(SectionSeven, { name: "Filmes e Séries", scrollAmount: 600 }));
  