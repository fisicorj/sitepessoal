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

// ═══════════════════════════════════════════════════
// EDITE AQUI OS LINKS DO GOOGLE DRIVE
// Para cada disciplina, adicione quantos arquivos quiser dentro de arquivos.
// Pode ser link direto de PDF, vídeo ou pasta do Google Drive.
//
// PDF:      https://drive.google.com/file/d/...
// Pasta:    https://drive.google.com/drive/folders/...
// Vídeo:    use tipo: "Vídeo" ou links do YouTube/Vimeo
//
// Exemplo PDF:
// { nome: "Aula 01 - Introdução", tipo: "Slide", data: "2026", link: "https://drive.google.com/..." }
//
// Exemplo vídeo:
// { nome: "Aula gravada 01", tipo: "Vídeo", data: "2026", link: "https://youtube.com/..." }
// ═══════════════════════════════════════════════════
const materiaisEnsino = [
  {
    nome: "FIAP",
    icone: "🏛️",
    aberta: true,
    disciplinas: [
      {
        nome: "Redes",
        descricao: "Materiais da disciplina.",
        arquivos: [
          //{ nome: "Aula 01 - Introdução", tipo: "Slide", data: "2026", link: "" },
          //{ nome: "Lista 01", tipo: "Lista", data: "2026", link: "" }
        ]
      }
    ]
  },
  {
    nome: "FATEC Ipiranga",
    icone: "🎓",
    aberta: false,
    disciplinas: [
      {
        nome: "Sistemas Operacionais II",
        descricao: "Materiais da disciplina.",
        arquivos: [
          { nome: "Aula 01 - Introdução", tipo: "Slide", data: "2026", link: "https://drive.google.com/file/d/1cPEncawjvInWzYwklkhLL4rOu1xa7bzL/view?usp=drive_link" },
          { nome: "Video Introdutório  (Nível 0)", tipo: "Vídeo", data: "2026", link: "https://www.youtube.com/watch?v=CT6BZBzbpWA&list=PLZsjaJhVZaxX9xCXhZDJnhFcIL4ncLjVj" }
        ]
      }
    ]
  },
  {
    nome: "SENAC",
    icone: "📘",
    aberta: false,
    disciplinas: [
      {
        nome: "Introdução à Computação",
        descricao: "Materiais da disciplina.",
        arquivos: [
          { nome: "Eletrônica Básica Digital", tipo: "Livro", data: "2026", link: "https://drive.google.com/file/d/1kIoBvijok3awOVXhdttfByS4QpTKcNLb/view?usp=drive_link" },
          { nome: "Eletrônica Digital I", tipo: "Livro", data: "2026", link: "https://drive.google.com/file/d/1AP0yE_e-IoPEYSeqeMBzpSdzVFsUZUiF/view?usp=sharing" },
          { nome: "Circuitos Prontos", tipo: "Arquivos", data: "2026", link: "https://drive.google.com/drive/folders/1OyFIZbE32Mf7NpvHTjTykHpmRYFyXjpp?usp=drive_link" }
        ]
      },
      {
        nome: "OAC - Organização de Computadores",
        descricao: "Materiais da disciplina.",
        arquivos: [
          { nome: "Arquitetura de Computadores - Tanenbaum ", tipo: "Livro", data: "2026", link: "https://drive.google.com/file/d/1nYMf13zb5Qh78HHvkIc7c6mnSSZGvWg0/view?usp=drive_link" },
          { nome: "Arquitetura e Organização de Computadores - William Stallings ", tipo: "Livro", data: "2026", link: "https://drive.google.com/file/d/1tdkvsY8YsE1nxRuFedPwOaMfyb2oHRcR/view?usp=drive_link" },
          { nome: "Emulador Emu8086", tipo: "Lista", data: "2026", link: "https://drive.google.com/file/d/1Gh7ubZvsWuFixoAxBditovbQRTaBEAyr/view?usp=drive_link" },
          { nome: "Códigos essenciais", tipo: "Pasta", data: "2026", link: "https://drive.google.com/file/d/1Ecbu6_SFG97ef2MzJdBQ32SBRnxC1KAp/view?usp=drive_link" }
        ]
      },
      {
        nome: "Redes",
        descricao: "Materiais da disciplina.",
        arquivos: [
          { nome: "Redes de Computadores - Tanenbaum", tipo: "Livro", data: "2026", link: "https://drive.google.com/file/d/1wgyenBNbLIMWeV1cPe6tJ6c1U8thJbV7/view?usp=drive_link" },
          { nome: "Anotação de Aula Modelos de Referência OSI e TCP/IP", tipo: "Lista", data: "2026", link: "https://drive.google.com/file/d/1q5mVZEB0ZeJiLUACdz0bjRG3GHwA_1WY/view?usp=sharing" }
        ]
      }
    ]
  }
];

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

