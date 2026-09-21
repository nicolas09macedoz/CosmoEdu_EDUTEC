document.addEventListener("DOMContentLoaded", function () {
    const ano = document.getElementById("ano");
    const cena = document.querySelector(".cena-espacial");
    const painelCena = document.querySelector(".inicio-imagem");
    const secoes = document.querySelectorAll("main section");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (ano) {
        ano.textContent = new Date().getFullYear();
    }

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (evento) {
            const destino = document.querySelector(link.getAttribute("href"));

            if (!destino) {
                return;
            }

            evento.preventDefault();
            destino.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    if (!prefersReducedMotion && cena) {
        cena.addEventListener("pointermove", function (evento) {
            const area = cena.getBoundingClientRect();
            const deslocamentoX = ((evento.clientX - area.left) / area.width - 0.5) * 8;
            const deslocamentoY = ((evento.clientY - area.top) / area.height - 0.5) * 8;
            cena.style.setProperty("--mouse-x", `${deslocamentoX}px`);
            cena.style.setProperty("--mouse-y", `${deslocamentoY}px`);
        });

        cena.addEventListener("pointerleave", function () {
            cena.style.setProperty("--mouse-x", "0px");
            cena.style.setProperty("--mouse-y", "0px");
        });
    }

    if (painelCena && cena) {
        painelCena.addEventListener("click", function () {
            cena.classList.toggle("impulso-ativo");
        });
    }

    const contadorConquistas = document.getElementById("conquista-contador");
    const resumoConquistas = document.getElementById("conquista-resumo");
    const chavesConquistas = ["cosmo-peso-usado", "cosmo-lua-usada", "cosmo-missao-usada"];
    function atualizarConquistas() {
        const progresso = chavesConquistas.filter(function (chave) { return localStorage.getItem(chave) === "true"; }).length;
        if (contadorConquistas) contadorConquistas.textContent = `${progresso} / 3 descobertas`;
        if (resumoConquistas) resumoConquistas.textContent = progresso === 3 ? "Todas as experiências principais foram descobertas." : "Descubra experiências para liberar seus registros.";
    }

    const pesoTerra = document.getElementById("peso-terra");
    const pesoPlaneta = document.getElementById("peso-planeta");
    const pesoResultado = document.getElementById("peso-resultado");
    function atualizarPeso() {
        if (!pesoTerra || !pesoPlaneta || !pesoResultado) return;
        const peso = Math.max(0, Number(pesoTerra.value) || 0) * Number(pesoPlaneta.value);
        pesoResultado.innerHTML = `<strong>${peso.toFixed(1).replace(".", ",")} kg</strong><span>em ${pesoPlaneta.options[pesoPlaneta.selectedIndex].text}</span>`;
        localStorage.setItem("cosmo-peso-usado", "true");
        atualizarConquistas();
    }
    pesoTerra?.addEventListener("input", atualizarPeso);
    pesoPlaneta?.addEventListener("change", atualizarPeso);

    const fasesLua = ["Lua Nova", "Lua Crescente", "Lua Cheia", "Lua Minguante"];
    const luaVisual = document.getElementById("lua-visual");
    document.querySelectorAll("[data-fase]").forEach(function (botao) {
        botao.addEventListener("click", function () {
            const fase = Number(botao.dataset.fase);
            document.getElementById("lua-fase").textContent = fasesLua[fase];
            luaVisual.style.background = ["#162035", "linear-gradient(90deg, #162035 48%, #dce9f5 49%)", "radial-gradient(circle at 35% 28%, #f4fbff, #a4b5ca 63%, #53647d)", "linear-gradient(90deg, #dce9f5 49%, #162035 50%)"][fase];
            localStorage.setItem("cosmo-lua-usada", "true");
            atualizarConquistas();
        });
    });

    const missoes = {
        apollo: ["Em 1969, a Apollo 11 levou os primeiros seres humanos à superfície da Lua.", "1969 // LUA"],
        voyager: ["As sondas Voyager continuam viajando pelo espaço interestelar depois de explorar os planetas gigantes.", "1977 // ALÉM"],
        webb: ["O James Webb observa galáxias distantes, estrelas em formação e atmosferas de exoplanetas.", "2021 // DEEP SPACE"]
    };
    document.querySelectorAll("[data-missao]").forEach(function (botao) {
        botao.addEventListener("click", function () {
            document.querySelectorAll("[data-missao]").forEach(function (item) { item.classList.remove("ativo"); });
            botao.classList.add("ativo");
            document.getElementById("missao-texto").textContent = missoes[botao.dataset.missao][0];
            document.getElementById("missao-ano").textContent = missoes[botao.dataset.missao][1];
            localStorage.setItem("cosmo-missao-usada", "true");
            atualizarConquistas();
        });
    });

    const busca = document.getElementById("busca-site");
    const buscaStatus = document.getElementById("busca-status");
    busca?.addEventListener("input", function () {
        const termo = busca.value.toLowerCase().trim();
        const itens = document.querySelectorAll(".lab-card, .curiosidade, .introducao");
        let encontrados = 0;
        itens.forEach(function (item) {
            const corresponde = !termo || item.textContent.toLowerCase().includes(termo);
            item.style.display = corresponde ? "" : "none";
            if (corresponde && termo) encontrados++;
        });
        document.body.classList.toggle("busca-sem-resultado", Boolean(termo && !encontrados));
        buscaStatus.textContent = termo ? `${encontrados} resultado(s) nesta página` : "Explore por palavra-chave";
    });

    const modoProfessor = document.getElementById("modo-professor");
    const faixaProfessor = document.getElementById("faixa-professor");
    const sairProfessor = document.getElementById("sair-professor");
    function atualizarModoProfessor(ativo) {
        document.body.classList.toggle("modo-professor-ativo", ativo);
        modoProfessor?.setAttribute("aria-pressed", String(ativo));
        if (modoProfessor) modoProfessor.innerHTML = ativo ? "Modo professor ativo <span>✓</span>" : "Ativar modo professor <span>◈</span>";
        localStorage.setItem("cosmo-professor", String(ativo));
    }
    modoProfessor?.addEventListener("click", function () {
        atualizarModoProfessor(!document.body.classList.contains("modo-professor-ativo"));
    });
    sairProfessor?.addEventListener("click", function () { atualizarModoProfessor(false); });

    atualizarConquistas();
    atualizarModoProfessor(localStorage.getItem("cosmo-professor") === "true");

    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(function (entradas) {
            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("visivel");
                    observador.unobserve(entrada.target);
                }
            });
        }, { threshold: 0.15 });

        secoes.forEach(function (secao) {
            observador.observe(secao);
        });
    }
});
