function SectionThree({ name, scrollAmount}) {
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
          React.createElement("h2", null, "Filmes ótimos"),
          React.createElement("h3", null, "Comente o que achou!"),
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

          // Adicionando os Cards como no seu código original
          React.createElement(CardPlay, {
            avaliacao: '7.6',
            nome: "Deadpool e Wolverine",
            modo: "2h 07m",
            anoLancamento: "2024",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=2",
            imagem: "https://media-cache.cinematerial.com/p/500x/wxeowuan/deadpool-wolverine-movie-poster.jpg?v=1716210577",
          }),
          React.createElement(CardPlay, {
            avaliacao: '7.6',
            nome: "Divertidamente 2",
            modo: "1h 36m",
            anoLancamento: "2024",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=3",
            imagem: "./img/ImgCardsFilmes/Divertidamente2.jpeg",
          }),
          React.createElement(CardPlay, {
            avaliacao: '5.9',
            nome: "De Volta à Ação",
            modo: "2h 17m",
            anoLancamento: "2025",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=10",
            imagem: "https://media-cache.cinematerial.com/p/500x/ptdwzafa/back-in-action-movie-poster.jpg?v=1731600265",
          }),
          React.createElement(CardPlay, {
            avaliacao: '5.9',
            nome: "Bezouro Azul",
            modo: "2h 07m",
            anoLancamento: "2023",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=9",
            imagem: "https://media-cache.cinematerial.com/p/500x/ffspxkkv/blue-beetle-movie-poster.jpg?v=1691526774",
          }),
          React.createElement(CardPlay, {
            avaliacao: '4.0',
            nome: "Madame Teia",
            modo: "1h 56m",
            anoLancamento: "2024",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=16",
            imagem: "https://media-cache.cinematerial.com/p/500x/q4um45wn/madame-web-movie-poster.jpg?v=1728692602",
          }),
          React.createElement(CardPlay, {
            avaliacao: '6.6',
            nome: "Alice: Subservience",
            modo: "1h 46m",
            anoLancamento: "2024",
            link: "#Alice",
            imagem: "./img/ImgCardsFilmes/AliceSub.png",
          }),
          React.createElement(CardPlay, {
            avaliacao: '8.8',
            nome: "Sua Culpa",
            modo: "2 horas",
            anoLancamento: "2024",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=15",
            imagem: "./img/ImgCardsFilmes/SuaCulpa.png",
          }),
          React.createElement(CardPlay, {
            avaliacao: '5.6',
            nome: "Atlas",
            modo: "2 horas",
            anoLancamento: "2024",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=13",
            imagem: "https://media-cache.cinematerial.com/p/500x/gdlrqh5q/atlas-movie-poster.jpg?v=1716533773",
          }),
          React.createElement(CardPlay, {
            avaliacao: '8.5',
            nome: "Godzilla e Kong",
            modo: "1h 55m",
            anoLancamento: "2024",
            link: "https://dev-gabriell.github.io/CineMy/filmes.html?id=14",
            imagem: "https://media-cache.cinematerial.com/p/500x/owcbij6r/godzilla-x-kong-the-new-empire-movie-poster.jpg?v=1710376554",
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

const domContainerThree = document.getElementById("FilmesSeries");
const rootThree = ReactDOM.createRoot(domContainerThree);
rootThree.render(React.createElement(SectionThree, { name: "Filmes e Séries", scrollAmount: 600 }));
