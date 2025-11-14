// Menu suspenso reutilizável
(function () {
  const style = document.createElement('style');
  style.textContent = `
    .dropdown-menu-container {
      position: fixed;
      top: 12px;
      right: 12px;
      z-index: 1000;
      font-family: Arial, Helvetica, sans-serif;
    }
    .dropdown-toggle {
      background-color: #0066cc;
      color: #fff;
      border: none;
      border-radius: 20px;
      padding: 10px 16px;
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 4px 10px rgba(0,0,0,0.15);
    }
    .dropdown-toggle:hover { background-color: #0055aa; }
    .dropdown-panel {
      position: absolute;
      top: 44px;
      right: 0;
      display: none;
      min-width: 240px;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 10px 24px rgba(0,0,0,0.2);
      overflow: hidden;
    }
    .dropdown-panel.open { display: block; }
    .dropdown-item {
      display: block;
      padding: 10px 14px;
      color: #333;
      text-decoration: none;
      font-weight: 500;
    }
    .dropdown-item:hover { background: #f2f6ff; color: #000; }
    .dropdown-section-title {
      padding: 8px 14px;
      font-size: 12px;
      text-transform: uppercase;
      color: #666;
      background: #fafafa;
      border-bottom: 1px solid #eee;
    }
  `;
  document.head.appendChild(style);

  const container = document.createElement('div');
  container.className = 'dropdown-menu-container';
  container.innerHTML = `
    <button class="dropdown-toggle" aria-haspopup="true" aria-expanded="false" title="Abrir menu de jogos">🎮 Jogos</button>
    <div class="dropdown-panel" role="menu">
      <div class="dropdown-section-title">Página inicial</div>
      <a class="dropdown-item" href="/index.html" role="menuitem">Início</a>
      <a class="dropdown-item" href="/cod/index.html" role="menuitem">Hub de Jogos (cod)</a>
      <div class="dropdown-section-title">Jogos (raiz)</div>
      <a class="dropdown-item" href="/jogo_adicao.html" role="menuitem">Adição</a>
      <a class="dropdown-item" href="/jogo_divisao.html" role="menuitem">Divisão</a>
      <a class="dropdown-item" href="/jogo_sistema_nervoso.html" role="menuitem">Sistema Nervoso</a>
      <a class="dropdown-item" href="/jogo_diverso.html" role="menuitem">Diversos</a>
      <a class="dropdown-item" href="/jogo_geografia.html" role="menuitem">Geografia</a>
      <a class="dropdown-item" href="/index.html?game=portugues-ssc" role="menuitem">Português S/SS/Ç</a>
      <div class="dropdown-section-title">Jogos (cod/1)</div>
      <a class="dropdown-item" href="/cod/1/jogo_adicao.html" role="menuitem">Adição (cod/1)</a>
      <a class="dropdown-item" href="/cod/1/jogo_divisao.html" role="menuitem">Divisão (cod/1)</a>
      <a class="dropdown-item" href="/cod/1/jogo_sistema_nervoso.html" role="menuitem">Sistema Nervoso (cod/1)</a>
      <a class="dropdown-item" href="/cod/1/jogo_diverso.html" role="menuitem">Diversos (cod/1)</a>
    </div>
  `;
  document.body.appendChild(container);

  const toggle = container.querySelector('.dropdown-toggle');
  const panel = container.querySelector('.dropdown-panel');

  function setOpen(open) {
    panel.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!panel.classList.contains('open'));
  });

  document.addEventListener('click', (e) => {
    if (!container.contains(e.target)) setOpen(false);
  });

  // Fecha com Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });
})();
