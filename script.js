// ── Ano dinâmico no rodapé ──
const anoAtualEl = document.getElementById('ano-atual');
if (anoAtualEl) anoAtualEl.textContent = new Date().getFullYear();

// ── Nav ativo por seção ──
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove('ativo'));
    const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
    if (link) link.classList.add('ativo');
  });
}, { rootMargin: '-40% 0px -55% 0px' });

document.querySelectorAll('section[id]').forEach(sec => secObserver.observe(sec));

// ── Botão voltar ao topo ──
const topoBtn = document.getElementById('topo-btn');
window.addEventListener('scroll', () => {
  topoBtn.classList.toggle('visivel', window.scrollY > 300);
}, { passive: true });

// ── Animações de entrada ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0, rootMargin: '0px 0px -40px 0px' });

function observarFade() {
  document.querySelectorAll(
    '.card, .palestra-card, .artigo-card, .pub-item, .contato-item, .sobre-grid, .uni'
  ).forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
  });

  // Fallback: garante visibilidade após 1.5s caso o observer não dispare
  setTimeout(() => {
    document.querySelectorAll('.fade-in:not(.visivel)').forEach(el => {
      el.classList.add('visivel');
    });
  }, 1500);
}

// Hamburger / menu mobile
const ham = document.getElementById('hamburger');
const menu = document.getElementById('menu');

ham.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  ham.classList.toggle('aberto');
  ham.setAttribute('aria-expanded', aberto);
});

menu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    menu.classList.remove('aberto');
    ham.classList.remove('aberto');
  });
});

// Dados de conteúdo (materiaisEnsino, palestras, artigos, projetos)
// agora vivem em conteudo.js — este arquivo só tem renderização e interação.

function obterTipoMaterial(arquivo) {
  const link = (arquivo.link || '').toLowerCase();
  const tipo = (arquivo.tipo || '').toLowerCase();
  const nome = (arquivo.nome || '').toLowerCase();

  if (!arquivo.link) {
    return { icone: '📄', textoBotao: 'Em breve', classe: '' };
  }

  // Zip
  if (tipo.includes('zip') || nome.includes('.zip') || link.includes('.zip')) {
    return { icone: '🗜️', textoBotao: 'Baixar ZIP', classe: 'tipo-zip' };
  }

  // Aplicativo
  if (tipo.includes('aplicativo') || tipo.includes('app')) {
    return { icone: '💾', textoBotao: 'Baixar', classe: 'tipo-aplicativo' };
  }

  // Pasta do Google Drive
  if (link.includes('/folders/') || tipo.includes('pasta')) {
    return { icone: '📁', textoBotao: 'Abrir Pasta', classe: 'tipo-pasta' };
  }

  // Vídeos
  const ehVideo =
    tipo.includes('vídeo') || tipo.includes('video') ||
    nome.includes('vídeo') || nome.includes('video') ||
    link.includes('youtube.com') || link.includes('youtu.be') ||
    link.includes('vimeo.com') || link.includes('streamable.com');

  if (ehVideo) {
    return { icone: '🎬', textoBotao: 'Abrir Vídeo', classe: 'tipo-video' };
  }

  // Livro
  if (tipo.includes('livro')) {
    return { icone: '📖', textoBotao: 'Abrir PDF', classe: 'tipo-livro' };
  }

  // Slide
  if (tipo.includes('slide')) {
    return { icone: '📊', textoBotao: 'Abrir PDF', classe: 'tipo-slide' };
  }

  // Lista / prova / nota
  if (tipo.includes('lista'))  return { icone: '📋', textoBotao: 'Abrir PDF', classe: 'tipo-lista' };
  if (tipo.includes('prova'))  return { icone: '📝', textoBotao: 'Abrir PDF', classe: 'tipo-prova' };
  if (tipo.includes('nota'))   return { icone: '🗒️', textoBotao: 'Abrir PDF', classe: 'tipo-nota'  };

  // Padrão
  return { icone: '📄', textoBotao: 'Abrir PDF', classe: '' };
}

function linkMaterial(arquivo) {
  const material = obterTipoMaterial(arquivo);

  if (!arquivo.link) {
    return `<span class="pdf-btn" style="opacity:.45; pointer-events:none;">${material.textoBotao}</span>`;
  }

  return `<a class="pdf-btn" href="${arquivo.link}" target="_blank" rel="noopener">${material.textoBotao}</a>`;
}

