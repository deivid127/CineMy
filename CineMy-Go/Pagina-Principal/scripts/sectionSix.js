function SectionSix({scrollAmount}) {
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
            React.createElement("h2", null, "Explosão de Entretenimento"),
            React.createElement("h3", null, "Marque o ep que parou!"),
            React.createElement("p", null,
              React.createElement(
                "a",{ href: "#" },"Filmes Nacionais »")
            )
          ),
          React.createElement(
            "div",
            { className: "verMais" },
            React.createElement("p", null, React.createElement("a", { href: "#" }, "Ver mais"))
          )
        ),
        React.createElement(
          "div",
          { className: "conteiner-two-destaques", style: { position: "relative", display: "flex", alignItems: "center" } },
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
              avaliacao: '8.6',
              nome: "Cidade de Deus",
              modo: "2h 10m",
              anoLancamento: "2002",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=17",
              imagem: "https://media-cache.cinematerial.com/p/500x/7hhve0ob/cidade-de-deus-movie-poster.jpg?v=1456259667",
            }),
            React.createElement(CardPlay, {
              avaliacao: '8.0',
              nome: "Tropa de Elite",
              modo: "1h 55m",
              anoLancamento: "2007",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=18",
              imagem: "https://media-cache.cinematerial.com/p/500x/09fkuq4j/tropa-de-elite-spanish-movie-poster.jpg?v=1456777347",
            }),
            React.createElement(CardPlay, {
              avaliacao: '8.6',
              nome: "O Auto da Compadecida",
              modo: "1h 44m",
              anoLancamento: "2000",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=19",
              imagem: "https://media-cache.cinematerial.com/p/500x/cp8fdgad/o-auto-da-compadecida-brazilian-movie-poster.jpg?v=1456441479",
            }),
            React.createElement(CardPlay, {
              avaliacao: '5.0',
              nome: "Até que a Sorte...",
              modo: "1h 42m",
              anoLancamento: "2013",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=20",
              imagem: "https://media-cache.cinematerial.com/p/500x/fqxvgtdu/ate-que-a-sorte-nos-separe-2-brazilian-movie-poster.jpg?v=1456482751",
            }),
            React.createElement(CardPlay, {
              avaliacao: '6.5',
              nome: "Hebe: A Estrela do Brasil",
              modo: "1h 52m",
              anoLancamento: "2019",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=21",
              imagem: "https://media-cache.cinematerial.com/p/500x/3nqfwhpz/hebe-a-estrela-do-brasil-brazilian-movie-poster.jpg?v=1567617339",
            }),
            React.createElement(CardPlay, {
              avaliacao: '8.0',
              nome: "Central do Brasil",
              modo: "5 Temporadas",
              anoLancamento: "1998",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=22",
              imagem: "https://media-cache.cinematerial.com/p/500x/1x7d8fge/central-do-brasil-movie-poster.jpg?v=1456831287",
            }),
            React.createElement(CardPlay, {
              avaliacao: '7.6',
              nome: "Carandiru",
              modo: "2h 25m",
              anoLancamento: "2003",
              link: "http://127.0.0.1:5501/CineMy-Go/Pagina-Principal/filmes.html?id=23",
              imagem: "https://media-cache.cinematerial.com/p/500x/vavc0xub/carandiru-movie-poster.jpg?v=1456699537",
            }),
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
  
  const domContainerSix = document.getElementById("section-six");
  const rootSix = ReactDOM.createRoot(domContainerSix);
  rootSix.render(React.createElement(SectionSix, { name: "Filmes e Séries", scrollAmount: 600 }));
  