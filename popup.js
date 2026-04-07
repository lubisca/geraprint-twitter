document.getElementById('btn-select').addEventListener('click', () => {
  // Pega a aba atual (o Twitter) e manda uma mensagem pra ela
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, {acao: "MODO_SELECAO"});
    window.close(); // Fecha o menu popup
  });
});