function iconeMaterial(arquivo) {
  return obterTipoMaterial(arquivo).icone;
}

function renderArquivos(disciplina) {
  if (!disciplina.arquivos || disciplina.arquivos.length === 0) {
    return `<div class="sem-pdf">Nenhum material cadastrado ainda.</div>`;
  }

  return `<div class="pdf-lista">
    ${disciplina.arquivos.map((arquivo) => `
      <div class="pdf-item">
        <div class="pdf-item-info">
          <strong>${iconeMaterial(arquivo)} ${arquivo.nome}</strong>
          <span>${arquivo.data ? arquivo.data + ' · ' : ''}<span class="tipo ${obterTipoMaterial(arquivo).classe}">${arquivo.tipo || 'PDF'}</span></span>
        </div>
        ${linkMaterial(arquivo)}
      </div>
    `).join('')}
  </div>`;
}

function renderDisciplina(disc, usarDropdown) {
  if (!usarDropdown) {
    return `
      <div class="disc-pdf-card">
        <div class="disc-pdf-head">
          <div>
            <strong>📚 ${disc.nome}</strong>
            <span>${disc.descricao || 'Materiais da disciplina.'}</span>
          </div>
        </div>
        ${renderArquivos(disc)}
      </div>
    `;
  }

  return `
    <div class="disc-dropdown">
      <div class="disc-toggle" data-toggle="disc" tabindex="0" role="button" aria-expanded="false">
        <div>
          <strong>📚 ${disc.nome}</strong>
          <span>${disc.descricao || 'Materiais da disciplina.'}</span>
        </div>
        <span class="chevron">▼</span>
      </div>
      <div class="disc-body">
        ${renderArquivos(disc)}
      </div>
    </div>
  `;
}

function renderEnsino() {
  const container = document.getElementById("ensino-container");
  if (!container) return;

  container.innerHTML = materiaisEnsino.map((uni) => {
    const temMaisDeUmaDisciplina = uni.disciplinas && uni.disciplinas.length > 1;

    return `
      <div class="uni ${uni.aberta ? 'aberto' : ''}">
        <div class="uni-header" data-toggle="uni" tabindex="0" role="button" aria-expanded="${uni.aberta ? 'true' : 'false'}">
          <h3>${uni.icone} ${uni.nome}</h3>
          <span class="chevron">▼</span>
        </div>
        <div class="uni-body">
          ${uni.disciplinas.map((disc) => renderDisciplina(disc, temMaisDeUmaDisciplina)).join('')}
        </div>
      </div>
    `;
  }).join('');
}

// Acordeão — toggle
function toggleAccordion(header) {
  const item = header.parentElement;
  const aberto = item.classList.toggle('aberto');
  header.setAttribute('aria-expanded', aberto);
}

// Acessibilidade: click e teclado via event delegation
document.addEventListener('click', (e) => {
  const toggle = e.target.closest('[data-toggle]');
  if (toggle) toggleAccordion(toggle);
});

document.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const toggle = document.activeElement?.closest('[data-toggle]');
  if (!toggle) return;
  e.preventDefault();
  toggleAccordion(toggle);
});

renderEnsino();

