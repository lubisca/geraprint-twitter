let selecionando = false;

// Adiciona um estilo no Twitter para destacar o tweet que o mouse estiver em cima
const style = document.createElement('style');
style.innerHTML = `
  .geraprint-alvo { outline: 3px solid #1d9bf0 !important; border-radius: 16px; cursor: crosshair !important; opacity: 0.8; }
`;
document.head.appendChild(style);

// Escuta a mensagem vinda do popup.js
chrome.runtime.onMessage.addListener((mensagem) => {
  if (mensagem.acao === "MODO_SELECAO") {
    selecionando = true;
    document.body.style.cursor = 'crosshair';
  }
});

// Efeito de Hover (passar o mouse)
document.addEventListener('mouseover', (e) => {
  if (!selecionando) return;
  const tweet = e.target.closest('article[data-testid="tweet"]');
  if (tweet) tweet.classList.add('geraprint-alvo');
});

document.addEventListener('mouseout', (e) => {
  if (!selecionando) return;
  const tweet = e.target.closest('article[data-testid="tweet"]');
  if (tweet) tweet.classList.remove('geraprint-alvo');
});

// O Clique da Captura
document.addEventListener('click', (e) => {
  if (!selecionando) return;
  
  const tweet = e.target.closest('article[data-testid="tweet"]');
  if (tweet) {
    // Bloqueia o clique normal do Twitter (pra não abrir a foto sem querer)
    e.preventDefault();
    e.stopPropagation();
    
    // Desliga o modo de seleção
    selecionando = false;
    document.body.style.cursor = 'default';
    tweet.classList.remove('geraprint-alvo');
    
    // Captura os dados cirurgicamente
    const spans = Array.from(tweet.querySelectorAll('span'));
    const handleSpan = spans.find(s => s.innerText.startsWith('@'));
    
    const data = {
      nome: tweet.querySelector('[data-testid="User-Name"] span')?.innerText || "Usuário",
      arroba: handleSpan ? handleSpan.innerText : "@usuario",
      fotoPerfil: tweet.querySelector('img[src*="profile_images"]')?.src,
      imagemPost: tweet.querySelector('[data-testid="tweetPhoto"] img')?.src,
      isVerified: !!tweet.querySelector('svg[data-testid="icon-verified"]')
    };

    // Manda pro background abrir o generator.html
    chrome.runtime.sendMessage({type: "OPEN_GENERATOR", data: data});
  }
}, true); // O 'true' faz o evento rodar antes do Twitter perceber o clique