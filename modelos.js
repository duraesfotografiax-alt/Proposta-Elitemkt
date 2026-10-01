/* ===========================================================
   ELITE — SEGMENTOS E PACOTES PADRÃO
   - SEGMENTOS: muda fotos e frases da proposta.
   - PACOTES: o ponto de partida de cada tipo de proposta.
     Em cada proposta vocês podem mudar tudo antes de gerar o link.
   Nos itens, uma linha começando com # vira o título de um grupo.
   Vídeos: nomes exatos dos arquivos da pasta videos/ (maiúsculas e minúsculas contam).
   =========================================================== */
(function () {
  var TRAFEGO = ["# Tráfego pago", "Estratégia para atrair clientes e dar visibilidade à página e ao estabelecimento, com impacto nas vendas e nos seguidores"];
  var OBS = "Saldo dos anúncios por conta do contratante (opcional). Recomendação: a partir de R$ 400,00 por mês.";

  function planos(comCardapio) {
    var card = comCardapio ? ["# Cardápio", "Cardápio digital e físico"] : [];
    return [
      { nome: "Plano Standard", valor: "1.498,90", sufixo: "/mês", destaque: false, obs: OBS,
        itens: ["# Gestão de Instagram e Facebook", "Análise de perfil", "3 a 5 posts por semana", "3 a 5 artes por semana", "Artes e artes animadas", "Configuração das páginas"].concat(TRAFEGO) },
      { nome: "Plano Premium", valor: "1.598,90", sufixo: "/mês", destaque: false, obs: OBS,
        itens: ["# Fotografia e filmagem", "Vídeos no dia", "Fotografias no dia", "Disponibilidade 1x por semana",
                "# Gestão de Instagram e Facebook", "Análise de perfil", "3 a 7 posts por semana", "3 a 7 artes por semana", "Artes e artes animadas", "Configuração do WhatsApp Business", "Configuração das páginas"].concat(TRAFEGO, card) },
      { nome: "Plano Elite", valor: "1.998,98", sufixo: "/mês", destaque: true, obs: OBS,
        itens: ["# Fotografia e filmagem", "Vídeos no dia", "Fotografias no dia", "Disponibilidade até 3x por semana",
                "# Gestão de Instagram e Facebook", "Análise de perfil", "4 a 7 posts por semana", "4 a 7 artes por semana", "Artes e artes animadas", "Configuração das páginas"].concat(TRAFEGO, card) }
    ];
  }

  window.TIPOS = {
    mensal: {
      nome: "Planos mensais",
      titulo: "Planos mensais",
      subtitulo: "Escolha o plano ideal para o momento do seu negócio.",
      nota: "Os planos são mensais. O saldo dos anúncios é pago à parte, direto na plataforma, e definimos juntos o valor ideal para o seu negócio."
    },
    personalizado: {
      nome: "Serviço personalizado",
      titulo: "Serviço personalizado",
      subtitulo: "Um trabalho pontual, pensado sob medida para você.",
      nota: "Serviço com pagamento único. Combinamos juntos a data, o local e todos os detalhes da produção."
    }
  };

  window.PACOTES_PERSONALIZADO = [
    { nome: "Vídeo profissional", valor: "", sufixo: "pagamento único", destaque: false, obs: "",
      itens: ["# O que está incluso", "Gravação no local combinado", "Roteiro criativo com chamada para ação (CTA)", "Edição pronta para Reels, Stories e anúncios"] }
  ];

  window.MODELOS = {
    alimentacao: {
      nome: "Alimentação",
      exemplo: "restaurantes, pizzarias, açaí, bares",
      frase: "Comida boa merece ser vista. A gente transforma os seus pratos em conteúdo que dá fome e traz cliente para a mesa.",
      galeria: ["f_pizza", "f_bar", "f_nutella", "f_vinhos", "f_pizza2", "f_adega", "f_tacas"],
      fotoFinal: "f_bar",
      videos: ["pizzaria-1.mp4", "Restobar-1.mp4", "pizzaria-2.mp4", "Haru-1.mp4", "Restobar-2.mp4", "pizzaria-3.mp4", "barao-express-1.mp4"],
      fotosPacotes: ["f_pizza", "f_nutella", "f_vinhos"],
      pacotes: planos(true)
    },
    automotivo: {
      nome: "Automotivo",
      exemplo: "lojas de veículos, estética automotiva, oficinas",
      frase: "Carro bem fotografado vende mais rápido. A gente mostra cada detalhe do seu estoque com a qualidade que ele merece.",
      galeria: ["a_bmw", "a_grade", "a_interior", "a_lanterna"],
      fotoFinal: "a_bmw",
      videos: ["loja-carros-1.mp4", "loja-carros-2.mp4", "loja-carros-3.mp4", "loja-carros-4.mp4", "loja-carros-5.mp4"],
      fotosPacotes: ["a_grade", "a_interior", "a_lanterna"],
      pacotes: planos(false)
    },
    comercio: {
      nome: "Comércio e serviços",
      exemplo: "lojas, salões, clínicas e outros negócios",
      frase: "O seu negócio com a imagem que ele merece: conteúdo profissional para atrair, encantar e vender todos os dias.",
      galeria: ["c_lancha", "f_vinhos", "a_bmw", "c_rastro", "f_bar", "c_por_do_sol"],
      fotoFinal: "c_por_do_sol",
      videos: ["salao-1.mp4"],
      fotosPacotes: ["c_lancha", "f_vinhos", "c_rastro"],
      pacotes: planos(false)
    }
  };
})();