// ── Busca e filtro de materiais ──
function iniciarFiltros() {
  const buscaInput   = document.getElementById('ensino-busca');
  const filtroTipos  = document.getElementById('filtro-tipos');
  if (!buscaInput || !filtroTipos) return;

  // Coleta tipos únicos presentes nos dados
  const tipoLabels = {
    'slide': '📊 Slide', 'lista': '📋 Lista', 'livro': '📖 Livro',
    'vídeo': '🎬 Vídeo', 'video': '🎬 Vídeo', 'pasta': '📁 Pasta',
    'zip': '🗜️ ZIP', 'aplicativo': '💾 App', 'prova': '📝 Prova',
    'nota': '🗒️ Nota'
  };
  const vistos  = new Set();
  const tiposOrdenados = [];

  materiaisEnsino.forEach(uni => {
    uni.disciplinas.forEach(disc => {
      disc.arquivos.forEach(arq => {
        if (!arq.link) return;
        const t = (arq.tipo || '').toLowerCase();
        if (t && !vistos.has(t)) {
          vistos.add(t);
          tiposOrdenados.push(t);
        }
      });
    });
  });

  tiposOrdenados.forEach(tipo => {
    const btn = document.createElement('button');
    btn.className    = 'filtro-btn';
    btn.dataset.tipo = tipo;
    btn.innerHTML    = tipoLabels[tipo] || tipo.charAt(0).toUpperCase() + tipo.slice(1);
    filtroTipos.appendChild(btn);
  });

  function aplicarFiltro() {
    const busca     = buscaInput.value.toLowerCase().trim();
    const tipoAtivo = filtroTipos.querySelector('.filtro-btn.ativo')?.dataset.tipo || 'todos';

    document.querySelectorAll('.pdf-item').forEach(item => {
      const nome = (item.querySelector('strong')?.textContent || '').toLowerCase();
      const tipo = (item.querySelector('.tipo')?.textContent  || '').toLowerCase();
      const matchBusca = !busca || nome.includes(busca);
      const matchTipo  = tipoAtivo === 'todos' || tipo.includes(tipoAtivo);
      item.style.display = matchBusca && matchTipo ? '' : 'none';
    });

    // Oculta disciplina se não tem item visível
    document.querySelectorAll('.disc-dropdown, .disc-pdf-card').forEach(disc => {
      const items      = disc.querySelectorAll('.pdf-item');
      const algumVis   = [...items].some(i => i.style.display !== 'none');
      disc.style.display = (!items.length || algumVis) ? '' : 'none';
    });

    // Oculta universidade se não tem disciplina visível
    document.querySelectorAll('.uni').forEach(uni => {
      const discs    = uni.querySelectorAll('.disc-dropdown, .disc-pdf-card');
      const algumVis = [...discs].some(d => d.style.display !== 'none');
      uni.style.display = algumVis ? '' : 'none';
    });

    // Mensagem "sem resultados"
    const container = document.getElementById('ensino-container');
    let semResultado = document.getElementById('ensino-sem-resultado');
    const tudoOculto = [...document.querySelectorAll('#ensino-container .uni')]
      .every(u => u.style.display === 'none');

    if (tudoOculto && (busca || tipoAtivo !== 'todos')) {
      if (!semResultado) {
        semResultado = document.createElement('p');
        semResultado.id        = 'ensino-sem-resultado';
        semResultado.className = 'ensino-vazio';
        semResultado.textContent = 'Nenhum material encontrado para essa busca.';
        container.appendChild(semResultado);
      }
    } else if (semResultado) {
      semResultado.remove();
    }
  }

  buscaInput.addEventListener('input', aplicarFiltro);

  filtroTipos.addEventListener('click', e => {
    const btn = e.target.closest('.filtro-btn');
    if (!btn) return;
    filtroTipos.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
    btn.classList.add('ativo');
    aplicarFiltro();
  });
}

iniciarFiltros();

function renderPalestras() {
  const container = document.getElementById('palestras-container');
  if (!container) return;

  if (!palestras.length) {
    container.innerHTML = '<p style="color:var(--cinza)">Nenhuma palestra cadastrada ainda.</p>';
    return;
  }

  const whatsapp = '5511932272380';

  container.innerHTML = `<div class="palestras-grid">
    ${palestras.map(p => {
      const msg = encodeURIComponent(`Olá, Prof. Manoel! Tenho interesse em contratar a palestra "${p.nome}". Podemos conversar?`);
      const btns = [
        p.slides ? `<a class="palestra-btn slides" href="${p.slides}" target="_blank" rel="noopener">📊 Slides</a>` : '',
        p.video  ? `<a class="palestra-btn video"  href="${p.video}"  target="_blank" rel="noopener">🎬 Vídeo</a>`  : '',
        `<a class="palestra-btn contratar" href="https://wa.me/${whatsapp}?text=${msg}" target="_blank" rel="noopener">💬 Contratar</a>`
      ].filter(Boolean).join('');

      return `
        <div class="palestra-card">
          <div class="palestra-meta">
            ${p.data   ? `<span class="palestra-data">${p.data}</span>` : ''}
            ${p.evento ? `<span class="palestra-evento">${p.evento}</span>` : ''}
          </div>
          <h3>${p.nome}</h3>
          <p>${p.descricao}</p>
          <div class="palestra-btns">${btns}</div>
        </div>
      `;
    }).join('')}
  </div>`;
}

