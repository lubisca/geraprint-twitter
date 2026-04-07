# 📸 GeraPrint Twitter 🐦

Este projeto foi desenvolvido com o objetivo de **automatizar a criação de conteúdos** para redes sociais, transformando tweets (especialmente de contas de paródia ou em modo escuro) em cards limpos e minimalistas. É a aplicação real de como manipular o DOM de grandes plataformas para resolver um problema de design.

<!-- <a href="https://github.com/lubisca/geraprint-twitter" target="_blank"><img src="https://raw.githubusercontent.com/lubisca/retro-badges/main/assets/ACCESE-ONLINE-button.png" height="28" alt="Acesse no GitHub"></a> -->

## Por que este projeto?
Para aprofundar meus estudos em **Análise e Desenvolvimento de Sistemas**, decidi criar uma ferramenta que não apenas tirasse um "print", mas que fizesse um tratamento de dados antes da imagem final:

1.  **Sanitização de Dados:** Filtrar termos indesejados diretamente no código do site antes de gerar o card.
2.  **Arquitetura Manifest V3:** Estudar os padrões mais recentes do Google para extensões, lidando com permissões e segurança.
3.  **Conversão de HTML para Imagem:** Implementar o uso da biblioteca `html2canvas` para transformar elementos estilizados em arquivos PNG de alta fidelidade.

## Desafios Superados

* **Bloqueio de Scripts Externos (CORS):** Um dos maiores desafios foi o navegador bloqueando o carregamento da biblioteca via CDN por segurança (MV3). A solução foi integrar o `html2canvas.min.js` localmente na pasta da extensão.
* **Lógica de Limpeza com Regex:** Implementei uma expressão regular para detectar e remover as palavras "paródia", "parody" e o emoji de máscara (🎭). Isso permite postar memes de contas de paródia com um visual oficial e limpo.
* **Injeção de Elementos Dinâmicos:** O desafio de criar um botão 📸 que aparece em cada tweet sem quebrar o layout original do Twitter, utilizando `setInterval` para monitorar novos posts no scroll infinito.
* **Replicando o Verificado:** Diferente de apenas copiar uma imagem, a extensão detecta se o perfil original é verificado e injeta um SVG com o path oficial do Twitter, garantindo que o selo não fique torto ou pixelado.
* **Qualidade de Exportação:** Ajuste de escala para `scale: 3` na renderização do canvas. Isso garante que, ao subir nos Stories do Instagram, a imagem mantenha a nitidez mesmo com a compressão da rede social.

## Lógica de Funcionamento
A extensão funciona como um "filtro inteligente" em três etapas:

1.  **Captura Cirúrgica:** O script busca especificamente o nome, o @ (handle), a foto de perfil e a mídia principal do post.
2.  **Tratamento Estético:** Os dados são enviados para uma página de renderização (`generator.html`) que organiza tudo em um card branco com bordas arredondadas e sombras suaves.
3.  **Geração do PNG:** O usuário clica no botão de baixar, e o HTML é convertido instantaneamente em uma imagem de alta resolução.

## Tecnologias e Métodos
* **JavaScript (Vanilla):** Manipulação de DOM, Regex para tratamento de strings e controle de mensagens entre scripts.
* **CSS3:** Layout baseado em Flexbox para centralização absoluta e estética minimalista.
* **Manifest V3:** Uso de *Service Workers* e *Content Scripts* para integração com o navegador.
* **html2canvas:** Biblioteca utilizada para a rasterização do HTML para PNG.

---