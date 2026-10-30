window.DEMOS = {
  barao: {
    nome: "App de ofertas do Barão Express",
    titulo: "Veja como o seu app vai funcionar",
    sub: "Um exemplo real, feito para o Barão Express. O cliente escolhe, monta o pedido e envia direto no seu WhatsApp.",
    passos: [
      ["1.jpg", "Jornal de ofertas", "Banner com as ofertas da semana, horário de funcionamento e busca de produtos."],
      ["2.jpg", "Preço baixo em destaque", "Produtos em oferta com desconto, preço antigo riscado e botão Adicionar."],
      ["3.jpg", "Categorias organizadas", "Cervejas, refrigerantes, destilados e mais, com o preço de cada item."],
      ["4.jpg", "Pedido pelo WhatsApp", "Produtos sem preço fixo viram Pôr no pedido e o cliente fecha a compra no seu Zap."]
    ],
    // Fotos dos planos quando esta demonstração aparece na proposta (no lugar das fotos do segmento)
    fotosPlanos: ["img/demos/barao/plano-1.jpg", "img/demos/barao/plano-2.jpg", "img/demos/barao/plano-3.jpg"]
  },
  filhosnafe: {
    nome: "App de inscrições da Filhos na Fé (retiros e eventos)",
    titulo: "Veja como o app de inscrições funciona",
    sub: "Um exemplo feito para a Comunidade Filhos na Fé Church: inscrição da família toda, pagamento por Pix ou cartão, ingresso com QR Code e painel para a igreja.",
    passos: [
      ["1.jpg", "Escolha da data", "Contagem regressiva, valor do lote atual e vagas restantes em cada data."],
      ["2.jpg", "Família inteira de uma vez", "Meia para crianças, isenção até 5 anos, responsável para menores e cupom de desconto."],
      ["3.jpg", "Ingresso com QR Code", "Pagou no Pix ou no cartão, recebe o ingresso na hora e o comprovante no WhatsApp."],
      ["4.jpg", "Painel da igreja", "Inscritos, valor arrecadado, ocupação, camisetas e check-in na chegada."]
    ],
    app: "demos/filhosnafe/index.html"
  }
};
window.demosDe = function (d) {
  var r = (d.demos || []).slice();
  if (!d.demoOff && /bar[aã]o/i.test(d.cliente || "") && r.indexOf("barao") < 0) r.push("barao");
  return r;
};