renderPalestras();

const statusArtigo = {
  'publicado': { label: 'Publicado',  classe: 'status-publicado' },
  'preprint':  { label: 'Preprint',   classe: 'status-preprint'  },
  'revisão':   { label: 'Em revisão', classe: 'status-revisao'   },
};

const statusProjeto = {
  'em andamento':   { label: 'Em andamento',   classe: 'status-andamento'  },
  'coleta de dados':{ label: 'Coleta de dados', classe: 'status-coleta'     },
  'análise':        { label: 'Análise',         classe: 'status-analise'    },
  'escrita':        { label: 'Escrita',         classe: 'status-escrita'    },
};

function renderPesquisa() {
  const container = document.getElementById('pesquisa-container');
  if (!container) return;

  if (!artigos.length) {
    container.innerHTML = '<p style="color:var(--cinza)">Em breve.</p>';
    return;
  }

  container.innerHTML = `<div class="artigos-grid">
    ${artigos.map(a => {
      const st = statusArtigo[a.status] || statusArtigo['publicado'];
      return `
      <div class="artigo-card">
        <div class="artigo-meta">
          ${a.ano   ? `<span class="artigo-ano">${a.ano}</span>` : ''}
          ${a.venue ? `<span class="artigo-venue">${a.venue}</span>` : ''}
          <span class="pesquisa-status ${st.classe}">${st.label}</span>
        </div>
        <h3>${a.titulo}</h3>
        ${a.autores ? `<div class="artigo-autores">${a.autores}</div>` : ''}
        ${a.resumo  ? `<p>${a.resumo}</p>` : ''}
        ${a.link    ? `<a class="artigo-btn" href="${a.link}" target="_blank" rel="noopener">Acessar artigo →</a>` : ''}
      </div>
    `}).join('')}
  </div>`;
}

function renderProjetos() {
  const container = document.getElementById('projetos-container');
  if (!container) return;

  if (!projetos.length) {
    container.innerHTML = '<p class="ensino-vazio">Em breve.</p>';
    return;
  }

  container.innerHTML = `<div class="projetos-grid">
    ${projetos.map(p => {
      const st = statusProjeto[p.status] || statusProjeto['em andamento'];
      return `
      <div class="projeto-card">
        <div class="artigo-meta">
          ${p.inicio ? `<span class="artigo-ano">${p.inicio}</span>` : ''}
          ${p.area   ? `<span class="artigo-venue">${p.area}</span>` : ''}
          <span class="pesquisa-status ${st.classe}">${st.label}</span>
        </div>
        <h3>${p.titulo}</h3>
        <p>${p.descricao}</p>
        ${p.link ? `<a class="artigo-btn" href="${p.link}" target="_blank" rel="noopener">Ver preprint →</a>` : ''}
      </div>
    `}).join('')}
  </div>`;
}

renderPesquisa();
renderProjetos();

// ── Contadores animados ──
function animarContadores() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseInt(el.dataset.target, 10);
      const suffix   = el.dataset.suffix || '';
      const duration = 1600;
      const start    = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.stat-num').forEach(el => observer.observe(el));
}

animarContadores();

// Iniciar animações após renderizar todo o conteúdo dinâmico
observarFade();

// ── Formulário de contato (Web3Forms) ──
const contatoForm = document.getElementById('contato-form');
if (contatoForm) {
  contatoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn    = document.getElementById('form-btn');
    const status = document.getElementById('form-status');

    btn.textContent = 'Enviando…';
    btn.disabled = true;

    const data = Object.fromEntries(new FormData(contatoForm));

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      const json = await res.json();

      if (json.success) {
        status.textContent = '✅ Mensagem enviada! Responderei em breve.';
        status.style.color = '#166534';
        contatoForm.reset();
      } else {
        throw new Error();
      }
    } catch {
      status.textContent = '❌ Erro ao enviar. Tente pelo WhatsApp ou e-mail.';
      status.style.color = '#991B1B';
    } finally {
      btn.textContent = 'Enviar mensagem →';
      btn.disabled = false;
    }
  });
}

