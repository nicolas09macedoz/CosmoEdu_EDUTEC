document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".planeta");
    const modal = document.getElementById("modal");
    const fechar = document.getElementById("fechar");
    const imagem = document.getElementById("modal-imagem");
    const numero = document.getElementById("modal-numero");
    const titulo = document.getElementById("modal-titulo");
    const descricao = document.getElementById("modal-descricao");
    const tipo = document.getElementById("modal-tipo");
    const diametro = document.getElementById("modal-diametro");
    const ano = document.getElementById("modal-ano");
    const dados = {
        mercurio: { tipo: "Planeta rochoso", diametro: "4.879 km", ano: "88 dias", descricao: "O menor planeta e o mais proximo do Sol.", imagem: "img/mercurio.jpg" },
        venus: { tipo: "Planeta rochoso", diametro: "12.104 km", ano: "225 dias", descricao: "Um mundo coberto por nuvens densas e temperaturas extremas.", imagem: "img/venus.jpg" },
        terra: { tipo: "Planeta rochoso", diametro: "12.742 km", ano: "365 dias", descricao: "O unico planeta conhecido que abriga vida.", imagem: "img/terra.jpg" },
        marte: { tipo: "Planeta rochoso", diametro: "6.779 km", ano: "687 dias", descricao: "O planeta vermelho guarda sinais de um passado mais umido.", imagem: "img/marte.jpg" },
        jupiter: { tipo: "Gigante gasoso", diametro: "139.820 km", ano: "11,86 anos", descricao: "O maior planeta do Sistema Solar, marcado pela Grande Mancha Vermelha.", imagem: "img/jupiter.jpg" },
        saturno: { tipo: "Gigante gasoso", diametro: "116.460 km", ano: "29,45 anos", descricao: "Um gigante reconhecido pelo seu impressionante sistema de aneis.", imagem: "img/saturno.jpg" },
        urano: { tipo: "Gigante de gelo", diametro: "50.724 km", ano: "84 anos", descricao: "Um planeta inclinado que gira praticamente de lado.", imagem: "img/urano.jpg" },
        netuno: { tipo: "Gigante de gelo", diametro: "49.244 km", ano: "164,8 anos", descricao: "O mundo mais distante do Sol e um dos mais ventosos.", imagem: "img/netuno.jpg" }
    };

    if (!modal || !fechar) {
        return;
    }

    function abrir(card) {
        const chave = card.dataset.planeta;
        const planeta = dados[chave];

        if (!planeta) {
            return;
        }

        const nome = card.querySelector("h3")?.textContent || "Planeta";
        const identificador = card.querySelector(".numero")?.textContent || "";

        imagem.src = planeta.imagem;
        imagem.alt = nome;
        numero.textContent = identificador + " / SISTEMA SOLAR";
        titulo.textContent = nome;
        descricao.textContent = planeta.descricao;
        tipo.textContent = planeta.tipo;
        diametro.textContent = planeta.diametro;
        ano.textContent = planeta.ano;
        modal.classList.add("aberto");
        document.body.classList.add("modal-aberto");
        fechar.focus();
    }

    function fecharModal() {
        modal.classList.remove("aberto");
        document.body.classList.remove("modal-aberto");
    }

    cards.forEach(function (card) {
        card.tabIndex = 0;
        card.addEventListener("click", function () { abrir(card); });
        card.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                abrir(card);
            }
        });
    });

    fechar.addEventListener("click", fecharModal);
    modal.addEventListener("click", function (evento) {
        if (evento.target === modal) {
            fecharModal();
        }
    });
    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape" && modal.classList.contains("aberto")) {
            fecharModal();
        }
    });

    document.querySelectorAll(".ponto").forEach(function (ponto) {
        ponto.addEventListener("click", function (evento) {
            evento.stopPropagation();
            ponto.classList.toggle("ativo");
        });
    });

    window.addEventListener("scroll", function () {
        document.querySelector("header")?.classList.toggle("rolando", window.scrollY > 20);
    }, { passive: true });
});
