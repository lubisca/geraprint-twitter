chrome.storage.local.get("tweetData", (res) => {
  const d = res.tweetData;
  if (!d) return;

  const clean = (t) => t.replace(/paródia|parody|🎭/gi, "").trim();

  document.getElementById('name').innerText = clean(d.nome);
  document.getElementById('handle').innerText = clean(d.arroba);
  document.getElementById('pfp').src = d.fotoPerfil;
  document.getElementById('postImg').src = d.imagemPost;
  
  if (d.isVerified) {
    document.getElementById('badge').style.display = "block";
  }
});

document.getElementById('download').addEventListener('click', () => {
  const target = document.getElementById('capture');
  const btn = document.getElementById('download');
  
  btn.innerText = "Processando...";
  
  html2canvas(target, { 
    useCORS: true, 
    allowTaint: true,
    backgroundColor: "#ffffff",
    scale: 3 // Resolução HD
  }).then(canvas => {
    const link = document.createElement('a');
    link.download = `insta-post-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    btn.innerText = "Baixar Imagem para o Insta";
  }).catch(err => {
    btn.innerText = "Erro ao baixar";
    console.error("Erro no html2canvas:", err);
  });
});