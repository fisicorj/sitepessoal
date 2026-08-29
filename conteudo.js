// ═══════════════════════════════════════════════════
// CONTEÚDO DO SITE
// Este arquivo reúne só os dados editáveis (materiais de aula,
// palestras, artigos e projetos). A lógica de renderização e
// interação fica em script.js — não precisa mexer lá para
// atualizar conteúdo.
//
// IMPORTANTE: este arquivo precisa ser carregado ANTES de
// script.js no HTML (a ordem das tags <script> importa).
// ═══════════════════════════════════════════════════

// ── EDITE AQUI OS LINKS DO GOOGLE DRIVE ──
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
const materiaisEnsino = [
  {
    nome: "Faculdade Salvador Arena",
    icone: "🏛️",
    aberta: false,
    disciplinas: [
      {
        nome: "Engenharia de Software",
        descricao: "Materiais da disciplina.",
        arquivos: [
          //{ nome: "Aula 01 - Introdução", tipo: "Slide", data: "2026", link: "" },
          //{ nome: "Lista 01", tipo: "Lista", data: "2026", link: "" }
        ]
      },
      {
        nome: "Modelagem de Software",
        descricao: "Materiais da disciplina.",
        arquivos: [
          //{ nome: "Aula 01 - Introdução", tipo: "Slide", data: "2026", link: "" },
          //{ nome: "Lista 01", tipo: "Lista", data: "2026", link: "" }
        ]
      },
      {
        nome: "Algoritmos II",
        descricao: "Materiais da disciplina.",
        arquivos: [
          //{ nome: "Aula 01 - Introdução", tipo: "Slide", data: "2026", link: "" },
          //{ nome: "Lista 01", tipo: "Lista", data: "2026", link: "" }
        ]
      },
      {
        nome: "Arquitetura de Computadores",
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
    aberta: true,
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

// ── PALESTRAS ──
// Adicione aqui suas palestras. Campos:
//   nome       — título da palestra (obrigatório)
//   descricao  — breve descrição (obrigatório)
//   data       — ex: "Jun 2025" (opcional)
//   evento     — nome do evento ou instituição (opcional)
//   slides     — link para PDF ou Google Drive dos slides (opcional)
//   video      — link do YouTube ou Vimeo (opcional)
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

// ── ARTIGOS PUBLICADOS ──
// Para adicionar um novo artigo, copie um bloco { } e preencha:
//   titulo   — título do artigo (obrigatório)
//   autores  — lista de autores
//   venue    — revista, anais ou evento onde foi publicado
//   ano      — ano de publicação (ex: "2025")
//   resumo   — breve descrição do trabalho (opcional)
//   link     — URL para acessar o artigo (opcional)
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

// ── PROJETOS EM ANDAMENTO ──
// Campos:
//   titulo     — nome do projeto (obrigatório)
//   descricao  — o que está sendo investigado
//   area       — área temática (ex: "Física", "Educação")
//   inicio     — ex: "2025"
//   status     — "em andamento" | "coleta de dados" | "análise" | "escrita"
//   link       — URL do preprint ou repositório (opcional)
const projetos = [
  // Adicione projetos aqui quando estiver pronto
  /* Exemplo:
  {
    titulo: "Modelagem de Bibliotecas Estelares para Arqueologia Galática",
    descricao: "Investigação sobre o uso de bibliotecas estelares sintéticas na determinação de parâmetros físicos de estrelas de população II. O objetivo é refinar métodos de datação de estruturas estelares antigas da Via Láctea.",
    area: "Física",
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
