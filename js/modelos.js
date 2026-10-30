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
    },
    renovacao: {
      nome: "Renovação / reajuste",
      titulo: "Renovação de contrato",
      subtitulo: "Obrigado pela parceria. Veja as condições para continuarmos juntos no próximo período.",
      nota: "Os valores já consideram o reajuste do período. O saldo dos anúncios continua sendo pago à parte, direto na plataforma."
    },
    digital: {
      nome: "Sites e aplicativos",
      titulo: "Sites e aplicativos",
      subtitulo: "Seu negócio com site próprio, pronto para vender e receber clientes dos anúncios.",
      nota: "A implantação é paga uma vez. A mensalidade cobre hospedagem, segurança, suporte e pequenas atualizações."
    },
    app: {
      nome: "App por assinatura",
      titulo: "Planos do aplicativo",
      subtitulo: "Seu app próprio, com a sua marca, sem pagar porcentagem por inscrição ou venda.",
      nota: "A implantação é paga uma vez. A assinatura cobre hospedagem, banco de dados, segurança, suporte e atualizações, com fidelidade de 12 meses. As taxas do Pix e do cartão são cobradas direto pelo banco em cada pagamento."
    }
  };

  /* APP POR ASSINATURA (ex.: inscrições de igreja, retiros e eventos). Edite à vontade em cada proposta. */
  window.PACOTES_APP = [
    { nome: "Essencial", foto: "img/demos/filhosnafe/plano-1.jpg", valor: "800", sufixo: "implantação", mensal: "149", destaque: false, obs: "",
      itens: ["# O que está incluso", "App com a marca e as cores do cliente", "1 evento ativo por vez", "Pagamento por Pix e cartão com confirmação automática", "Ingresso com QR Code", "Painel com inscritos e valores", "Suporte pelo WhatsApp"] },
    { nome: "Completo", foto: "img/demos/filhosnafe/plano-2.jpg", valor: "1.200", sufixo: "implantação", mensal: "249", destaque: true, obs: "Retiros, congressos, cursos e cantina no mesmo app.",
      itens: ["# Tudo do Essencial, mais", "Eventos ilimitados", "Check-in na chegada pela câmera do celular", "Lembretes automáticos no WhatsApp", "Relatórios e lista para planilha", "Ajustes mensais no app"] },
    { nome: "Completo anual", foto: "img/demos/filhosnafe/plano-3.jpg", valor: "2.490", sufixo: "por ano, à vista", mensal: "", destaque: false, obs: "2 meses grátis em relação ao plano mensal. Implantação de R$ 1.200 cobrada uma vez.",
      itens: ["# O que está incluso", "Tudo do plano Completo", "12 meses pagando 10", "Sem fidelidade mensal para controlar"] }
  ];

  /* SITES E APLICATIVOS: valores padrão por segmento (edite à vontade em cada proposta).
     valor = implantação (pagamento único) · mensal = mensalidade */
  function d(nome, valor, mensal, itens, extra) {
    return Object.assign({ nome: nome, valor: valor, sufixo: "implantação", mensal: mensal, destaque: false, obs: "", itens: itens }, extra || {});
  }
  window.DIGITAL = {
    automotivo: [
      d("Landing page catálogo", "1.200 a 1.800", "99 a 149", ["# O que está incluso", "Página de catálogo com fotos, preço e ficha de cada carro", "Botão de WhatsApp em cada veículo", "Feita para receber os anúncios", "Estoque atualizado por nós quando a loja pedir"]),
      d("Landing page com painel", "2.000 a 2.800", "179 a 229", ["# O que está incluso", "Tudo da landing page catálogo", "Painel para a loja cadastrar e tirar carros sozinha", "Fotos, preço e ficha editáveis pelo celular"]),
      d("Combo site + landing + painel", "3.500", "249", ["# O que está incluso", "Site completo da loja", "Landing page para os anúncios dentro do site", "Painel de estoque para a loja", "Botão de WhatsApp em cada veículo"], { destaque: true, obs: "Opção recomendada: tudo integrado, com um único painel." }),
      d("Site + Central de Estoque", "4.000 a 6.000", "349 a 499", ["# O que está incluso", "Site completo com painel de estoque", "Central de Estoque: cadastra uma vez e publica em todos", "Catálogo integrado ao Meta (anúncios do Facebook e Instagram)", "Integração com o Mercado Livre"])
    ],
    alimentacao: [
      d("Cardápio digital", "900 a 1.200", "79 a 99", ["# O que está incluso", "Cardápio online com fotos e preços", "Pedido vai pronto para o WhatsApp", "Link para a bio e para os anúncios"]),
      d("Cardápio com painel", "1.800 a 2.500", "149 a 199", ["# O que está incluso", "Tudo do cardápio digital", "Painel para o restaurante editar pratos, preços e horários", "Pausar itens esgotados na hora"], { destaque: true }),
      d("Delivery próprio", "3.500 a 5.000", "299 a 399", ["# O que está incluso", "App de pedidos com a marca do restaurante", "Carrinho, taxa de entrega por bairro e retirada", "Painel de pedidos em tempo real", "Sem comissão por pedido"])
    ],
    comercio: [
      d("Agendamento simples", "900 a 1.200", "79 a 99", ["# O que está incluso", "Página de agendamento com serviços e horários", "Pedido vai pronto para o WhatsApp", "A loja confirma o horário na mão"]),
      d("Agendamento completo", "1.800 a 2.500", "149 a 199", ["# O que está incluso", "Painel da loja com a agenda", "Horários ocupados bloqueados de verdade", "Lembrete para o cliente"], { destaque: true, obs: "Lembretes 100% automáticos no WhatsApp: custo das mensagens repassado." }),
      d("Landing page para anúncios", "1.200 a 1.800", "99 a 149", ["# O que está incluso", "Página de vendas feita para os anúncios", "Botão de WhatsApp e formulário", "Pronta para medir resultados (Pixel)"]),
      d("Site institucional", "2.000 a 3.000", "149 a 199", ["# O que está incluso", "Site completo com as páginas da empresa", "Galeria, serviços, contato e mapa", "Painel para atualizar textos e fotos"])
    ]
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
      videos: ["pizzaria-2.mp4", "restobar-1.mp4", "nogrill-1.mp4", "haru-1.mp4", "barao-express-1.mp4", "pizzaria-3.mp4", "restobar-2.mp4", "nogrill-2.mp4", "barao-express-2.mp4", "barao-express-3.mp4"],
      fotosPacotes: ["f_pizza", "f_nutella", "f_vinhos"],
      pacotes: planos(true)
    },
    automotivo: {
      nome: "Automotivo",
      exemplo: "lojas de veículos, estética automotiva, oficinas",
      frase: "Carro bem fotografado vende mais rápido. A gente mostra cada detalhe do seu estoque com a qualidade que ele merece.",
      galeria: ["a_bmw", "a_grade", "a_interior", "a_lanterna"],
      fotoFinal: "a_bmw",
      videos: ["loja-carros-1.mp4", "loja-carros-2.mp4", "loja-carros-3.mp4", "loja-carros-4.mp4"],
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
