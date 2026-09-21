document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");

    cards.forEach(function (card) {
        card.tabIndex = 0;
        card.setAttribute("aria-pressed", "false");

        function alternar() {
            const selecionado = card.classList.toggle("selecionado");
            card.setAttribute("aria-pressed", String(selecionado));
        }

        card.addEventListener("click", alternar);
        card.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                alternar();
            }
        });
    });

    const constelacaoInfo = document.getElementById("constelacao-info");
    const dadosConstelacoes = {
        orion: { nome: "Orion", resumo: "Uma das constelações mais reconhecíveis do céu, marcada pelas três estrelas alinhadas do cinturão.", estrela: "Betelgeuse", visibilidade: "Dezembro a março", hemisferio: "Ambos", mito: "Na mitologia grega, Orion era um grande caçador colocado entre as estrelas." },
        ursa: { nome: "Ursa Maior", resumo: "Uma constelação extensa do norte que abriga o famoso asterismo conhecido como Big Dipper.", estrela: "Alioth", visibilidade: "Abril a junho", hemisferio: "Norte", mito: "Para os gregos, a Ursa Maior representava Calisto, transformada em ursa e levada ao céu." },
        cassiopeia: { nome: "Cassiopeia", resumo: "Seu formato em W é fácil de reconhecer e funciona como uma bússola para encontrar outras estrelas.", estrela: "Schedar", visibilidade: "Setembro a novembro", hemisferio: "Norte", mito: "Cassiopeia era uma rainha vaidosa que foi colocada no céu como advertência." },
        cruzeiro: { nome: "Cruzeiro do Sul", resumo: "Pequena e brilhante, esta constelação ajuda a localizar o polo sul celeste.", estrela: "Acrux", visibilidade: "Abril a junho", hemisferio: "Sul", mito: "Navegadores usam o Cruzeiro do Sul há séculos para encontrar a direção sul." }
    };

    document.querySelectorAll("[data-constelacao]").forEach(function (estrela) {
        estrela.addEventListener("click", function () {
            const chave = estrela.dataset.constelacao;
            const dados = dadosConstelacoes[chave];
            constelacaoInfo.innerHTML = `<p class="azul">CONSTELAÇÃO SELECIONADA</p><h3>${dados.nome}</h3><p class="constelacao-resumo">${dados.resumo}</p><div class="constelacao-dados"><div><span>ESTRELA PRINCIPAL</span><strong>${dados.estrela}</strong></div><div><span>MELHOR VISIBILIDADE</span><strong>${dados.visibilidade}</strong></div><div><span>HEMISFÉRIO</span><strong>${dados.hemisferio}</strong></div></div><p class="constelacao-mito">${dados.mito}</p>`;
            document.querySelectorAll("[data-constelacao]").forEach(function (item) { item.classList.toggle("selecionada", item.dataset.constelacao === chave); });
            document.querySelectorAll("[data-constelacao-linha]").forEach(function (linha) { linha.classList.toggle("visivel", linha.dataset.constelacaoLinha === chave); });
        });
    });

    window.addEventListener("scroll", function () {
        document.querySelector("header")?.classList.toggle("rolando", window.scrollY > 20);
    }, { passive: true });
});
