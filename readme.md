![](assets/img/lifehacking-player.jpg)

# Podcast to Social
Esse projeto nasceu depois de uma busca por ferramentas para divulgação de podcast.
Nessa busca, o mais perto que cheguei foi um template de After Effects, o que não me ajudou muito.

Procurando alternativas então, encontrei o [howler.js](https://howlerjs.com/) e foi no demo "Music Player" dele, encontrei tanto a solução para manusear o áudio, quanto a parte das ondas. Na verdade, é de lá que vem boa parte do código desse projeto.

A diferença que eu adicionei foi a opção de definir um começo e um tempo que o áudio vai ficar tocando, ideal para criar pequenos drops para ser compartilhado nos stories do Instagram, por exemplo. Para isso é só ativar o modo responsivo do seu navegador e mudar para uma visão de celular.

## Como usar
- Customize o estilo da página para se adequar ao seu projeto
- Adicione seu arquivo de áudio
- Adicione o path do seu arquivo de áudio e as infos do episodio no objeto de configuração do player
- Grave sua tela enquanto o áudio está tocando
- Agora é só compartilhar onde quiser. Youtube, Instagram, Facebook...

## Configuração do Player
O Player tem cinco configurações principais:

**epNumber**  
Número do episódio ou o que quiser colocar no retangulo superior

**title**  
Título do episódio ou o que quiser colocar no retangulo inferior

**file**  
O caminho do seu arquivo de audio partindo da raíz

**cutStart** (opcional)  
Em que segundo do audio começar a tocar

**cutLength** (opcional)  
Por quantos segundos tocar o áudio