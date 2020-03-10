![](assets/img/lifehacking-player.jpg)

# Audio Visualizer
Esse projeto nasceu depois de uma busca por ferramentas para divulgação de podcast.
Nessa busca, o mais perto que cheguei foi um template de After Effects, o que não me ajudou muito.
Claro, não teria sido possível sem a ajuda visual da excelente [@mandyellow](https://github.com/mandyellow).

A ideia é gravar um loop de uma onda sonora com a descrição do seu áudio contendo título, subtítulo, capa (de album ou de podcast) e uma imagem de fundo. Então, fazer um loop desse trecho de vídeo em um arquivo de áudio e você já vai ter uma visualização para seu audio pra subir no youtube ou compartilhar nos stories.

PS - Ter o [FFmpeg](https://github.com/FFmpeg/FFmpeg) instalado é requisito para rodar o projeto.

## Como usar
- `npm start`
- Acesse o localhost:3000
- Suba os arquivos
- Aguarde

Também é possível rodar apenas a parte de gravação e loop do vídeo configurando o arquivo video-handler.js

## Configuração de Gravação
Esse projeto usa o [Timecut](https://github.com/tungs/timecut#js-api-config) para gravar o arquivo de base do loop, então basta checar todas as opções disponíveis lá na documentação do Timecut.
