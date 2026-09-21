document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".planeta");
    const modal = document.getElementById("modal");
    const fechar = document.getElementById("fechar");
    const modelo = document.getElementById("modelo-planeta");
    const numero = document.getElementById("modal-numero");
    const titulo = document.getElementById("modal-titulo");
    const descricao = document.getElementById("modal-descricao");
    const tipo = document.getElementById("modal-tipo");
    const diametro = document.getElementById("modal-diametro");
    const ano = document.getElementById("modal-ano");
    const luas = document.getElementById("modal-luas");
    const temperatura = document.getElementById("modal-temperatura");
    const curiosidade = document.getElementById("modal-curiosidade");
    const dados = {
        mercurio: { tipo: "Planeta rochoso", diametro: "4.879 km", ano: "88 dias", luas: "0", temperatura: "167 °C", descricao: "O menor planeta e o mais proximo do Sol.", curiosidade: "Um dia solar em Mercurio dura 176 dias terrestres.", imagem: "img/mercurio-real.jpg" },
        venus: { tipo: "Planeta rochoso", diametro: "12.104 km", ano: "225 dias", luas: "0", temperatura: "464 °C", descricao: "Um mundo coberto por nuvens densas e temperaturas extremas.", curiosidade: "Venus gira no sentido contrario ao da maioria dos planetas.", imagem: "img/venus-real.jpg" },
        terra: { tipo: "Planeta rochoso", diametro: "12.742 km", ano: "365 dias", luas: "1", temperatura: "15 °C", descricao: "O unico planeta conhecido que abriga vida.", curiosidade: "Cerca de 71% da superficie da Terra e coberta por agua.", imagem: "img/terra-real.jpg" },
        marte: { tipo: "Planeta rochoso", diametro: "6.779 km", ano: "687 dias", luas: "2", temperatura: "-63 °C", descricao: "O planeta vermelho guarda sinais de um passado mais umido.", curiosidade: "Marte abriga o Olympus Mons, o maior vulcao conhecido do Sistema Solar.", imagem: "img/marte-real.jpg" },
        jupiter: { tipo: "Gigante gasoso", diametro: "139.820 km", ano: "11,86 anos", luas: "95", temperatura: "-110 °C", descricao: "O maior planeta do Sistema Solar, marcado pela Grande Mancha Vermelha.", curiosidade: "Jupiter e tao grande que caberiam mais de mil Terras dentro dele.", imagem: "img/jupiter-real.jpg" },
        saturno: { tipo: "Gigante gasoso", diametro: "116.460 km", ano: "29,45 anos", luas: "146", temperatura: "-140 °C", descricao: "Um gigante reconhecido pelo seu impressionante sistema de aneis.", curiosidade: "Saturno e menos denso que a agua e flutuaria em um oceano grande o bastante.", imagem: "img/saturno-real.jpg" },
        urano: { tipo: "Gigante de gelo", diametro: "50.724 km", ano: "84 anos", luas: "28", temperatura: "-195 °C", descricao: "Um planeta inclinado que gira praticamente de lado.", curiosidade: "A inclinacao de Urano faz suas estacoes durarem cerca de 21 anos.", imagem: "img/urano-real.jpg" },
        netuno: { tipo: "Gigante de gelo", diametro: "49.244 km", ano: "164,8 anos", luas: "16", temperatura: "-200 °C", descricao: "O mundo mais distante do Sol e um dos mais ventosos.", curiosidade: "Os ventos de Netuno podem ultrapassar 2.000 km/h.", imagem: "img/netuno-real.jpg" }
    };

    const nomesPlanetas = Object.keys(dados);
    const nomesExibicao = { mercurio: "Mercúrio", venus: "Vênus", terra: "Terra", marte: "Marte", jupiter: "Júpiter", saturno: "Saturno", urano: "Urano", netuno: "Netuno" };

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

        modelo.style.setProperty("--textura-planeta", `url("../${planeta.imagem}")`);
        modelo.dataset.planeta = chave;
        modelo.classList.toggle("com-anel", chave === "saturno");
        modelo.setAttribute("aria-label", `Modelo 3D de ${nome}`);
        numero.textContent = identificador + " / SISTEMA SOLAR";
        titulo.textContent = nome;
        descricao.textContent = planeta.descricao;
        tipo.textContent = planeta.tipo;
        diametro.textContent = planeta.diametro;
        ano.textContent = planeta.ano;
        luas.textContent = planeta.luas;
        temperatura.textContent = planeta.temperatura;
        curiosidade.textContent = planeta.curiosidade;
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

    let arrastando = false;
    let inicioX = 0;
    let rotacao = 0;

    modelo.addEventListener("pointerdown", function (evento) {
        arrastando = true;
        inicioX = evento.clientX;
        modelo.setPointerCapture(evento.pointerId);
        modelo.classList.add("arrastando");
    });
    modelo.addEventListener("pointermove", function (evento) {
        if (!arrastando) {
            return;
        }

        rotacao += (evento.clientX - inicioX) * 0.35;
        inicioX = evento.clientX;
        modelo.style.setProperty("--rotacao-manual", `${rotacao}deg`);
    });
    modelo.addEventListener("pointerup", function () {
        arrastando = false;
        modelo.classList.remove("arrastando");
    });
    modelo.addEventListener("pointercancel", function () {
        arrastando = false;
        modelo.classList.remove("arrastando");
    });

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

    const mapaInfo = document.getElementById("mapa-info");
    document.querySelectorAll("[data-mapa-planeta]").forEach(function (botao) {
        botao.addEventListener("click", function () {
            const planeta = dados[botao.dataset.mapaPlaneta];
            mapaInfo.innerHTML = `<strong>${nomesExibicao[botao.dataset.mapaPlaneta]}</strong><span>${planeta.tipo} · ${planeta.diametro} de diâmetro · ${planeta.luas} lua(s)</span>`;
            document.querySelectorAll("[data-mapa-planeta]").forEach(function (item) { item.classList.remove("selecionado"); });
            botao.classList.add("selecionado");
        });
    });

    const seletorUm = document.getElementById("comparar-um");
    const seletorDois = document.getElementById("comparar-dois");
    const tabelaComparacao = document.getElementById("comparador-tabela");
    nomesPlanetas.forEach(function (chave) {
        const opcaoUm = new Option(nomesExibicao[chave], chave);
        const opcaoDois = new Option(nomesExibicao[chave], chave);
        seletorUm.add(opcaoUm);
        seletorDois.add(opcaoDois);
    });
    seletorUm.value = "terra";
    seletorDois.value = "marte";
    function atualizarComparacao() {
        const planetaUm = dados[seletorUm.value];
        const planetaDois = dados[seletorDois.value];
        const linhas = [["Tipo", planetaUm.tipo, planetaDois.tipo], ["Diâmetro", planetaUm.diametro, planetaDois.diametro], ["Ano", planetaUm.ano, planetaDois.ano], ["Luas", planetaUm.luas, planetaDois.luas], ["Temperatura média", planetaUm.temperatura, planetaDois.temperatura]];
        tabelaComparacao.innerHTML = `<div class="comparador-nomes"><strong>${nomesExibicao[seletorUm.value]}</strong><span>COMPARAÇÃO</span><strong>${nomesExibicao[seletorDois.value]}</strong></div>` + linhas.map(function (linha) { return `<div class="comparador-linha"><span>${linha[1]}</span><small>${linha[0]}</small><span>${linha[2]}</span></div>`; }).join("");
    }
    seletorUm.addEventListener("change", atualizarComparacao);
    seletorDois.addEventListener("change", atualizarComparacao);
    atualizarComparacao();

    document.querySelectorAll(".tempo-evento").forEach(function (evento) {
        evento.addEventListener("click", function () {
            document.querySelectorAll(".tempo-evento").forEach(function (item) { item.classList.remove("ativo"); });
            evento.classList.add("ativo");
        });
    });

});
