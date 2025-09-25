🎵 SpotifyClone

Clone do Spotify desenvolvido em Angular 17, consumindo a API do Spotify para listar artistas, álbuns, músicas e playlists.
O projeto foi criado com foco em responsividade, design moderno e aprendizado prático de integração com APIs externas.

🚀 Funcionalidades

🔍 Busca de artistas em tempo real.

👤 Detalhes de artista: informações como seguidores e popularidade.

💿 Listagem de álbuns de um artista.

🎶 Faixas de um álbum, com opção de visualizar detalhes.

📂 Playlists públicas simuladas no layout.

📱 Layout responsivo (cards e seções se adaptam a qualquer tela).

🎨 Interface inspirada no Spotify Web.

🛠️ Tecnologias Utilizadas

Angular 17
 – Framework principal.

RxJS
 – Para lidar com programação reativa.

Spotify Web API
 – API usada para trazer os dados reais.

[Bootstrap / CSS Grid / Flexbox] – Para responsividade e layout.

FontAwesome
 – Ícones.

📂 Estrutura do Projeto

src/app/services/spotify.service.ts → Conexão com a API do Spotify.

src/app/components/artist-detail/ → Tela de detalhe do artista.

src/app/components/home-spot/ → Página inicial com artistas, álbuns e playlists.

src/assets/ → Imagens e arquivos estáticos.

⚡ Como rodar o projeto localmente

Clone o repositório:

git clone https://github.com/Taina-Dev/spotifyweb.git
cd spotifyweb


Instale as dependências:

npm install


Rode o servidor local:

ng serve


Acesse em http://localhost:4200
.

🏗️ Build para Produção

Para gerar os arquivos otimizados de produção:

ng build --configuration production


Os arquivos serão gerados em dist/spotify-clone/.

🌐 Deploy no GitHub Pages

Este projeto está hospedado em:
👉 SpotifyClone no GitHub Pages

📌 Próximos Passos (Melhorias Futuras)

Player funcional com preview das músicas.

Login via conta Spotify (OAuth2).

Sistema de playlists personalizadas.

⚡ Desenvolvido para fins de estudo e prática com Angular + API do Spotify.
