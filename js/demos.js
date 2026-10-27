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
    ]
  }
};
window.demosDe = function (d) {
  var r = (d.demos || []).slice();
  if (!d.demoOff && /bar[aã]o/i.test(d.cliente || "") && r.indexOf("barao") < 0) r.push("barao");
  return r;
};