// ═══════════════════════════════════════════════════
// PALESTRAS
// Adicione aqui suas palestras. Campos:
//   nome       — título da palestra (obrigatório)
//   descricao  — breve descrição (obrigatório)
//   data       — ex: "Jun 2025" (opcional)
//   evento     — nome do evento ou instituição (opcional)
//   slides     — link para PDF ou Google Drive dos slides (opcional)
//   video      — link do YouTube ou Vimeo (opcional)
// ═══════════════════════════════════════════════════
const palestras = [
  {
    nome: "Segurança da Informação em nossa vida diária",
    descricao: "Como proteger dados pessoais, reconhecer golpes digitais e adotar boas práticas de segurança no cotidiano — para além do ambiente corporativo.",
    data: "",
    evento: "",
    slides: "",
    video: ""
  },
  {
    nome: "Inteligência Artificial e a sociedade",
    descricao: "Impactos éticos, econômicos e culturais da IA no mundo contemporâneo: oportunidades, riscos e o papel do cidadão nessa transformação.",
    data: "",
    evento: "",
    slides: "",
    video: ""
  },
  {
    nome: "Pensamento computacional para resolução de problemas",
    descricao: "Como decompor problemas complexos, identificar padrões e construir soluções estruturadas — habilidades que vão além da programação.",
    data: "",
    evento: "",
    slides: "",
    video: ""
  },
  {
    nome: "O óbvio ainda precisa ser dito",
    descricao: "Reflexões sobre conceitos fundamentais que continuam sendo ignorados na prática — em tecnologia, educação e no dia a dia profissional.",
    data: "",
    evento: "",
    slides: "",
    video: ""
  }
  // Adicione mais objetos aqui seguindo o mesmo formato
];

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

// ═══════════════════════════════════════════════════
// ARTIGOS PUBLICADOS
// Para adicionar um novo artigo, copie um bloco { } e preencha:
//
//   titulo   — título do artigo (obrigatório)
//   autores  — lista de autores
//   venue    — revista, anais ou evento onde foi publicado
//   ano      — ano de publicação (ex: "2025")
//   resumo   — breve descrição do trabalho (opcional)
//   link     — URL para acessar o artigo (opcional)
// ═══════════════════════════════════════════════════
const artigos = [
  {
    titulo: "Tecnologias Educacionais Integradas: Desafios e Limites no Cotidiano Escolar",
    autores: "Moraes, M.",
    venue: "Horizontes Digitais · v. 1, n. 01",
    ano: "2025",
    status: "publicado",  // publicado | preprint | revisão
    resumo: "Analisa como a incorporação das tecnologias na educação transforma os processos de aprendizagem e ensino. Discute benefícios como aprendizado personalizado e maior participação dos alunos, além de desafios como acesso desigual e necessidade de capacitação docente contínua.",
    link: "https://www.horizontesdigitais.com.br/index.php/HDS/article/view/3/4"
  },
  {
    titulo: "SCRUM: A Arte de Fazer o dobro do trabalho na metade do tempo — Uma Resenha Crítica",
    autores: "Moraes, M.",
    venue: "Horizontes Digitais · v. 1, n. 01",
    ano: "2025",
    status: "publicado",
    resumo: "Resenha crítica da obra de Jeff Sutherland. Analisa o Scrum como framework adaptativo e iterativo, explorando seus fundamentos, casos práticos e ganhos de produtividade, além de discutir as limitações da obra, como a ausência de sistematização teórica formal.",
    link: "https://www.horizontesdigitais.com.br/index.php/HDS/article/view/5/7"
  }
  // Adicione novos artigos aqui. Status possíveis: "publicado" | "preprint" | "revisão"
];

// ═══════════════════════════════════════════════════
// PROJETOS EM ANDAMENTO
// Campos:
//   titulo     — nome do projeto (obrigatório)
//   descricao  — o que está sendo investigado
//   area       — área temática (ex: "Astrofísica", "Educação")
//   inicio     — ex: "2025"
//   status     — "em andamento" | "coleta de dados" | "análise" | "escrita"
//   link       — URL do preprint ou repositório (opcional)
// ═══════════════════════════════════════════════════
const projetos = [
  // Adicione projetos aqui quando estiver pronto
  /* Exemplo:
  {
    titulo: "Modelagem de Bibliotecas Estelares para Arqueologia Galática",
    descricao: "Investigação sobre o uso de bibliotecas estelares sintéticas na determinação de parâmetros físicos de estrelas de população II. O objetivo é refinar métodos de datação de estruturas estelares antigas da Via Láctea.",
    area: "Astrofísica",
    inicio: "2025",
    status: "em andamento",
    link: ""
  },
  {
    titulo: "Impacto de Tecnologias Generativas no Ensino Superior",
    descricao: "Estudo sobre como ferramentas de IA generativa (LLMs) estão sendo incorporadas — ou ignoradas — na prática docente universitária brasileira. Inclui levantamento com professores de cursos de tecnologia.",
    area: "Educação",
    inicio: "2026",
    status: "coleta de dados",
    link: ""
  }
  */
];

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

