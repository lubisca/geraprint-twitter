function injectButton() {
  const tweets = document.querySelectorAll('article[data-testid="tweet"]:not(.insta-ready)');

  tweets.forEach(tweet => {
    tweet.classList.add('insta-ready');
    const actionGroup = tweet.querySelector('[data-testid="reply"]')?.parentElement?.parentElement;

    if (actionGroup) {
      const btn = document.createElement('div');
      btn.innerHTML = `<button type="button" style="background:none; border:none; cursor:pointer; padding: 0 10px; font-size:18px;">📸</button>`;
      
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Procura todos os spans e acha o primeiro que tem texto começando com "@"
        const spans = Array.from(tweet.querySelectorAll('span'));
        const handleSpan = spans.find(s => s.innerText.startsWith('@'));
        const arroba = handleSpan ? handleSpan.innerText : "@usuario";

        const data = {
          nome: tweet.querySelector('[data-testid="User-Name"] span')?.innerText || "Usuário",
          arroba: arroba,
          fotoPerfil: tweet.querySelector('img[src*="profile_images"]')?.src,
          imagemPost: tweet.querySelector('[data-testid="tweetPhoto"] img')?.src,
          isVerified: !!tweet.querySelector('svg[data-testid="icon-verified"]')
        };

        chrome.runtime.sendMessage({type: "OPEN_GENERATOR", data: data});
      };
      actionGroup.appendChild(btn);
    }
  });
}
setInterval(injectButton, 1500);