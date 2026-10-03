/* Painel da Elite: criar, editar e gerar links das propostas. */
(function () {
  var TABELA = "propostas_elite"; // tabela da Elite no Supabase
  var C = window.CONFIG, M = window.MODELOS, TP = window.TIPOS, app = document.getElementById("app");
  var sb = null, aba = "nova", form = null, editandoId = null, ultimo = null;

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function toast(t, ms) { var el = document.getElementById("toast"); el.textContent = t; el.classList.add("on"); clearTimeout(toast._t); toast._t = setTimeout(function () { el.classList.remove("on"); }, ms || 3500); }
  function linkDe(slug) { return new URL("proposta.html?c=" + slug, location.href).href; }
  function waDigits(n) { var d = String(n || "").replace(/\D/g, ""); if (!d) return ""; if (d.length <= 11) d = "55" + d; return d; }
  function dataBR(iso) { if (!iso) return ""; var d = new Date(iso); return d.toLocaleDateString("pt-BR") + " às " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }); }
  function slugify(s) {
    var base = String(s || "proposta").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/&/g, "e").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "proposta";
    var a = "abcdefghjkmnpqrstuvwxyz23456789", r = "", b = new Uint8Array(6); crypto.getRandomValues(b);
    for (var i = 0; i < 6; i++) r += a[b[i] % a.length];
    return base + "-" + r;
  }
  function pacotesPadrao(seg, tipo) { return clone(tipo === "personalizado" ? window.PACOTES_PERSONALIZADO : M[seg].pacotes); }
  function novaProposta(seg, tipo) {
    return { segmento: seg, tipo: tipo, cliente: "", responsavel: "", clienteWhats: "", local: "", validade: "", nota: TP[tipo].nota, pacotes: pacotesPadrao(seg, tipo) };
  }
  function msgCliente(d, link) {
    var nome = (d.responsavel || d.cliente || "").trim();
    return "Olá" + (nome ? ", " + nome : "") + "! Tudo bem? Preparamos a proposta da Elite Marketing Digital" + (d.cliente ? " para a " + d.cliente : "") + ". É só abrir o link:\n\n" + link + "\n\nQualquer dúvida, estamos à disposição!";
  }
  function copiar(t) {
    (navigator.clipboard ? navigator.clipboard.writeText(t) : Promise.reject()).then(function () { toast("Link copiado. Agora é só colar na conversa."); })
      .catch(function () { window.prompt("Copie o link:", t); });
  }

  if (!window.supabase || C.SUPABASE_URL.indexOf("http") !== 0) {
    app.innerHTML = '<div class="login"><div class="card" style="max-width:420px"><h2>Falta configurar o site</h2><p class="hint">Abra o arquivo <b>js/config.js</b> e cole a Project URL e a Publishable key do Supabase (veja o LEIA-ME).</p></div></div>';
    return;
  }
  sb = window.supabase.createClient(C.SUPABASE_URL, C.SUPABASE_KEY);
  sb.auth.getSession().then(function (r) { (r.data && r.data.session) ? painel() : login(); });

  function login(erro) {
    app.innerHTML = '<div class="login"><form id="f"><img src="img/escudo.png" alt="" class="esc"><img src="img/marca.png" alt="Elite Marketing Digital" class="mk">' +
      '<label>E-mail<input type="email" name="e" autocomplete="username" required></label>' +
      '<label>Senha<input type="password" name="s" autocomplete="current-password" required></label>' +
      (erro ? '<p class="err">' + esc(erro) + "</p>" : "") +
      '<button class="btn dark big" type="submit">Entrar</button></form></div>';
    document.getElementById("f").addEventListener("submit", function (e) {
      e.preventDefault(); var b = e.target.querySelector("button"); b.disabled = true; b.textContent = "Entrando…";
      sb.auth.signInWithPassword({ email: e.target.e.value.trim(), password: e.target.s.value }).then(function (r) {
        if (r.error) login(/invalid/i.test(r.error.message) ? "E-mail ou senha incorretos." : "Não foi possível entrar: " + r.error.message); else painel();
      }).catch(function () { login("Sem conexão com o servidor. Confira a URL e a chave no config.js."); });
    });
  }

  function painel() {
    app.innerHTML = '<div class="top"><div class="in"><img src="img/marca.png" alt="Elite Marketing Digital"><button type="button" id="sair">Sair</button></div>' +
      '<div class="tabs" role="tablist"><button role="tab" data-aba="nova">Nova proposta</button><button role="tab" data-aba="lista">Propostas salvas</button></div></div><main id="main"></main>';
    document.getElementById("sair").onclick = function () { sb.auth.signOut().then(function () { login(); }); };
    app.querySelectorAll("[data-aba]").forEach(function (b) {
      b.onclick = function () { if (b.getAttribute("data-aba") === "nova" && aba !== "nova") { editandoId = null; form = null; ultimo = null; } trocar(b.getAttribute("data-aba")); };
    });
    trocar(aba);
  }
  function trocar(a) {
    aba = a;
    app.querySelectorAll("[data-aba]").forEach(function (b) { b.setAttribute("aria-selected", String(b.getAttribute("data-aba") === a)); });
    if (a === "nova") telaForm(); else telaLista();
    window.scrollTo(0, 0);
  }

  function campo(rot, k, v, tipo, ph) {
    if (tipo === "area") return "<label>" + esc(rot) + '<textarea data-k="' + k + '" placeholder="' + esc(ph || "") + '">' + esc(v) + "</textarea></label>";
    return "<label>" + esc(rot) + '<input type="' + (tipo || "text") + '" data-k="' + k + '" value="' + esc(v) + '" placeholder="' + esc(ph || "") + '"></label>';
  }
  function seg(nome, act, attr, keys, atual, label) {
    return '<div class="seg">' + keys.map(function (k) {
      return '<button type="button" data-act="' + act + '" ' + attr + '="' + k + '" aria-pressed="' + (atual === k) + '">' + esc(label(k)) + "</button>";
    }).join("") + "</div>";
  }
  function telaForm() {
    if (!form) form = novaProposta("alimentacao", "mensal");
    var d = form, main = document.getElementById("main");
    if (ultimo) {
      var link = linkDe(ultimo.slug), wa = waDigits(ultimo.dados.clienteWhats);
      main.innerHTML = '<div class="result"><h2>' + (ultimo.editada ? "Proposta atualizada" : "Link gerado") + "</h2>" +
        '<p class="hint" style="margin:0">' + (ultimo.editada ? "O link continua o mesmo; o cliente já vê a versão nova." : "Esse link é só desse cliente e fica salvo até vocês apagarem.") + "</p>" +
        '<div class="linkbox">' + esc(link) + "</div>" +
        '<div class="actions"><button class="btn dark" type="button" id="cp">Copiar link</button>' +
        '<a class="btn" target="_blank" rel="noopener" href="https://wa.me/' + (wa || "") + "?text=" + encodeURIComponent(msgCliente(ultimo.dados, link)) + '">Enviar no WhatsApp</a>' +
        '<a class="btn" target="_blank" rel="noopener" href="' + esc(link) + '">Ver proposta</a></div>' +
        '<button class="btn" type="button" id="nova">Fazer outra proposta</button></div>';
      document.getElementById("cp").onclick = function () { copiar(link); };
      document.getElementById("nova").onclick = function () { ultimo = null; editandoId = null; form = null; telaForm(); };
      return;
    }
    var pk = (d.pacotes || []).map(function (p, i) {
      return '<section class="card"><div class="pk-head"><h2>' + (d.tipo === "personalizado" ? "Serviço " : "Plano ") + (i + 1) + '</h2><button class="btn small danger" type="button" data-act="rm" data-i="' + i + '">Remover</button></div>' +
        campo("Nome", "pk." + i + ".nome", p.nome) +
        '<div class="row">' + campo("Valor (R$)", "pk." + i + ".valor", p.valor, "text", "ex.: 1.498,90 (vazio = sob consulta)") + campo("Complemento do valor", "pk." + i + ".sufixo", p.sufixo, "text", "/mês ou pagamento único") + "</div>" +
        campo("O que está incluso (um por linha)", "pk." + i + ".itens", (p.itens || []).join("\n"), "area") +
        '<p class="hint">Dica: comece a linha com <b>#</b> para criar um título de grupo. Ex.: <b># Tráfego pago</b></p>' +
        campo("Observação (opcional)", "pk." + i + ".obs", p.obs, "area", "ex.: saldo dos anúncios por conta do contratante") +
        '<label class="chk"><input type="checkbox" data-k="pk.' + i + '.destaque"' + (p.destaque ? " checked" : "") + ">Selo “Mais escolhido”</label></section>";
    }).join("");
    main.innerHTML =
      (editandoId ? '<div class="card" style="border-color:#D9A94E"><h2>Editando a proposta de ' + esc(d.cliente || "cliente") + '</h2><p class="hint">Ao salvar, o link continua o mesmo.</p></div>' : "") +
      '<section class="card"><h2>Tipo de proposta</h2>' + seg("tipo", "tipo", "data-t", Object.keys(TP), d.tipo, function (k) { return TP[k].nome; }) +
      '<p class="hint">Planos mensais: Standard, Premium e Elite. Serviço personalizado: um vídeo, uma sessão de fotos, atualização de cardápio…</p></section>' +
      '<section class="card"><h2>Segmento do cliente</h2>' + seg("seg", "seg", "data-s", Object.keys(M), d.segmento, function (k) { return M[k].nome; }) +
      '<p class="hint">Muda as fotos e a frase da proposta. ' + esc(M[d.segmento].nome) + ": " + esc(M[d.segmento].exemplo) + ".</p></section>" +
      '<section class="card"><h2>Cliente</h2>' + campo("Nome da empresa", "cliente", d.cliente, "text", "ex.: Pizzaria Bella Napoli") +
      '<div class="row">' + campo("Responsável (opcional)", "responsavel", d.responsavel, "text", "ex.: Carlos") + campo("Cidade (opcional)", "local", d.local, "text", "ex.: Campinas") + "</div>" +
      '<div class="row">' + campo("WhatsApp do cliente (opcional)", "clienteWhats", d.clienteWhats, "tel", "ex.: 19 99999-9999") + campo("Proposta válida até (opcional)", "validade", d.validade, "text", "ex.: 30/11/2026") + "</div>" +
      '<p class="hint">O WhatsApp do cliente não aparece na proposta; serve só para o botão "Enviar no WhatsApp".</p></section>' +
      pk + '<button class="btn" type="button" data-act="add">Adicionar ' + (d.tipo === "personalizado" ? "serviço" : "plano") + "</button>" +
      '<section class="card"><h2>Observação geral</h2>' + campo("Texto que aparece abaixo dos planos", "nota", d.nota, "area") + "</section>" +
      '<div class="sticky"><button class="btn dark big" type="button" data-act="salvar">' + (editandoId ? "Salvar alterações" : "Gerar link") + "</button></div>";
  }
  function lerForm() {
    document.querySelectorAll("#main [data-k]").forEach(function (el) {
      var k = el.getAttribute("data-k").split("."), v = el.type === "checkbox" ? el.checked : el.value;
      if (k[0] === "pk") { if (k[2] === "itens") v = v.split("\n").map(function (s) { return s.trim(); }).filter(Boolean); form.pacotes[+k[1]][k[2]] = v; }
      else form[k[0]] = v;
    });
  }
  app.addEventListener("click", function (e) {
    var b = e.target.closest("[data-act]"); if (!b || aba !== "nova") return;
    var a = b.getAttribute("data-act"); lerForm();
    if (a === "tipo") { var t = b.getAttribute("data-t"); if (t !== form.tipo) { form.tipo = t; form.pacotes = pacotesPadrao(form.segmento, t); form.nota = TP[t].nota; } telaForm(); }
    if (a === "seg") { var s = b.getAttribute("data-s"); if (s !== form.segmento) { form.segmento = s; if (form.tipo === "mensal") form.pacotes = pacotesPadrao(s, "mensal"); } telaForm(); }
    if (a === "add") { form.pacotes.push({ nome: form.tipo === "personalizado" ? "Novo serviço" : "Novo plano", itens: [], valor: "", sufixo: form.tipo === "personalizado" ? "pagamento único" : "/mês", obs: "", destaque: false }); telaForm(); }
    if (a === "rm") { if (form.pacotes.length <= 1) { toast("A proposta precisa de pelo menos um item."); return; } form.pacotes.splice(+b.getAttribute("data-i"), 1); telaForm(); }
    if (a === "salvar") salvar(b);
  });
  function salvar(b) {
    if (!form.cliente.trim()) { toast("Preencha o nome da empresa."); var i = document.querySelector('[data-k="cliente"]'); if (i) i.focus(); return; }
    b.disabled = true; b.textContent = "Salvando…";
    var dados = clone(form), req;
    if (dados.tipo === "mensal" && !dados.pacotes.some(function (p) { return p.destaque; })) {
      var num = function (v) { return parseFloat(String(v || "0").replace(/\./g, "").replace(",", ".")) || 0; }, mi = 0;
      dados.pacotes.forEach(function (p, i) { if (num(p.valor) > num(dados.pacotes[mi].valor)) mi = i; });
      if (dados.pacotes[mi]) dados.pacotes[mi].destaque = true;
    }
    if (editandoId) req = sb.from(TABELA).update({ dados: dados, atualizado_em: new Date().toISOString() }).eq("id", editandoId).select("slug").single();
    else req = sb.from(TABELA).insert({ slug: slugify(dados.cliente), dados: dados }).select("slug").single();
    req.then(function (r) {
      if (r.error) throw r.error;
      ultimo = { slug: r.data.slug, dados: dados, editada: !!editandoId }; editandoId = null; form = null;
      telaForm(); window.scrollTo(0, 0);
    }).catch(function (err) {
      b.disabled = false; b.textContent = editandoId ? "Salvar alterações" : "Gerar link";
      toast(err && err.code === "42501" ? "Este e-mail não tem permissão. Confira a tabela admins no Supabase." : "Não deu para salvar. Verifique a internet e tente de novo.", 6000);
    });
  }

  function telaLista() {
    var main = document.getElementById("main");
    main.innerHTML = '<input type="search" id="busca" placeholder="Buscar por nome da empresa" aria-label="Buscar por nome da empresa"><div class="list" id="lista"><p class="empty">Carregando…</p></div>';
    sb.from(TABELA).select("id,slug,dados,criado_em,atualizado_em,visualizacoes,ultima_visualizacao").order("criado_em", { ascending: false }).then(function (r) {
      var el = document.getElementById("lista"); if (!el) return;
      if (r.error) { el.innerHTML = '<p class="empty">Não deu para carregar a lista. Tente de novo.</p>'; return; }
      var rows = r.data || [];
      function desenhar(q) {
        q = (q || "").toLowerCase();
        var f = rows.filter(function (x) { return !q || String(x.dados.cliente || "").toLowerCase().indexOf(q) > -1; });
        el.innerHTML = f.length ? f.map(function (x) {
          var d = x.dados, v = x.visualizacoes || 0;
          var info = ((M[d.segmento] || {}).nome || "") + " · " + ((TP[d.tipo] || {}).nome || "");
          return '<div class="item"><div class="t"><b>' + esc(d.cliente || "Sem nome") + '</b><span class="badge' + (v ? " seen" : "") + '">' +
            (v ? "Aberta " + v + (v > 1 ? " vezes" : " vez") : "Ainda não aberta") + "</span></div>" +
            '<div class="m">' + esc(info) + " · criada em " + esc(dataBR(x.criado_em)) +
            (x.ultima_visualizacao ? "<br>Última visita do cliente: " + esc(dataBR(x.ultima_visualizacao)) : "") + "</div>" +
            '<div class="actions"><button class="btn small dark" data-l="cp" data-id="' + x.id + '">Copiar link</button>' +
            '<a class="btn small" target="_blank" rel="noopener" href="' + esc(linkDe(x.slug)) + '">Ver</a>' +
            '<button class="btn small" data-l="ed" data-id="' + x.id + '">Editar</button>' +
            '<button class="btn small danger" data-l="rm" data-id="' + x.id + '">Apagar</button></div></div>';
        }).join("") : '<p class="empty">' + (rows.length ? "Nenhuma proposta com esse nome." : "Nenhuma proposta ainda. Crie a primeira em “Nova proposta”.") + "</p>";
      }
      desenhar("");
      document.getElementById("busca").oninput = function (e) { desenhar(e.target.value); };
      el.onclick = function (e) {
        var b = e.target.closest("[data-l]"); if (!b) return;
        var x = rows.filter(function (y) { return y.id === b.getAttribute("data-id"); })[0]; if (!x) return;
        var a = b.getAttribute("data-l");
        if (a === "cp") copiar(linkDe(x.slug));
        if (a === "ed") { editandoId = x.id; form = clone(x.dados); ultimo = null; trocar("nova"); }
        if (a === "rm" && confirm("Apagar a proposta de " + (x.dados.cliente || "este cliente") + "? O link para de funcionar.")) {
          sb.from(TABELA).delete().eq("id", x.id).then(function (r) {
            if (r.error) { toast("Não deu para apagar."); return; }
            rows = rows.filter(function (y) { return y.id !== x.id; }); desenhar(document.getElementById("busca").value); toast("Proposta apagada.");
          });
        }
      };
    });
  }
})();
