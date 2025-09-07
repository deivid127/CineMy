-- ====================================================================
-- CINEMY - SCRIPT DE CONFIGURAÇÃO COMPLETO (VERSÃO CORRIGIDA)
-- APAGA AS TABELAS ANTIGAS, CRIA AS NOVAS E INSERE 20 FILMES.
-- ====================================================================

-- Apaga as tabelas existentes para começar do zero (cuidado: isso remove todos os dados)
DROP TABLE IF EXISTS comentarios;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS filmes;

-- Tabela de Filmes
CREATE TABLE `filmes` (
  `id_filme` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `sinopse` text,
  `ano` int(11) DEFAULT NULL,
  `direcao` varchar(255) NOT NULL,
  `artistas` varchar(255) NOT NULL,
  `avaliacao` float NOT NULL,
  `imagem` varchar(500) NOT NULL,
  `bilheteria` varchar(100) DEFAULT NULL,
  `faixa` int(11) DEFAULT NULL,
  `video` varchar(500) DEFAULT NULL,
  `tempo` varchar(50) DEFAULT NULL,
  `img_post` varchar(500) DEFAULT NULL,
  `img_post2` varchar(500) DEFAULT NULL,
  `img_post3` varchar(500) DEFAULT NULL,
  `genero` varchar(100) DEFAULT NULL,
  `plataforma` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_filme`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabela de Usuários
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `data_cadastro` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `nome_usuario` (`nome_usuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Tabela de Comentários
CREATE TABLE `comentarios` (
  `id_comentario` int(11) NOT NULL AUTO_INCREMENT,
  `id_filme` int(11) NOT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `conteudo` text NOT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_comentario`),
  KEY `id_filme` (`id_filme`),
  KEY `id_usuario` (`id_usuario`),
  CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_filme`) REFERENCES `filmes` (`id_filme`),
  CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- ====================================================================
-- INSERÇÃO AUTOMÁTICA DE DADOS
-- ====================================================================

-- Inserir um usuário padrão para os comentários
INSERT INTO `usuarios` (`id_usuario`, `nome_usuario`, `email`, `senha`) VALUES
(1, 'visitante', 'visitante@email.com', '1234'),
(2, 'cinéfilo_expert', 'expert@email.com', '1234');

-- Inserir 20 filmes variados
INSERT INTO `filmes` (`id_filme`, `titulo`, `sinopse`, `ano`, `direcao`, `artistas`, `avaliacao`, `imagem`, `bilheteria`, `faixa`, `video`, `tempo`, `genero`, `plataforma`) VALUES
(1, 'Duna: Parte Dois', 'Paul Atreides se une a Chani e aos Fremen em uma guerra de vingança contra os conspiradores que destruíram sua família.', 2024, 'Denis Villeneuve', 'Timothée Chalamet, Zendaya, Rebecca Ferguson', 8.8, 'https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05ES0nw.jpg', '711M', 14, 'https://www.youtube.com/embed/U2Qp5pL3ovA', '2h 46m', 'Ficção Científica', 'HBO Max'),
(2, 'Oppenheimer', 'A história do físico americano J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica.', 2023, 'Christopher Nolan', 'Cillian Murphy, Emily Blunt, Matt Damon', 8.6, 'https://image.tmdb.org/t/p/w500/c0DCmfC7Et2K3ssj20AzaLd28VO.jpg', '952M', 16, 'https://www.youtube.com/embed/uYPbbksJxIg', '3h 0m', 'Biografia', 'Prime Video'),
(3, 'Homem-Aranha: Através do Aranhaverso', 'Miles Morales é catapultado através do Multiverso, onde ele encontra uma equipe de Pessoas-Aranha encarregada de proteger sua própria existência.', 2023, 'Joaquim Dos Santos', 'Shameik Moore, Hailee Steinfeld, Oscar Isaac', 8.7, 'https://image.tmdb.org/t/p/w500/4Y2yYj1kBE0h2pmuOTbU7T12p20.jpg', '690M', 10, 'https://www.youtube.com/embed/gt_fAE1Eg2Q', '2h 20m', 'Animação', 'HBO Max'),
(4, 'Pobres Criaturas', 'A fantástica evolução de Bella Baxter, uma jovem trazida de volta à vida pelo brilhante e heterodoxo cientista Dr. Godwin Baxter.', 2023, 'Yorgos Lanthimos', 'Emma Stone, Mark Ruffalo, Willem Dafoe', 8.4, 'https://image.tmdb.org/t/p/w500/kCGlIMHnOm8JPXq3rXM6c5wMxcT.jpg', '117M', 18, 'https://www.youtube.com/embed/R-eFmN-E-3Y', '2h 21m', 'Comédia', 'Star+'),
(5, 'O Urso do Pó Branco', 'Um grupo excêntrico de policiais, criminosos, turistas e adolescentes converge para uma floresta da Geórgia, onde um urso ingeriu uma enorme quantidade de cocaína.', 2023, 'Elizabeth Banks', 'Keri Russell, Alden Ehrenreich, O''Shea Jackson Jr.', 6.0, 'https://image.tmdb.org/t/p/w500/oTe2g320hPQR04a8n3nOq2k26M5.jpg', '87M', 18, 'https://www.youtube.com/embed/CiL5C2hY_20', '1h 35m', 'Terror', 'Netflix'),
(6, 'Super Mario Bros. O Filme', 'Um encanador chamado Mario viaja por um labirinto subterrâneo com seu irmão, Luigi, tentando salvar uma princesa capturada.', 2023, 'Aaron Horvath', 'Chris Pratt, Anya Taylor-Joy, Jack Black', 7.1, 'https://image.tmdb.org/t/p/w500/i9t5iA88tMhP2iB1H5l6yTceIPI.jpg', '1.36B', 0, 'https://www.youtube.com/embed/cDNkh5Wyb-s', '1h 32m', 'Animação', 'Prime Video'),
(7, 'John Wick 4: Baba Yaga', 'John Wick descobre um caminho para derrotar a Alta Cúpula. Mas antes, deve enfrentar um novo inimigo com alianças poderosas.', 2023, 'Chad Stahelski', 'Keanu Reeves, Donnie Yen, Bill Skarsgård', 7.8, 'https://image.tmdb.org/t/p/w500/rXTqhpkpj6E0wB4dXcpB2iK93er.jpg', '432M', 16, 'https://www.youtube.com/embed/qEVUtrk8_B4', '2h 49m', 'Ação', 'Netflix'),
(8, 'Barbie', 'Barbie sofre uma crise que a leva a questionar seu mundo e sua existência.', 2023, 'Greta Gerwig', 'Margot Robbie, Ryan Gosling, America Ferrera', 6.9, 'https://image.tmdb.org/t/p/w500/yRqrwQYM3OhnAbuz9Vb2p9z70vB.jpg', '1.44B', 12, 'https://www.youtube.com/embed/pBk4NYhWNMM', '1h 54m', 'Comédia', 'HBO Max'),
(9, 'A Baleia', 'Um professor de inglês recluso com obesidade severa tenta se reconectar com sua filha para uma última chance de redenção.', 2022, 'Darren Aronofsky', 'Brendan Fraser, Sadie Sink, Ty Simpkins', 7.8, 'https://image.tmdb.org/t/p/w500/y8zYh0b4iVG102gS3aWGPPiK5iQ.jpg', '54M', 16, 'https://www.youtube.com/embed/nWiQodhM-h4', '1h 57m', 'Drama', 'Paramount+'),
(10, 'Gato de Botas 2: O Último Pedido', 'O Gato de Botas descobre que sua paixão pela aventura cobrou seu preço: ele queimou oito de suas nove vidas.', 2022, 'Joel Crawford', 'Antonio Benderas, Salma Hayek, Harvey Guillén', 7.9, 'https://image.tmdb.org/t/p/w500/mapunaDBI6g0t8iIsK43pZ2w7iP.jpg', '481M', 0, 'https://www.youtube.com/embed/sUIoH2-6a6I', '1h 42m', 'Animação', 'Prime Video'),
(11, 'Top Gun: Maverick', 'Depois de mais de trinta anos de serviço, Pete Mitchell está onde pertence, ultrapassando os limites como um piloto de teste.', 2022, 'Joseph Kosinski', 'Tom Cruise, Jennifer Connelly, Miles Teller', 8.3, 'https://image.tmdb.org/t/p/w500/jMLsNf2WHcs4WBYUFSv1p6g9V29.jpg', '1.49B', 12, 'https://www.youtube.com/embed/qSqVVswa420', '2h 10m', 'Ação', 'Star+'),
(12, 'Tudo em Todo o Lado ao Mesmo Tempo', 'Uma imigrante chinesa é arrastada para uma aventura insana, onde só ela pode salvar o mundo explorando outros universos.', 2022, 'Daniel Kwan', 'Michelle Yeoh, Ke Huy Quan, Stephanie Hsu', 7.9, 'https://image.tmdb.org/t/p/w500/m1lza30v9y1h2024n352QvOk7n2.jpg', '141M', 14, 'https://www.youtube.com/embed/wxN1T1uxQ2g', '2h 19m', 'Aventura', 'Netflix'),
(13, 'O Menu', 'Um jovem casal viaja para uma ilha para comer num restaurante exclusivo, onde o chef preparou um menu com algumas surpresas chocantes.', 2022, 'Mark Mylod', 'Ralph Fiennes, Anya Taylor-Joy, Nicholas Hoult', 7.2, 'https://image.tmdb.org/t/p/w500/8jJKM0xHlB2Lz8aIuA333mRRd6D.jpg', '79M', 16, 'https://www.youtube.com/embed/C_uTkUGcHv4', '1h 47m', 'Suspense', 'Star+'),
(14, 'Avatar: O Caminho da Água', 'Jake Sully vive com sua nova família em Pandora. Uma ameaça retorna, e Jake deve trabalhar com Neytiri e o exército Na''vi para proteger seu planeta.', 2022, 'James Cameron', 'Sam Worthington, Zoe Saldana, Sigourney Weaver', 7.6, 'https://image.tmdb.org/t/p/w500/3Q2wGARWC3BCiSNf4w2j221yOev.jpg', '2.32B', 12, 'https://www.youtube.com/embed/d9MyW72ELq0', '3h 12m', 'Ficção Científica', 'Disney+'),
(15, 'Ataque dos Cães', 'Um fazendeiro dominador, mas carismático, atormenta o novo irmão de sua esposa e seu filho até que segredos vêm à luz.', 2021, 'Jane Campion', 'Benedict Cumberbatch, Kirsten Dunst, Jesse Plemons', 6.8, 'https://image.tmdb.org/t/p/w500/1o9c2eCV2ZGf8kmtQWb1Lz5c3uC.jpg', 'N/A', 16, 'https://www.youtube.com/embed/EL_KSmAnbSM', '2h 6m', 'Drama', 'Netflix'),
(16, 'Não Olhe para Cima', 'Dois astrônomos devem fazer uma turnê de mídia para alertar a humanidade sobre um cometa que destruirá o planeta Terra.', 2021, 'Adam McKay', 'Leonardo DiCaprio, Jennifer Lawrence, Meryl Streep', 7.2, 'https://image.tmdb.org/t/p/w500/iMUmge3N7yD2t9QjYt1n56hJ862.jpg', 'N/A', 16, 'https://www.youtube.com/embed/b8_Vn2a_m4o', '2h 18m', 'Comédia', 'Netflix'),
(17, 'A Lenda de Klaus', 'A história de origem do Papai Noel, contada através da amizade entre um carteiro egoísta e um fabricante de brinquedos recluso.', 2019, 'Sergio Pablos', 'Jason Schwartzman, J.K. Simmons, Rashida Jones', 8.2, 'https://image.tmdb.org/t/p/w500/ctOARm9k22s1v7i222u6cZJTMGf.jpg', 'N/A', 0, 'https://www.youtube.com/embed/taE3PwurhYM', '1h 36m', 'Animação', 'Netflix'),
(18, 'Parasita', 'Ganância e discriminação de classe ameaçam o relacionamento entre a rica família Park e o pobre clã Kim.', 2019, 'Bong Joon Ho', 'Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong', 8.5, 'https://image.tmdb.org/t/p/w500/ttrkv9mK825p3Nf3aTmM03t2N32.jpg', '258M', 16, 'https://www.youtube.com/embed/5xH0HfJHsaY', '2h 12m', 'Suspense', 'HBO Max'),
(19, 'Coringa', 'Em 1980, um comediante falido é levado à loucura, virando-se para uma vida de crime e caos em Gotham City.', 2019, 'Todd Phillips', 'Joaquin Phoenix, Robert De Niro, Zazie Beetz', 8.4, 'https://image.tmdb.org/t/p/w500/yJdeWaOJ2ECDgD2gS3y1J9f2z1L.jpg', '1.07B', 16, 'https://www.youtube.com/embed/t433PEQGErc', '2h 2m', 'Drama', 'Prime Video'),
(20, 'Mad Max: Estrada da Fúria', 'Em um deserto pós-apocalíptico, uma mulher se rebela contra um governante tirânico em busca de sua terra natal com a ajuda de Max.', 2015, 'George Miller', 'Tom Hardy, Charlize Theron, Nicholas Hoult', 8.1, 'https://image.tmdb.org/t/p/w500/82_lURCVnaoJpQ52yv0f8DNyv2n.jpg', '378M', 16, 'https://www.youtube.com/embed/hEJnMQG9ev8', '2h 0m', 'Ação', 'HBO Max');