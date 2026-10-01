/* Monta a página da proposta da Elite a partir dos dados salvos. */
(function () {
  var C = window.CONFIG, M = window.MODELOS, TP = window.TIPOS;

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function img(k) { return "img/" + k + (/\.(png|jpg)$/.test(k) ? "" : (k === "escudo" || k === "marca" ? ".png" : ".jpg")); }
  function waDigits(n) { var d = String(n || "").replace(/\D/g, ""); if (!d) return ""; if (d.length <= 11) d = "55" + d; return d; }
  function waLink(msg) { var d = waDigits(C.WHATSAPP); return d ? "https://wa.me/" + d + "?text=" + encodeURIComponent(msg) : "#"; }
  function grupos(itens) {
    var out = [], cur = null;
    (itens || []).forEach(function (l) {
      l = String(l).trim(); if (!l) return;
      if (l.charAt(0) === "#") { cur = { t: l.replace(/^#+\s*/, ""), i: [] }; out.push(cur); }
      else { if (!cur) { cur = { t: "", i: [] }; out.push(cur); } cur.i.push(l); }
    });
    return out;
  }
  var ICON = {
    foto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.6"/></svg>',
    video: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="6" width="13" height="12" rx="2"/><path d="m16 10 5-3v10l-5-3"/></svg>',
    social: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M9 7h6M9 11h6M9 15h3"/></svg>',
    trafego: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M4 19V5M4 19h16"/><path d="m7 15 4-4 3 3 5-6"/><path d="M15 8h4v4"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.4.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none"/></svg>',
    fb: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4a21 21 0 0 0-2.3-.1c-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21h3.1Z"/></svg>',
    web: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>'
  };

  window.renderProposta = function (el, d) {
    var T = M[d.segmento] || M.alimentacao, K = TP[d.tipo] || TP.mensal;
    var cliente = (d.cliente || "").trim();
    var fundo = "--fundo:url('" + img("fundo") + "')";
    document.title = (cliente ? cliente + " | " : "") + "Proposta Elite Marketing Digital";
    var meta = [d.responsavel ? "A/C " + d.responsavel : "", d.local].filter(function (x) { return x && String(x).trim(); }).map(esc).join(" · ");
    var pks = d.pacotes || [];

    var pkHtml = pks.map(function (p, i) {
      var val = String(p.valor || "").trim();
      var msg = "Olá! Vi a proposta da Elite Marketing Digital" + (cliente ? " para " + cliente : "") +
        " e quero contratar o *" + p.nome + "*" + (val ? " de R$ " + val + (p.sufixo ? " " + p.sufixo : "") : "") + "." +
        "\nComo fazemos para começar?";
      return '<article class="plan' + (p.destaque ? " hl" : "") + '">' +
        (p.destaque ? '<span class="tag">Mais escolhido</span>' : "") +
        '<div class="ph"><img src="' + img(T.fotosPacotes[i % T.fotosPacotes.length]) + '" alt=""></div>' +
        '<div class="body"><h3>' + esc(p.nome) + "</h3>" +
        grupos(p.itens).map(function (g) {
          return '<div class="grp">' + (g.t ? "<b>" + esc(g.t) + "</b>" : "") + "<ul>" + g.i.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>";
        }).join("") +
        '<div class="price">' + (val ? '<div class="v"><small>R$</small>' + esc(val) + "</div>" : '<div class="v" style="font-size:1.5rem">Valor sob consulta</div>') +
        (p.sufixo ? '<div class="s">' + esc(p.sufixo) + "</div>" : "") + "</div>" +
        (p.obs ? '<p class="obs">' + esc(p.obs) + "</p>" : "") +
        '<a class="btn' + (p.destaque ? " gold-bg" : "") + '" href="' + esc(waLink(msg)) + '" target="_blank" rel="noopener">' + (d.tipo === "personalizado" ? "Quero este serviço" : "Quero este plano") + "</a>" +
        "</div></article>";
    }).join("");

    var team = (C.EQUIPE || []).map(function (m, i) {
      return '<div class="member"><img src="' + img("t" + (i + 1)) + '" alt="' + esc(m.nome || "Integrante da equipe") + '">' +
        (m.nome || m.funcao ? "<div>" + (m.nome ? "<b>" + esc(m.nome) + "</b><br>" : "") + (m.funcao ? "<span>" + esc(m.funcao) + "</span>" : "") + "</div>" : "") + "</div>";
    }).join("");

    var svc = [
      ["foto", "Fotografia profissional", ["Detalhes do estabelecimento e dos produtos", "Edição atrativa, pronta para redes sociais e anúncios"]],
      ["video", "Vídeos criativos e diretos", ["Vídeos com chamada para ação (CTA)", "Filmagens simples ou com roteiro criativo"]],
      ["social", "Gestão de redes sociais", ["Postagens regulares com fotos e vídeos feitos por nós", "Legendas profissionais e persuasivas", "Feed organizado para gerar autoridade e confiança", "Criação de artes inclusa", "Estratégias para atrair seguidores reais e engajados"]],
      ["trafego", "Gestão de tráfego pago", ["Anúncios para o seu público, com foco em reconhecimento de marca e engajamento", "Mais alcance, mais cliques e mais visitas ao seu estabelecimento"]]
    ].map(function (s) {
      return '<div class="svc"><div class="ic">' + ICON[s[0]] + "</div><h3>" + s[1] + "</h3><ul>" + s[2].map(function (x) { return "<li>" + x + "</li>"; }).join("") + "</ul></div>";
    }).join("");

    var diffs = [
      ["Equipe completa", "Fotógrafo, videomaker, social media, editor e gestor de tráfego trabalhando juntos."],
      ["Atendimento rápido", "Fotos e filmagens no dia, com edição e postagem ágeis."],
      ["Conteúdo pronto", "Editado e postado nas suas redes, com legenda persuasiva."],
      ["Tudo agendado", "Organizamos o calendário com praticidade e regularidade."]
    ].map(function (x, i) { return '<div class="diff"><div class="n">0' + (i + 1) + "</div><h3>" + x[0] + "</h3><p>" + x[1] + "</p></div>"; }).join("");

    var clientes = (C.CLIENTES || []).map(function (f) {
      return '<div class="client' + (/\.jpg$/.test(f) ? " cover" : "") + '"><img src="' + img("clientes/" + f) + '" alt="Logo de cliente da Elite"></div>';
    }).join("");

    var ctaMsg = "Olá! Recebi a proposta da Elite Marketing Digital" + (cliente ? " para " + cliente : "") + " e quero conversar.";
    var socials = (C.INSTAGRAM ? '<a href="https://www.instagram.com/' + esc(C.INSTAGRAM) + '" target="_blank" rel="noopener">' + ICON.ig + "@" + esc(C.INSTAGRAM.toUpperCase()) + "</a>" : "") +
      (C.FACEBOOK ? '<a href="https://www.facebook.com/' + esc(C.FACEBOOK) + '" target="_blank" rel="noopener">' + ICON.fb + "/" + esc(C.FACEBOOK.toUpperCase()) + "</a>" : "") +
      (C.SITE ? '<a href="' + esc(C.SITE) + '" target="_blank" rel="noopener">' + ICON.web + "SITE</a>" : "");

    el.innerHTML =
      '<header class="hero starry" style="' + fundo + '"><div class="hero-in">' +
      '<img class="escudo" src="' + img("escudo") + '" alt=""><img class="marca" src="' + img("marca") + '" alt="Elite Marketing Digital">' +
      '<div class="kicker">Proposta exclusiva para</div>' +
      "<h1>" + (cliente ? esc(cliente) : "Você") + "</h1>" + (meta ? '<div class="meta">' + meta + "</div>" : "") +
      '<p class="tag">Impulsione seu negócio com <span class="gold">conteúdo profissional</span> e estratégias digitais</p>' +
      '<p class="sub">Mais visibilidade, mais cliques, mais clientes.</p>' +
      '<a class="btn" href="#planos">Ver ' + (d.tipo === "personalizado" ? "proposta" : "planos") + "</a></div></header>" +

      '<section class="sec"><div class="wrap about"><div class="txt"><span class="pill">Quem somos</span>' +
      '<p class="lead">Somos uma equipe de 3 profissionais especializados em produzir conteúdo de alta qualidade.</p>' +
      "<p>Unimos fotografia, filmagem estratégica, gestão de tráfego pago e gestão de redes sociais para atrair mais clientes e aumentar o seu faturamento.</p></div>" +
      '<div class="members">' + team + "</div></div>" +
      '<div class="wrap intro-vid" data-vid><div class="kicker">Conheça a Elite</div>' +
      '<video src="' + esc(C.VIDEO_APRESENTACAO || "videos/apresentacao.mp4") + '#t=0.1" controls playsinline preload="metadata"></video></div></section>' +

      '<section class="sec starry" style="' + fundo + '"><div class="wrap"><div class="sec-head"><span class="pill">O que oferecemos</span></div><div class="services">' + svc + "</div></div></section>" +

      '<section class="sec"><div class="wrap"><div class="sec-head"><span class="pill">Nosso diferencial</span></div><div class="diffs">' + diffs + "</div>" +
      '<p class="frase">' + esc(T.frase) + "</p></div></section>" +

      ((T.videos || []).length ? '<section class="sec" style="padding-top:0" data-vid><div class="wrap"><div class="sec-head"><span class="pill">Trabalhos em vídeo</span></div><div class="reels">' +
        T.videos.map(function (v) { return '<video data-src="videos/' + esc(v) + '" muted loop playsinline preload="none"></video>'; }).join("") + "</div></div></section>" : "") +
      '<section class="sec" style="padding-top:0"><div class="wrap"><div class="sec-head"><div class="kicker">' + esc(T.nome) + "</div></div>" +
      '<div class="masonry">' + T.galeria.map(function (k) { return '<img src="' + img(k) + '" alt="Trabalho da Elite Marketing Digital" loading="lazy">'; }).join("") + "</div></div></section>" +

      '<section class="sec starry" id="planos" style="' + fundo + '"><div class="wrap"><div class="sec-head"><span class="pill">' + esc(K.titulo) + "</span><p>" + esc(K.subtitulo) + "</p></div>" +
      '<div class="plans n' + Math.min(Math.max(pks.length, 1), 3) + '">' + pkHtml + "</div>" +
      (d.nota ? '<p class="pay-note">' + esc(d.nota) + "</p>" : "") + "</div></section>" +

      (clientes ? '<section class="sec"><div class="wrap"><div class="sec-head"><span class="pill">Nossos clientes</span><p>Negócios que já confiam no nosso trabalho.</p></div><div class="clients">' + clientes + "</div></div></section>" : "") +

      '<section class="cta"><img src="' + img(T.fotoFinal) + '" alt=""><div class="wrap"><h2>Pronto para sair na frente da <span class="gold">concorrência</span>?</h2>' +
      "<p>A gente cuida do tráfego, do conteúdo e da imagem do seu negócio. Você cuida de vender.</p>" +
      '<a class="btn gold-bg" href="' + esc(waLink(ctaMsg)) + '" target="_blank" rel="noopener">' + ICON.wa + "Vamos começar</a>" +
      '<img class="escudo" src="' + img("escudo") + '" alt=""><img class="marca" src="' + img("marca") + '" alt="Elite Marketing Digital">' +
      (socials ? '<div class="socials">' + socials + "</div>" : "") +
      (d.validade ? '<div class="valid">Proposta válida até ' + esc(d.validade) + "</div>" : "") +
      "</div></section>";
    ligarVideos(el);
  };

  /* Vídeos: some se o arquivo não existir; reels tocam só quando aparecem na tela. */
  function ligarVideos(el) {
    el.querySelectorAll("[data-vid] video").forEach(function (v) {
      v.addEventListener("error", function () {
        var box = v.closest(".reels") ? v : v.closest("[data-vid]");
        if (box) box.remove();
        el.querySelectorAll(".reels").forEach(function (r) { if (!r.querySelector("video")) { var s = r.closest("[data-vid]"); if (s) s.remove(); } });
      });
    });
    var reels = el.querySelectorAll(".reels video");
    if (!reels.length) return;
    function carregar(v) { if (!v.src && v.dataset.src) { v.src = v.dataset.src; } }
    if (!("IntersectionObserver" in window)) { reels.forEach(function (v) { carregar(v); v.play().catch(function () {}); }); return; }
    var io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) {
        var v = e.target;
        if (e.isIntersecting) { carregar(v); v.play().catch(function () {}); } else { v.pause(); }
      });
    }, { threshold: 0.35 });
    reels.forEach(function (v) {
      io.observe(v);
      v.addEventListener("click", function () { v.muted = !v.muted; if (v.paused) v.play().catch(function () {}); });
    });
  }
  window.renderUtil = { esc: esc, img: img, waDigits: waDigits };
})();
